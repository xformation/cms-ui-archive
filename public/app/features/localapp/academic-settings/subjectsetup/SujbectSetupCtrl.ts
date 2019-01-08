export class SubjectSetupCtrl {
  navModel: any;
  activeTabIndex = 0;
  logoSrc = '/public/img/logo-placeholder.png';
  bgSrc = '/public/img/dashboard.png';
  $scope;
  /** @ngInject */
  constructor($scope) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
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
}
