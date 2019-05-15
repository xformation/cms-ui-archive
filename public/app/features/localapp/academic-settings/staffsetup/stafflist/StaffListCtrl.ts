import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';

export class StaffListCtrl {
  navModel: any;
  teachers: any;
  departments: any;
  batches: any;
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
    this.getBatches();
    this.getDepartments();
    // $scope.optionsLimit = 5;
  }

  getDepartments() {
    this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(result => {
      this.departments = result;
    });
  }

  getBatches() {
    this.backendSrv.get(this.RestUrl.getBatchRestUrl()).then(result => {
      this.batches = result;
    });
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
