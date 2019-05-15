var CollegeSettingsCtrl = /** @class */ (function () {
    function CollegeSettingsCtrl() {
        this.activeTabId = 'general_info';
        this.buildSectionList();
    }
    CollegeSettingsCtrl.prototype.buildSectionList = function () {
        this.sections = [];
        this.sections.push({
            title: 'COLLEGE INFO',
            id: 'general_info',
        });
        this.sections.push({
            title: 'COLLEGE BRANCHES',
            id: 'college_branches',
        });
        this.sections.push({
            title: 'LEGAL ENTITIES',
            id: 'legal_entities',
        });
        // this.sections.push({
        //   title: 'LOCATIONS',
        //   id: 'locations',
        // });
        // this.sections.push({
        //   title: 'DEPARTMENTS',
        //   id: 'department_settings',
        // });
    };
    CollegeSettingsCtrl.prototype.setActiveTab = function (id) {
        this.activeTabId = id;
    };
    return CollegeSettingsCtrl;
}());
export { CollegeSettingsCtrl };
//# sourceMappingURL=CollegeSettingsCtrl.js.map