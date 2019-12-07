import _ from 'lodash';
import appEvents from 'app/core/app_events';

export class CustomLoader {
  dashboard: any;
  dashboardViewState: any;
  loadedFallbackDashboard: boolean;
  rootScope: any;
  constructor(private dashboardLoaderSrv, private $scope, $rootScope) {
    this.rootScope = $rootScope;
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
    this.loadDashboard();
  }

  loadDashboard() {
    this.$scope.appEvent('dashboard-fetch-start');
    this.dashboardLoaderSrv.loadDashboard(undefined, this.$scope.ctrl.slug, this.$scope.ctrl.uid).then(result => {
      this.rootScope.initDashboard(result, this.$scope);
    });
  }
}
