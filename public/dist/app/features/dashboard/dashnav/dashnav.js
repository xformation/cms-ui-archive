import moment from 'moment';
import angular from 'angular';
import { appEvents } from 'app/core/core';
var DashNavCtrl = /** @class */ (function () {
    /** @ngInject */
    function DashNavCtrl($scope, dashboardSrv, $location, playlistSrv) {
        this.$scope = $scope;
        this.dashboardSrv = dashboardSrv;
        this.$location = $location;
        this.playlistSrv = playlistSrv;
        appEvents.on('save-dashboard', this.saveDashboard.bind(this), $scope);
        if (this.dashboard.meta.isSnapshot) {
            var meta = this.dashboard.meta;
            this.titleTooltip = 'Created: &nbsp;' + moment(meta.created).calendar();
            if (meta.expires) {
                this.titleTooltip += '<br>Expires: &nbsp;' + moment(meta.expires).fromNow() + '<br>';
            }
        }
    }
    DashNavCtrl.prototype.toggleSettings = function () {
        var search = this.$location.search();
        if (search.editview) {
            delete search.editview;
        }
        else {
            search.editview = 'settings';
        }
        this.$location.search(search);
    };
    DashNavCtrl.prototype.toggleViewMode = function () {
        appEvents.emit('toggle-kiosk-mode');
    };
    DashNavCtrl.prototype.close = function () {
        var search = this.$location.search();
        if (search.editview) {
            delete search.editview;
        }
        else if (search.fullscreen) {
            delete search.fullscreen;
            delete search.edit;
            delete search.tab;
            delete search.panelId;
        }
        this.$location.search(search);
    };
    DashNavCtrl.prototype.starDashboard = function () {
        var _this = this;
        this.dashboardSrv.starDashboard(this.dashboard.id, this.dashboard.meta.isStarred).then(function (newState) {
            _this.dashboard.meta.isStarred = newState;
        });
    };
    DashNavCtrl.prototype.shareDashboard = function (tabIndex) {
        var modalScope = this.$scope.$new();
        modalScope.tabIndex = tabIndex;
        modalScope.dashboard = this.dashboard;
        appEvents.emit('show-modal', {
            src: 'public/app/features/dashboard/partials/shareModal.html',
            scope: modalScope,
        });
    };
    DashNavCtrl.prototype.hideTooltip = function (evt) {
        angular.element(evt.currentTarget).tooltip('hide');
    };
    DashNavCtrl.prototype.saveDashboard = function () {
        return this.dashboardSrv.saveDashboard();
    };
    DashNavCtrl.prototype.showSearch = function () {
        if (this.dashboard.meta.fullscreen) {
            this.close();
            return;
        }
        appEvents.emit('show-dash-search');
    };
    DashNavCtrl.prototype.addPanel = function () {
        appEvents.emit('dash-scroll', { animate: true, evt: 0 });
        if (this.dashboard.panels.length > 0 && this.dashboard.panels[0].type === 'add-panel') {
            return; // Return if the "Add panel" exists already
        }
        this.dashboard.addPanel({
            type: 'add-panel',
            gridPos: { x: 0, y: 0, w: 12, h: 8 },
            title: 'Panel Title',
        });
    };
    DashNavCtrl.prototype.navItemClicked = function (navItem, evt) {
        if (navItem.clickHandler) {
            navItem.clickHandler();
            evt.preventDefault();
        }
    };
    return DashNavCtrl;
}());
export { DashNavCtrl };
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
//# sourceMappingURL=dashnav.js.map