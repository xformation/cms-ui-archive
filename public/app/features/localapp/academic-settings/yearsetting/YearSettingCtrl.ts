import { appEvents } from 'app/core/core';

export class YearSettingCtrl {
  academicYears: any;
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
    this.getHolidays();
    this.getTerms();
    this.getYears();
    $scope.holidays = { holidaysDesc: '', holidayDate: '', holidayStatus: 'ACTIVE' };
    $scope.createHoliday = () => {
      if (!$scope.holidayForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/holidays/', $scope.holiday).then(() => {
        this.getHolidays();
      });
    };
    $scope.terms = { termsDesc: '', startDate: '', endDate: '', termStatus: 'ACTIVE' };
    $scope.createTerm = () => {
      if (!$scope.termForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/terms/', $scope.term).then(() => {
        this.getTerms();
      });
    };
    $scope.createYear = () => {
      if (!$scope.yearForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/academic-years', $scope.academicYear).then(() => {
        this.getYears();
      });
    };
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

  getYears() {
    this.backendSrv.get(`http://localhost:8080/api/academic-years/`).then(result => {
      this.academicYears = result;
    });
  }

  showModal() {
    const text = 'Do you want to delete the ';

    appEvents.emit('year-modal', {
      text: text,
      icon: 'fa-trash',
      onCreate: (yearForm, academicYear) => {
        this.$scope.yearForm = yearForm;
        this.$scope.academicYear = academicYear;
        this.$scope.createYear();
      },
    });
  }

  deleteAcademicYear(academicYear) {
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Do you want to delete ' + academicYear.name + '?',
      icon: 'fa-trash',
      yesText: 'Delete',
      onConfirm: () => {
        this.backendSrv.delete('http://localhost:8080/api/academic-years/' + academicYear.id).then(() => {
          this.getYears();
        });
      },
    });
  }
}
