import moment from 'moment';
import angular from 'angular';
import { appEvents, NavModel } from 'app/core/core';
import { DashboardModel } from '../dashboard_model';
import { config } from '../../localapp/config';

export class DashNavCtrl {
  dashboard: DashboardModel;
  navModel: NavModel;
  titleTooltip: string;
  globalSettings: any;
  cmsConfig: any;
  /** @ngInject */
  constructor(private $scope, private dashboardSrv, private $location, public playlistSrv, private backendSrv) {
    appEvents.on('save-dashboard', this.saveDashboard.bind(this), $scope);
    $scope.user = $scope.ctrl.dashboardSrv.backendSrv.contextSrv.user.login;
    console.log('logged in user : ', $scope.ctrl.dashboardSrv.backendSrv.contextSrv.user.login);
    if (this.dashboard.meta.isSnapshot) {
      const meta = this.dashboard.meta;
      this.titleTooltip = 'Created: &nbsp;' + moment(meta.created).calendar();
      if (meta.expires) {
        this.titleTooltip += '<br>Expires: &nbsp;' + moment(meta.expires).fromNow() + '<br>';
      }
    }
    this.getGlobalConfigurations($scope.ctrl.dashboardSrv.backendSrv.contextSrv.user.login);
  }

  toggleSettings() {
    const search = this.$location.search();
    if (search.editview) {
      delete search.editview;
    } else {
      search.editview = 'settings';
    }
    this.$location.search(search);
  }

  toggleViewMode() {
    appEvents.emit('toggle-kiosk-mode');
  }

  close() {
    const search = this.$location.search();
    if (search.editview) {
      delete search.editview;
    } else if (search.fullscreen) {
      delete search.fullscreen;
      delete search.edit;
      delete search.tab;
      delete search.panelId;
    }
    this.$location.search(search);
  }

  starDashboard() {
    this.dashboardSrv.starDashboard(this.dashboard.id, this.dashboard.meta.isStarred).then(newState => {
      this.dashboard.meta.isStarred = newState;
    });
  }

  shareDashboard(tabIndex) {
    const modalScope = this.$scope.$new();
    modalScope.tabIndex = tabIndex;
    modalScope.dashboard = this.dashboard;

    appEvents.emit('show-modal', {
      src: 'public/app/features/dashboard/partials/shareModal.html',
      scope: modalScope,
    });
  }

  hideTooltip(evt) {
    angular.element(evt.currentTarget).tooltip('hide');
  }

  saveDashboard() {
    return this.dashboardSrv.saveDashboard();
  }

  showSearch() {
    if (this.dashboard.meta.fullscreen) {
      this.close();
      return;
    }

    appEvents.emit('show-dash-search');
  }

  openSearchFilter() {
    appEvents.emit('show-search-filter');
  }

  addPanel() {
    appEvents.emit('dash-scroll', { animate: true, evt: 0 });

    if (this.dashboard.panels.length > 0 && this.dashboard.panels[0].type === 'add-panel') {
      return; // Return if the "Add panel" exists already
    }

    this.dashboard.addPanel({
      type: 'add-panel',
      gridPos: { x: 0, y: 0, w: 12, h: 8 },
      title: 'Panel Title',
    });
  }

  navItemClicked(navItem, evt) {
    if (navItem.clickHandler) {
      navItem.clickHandler();
      evt.preventDefault();
    }
  }

  getGlobalConfigurations(userName) {
    this.backendSrv.get(config.CMS_GLOBAL_CONFIG_URL + '?userName=' + userName).then(result => {
      this.globalSettings = result;
      console.log('global settings in dashnav : ', this.globalSettings);
      this.$scope.selectedBranches = this.globalSettings.branchList;
    });
  }
}

export function dashNavDirective() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/dashboard/dashnav/dashnav.html',
    controller: DashNavCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

angular.module('grafana.directives').directive('dashnav', dashNavDirective);
