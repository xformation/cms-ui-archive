import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';

export class StaffListCtrl {
  navModel: any;
  teachers: any;
  sections: any[];
  activeTabIndex = 0;
  IsAllChecked: any;
  $scope: any;
  RestUrl: any;

  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.getTeachers();
  }

  getTeachers() {
    this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(result => {
      this.teachers = result;
    });
  }
  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
