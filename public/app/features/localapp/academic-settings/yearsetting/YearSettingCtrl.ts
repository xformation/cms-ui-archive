export class YearSettingCtrl {
  holidays: any;
  terms: any;
  navModel: any;
  activeTabIndex = 0;
  activeBtnIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.activeBtnIndex = 0;
    this.$scope = $scope;
    $scope.holidays = { holidaysDesc: '', holidayDate: '', holidayStatus: 'ACTIVE' };
    $scope.create = () => {
      if (!$scope.holidayForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/holidays/', $scope.holiday).then(() => {
        this.getHolidays();
      });
    };
    this.getHolidays();
    $scope.terms = { termsDesc: '', startDate: '', endDate: '', termStatus: 'ACTIVE' };
    $scope.create = () => {
      if (!$scope.termForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/terms/', $scope.term).then(() => {
        this.getTerms();
      });
    };
    this.getTerms();
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  activateBtn(tabIndex) {
    this.activeBtnIndex = tabIndex;
  }

  getHolidays() {
    this.backendSrv.get(`http://localhost:8080/api/holidays/`).then(result => {
      this.holidays = result;
    });
  }

  getTerms() {
    this.backendSrv.get(`http://localhost:8080/api/terms/`).then(result => {
      this.terms = result;
    });
  }
}
