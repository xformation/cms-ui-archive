export class AcademicSettingsCtrl {
  sections: any[];
  activeTabId: string;
  constructor() {
    this.activeTabId = 'year_setting';
    this.buildSectionList();
  }

  buildSectionList() {
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
      title: 'SUBJECT SETUP',
      id: 'subject_setup',
    });
    this.sections.push({
      title: 'CLASS SETUP',
      id: 'class_setup',
    });
    this.sections.push({
      title: 'TIMETABLE SETTING',
      id: 'timetable_setting',
    });
  }

  setActiveTab(id) {
    this.activeTabId = id;
  }
}
