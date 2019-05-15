var AcademicSettingsCtrl = /** @class */ (function () {
    function AcademicSettingsCtrl() {
        this.activeTabId = 'year_setting';
        this.buildSectionList();
    }
    AcademicSettingsCtrl.prototype.buildSectionList = function () {
        this.sections = [];
        this.sections.push({
            title: 'YEAR SETTING',
            id: 'year_setting',
        });
        this.sections.push({
            title: 'DEPARTMENT SETUP',
            id: 'department_setup',
        });
        this.sections.push({
            title: 'STAFF SETUP',
            id: 'staff_setup',
        });
        this.sections.push({
            title: 'SUBJECT SETUP',
            id: 'subject_setup',
        });
        // this.sections.push({
        //   title: 'CLASS SETUP',
        //   id: 'class_setup',
        // });
        this.sections.push({
            title: 'TIMETABLE SETTING',
            id: 'timetable_setting',
        });
    };
    AcademicSettingsCtrl.prototype.setActiveTab = function (id) {
        this.activeTabId = id;
    };
    return AcademicSettingsCtrl;
}());
export { AcademicSettingsCtrl };
//# sourceMappingURL=AcademicSettingsCtrl.js.map