export class StaffCreateCtrl {
  navModel: any;
  sections: any[];
  activeTabIndex = 0;
  $scope: any;
  teachers: any;
  departments: any;
  branches: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.getTeachers();
    this.getDepartments();
    this.getBranches();
    $scope.create = () => {
      if (!$scope.teacherForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/teachers/', $scope.teacher).then(() => {});
    };
  }

  getTeachers() {
    this.backendSrv.get(`http://localhost:8080/api/teachers/`).then(result => {
      this.teachers = result;
    });
  }
  getDepartments() {
    this.backendSrv.get(`http://localhost:8080/api/departments/`).then(result => {
      this.departments = result;
    });
  }
  getBranches() {
    this.backendSrv.get(`http://localhost:8080/api/branches/`).then(result => {
      this.branches = result;
    });
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
