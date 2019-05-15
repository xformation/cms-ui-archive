import { FolderPageLoader } from './folder_page_loader';
var FolderPermissionsCtrl = /** @class */ (function () {
    /** @ngInject */
    function FolderPermissionsCtrl(backendSrv, navModelSrv, $routeParams, $location) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.$routeParams = $routeParams;
        if (this.$routeParams.uid) {
            this.uid = $routeParams.uid;
            new FolderPageLoader(this.backendSrv).load(this, this.uid, 'manage-folder-permissions').then(function (folder) {
                if ($location.path() !== folder.meta.url) {
                    $location.path(folder.meta.url + "/permissions").replace();
                }
                _this.dashboard = folder.dashboard;
                _this.meta = folder.meta;
            });
        }
    }
    return FolderPermissionsCtrl;
}());
export { FolderPermissionsCtrl };
//# sourceMappingURL=folder_permissions_ctrl.js.map