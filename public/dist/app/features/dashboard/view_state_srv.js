import angular from 'angular';
import _ from 'lodash';
import config from 'app/core/config';
import appEvents from 'app/core/app_events';
// represents the transient view state
// like fullscreen panel & edit
var DashboardViewState = /** @class */ (function () {
    /** @ngInject */
    function DashboardViewState($scope, $location, $timeout) {
        this.$location = $location;
        this.$timeout = $timeout;
        var self = this;
        self.state = {};
        self.panelScopes = [];
        self.$scope = $scope;
        self.dashboard = $scope.dashboard;
        $scope.onAppEvent('$routeUpdate', function () {
            var urlState = self.getQueryStringState();
            if (self.needsSync(urlState)) {
                self.update(urlState, true);
            }
        });
        $scope.onAppEvent('panel-change-view', function (evt, payload) {
            self.update(payload);
        });
        // this marks changes to location during this digest cycle as not to add history item
        // don't want url changes like adding orgId to add browser history
        $location.replace();
        this.update(this.getQueryStringState());
    }
    DashboardViewState.prototype.needsSync = function (urlState) {
        return _.isEqual(this.state, urlState) === false;
    };
    DashboardViewState.prototype.getQueryStringState = function () {
        var state = this.$location.search();
        state.panelId = parseInt(state.panelId, 10) || null;
        state.fullscreen = state.fullscreen ? true : null;
        state.edit = state.edit === 'true' || state.edit === true || null;
        state.editview = state.editview || null;
        state.orgId = config.bootData.user.orgId;
        return state;
    };
    DashboardViewState.prototype.serializeToUrl = function () {
        var urlState = _.clone(this.state);
        urlState.fullscreen = this.state.fullscreen ? true : null;
        urlState.edit = this.state.edit ? true : null;
        return urlState;
    };
    DashboardViewState.prototype.update = function (state, fromRouteUpdated) {
        // implement toggle logic
        if (state.toggle) {
            delete state.toggle;
            if (this.state.fullscreen && state.fullscreen) {
                if (this.state.edit === state.edit) {
                    state.fullscreen = !state.fullscreen;
                }
            }
        }
        _.extend(this.state, state);
        this.dashboard.meta.fullscreen = this.state.fullscreen;
        if (!this.state.fullscreen) {
            this.state.fullscreen = null;
            this.state.edit = null;
            // clear panel id unless in solo mode
            if (!this.dashboard.meta.soloMode) {
                this.state.panelId = null;
            }
        }
        if ((this.state.fullscreen || this.dashboard.meta.soloMode) && this.state.panelId) {
            // Trying to render panel in fullscreen when it's in the collapsed row causes an issue.
            // So in this case expand collapsed row first.
            this.toggleCollapsedPanelRow(this.state.panelId);
        }
        // if no edit state cleanup tab parm
        if (!this.state.edit) {
            delete this.state.tab;
        }
        // do not update url params if we are here
        // from routeUpdated event
        if (fromRouteUpdated !== true) {
            this.$location.search(this.serializeToUrl());
        }
        this.syncState();
    };
    DashboardViewState.prototype.toggleCollapsedPanelRow = function (panelId) {
        for (var _i = 0, _a = this.dashboard.panels; _i < _a.length; _i++) {
            var panel = _a[_i];
            if (panel.collapsed) {
                for (var _b = 0, _c = panel.panels; _b < _c.length; _b++) {
                    var rowPanel = _c[_b];
                    if (rowPanel.id === panelId) {
                        this.dashboard.toggleRow(panel);
                        return;
                    }
                }
            }
        }
    };
    DashboardViewState.prototype.syncState = function () {
        if (this.dashboard.meta.fullscreen) {
            var panel = this.dashboard.getPanelById(this.state.panelId);
            if (!panel) {
                return;
            }
            if (!panel.fullscreen) {
                this.enterFullscreen(panel);
            }
            else if (this.dashboard.meta.isEditing !== this.state.edit) {
                this.dashboard.setViewMode(panel, this.state.fullscreen, this.state.edit);
            }
        }
        else if (this.fullscreenPanel) {
            this.leaveFullscreen();
        }
    };
    DashboardViewState.prototype.leaveFullscreen = function () {
        var _this = this;
        var panel = this.fullscreenPanel;
        this.dashboard.setViewMode(panel, false, false);
        delete this.fullscreenPanel;
        this.$timeout(function () {
            appEvents.emit('dash-scroll', { restore: true });
            if (_this.oldTimeRange !== _this.dashboard.time) {
                _this.dashboard.startRefresh();
            }
            else {
                _this.dashboard.render();
            }
        });
    };
    DashboardViewState.prototype.enterFullscreen = function (panel) {
        var isEditing = this.state.edit && this.dashboard.meta.canEdit;
        this.oldTimeRange = this.dashboard.time;
        this.fullscreenPanel = panel;
        // Firefox doesn't return scrollTop position properly if 'dash-scroll' is emitted after setViewMode()
        this.$scope.appEvent('dash-scroll', { animate: false, pos: 0 });
        this.dashboard.setViewMode(panel, true, isEditing);
    };
    return DashboardViewState;
}());
export { DashboardViewState };
/** @ngInject */
export function dashboardViewStateSrv($location, $timeout) {
    return {
        create: function ($scope) {
            return new DashboardViewState($scope, $location, $timeout);
        },
    };
}
angular.module('grafana.services').factory('dashboardViewStateSrv', dashboardViewStateSrv);
//# sourceMappingURL=view_state_srv.js.map