export class DepartmentSetupCtrl {
  departments: any;
  navModel: any;
  activeTabIndex = 0;
  $scope;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.getDepartments();
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getDepartments() {
    this.backendSrv.get(`http://localhost:8080/api/departments/`).then(result => {
      this.departments = result;
    });
  }
}
