export class SubjectSetupCtrl {
  studentSubjects: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  logoSrc = '/public/img/logo-placeholder.png';
  bgSrc = '/public/img/dashboard.png';
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
    this.getstudentSubjects();
    $scope.getFile = this.getFile.bind(this);
    $scope.getbgFile = this.getbgFile.bind(this);
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getFile(file) {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    const that = this;
    fileReader.onloadend = e => {
      that.logoSrc = e.target['result'];
      this.$scope.$apply();
    };
    fileReader.readAsDataURL(file);
  }
  getbgFile(file) {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    const that = this;
    fileReader.onloadend = e => {
      that.bgSrc = e.target['result'];
      this.$scope.$apply();
    };
    fileReader.readAsDataURL(file);
  }
  getstudentSubjects() {
    this.backendSrv.get(`http://localhost:8080/api/subjects/`).then(result => {
      this.studentSubjects = result;
    });
  }
}
