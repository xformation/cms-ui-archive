export class StaffListCtrl {
  navModel: any;
  sections: any[];
  activeTabIndex = 0;
  $scope: any;
  CheckAllModule: any;
  teachers: any;

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
