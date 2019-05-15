var StaffSetupCtrl = /** @class */ (function () {
    /** @ngInject */
    function StaffSetupCtrl() {
        this.activeTabIndex = 0;
        this.activeBtnIndex = 0;
        this.activeTabIndex = 0;
        this.activeBtnIndex = 0;
        this.activeTabStaffId = 'staff_list';
    }
    StaffSetupCtrl.prototype.activeTabStaffCreate = function () {
        this.activeTabStaffId = 'staff_create';
    };
    StaffSetupCtrl.prototype.activeTabStaffList = function () {
        this.activeTabStaffId = 'staff_list';
    };
    StaffSetupCtrl.prototype.activeTabStaffProfile = function () {
        this.activeTabStaffId = 'staff_profile';
    };
    StaffSetupCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    StaffSetupCtrl.prototype.activeBtn = function (tabIndex) {
        this.activeBtnIndex = tabIndex;
    };
    return StaffSetupCtrl;
}());
export { StaffSetupCtrl };
//# sourceMappingURL=StaffSetupCtrl.js.map