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
  selectedAcademicYear: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.activeBtnIndex = 0;
    this.$scope = $scope;
    // this.getHolidays();
    // this.getTerms();
    this.getYears();
    $scope.holidays = { holidaysDesc: '', holidayDate: '', holidayStatus: 'ACTIVE' };
    $scope.createHoliday = () => {
      if (!$scope.holidayForm.$valid) {
        return;
      }

      $scope.holiday.academicyear = this.selectedAcademicYear;
      backendSrv.post(this.RestUrl.getHolidayRestUrl(), $scope.holiday).then(() => {
        this.getHolidays(this.selectedAcademicYear.id);
      });
    };
    $scope.terms = { termsDesc: '', startDate: '', endDate: '', termStatus: 'ACTIVE' };
    $scope.createTerm = () => {
      if (!$scope.termForm.$valid) {
        return;
      }

      $scope.term.academicyear = this.selectedAcademicYear;
      backendSrv.post(this.RestUrl.getTermRestUrl(), $scope.term).then(() => {
        this.getTerms(this.selectedAcademicYear.id);
      });
    };
    $scope.createYear = cb => {
      if ($scope.academicYear.startDate === $scope.academicYear.endDate) {
        if (cb) {
          cb('3');
        }
        return;
      }
      if ($scope.academicYear.startDate > $scope.academicYear.endDate) {
        if (cb) {
          cb('2');
        }
        return;
      }
      if (!$scope.yearForm.$valid) {
        return;
      }
      if ($scope.academicYear.status === undefined || $scope.academicYear.status === null) {
        $scope.academicYear.status = 'DEACTIVE';
      }
      backendSrv.post(this.RestUrl.getAcademicYearRestUrl(), $scope.academicYear).then(
        () => {
          appEvents.emit('get_academicyears', {});
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
      if ($scope.academicYear.startDate === $scope.academicYear.endDate) {
        if (cb) {
          cb('3');
        }
        return;
      }
      if ($scope.academicYear.startDate > $scope.academicYear.endDate) {
        if (cb) {
          cb('2');
        }
        return;
      }
      if (!$scope.yearForm.$valid) {
        return;
      }
      if ($scope.academicYear.status === undefined || $scope.academicYear.status === null) {
        $scope.academicYear.status = 'DEACTIVE';
      }
      backendSrv.put(this.RestUrl.getAcademicYearRestUrl(), $scope.academicYear).then(
        () => {
          appEvents.emit('get_academicyears', {});
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

  getHolidays(academicYearId) {
    this.backendSrv
      .get(this.RestUrl.getHolidayByAcademicYearIdRestUrl() + '?academicYearId=' + academicYearId)
      .then(result => {
        this.holidays = result;
      });
  }

  getTerms(academicYearId) {
    this.backendSrv
      .get(this.RestUrl.getTermByAcademicYearIdRestUrl() + '?academicYearId=' + academicYearId)
      .then(result => {
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
    academicYear.startDate = academicYear.startDate.toString();
    academicYear.endDate = academicYear.endDate.toString();
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
          appEvents.emit('get_academicyears', {});
          this.getYears();
        });
      },
    });
  }

  markAcademicYear(academicYear) {
    this.selectedAcademicYear = academicYear;
    this.getHolidays(academicYear.id);
    this.getTerms(academicYear.id);
  }

  unMarkAcademicYear() {
    this.selectedAcademicYear = {};
    this.holidays = {};
    this.terms = {};
  }
}
