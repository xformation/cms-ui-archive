import _ from 'lodash';
import config from 'app/core/config';
import { coreModule, appEvents } from 'app/core/core';
import { store } from 'app/store/store';
import { getNavModel } from 'app/core/selectors/navModel';
import { buildNavModel } from './state/navModel';
var datasourceTypes = [];
var defaults = {
    name: '',
    type: 'graphite',
    url: '',
    access: 'proxy',
    jsonData: {},
    secureJsonFields: {},
    secureJsonData: {},
};
var datasourceCreated = false;
var DataSourceEditCtrl = /** @class */ (function () {
    /** @ngInject */
    function DataSourceEditCtrl($q, backendSrv, $routeParams, $location, datasourceSrv) {
        var _this = this;
        this.$q = $q;
        this.backendSrv = backendSrv;
        this.$routeParams = $routeParams;
        this.$location = $location;
        this.datasourceSrv = datasourceSrv;
        var state = store.getState();
        this.navModel = getNavModel(state.navIndex, 'datasources');
        this.datasources = [];
        this.loadDatasourceTypes().then(function () {
            if (_this.$routeParams.id) {
                _this.getDatasourceById(_this.$routeParams.id);
            }
            else {
                _this.initNewDatasourceModel();
            }
        });
    }
    DataSourceEditCtrl.prototype.initNewDatasourceModel = function () {
        this.isNew = true;
        this.current = _.cloneDeep(defaults);
        // We are coming from getting started
        if (this.$location.search().gettingstarted) {
            this.gettingStarted = true;
            this.current.isDefault = true;
        }
        this.typeChanged();
    };
    DataSourceEditCtrl.prototype.loadDatasourceTypes = function () {
        var _this = this;
        if (datasourceTypes.length > 0) {
            this.types = datasourceTypes;
            return this.$q.when(null);
        }
        return this.backendSrv.get('/api/plugins', { enabled: 1, type: 'datasource' }).then(function (plugins) {
            datasourceTypes = plugins;
            _this.types = plugins;
        });
    };
    DataSourceEditCtrl.prototype.getDatasourceById = function (id) {
        var _this = this;
        this.backendSrv.get('/api/datasources/' + id).then(function (ds) {
            _this.isNew = false;
            _this.current = ds;
            if (datasourceCreated) {
                datasourceCreated = false;
                _this.testDatasource();
            }
            return _this.typeChanged();
        });
    };
    DataSourceEditCtrl.prototype.userChangedType = function () {
        // reset model but keep name & default flag
        this.current = _.defaults({
            id: this.current.id,
            name: this.current.name,
            isDefault: this.current.isDefault,
            type: this.current.type,
        }, _.cloneDeep(defaults));
        this.typeChanged();
    };
    DataSourceEditCtrl.prototype.updateNav = function () {
        this.navModel = buildNavModel(this.current, this.datasourceMeta, 'datasource-settings');
    };
    DataSourceEditCtrl.prototype.typeChanged = function () {
        var _this = this;
        return this.backendSrv.get('/api/plugins/' + this.current.type + '/settings').then(function (pluginInfo) {
            _this.datasourceMeta = pluginInfo;
            _this.updateNav();
        });
    };
    DataSourceEditCtrl.prototype.updateFrontendSettings = function () {
        var _this = this;
        return this.backendSrv.get('/api/frontend/settings').then(function (settings) {
            config.datasources = settings.datasources;
            config.defaultDatasource = settings.defaultDatasource;
            _this.datasourceSrv.init();
        });
    };
    DataSourceEditCtrl.prototype.testDatasource = function () {
        var _this = this;
        return this.datasourceSrv.get(this.current.name).then(function (datasource) {
            if (!datasource.testDatasource) {
                return;
            }
            _this.testing = { done: false, status: 'error' };
            // make test call in no backend cache context
            return _this.backendSrv
                .withNoBackendCache(function () {
                return datasource
                    .testDatasource()
                    .then(function (result) {
                    _this.testing.message = result.message;
                    _this.testing.status = result.status;
                })
                    .catch(function (err) {
                    if (err.statusText) {
                        _this.testing.message = 'HTTP Error ' + err.statusText;
                    }
                    else {
                        _this.testing.message = err.message;
                    }
                });
            })
                .finally(function () {
                _this.testing.done = true;
            });
        });
    };
    DataSourceEditCtrl.prototype.saveChanges = function () {
        var _this = this;
        if (!this.editForm.$valid) {
            return;
        }
        if (this.current.readOnly) {
            return;
        }
        if (this.current.id) {
            return this.backendSrv.put('/api/datasources/' + this.current.id, this.current).then(function (result) {
                _this.current = result.datasource;
                _this.updateNav();
                return _this.updateFrontendSettings().then(function () {
                    return _this.testDatasource();
                });
            });
        }
        else {
            return this.backendSrv.post('/api/datasources', this.current).then(function (result) {
                _this.current = result.datasource;
                _this.updateFrontendSettings();
                datasourceCreated = true;
                _this.$location.path('datasources/edit/' + result.id);
            });
        }
    };
    DataSourceEditCtrl.prototype.confirmDelete = function () {
        var _this = this;
        this.backendSrv.delete('/api/datasources/' + this.current.id).then(function () {
            _this.$location.path('datasources');
        });
    };
    DataSourceEditCtrl.prototype.delete = function (s) {
        var _this = this;
        appEvents.emit('confirm-modal', {
            title: 'Delete',
            text: 'Are you sure you want to delete this datasource?',
            yesText: 'Delete',
            icon: 'fa-trash',
            onConfirm: function () {
                _this.confirmDelete();
            },
        });
    };
    return DataSourceEditCtrl;
}());
export { DataSourceEditCtrl };
coreModule.controller('DataSourceEditCtrl', DataSourceEditCtrl);
coreModule.directive('datasourceHttpSettings', function () {
    return {
        scope: {
            current: '=',
            suggestUrl: '@',
            noDirectAccess: '@',
        },
        templateUrl: 'public/app/features/plugins/partials/ds_http_settings.html',
        link: {
            pre: function ($scope, elem, attrs) {
                // do not show access option if direct access is disabled
                $scope.showAccessOption = $scope.noDirectAccess !== 'true';
                $scope.showAccessHelp = false;
                $scope.toggleAccessHelp = function () {
                    $scope.showAccessHelp = !$scope.showAccessHelp;
                };
                $scope.getSuggestUrls = function () {
                    return [$scope.suggestUrl];
                };
            },
        },
    };
});
//# sourceMappingURL=ds_edit_ctrl.js.map