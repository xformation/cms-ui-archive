export class StaffCreateCtrl {
  navModel: any;
  sections: any[];
  activeTabPersonalIndex = 0;
  activeTabContactIndex = 0;
  activeTabPrimaryIndex = 0;
  activeBtnIndex = 0;
  $scope: any;
  teachers: any;
  departments: any;
  branches: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabPersonalIndex = 0;
    this.activeTabContactIndex = 0;
    this.activeTabPrimaryIndex = 0;
    this.activeBtnIndex = 0;
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

  activateTabPersonal(tabIndex) {
    this.activeTabPersonalIndex = tabIndex;
  }

  activateTabContact(tabIndex) {
    this.activeTabContactIndex = tabIndex;
  }

  activateTabPrimary(tabIndex) {
    this.activeTabPrimaryIndex = tabIndex;
  }

  activateBtn(tabIndex) {
    this.activeBtnIndex = tabIndex;
  }
}
