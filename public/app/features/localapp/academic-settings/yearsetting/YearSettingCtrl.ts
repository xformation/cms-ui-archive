import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
import * as moment from 'moment';

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
    // $scope.holidays = { holidaysDesc: '', holidayDate: '', holidayStatus: 'ACTIVE' };
    $scope.createHoliday = () => {
      if ($scope.holiday === undefined) {
        alert('Please provice holiday description and holiday date');
        return;
      }
      if (
        $scope.holiday.holidayDesc === undefined ||
        $scope.holiday.holidayDesc === null ||
        $scope.holiday.holidayDesc === ''
      ) {
        alert('Please provice holiday description');
        return;
      }
      if (
        $scope.holiday.holidayDate === undefined ||
        $scope.holiday.holidayDate === null ||
        $scope.holiday.holidayDate === ''
      ) {
        alert('Please provice holiday date');
        return;
      }
      $scope.holiday.strHolidayDate = new Date($scope.holiday.holidayDate).toLocaleDateString();

      $scope.holiday.academicyear = this.selectedAcademicYear;
      backendSrv.post(this.RestUrl.getHolidayRestUrl(), $scope.holiday).then(() => {
        this.getHolidays(this.selectedAcademicYear.id);
      });
      $scope.holiday = {};
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
      const stDt = moment.utc($scope.academicYear.startDate, 'MM/DD/YYYY');
      const enDt = moment.utc($scope.academicYear.endDate, 'MM/DD/YYYY');

      console.log('start date : ', stDt);
      console.log('end date : ', enDt);

      if (stDt.isSame(enDt)) {
        if (cb) {
          cb('3');
        }
        return;
      }
      if (enDt.isBefore(stDt)) {
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

      $scope.academicYear.strStartDate = new Date($scope.academicYear.startDate).toLocaleDateString();
      $scope.academicYear.strEndDate = new Date($scope.academicYear.endDate).toLocaleDateString();
      //new Date($scope.academicYear.endDate).toLocaleDateString();
      console.log('start String date : ', $scope.academicYear.strStartDate);
      console.log('end String date : ', $scope.academicYear.strEndDate);

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
      const stDt = moment.utc($scope.academicYear.startDate, 'MM/DD/YYYY');
      const enDt = moment.utc($scope.academicYear.endDate, 'MM/DD/YYYY');

      console.log('update - start date : ', stDt);
      console.log('update - end date : ', enDt);

      if (stDt.isSame(enDt)) {
        if (cb) {
          cb('3');
        }
        return;
      }
      if (enDt.isBefore(stDt)) {
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

      $scope.academicYear.strStartDate = new Date($scope.academicYear.startDate).toLocaleDateString();
      $scope.academicYear.strEndDate = new Date($scope.academicYear.endDate).toLocaleDateString();
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
    const stDt = moment.utc(academicYear.strStartDate, 'DD-MM-YYYY');
    const ndDt = moment.utc(academicYear.strEndDate, 'DD-MM-YYYY');
    appEvents.emit('year-modal', {
      icon: 'fa-trash',
      text: 'update',
      startDateVal: moment.utc(stDt).format('YYYY-MM-DD'),
      endDateVal: moment.utc(ndDt).format('YYYY-MM-DD'),
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
