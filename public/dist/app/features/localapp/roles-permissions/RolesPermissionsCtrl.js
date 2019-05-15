var RolesPerissionsCtrl = /** @class */ (function () {
    function RolesPerissionsCtrl() {
        this.activeTabId = 'roles';
        this.buildSectionList();
    }
    RolesPerissionsCtrl.prototype.buildSectionList = function () {
        this.sections = [];
        this.sections.push({
            title: 'Permissions',
            id: 'permissions',
        });
        this.sections.push({
            title: 'Roles',
            id: 'roles',
        });
        this.sections.push({
            title: 'Groups',
            id: 'groups',
        });
        this.sections.push({
            title: 'Users',
            id: 'users',
        });
    };
    RolesPerissionsCtrl.prototype.setActiveTab = function (id) {
        this.activeTabId = id;
    };
    return RolesPerissionsCtrl;
}());
export { RolesPerissionsCtrl };
//# sourceMappingURL=RolesPermissionsCtrl.js.map