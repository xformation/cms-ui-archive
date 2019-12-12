import _ from 'lodash';
import impressionSrv from 'app/core/services/impression_srv';

export class CustomDashboardListCtrl {
  viewId: string;
  sections: any[];
  isAsideCollapse: boolean;
  limit = 20;
  constructor(private backendSrv) {
    this.getAllDashboards();
    this.isAsideCollapse = false;
  }

  getAllDashboards() {
    const dashIds = _.take(impressionSrv.getDashboardOpened(), this.limit);
    return this.backendSrv.search({ dashboardIds: dashIds, limit: this.limit }).then(result => {
      this.buildSectionList(result);
    });
  }

  buildSectionList(result) {
    const length = result.length;
    this.sections = [];
    for (let i = 0; i < length; i++) {
      const item = result[i];
      const tempArr = item.url.split('/');
      let slug = '';
      if (tempArr.length === 3) {
        slug = tempArr[2];
      }
      this.sections.push({
        uid: item.uid,
        slug,
        title: item.title,
      });
      if (i === 0) {
        this.viewId = item.uid;
      }
    }
  }

  onClickLeftTab(section: any) {
    this.viewId = section.uid;
  }

  collapseAside() {
    this.isAsideCollapse = !this.isAsideCollapse;
  }
}
