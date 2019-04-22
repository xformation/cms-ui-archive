import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';

export class StaffProfileCtrl {
  navModel: any;
  sections: any[];
  activeTabStaffId: string;
  activeTabIndex = 0;
  teachers: any;
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
