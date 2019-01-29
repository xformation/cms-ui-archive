export class SubjectSetupCtrl {
  subjects: any;
  departments: any;
  teachers: any;
  batches: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
    this.getSubjects();
    this.getDepartments();
    this.getTeachers();
    this.getBatches();
    $scope.create = () => {
      if (!$scope.subjectForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/subjects/', $scope.subject).then(() => {
        this.getSubjects();
      });
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  abc() {
    console.log(this.subjects);
  }

  getSubjects() {
    this.backendSrv.get(`http://localhost:8080/api/subjects/`).then(result => {
      this.subjects = result;
      console.log('Subjects', this.subjects);
    });
  }
  getDepartments() {
    this.backendSrv.get(`http://localhost:8080/api/departments/`).then(result => {
      this.departments = result;
      console.log('departments', this.departments);
    });
  }
  getTeachers() {
    this.backendSrv.get(`http://localhost:8080/api/teachers/`).then(result => {
      this.teachers = result;
      console.log('teachers', this.teachers);
    });
  }
  getBatches() {
    this.backendSrv.get(`http://localhost:8080/api/batches/`).then(result => {
      this.batches = result;
      console.log('Batches', this.batches);
    });
  }
}
