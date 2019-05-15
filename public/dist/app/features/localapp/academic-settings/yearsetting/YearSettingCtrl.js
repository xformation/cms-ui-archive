import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
var YearSettingCtrl = /** @class */ (function () {
    /** @ngInject */
    function YearSettingCtrl($scope, backendSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.activeBtnIndex = 0;
        this.RestUrl = new GlobalRestUrlConstants();
        this.activeTabIndex = 0;
        this.activeBtnIndex = 0;
        this.$scope = $scope;
        this.getHolidays();
        this.getTerms();
        this.getYears();
        $scope.holidays = { holidaysDesc: '', holidayDate: '', holidayStatus: 'ACTIVE' };
        $scope.createHoliday = function () {
            if (!$scope.holidayForm.$valid) {
                return;
            }
            backendSrv.post(_this.RestUrl.getHolidayRestUrl(), $scope.holiday).then(function () {
                _this.getHolidays();
            });
        };
        $scope.terms = { termsDesc: '', startDate: '', endDate: '', termStatus: 'ACTIVE' };
        $scope.createTerm = function () {
            if (!$scope.termForm.$valid) {
                return;
            }
            backendSrv.post(_this.RestUrl.getTermRestUrl(), $scope.term).then(function () {
                _this.getTerms();
            });
        };
        $scope.createYear = function (cb) {
            if ($scope.academicYear.startDate > $scope.academicYear.endDate) {
                if (cb) {
                    cb('2');
                }
                return;
            }
            if (!$scope.yearForm.$valid) {
                return;
            }
            backendSrv.post(_this.RestUrl.getAcademicYearRestUrl(), $scope.academicYear).then(function () {
                _this.getYears();
                if (cb) {
                    cb('1');
                }
            }, function () {
                if (cb) {
                    cb('0');
                }
            });
        };
        $scope.updateYear = function (cb) {
            if ($scope.academicYear.startDate > $scope.academicYear.endDate) {
                if (cb) {
                    cb('2');
                }
                return;
            }
            if (!$scope.yearForm.$valid) {
                return;
            }
            backendSrv.put(_this.RestUrl.getAcademicYearRestUrl(), $scope.academicYear).then(function () {
                _this.getYears();
                if (cb) {
                    cb('1');
                }
            }, function () {
                if (cb) {
                    cb('0');
                }
            });
        };
    }
    YearSettingCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    YearSettingCtrl.prototype.activateBtn = function (tabIndex) {
        this.activeBtnIndex = tabIndex;
    };
    YearSettingCtrl.prototype.getHolidays = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getHolidayRestUrl()).then(function (result) {
            _this.holidays = result;
        });
    };
    YearSettingCtrl.prototype.getTerms = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getTermRestUrl()).then(function (result) {
            _this.terms = result;
        });
    };
    YearSettingCtrl.prototype.getYears = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getAcademicYearRestUrl()).then(function (result) {
            _this.academicYears = result;
        });
    };
    YearSettingCtrl.prototype.showModal = function () {
        var _this = this;
        appEvents.emit('year-modal', {
            text: 'create',
            icon: 'fa-trash',
            onCreate: function (yearForm, academicYear, cb) {
                _this.$scope.yearForm = yearForm;
                _this.$scope.academicYear = academicYear;
                _this.$scope.createYear(cb);
            },
        });
    };
    YearSettingCtrl.prototype.editYear = function (academicYear) {
        var _this = this;
        appEvents.emit('year-modal', {
            icon: 'fa-trash',
            text: 'update',
            academicYear: academicYear,
            onUpdate: function (yearForm, academicYear, cb) {
                _this.$scope.yearForm = yearForm;
                _this.$scope.academicYear = academicYear;
                _this.$scope.updateYear(cb);
            },
        });
    };
    YearSettingCtrl.prototype.deleteAcademicYear = function (academicYear) {
        var _this = this;
        appEvents.emit('confirm-modal', {
            title: 'Delete',
            text: 'Do you want to delete ' + academicYear.name + '?',
            icon: 'fa-trash',
            yesText: 'Delete',
            onConfirm: function () {
                _this.backendSrv.delete(_this.RestUrl.getAcademicYearRestUrl() + academicYear.id).then(function () {
                    _this.getYears();
                });
            },
        });
    };
    return YearSettingCtrl;
}());
export { YearSettingCtrl };
//# sourceMappingURL=YearSettingCtrl.js.map