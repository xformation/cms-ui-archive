export class CollegeSettingsCtrl {
  sections: any[];
  activeTabId: string;
  constructor() {
    this.activeTabId = 'general_info';
    this.buildSectionList();
  }

  buildSectionList() {
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
    this.sections.push({
      title: 'DEPARTMENTS',
      id: 'department_settings',
    });
  }

  setActiveTab(id) {
    this.activeTabId = id;
  }
}
