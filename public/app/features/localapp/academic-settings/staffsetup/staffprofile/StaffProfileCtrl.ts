export class StaffProfileCtrl {
  navModel: any;
  sections: any[];
  activeTabStaffId: string;
  activeTabIndex = 0;
  teachers: any;
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.getTeachers();
  }
  getTeachers() {
    this.backendSrv.get(`http://localhost:8080/api/teachers`).then(result => {
      this.teachers = result;
      console.log('Teachers:', this.teachers);
    });
  }
  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
