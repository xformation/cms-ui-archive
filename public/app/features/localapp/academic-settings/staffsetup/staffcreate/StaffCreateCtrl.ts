export class StaffCreateCtrl {
  navModel: any;
  sections: any[];
  activeTabIndex = 0;
  $scope: any;
  teachers: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.getTeachers();
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

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
