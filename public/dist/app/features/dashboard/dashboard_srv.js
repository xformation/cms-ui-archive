import coreModule from 'app/core/core_module';
import { DashboardModel } from './dashboard_model';
import locationUtil from 'app/core/utils/location_util';
var DashboardSrv = /** @class */ (function () {
    /** @ngInject */
    function DashboardSrv(backendSrv, $rootScope, $location) {
        this.backendSrv = backendSrv;
        this.$rootScope = $rootScope;
        this.$location = $location;
    }
    DashboardSrv.prototype.create = function (dashboard, meta) {
        return new DashboardModel(dashboard, meta);
    };
    DashboardSrv.prototype.setCurrent = function (dashboard) {
        this.dash = dashboard;
    };
    DashboardSrv.prototype.getCurrent = function () {
        return this.dash;
    };
    DashboardSrv.prototype.handleSaveDashboardError = function (clone, options, err) {
        var _this = this;
        options = options || {};
        options.overwrite = true;
        if (err.data && err.data.status === 'version-mismatch') {
            err.isHandled = true;
            this.$rootScope.appEvent('confirm-modal', {
                title: 'Conflict',
                text: 'Someone else has updated this dashboard.',
                text2: 'Would you still like to save this dashboard?',
                yesText: 'Save & Overwrite',
                icon: 'fa-warning',
                onConfirm: function () {
                    _this.save(clone, options);
                },
            });
        }
        if (err.data && err.data.status === 'name-exists') {
            err.isHandled = true;
            this.$rootScope.appEvent('confirm-modal', {
                title: 'Conflict',
                text: 'A dashboard with the same name in selected folder already exists.',
                text2: 'Would you still like to save this dashboard?',
                yesText: 'Save & Overwrite',
                icon: 'fa-warning',
                onConfirm: function () {
                    _this.save(clone, options);
                },
            });
        }
        if (err.data && err.data.status === 'plugin-dashboard') {
            err.isHandled = true;
            this.$rootScope.appEvent('confirm-modal', {
                title: 'Plugin Dashboard',
                text: err.data.message,
                text2: 'Your changes will be lost when you update the plugin. Use Save As to create custom version.',
                yesText: 'Overwrite',
                icon: 'fa-warning',
                altActionText: 'Save As',
                onAltAction: function () {
                    _this.showSaveAsModal();
                },
                onConfirm: function () {
                    _this.save(clone, { overwrite: true });
                },
            });
        }
    };
    DashboardSrv.prototype.postSave = function (clone, data) {
        this.dash.version = data.version;
        // important that these happens before location redirect below
        this.$rootScope.appEvent('dashboard-saved', this.dash);
        this.$rootScope.appEvent('alert-success', ['Dashboard saved']);
        var newUrl = locationUtil.stripBaseFromUrl(data.url);
        var currentPath = this.$location.path();
        if (newUrl !== currentPath) {
            this.$location.url(newUrl).replace();
        }
        return this.dash;
    };
    DashboardSrv.prototype.save = function (clone, options) {
        options = options || {};
        options.folderId = options.folderId >= 0 ? options.folderId : this.dash.meta.folderId || clone.folderId;
        return this.backendSrv
            .saveDashboard(clone, options)
            .then(this.postSave.bind(this, clone))
            .catch(this.handleSaveDashboardError.bind(this, clone, options));
    };
    DashboardSrv.prototype.saveDashboard = function (options, clone) {
        if (clone) {
            this.setCurrent(this.create(clone, this.dash.meta));
        }
        if (this.dash.meta.provisioned) {
            return this.showDashboardProvisionedModal();
        }
        if (!this.dash.meta.canSave && options.makeEditable !== true) {
            return Promise.resolve();
        }
        if (this.dash.title === 'New dashboard') {
            return this.showSaveAsModal();
        }
        if (this.dash.version > 0) {
            return this.showSaveModal();
        }
        return this.save(this.dash.getSaveModelClone(), options);
    };
    DashboardSrv.prototype.saveJSONDashboard = function (json) {
        return this.save(JSON.parse(json), {});
    };
    DashboardSrv.prototype.showDashboardProvisionedModal = function () {
        this.$rootScope.appEvent('show-modal', {
            templateHtml: '<save-provisioned-dashboard-modal dismiss="dismiss()"></save-provisioned-dashboard-modal>',
        });
    };
    DashboardSrv.prototype.showSaveAsModal = function () {
        this.$rootScope.appEvent('show-modal', {
            templateHtml: '<save-dashboard-as-modal dismiss="dismiss()"></save-dashboard-as-modal>',
            modalClass: 'modal--narrow',
        });
    };
    DashboardSrv.prototype.showSaveModal = function () {
        this.$rootScope.appEvent('show-modal', {
            templateHtml: '<save-dashboard-modal dismiss="dismiss()"></save-dashboard-modal>',
            modalClass: 'modal--narrow',
        });
    };
    DashboardSrv.prototype.starDashboard = function (dashboardId, isStarred) {
        var _this = this;
        var promise;
        if (isStarred) {
            promise = this.backendSrv.delete('/api/user/stars/dashboard/' + dashboardId).then(function () {
                return false;
            });
        }
        else {
            promise = this.backendSrv.post('/api/user/stars/dashboard/' + dashboardId).then(function () {
                return true;
            });
        }
        return promise.then(function (res) {
            if (_this.dash && _this.dash.id === dashboardId) {
                _this.dash.meta.isStarred = res;
            }
            return res;
        });
    };
    return DashboardSrv;
}());
export { DashboardSrv };
coreModule.service('dashboardSrv', DashboardSrv);
//# sourceMappingURL=dashboard_srv.js.map