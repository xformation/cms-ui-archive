import { coreModule } from 'app/core/core';
import { store } from 'app/store/store';
import { getNavModel } from 'app/core/selectors/navModel';
import { buildNavModel } from './state/navModel';
var DataSourceDashboardsCtrl = /** @class */ (function () {
    /** @ngInject */
    function DataSourceDashboardsCtrl(backendSrv, $routeParams) {
        this.backendSrv = backendSrv;
        this.$routeParams = $routeParams;
        var state = store.getState();
        this.navModel = getNavModel(state.navIndex, 'datasources');
        if (this.$routeParams.id) {
            this.getDatasourceById(this.$routeParams.id);
        }
    }
    DataSourceDashboardsCtrl.prototype.getDatasourceById = function (id) {
        var _this = this;
        this.backendSrv
            .get('/api/datasources/' + id)
            .then(function (ds) {
            _this.current = ds;
        })
            .then(this.getPluginInfo.bind(this));
    };
    DataSourceDashboardsCtrl.prototype.updateNav = function () {
        this.navModel = buildNavModel(this.current, this.datasourceMeta, 'datasource-dashboards');
    };
    DataSourceDashboardsCtrl.prototype.getPluginInfo = function () {
        var _this = this;
        return this.backendSrv.get('/api/plugins/' + this.current.type + '/settings').then(function (pluginInfo) {
            _this.datasourceMeta = pluginInfo;
            _this.updateNav();
        });
    };
    return DataSourceDashboardsCtrl;
}());
export { DataSourceDashboardsCtrl };
coreModule.controller('DataSourceDashboardsCtrl', DataSourceDashboardsCtrl);
//# sourceMappingURL=ds_dashboards_ctrl.js.map