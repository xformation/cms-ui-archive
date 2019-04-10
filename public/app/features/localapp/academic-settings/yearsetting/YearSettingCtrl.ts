import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class YearSettingCtrl {
  academicYears: any;
  holidays: any;
  terms: any;
  navModel: any;
  activeTabIndex = 0;
  activeBtnIndex = 0;
  $scope: any;
  RestUrl: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
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
      backendSrv.post(this.RestUrl.getHolidayRestUrl(), $scope.holiday).then(() => {
        this.getHolidays();
      });
    };
    $scope.terms = { termsDesc: '', startDate: '', endDate: '', termStatus: 'ACTIVE' };
    $scope.createTerm = () => {
      if (!$scope.termForm.$valid) {
        return;
      }
      backendSrv.post(this.RestUrl.getTermRestUrl(), $scope.term).then(() => {
        this.getTerms();
      });
    };
    $scope.createYear = cb => {
      if ($scope.academicYear.startDate > $scope.academicYear.endDate) {
        if (cb) {
          cb('2');
        }
        return;
      }
      if (!$scope.yearForm.$valid) {
        return;
      }
      backendSrv.post(this.RestUrl.getAcademicYearRestUrl(), $scope.academicYear).then(
        () => {
          this.getYears();
          if (cb) {
            cb('1');
          }
        },
        () => {
          if (cb) {
            cb('0');
          }
        }
      );
    };

    $scope.updateYear = cb => {
      if ($scope.academicYear.startDate > $scope.academicYear.endDate) {
        if (cb) {
          cb('2');
        }
        return;
      }
      if (!$scope.yearForm.$valid) {
        return;
      }
      backendSrv.put(this.RestUrl.getAcademicYearRestUrl(), $scope.academicYear).then(
        () => {
          this.getYears();
          if (cb) {
            cb('1');
          }
        },
        () => {
          if (cb) {
            cb('0');
          }
        }
      );
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  activateBtn(tabIndex) {
    this.activeBtnIndex = tabIndex;
  }

  getHolidays() {
    this.backendSrv.get(this.RestUrl.getHolidayRestUrl()).then(result => {
      this.holidays = result;
    });
  }

  getTerms() {
    this.backendSrv.get(this.RestUrl.getTermRestUrl()).then(result => {
      this.terms = result;
    });
  }

  getYears() {
    this.backendSrv.get(this.RestUrl.getAcademicYearRestUrl()).then(result => {
      this.academicYears = result;
    });
  }

  showModal() {
    appEvents.emit('year-modal', {
      text: 'create',
      icon: 'fa-trash',
      onCreate: (yearForm, academicYear, cb) => {
        this.$scope.yearForm = yearForm;
        this.$scope.academicYear = academicYear;
        this.$scope.createYear(cb);
      },
    });
  }

  editYear(academicYear) {
    appEvents.emit('year-modal', {
      icon: 'fa-trash',
      text: 'update',
      academicYear: academicYear,
      onUpdate: (yearForm, academicYear, cb) => {
        this.$scope.yearForm = yearForm;
        this.$scope.academicYear = academicYear;
        this.$scope.updateYear(cb);
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
        this.backendSrv.delete(this.RestUrl.getAcademicYearRestUrl() + academicYear.id).then(() => {
          this.getYears();
        });
      },
    });
  }
}
