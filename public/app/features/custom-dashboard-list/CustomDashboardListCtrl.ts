import _ from 'lodash';

export class CustomDashboardListCtrl {
  viewId: string;
  sections: any[];
  isAsideCollapse: boolean;
  limit = 20;
  activeSection: any;
  activeDashboard: any;
  constructor(private backendSrv) {
    this.sections = [];
    this.getAllDashboards();
    this.isAsideCollapse = false;
  }

  getAllDashboards() {
    return this.backendSrv.search().then(result => {
      this.sections = this.manipulateData(result);
      const keys = Object.keys(this.sections);
      if (keys && keys.length > 0) {
        this.activeSection = this.sections[keys[0]];
        const activeDashIndex = this.activeSection.activeDash;
        this.activeDashboard = this.activeSection.dashboards[activeDashIndex];
      }
    });
  }

  setActiveSection(section) {
    this.activeSection = section;
    const activeDashIndex = section.activeDash;
    this.activeDashboard = section.dashboards[activeDashIndex];
  }

  setActiveDashboard(dashboard, index) {
    this.activeDashboard = dashboard;
    this.activeSection.activeDash = index;
  }

  manipulateData(result: any) {
    const retData: any = {};
    for (let i = 0; i < result.length; i++) {
      const dash = result[i];
      if (dash.type === 'dash-db' && dash.folderId) {
        retData[dash.folderId] = retData[dash.folderId] || { dashboards: [] };
        retData[dash.folderId].title = dash.folderTitle;
        retData[dash.folderId].folderId = dash.folderId;
        if (retData[dash.folderId].dashboards.length === 0) {
          retData[dash.folderId].activeDash = 0;
        }
        retData[dash.folderId].dashboards.push(dash);
      }
    }
    return retData;
  }

  onClickLeftTab(section: any) {
    this.viewId = section.uid;
  }

  collapseAside() {
    this.isAsideCollapse = !this.isAsideCollapse;
  }
}
