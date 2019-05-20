import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';

export class StaffListCtrl {
  navModel: any;
  teachers: any;
  departments: any;
  batches: any;
  sections: any[];
  batchId: any;
  departmentId: any;
  activeTabIndex = 0;
  IsAllChecked: any;
  $scope: any;
  RestUrl: any;

  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.getTeachers();
    // this.getBatches();
    this.getDepartments();
    // $scope.optionsLimit = 5;
  }

  getDepartments() {
    this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(result => {
      this.departments = result;
    });
  }

  // getBatches() {
  //   this.backendSrv.get(this.RestUrl.getBatchRestUrl()).then(result => {
  //     this.batches = result;
  //   });
  // }

  getTeachers() {
    this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(result => {
      this.teachers = result;
    });
  }

  onChangeDepartment() {
    if (!this.departmentId) {
      this.batches = {};
      return;
    }
    this.backendSrv.get(this.RestUrl.getBatchByDepartmentIdRestUrl() + this.departmentId).then(result => {
      this.batches = result;
    });
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
