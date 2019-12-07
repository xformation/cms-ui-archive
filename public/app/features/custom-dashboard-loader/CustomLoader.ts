import _ from 'lodash';
import appEvents from 'app/core/app_events';
import config from 'app/core/config';

export class CustomLoader {
  dashboard: any;
  dashboardViewState: any;
  loadedFallbackDashboard: boolean;
  constructor(
    private dashboardLoaderSrv,
    private $scope,
    $rootScope,
    private dashboardSrv,
    private timeSrv,
    private variableSrv,
    private alertingSrv,
    private annotationsSrv,
    private unsavedChangesSrv,
    private dashboardViewStateSrv,
    private keybindingSrv
  ) {
    // this.slug = this.$scope.ctrl.slug;
    // this.uid = this.$scope.ctrl.uid;
    this.loadDashboard();

    this.$scope.onAppEvent = function(name, callback, localScope) {
      const unbind = $rootScope.$on(name, callback);
      let callerScope = this;
      if (callerScope.$id === 1 && !localScope) {
        console.log('warning rootScope onAppEvent called without localscope');
      }
      if (localScope) {
        callerScope = localScope;
      }
      callerScope.$on('$destroy', unbind);
    };

    this.$scope.appEvent = (name, payload) => {
      this.$scope.$emit(name, payload);
      appEvents.emit(name, payload);
    };
  }

  loadDashboard() {
    this.dashboardLoaderSrv.loadDashboard(undefined, this.$scope.ctrl.slug, this.$scope.ctrl.uid).then(result => {
      // $scope.initDashboard(result, $scope);
      this.initDashboard(result);
    });
  }

  initDashboard(dashboardData) {
    this.setupDashboard(dashboardData);
  }

  setupDashboard(data) {
    const dashboard = this.dashboardSrv.create(data.dashboard, data.meta);
    this.dashboardSrv.setCurrent(dashboard);

    // init services
    this.timeSrv.init(dashboard);
    this.alertingSrv.init(dashboard, data.alerts);
    this.annotationsSrv.init(dashboard);

    // template values service needs to initialize completely before
    // the rest of the dashboard can load
    this.variableSrv
      .init(dashboard)
      // template values failes are non fatal
      .catch(this.onInitFailed.bind(this, 'Templating init failed', false))
      // continue
      .finally(() => {
        this.dashboard = dashboard;
        this.dashboard.processRepeats();
        this.dashboard.updateSubmenuVisibility();
        this.dashboard.autoFitPanels(window.innerHeight);

        this.unsavedChangesSrv.init(dashboard, this.$scope);

        // TODO refactor ViewStateSrv
        this.$scope.dashboard = dashboard;
        this.dashboardViewState = this.dashboardViewStateSrv.create(this.$scope);

        this.keybindingSrv.setupDashboardBindings(this.$scope, dashboard);
        this.setWindowTitleAndTheme();

        appEvents.emit('dashboard-initialized', dashboard);
      })
      .catch(this.onInitFailed.bind(this, 'Dashboard init failed', true));
  }

  onInitFailed(msg, fatal, err) {
    console.log(msg, err);

    if (err.data && err.data.message) {
      err.message = err.data.message;
    } else if (!err.message) {
      err = { message: err.toString() };
    }

    this.$scope.appEvent('alert-error', [msg, err.message]);

    // protect against  recursive fallbacks
    if (fatal && !this.loadedFallbackDashboard) {
      this.loadedFallbackDashboard = true;
      this.setupDashboard({ dashboard: { title: 'Dashboard Init failed' } });
    }
  }

  setWindowTitleAndTheme() {
    window.document.title = config.windowTitlePrefix + this.dashboard.title;
  }
}
