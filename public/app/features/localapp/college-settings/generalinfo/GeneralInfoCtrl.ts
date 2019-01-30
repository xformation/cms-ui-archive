export class GeneralInfoCtrl {
  colleges: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  logoSrc = '/public/img/logo.png';
  bgSrc = '/public/img/dashboard.png';
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.query = '';
    this.getColleges();
    $scope.getFile = this.getFile.bind(this);
    $scope.getbgFile = this.getbgFile.bind(this);
    $scope.create = () => {
      if (!$scope.collegeForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/colleges/', $scope.college).then(() => {
        this.getColleges();
      });
    };
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

  getColleges() {
    this.backendSrv.get(`http://localhost:8080/api/colleges/`).then(result => {
      this.colleges = result;
      console.log(this.colleges);
    });
  }
}
