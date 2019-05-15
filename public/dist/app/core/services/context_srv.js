import config from 'app/core/config';
import _ from 'lodash';
import coreModule from 'app/core/core_module';
import store from 'app/core/store';
var User = /** @class */ (function () {
    function User() {
        if (config.bootData.user) {
            _.extend(this, config.bootData.user);
        }
    }
    return User;
}());
export { User };
var ContextSrv = /** @class */ (function () {
    function ContextSrv() {
        this.sidemenuSmallBreakpoint = false;
        this.sidemenu = store.getBool('grafana.sidemenu', true);
        if (!config.bootData) {
            config.bootData = { user: {}, settings: {} };
        }
        this.user = new User();
        this.isSignedIn = this.user.isSignedIn;
        this.isGrafanaAdmin = this.user.isGrafanaAdmin;
        this.isEditor = this.hasRole('Editor') || this.hasRole('Admin');
        this.hasEditPermissionInFolders = this.user.hasEditPermissionInFolders;
    }
    ContextSrv.prototype.hasRole = function (role) {
        return this.user.orgRole === role;
    };
    ContextSrv.prototype.isGrafanaVisible = function () {
        return !!(document.visibilityState === undefined || document.visibilityState === 'visible');
    };
    ContextSrv.prototype.toggleSideMenu = function () {
        this.sidemenu = !this.sidemenu;
        store.set('grafana.sidemenu', this.sidemenu);
    };
    return ContextSrv;
}());
export { ContextSrv };
var contextSrv = new ContextSrv();
export { contextSrv };
coreModule.factory('contextSrv', function () {
    return contextSrv;
});
//# sourceMappingURL=context_srv.js.map