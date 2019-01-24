export class RolesPerissionsCtrl {
  sections: any[];
  activeTabId: string;
  constructor() {
    this.activeTabId = 'roles';
    this.buildSectionList();
  }

  buildSectionList() {
    this.sections = [];
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
  }

  setActiveTab(id) {
    this.activeTabId = id;
  }
}
