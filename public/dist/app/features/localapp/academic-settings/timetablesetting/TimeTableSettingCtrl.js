import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
var TimeTableSettingCtrl = /** @class */ (function () {
    /** @ngInject */
    function TimeTableSettingCtrl($scope, backendSrv) {
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.isValid = true;
        this.RestUrl = new GlobalRestUrlConstants();
        this.counter = 0;
        this.activeTabIndex = 0;
        this.$scope = $scope;
        this.clgObject = {};
        this.lectureTimings = [];
        this.timeTableValidationMessage = "";
        this.getColleges();
        this.getSemester();
        this.isCollegeSelected = 0;
        this.isBranchSelected = 0;
        this.isSectionSelected = 0;
        this.isNextSelected = 0;
        $scope.isReadOnly = true;
        $scope.choices = [];
        $scope.idx = {};
        this.totalLectures = [];
    }
    TimeTableSettingCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    TimeTableSettingCtrl.prototype.changeCounter = function (opt) {
        if (opt === 'plus') {
            this.counter = this.counter + 1;
        }
        if (opt === 'minus' && this.counter > 0) {
            this.counter = this.counter - 1;
        }
    };
    TimeTableSettingCtrl.prototype.addRows = function () {
        if (this.totalLectures.length !== this.counter) {
            this.totalLectures.length = 0;
            for (var i = 0; i < this.counter; i++) {
                this.totalLectures.push({ i: i });
            }
        }
    };
    TimeTableSettingCtrl.prototype.getSemester = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getSemesterRestUrl()).then(function (result) {
            _this.semesters = result;
        });
    };
    TimeTableSettingCtrl.prototype.getColleges = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getCollegeRestUrl()).then(function (result) {
            _this.colleges = result;
        });
    };
    TimeTableSettingCtrl.prototype.onChangeCollege = function () {
        var _this = this;
        this.isCollegeSelected = 0;
        if (!this.collegeId) {
            this.branches = {};
            return;
        }
        this.backendSrv.get(this.RestUrl.getBranchesByCollegeIdRestUrl() + this.collegeId).then(function (result) {
            _this.branches = result;
        });
    };
    TimeTableSettingCtrl.prototype.onChangeBranch = function () {
        var _this = this;
        this.isBranchSelected = 0;
        if (!this.branchId) {
            this.departments = {};
            return;
        }
        this.backendSrv.get(this.RestUrl.getDepartmentByBranchIdRestUrl() + this.branchId).then(function (result) {
            _this.departments = result;
        });
    };
    TimeTableSettingCtrl.prototype.onChangeDepartment = function () {
        var _this = this;
        if (!this.departmentId) {
            this.batches = {};
            return;
        }
        this.backendSrv.get(this.RestUrl.getBatchByDepartmentIdRestUrl() + this.departmentId).then(function (result) {
            _this.batches = result;
        });
    };
    TimeTableSettingCtrl.prototype.onChangeBatch = function () {
        var _this = this;
        if (!this.batchId) {
            this.sections = {};
            return;
        }
        this.backendSrv.get(this.RestUrl.getSectionByBatchRestUrl() + this.batchId).then(function (result) {
            _this.sections = result;
        });
    };
    TimeTableSettingCtrl.prototype.onChangeSection = function () {
        if (!this.sectionId) {
            this.isSectionSelected = 0;
        }
        else {
            this.isSectionSelected = 1;
        }
    };
    TimeTableSettingCtrl.prototype.next = function () {
        if (this.counter <= 0) {
            alert('Please create lectures.');
        }
        else {
            this.isValid = this.validateTimings();
            if (!this.isValid) {
                return;
            }
            this.isSectionSelected = 0;
            this.isNextSelected = 1;
            this.$scope.isReadOnly = false;
            this.getSubjects();
            this.getTeachers();
            this.activateTab(2);
        }
    };
    TimeTableSettingCtrl.prototype.validateTimings = function () {
        var timings = this.lectureTimings;
        var isValid = true;
        if (timings.length === 0 && this.totalLectures > 0) {
            isValid = false;
            this.timeTableValidationMessage = "Please enter start and end time.";
            return isValid;
        }
        for (var i = 0; i < timings.length; i++) {
            var time = timings[i];
            if (!time.startTime || !time.endTime) {
                isValid = false;
                this.timeTableValidationMessage = "Please enter start and end time.";
                break;
            }
            if (time.startTime && time.endTime && time.startTime.getTime() >= time.endTime.getTime()) {
                isValid = false;
                this.timeTableValidationMessage = "Please enter valid start and end time.";
                break;
            }
            var nextTime = timings[i + 1];
            if (nextTime && nextTime.startTime && time.endTime && nextTime.startTime.getTime() < time.endTime.getTime()) {
                isValid = false;
                this.timeTableValidationMessage = "Please enter valid start time of upcoming lecture.";
                break;
            }
            if (time.isBreak) {
                if (nextTime) {
                    if (nextTime.startTime && time.endTime && nextTime.startTime.getTime() < (time.endTime.getTime() + (30 * 60 * 1000))) {
                        isValid = false;
                        this.timeTableValidationMessage = "Please add atleast 30 mins to start time after break";
                        break;
                    }
                }
            }
        }
        return isValid;
    };
    TimeTableSettingCtrl.prototype.saveLectures = function () {
        var lectureTimings = this.lectureTimings;
        var payLoad = [];
        for (var i = 0; i < lectureTimings.length; i++) {
            var timings = lectureTimings[i];
            var data = payLoad[i] || [];
            var subjects = timings.subjects;
            var teachers = timings.teachers;
            var startTime = timings.startTime.toLocaleTimeString('en-US');
            var endTime = timings.endTime.toLocaleTimeString('en-US');
            var counter = 0;
            for (var j in subjects) {
                data[counter] = {
                    weekDay: j,
                    startTime: startTime,
                    endTime: endTime,
                    subjectId: subjects[j],
                    teacherId: teachers[j]
                };
                counter++;
            }
            payLoad[i] = data;
        }
        this.backendSrv.post(this.RestUrl.getCmsLecturesUrl() + "termId=19800&academicYear=2018&sectionId=" + this.sectionId + "&batchId=" + this.batchId, JSON.stringify(payLoad)).then(function (result) {
            // this.colleges = result;
            console.log("ha ha");
        });
    };
    TimeTableSettingCtrl.prototype.back = function () {
        this.isSectionSelected = 1;
        this.isNextSelected = 0;
        this.$scope.isReadOnly = true;
        this.activateTab(0);
    };
    TimeTableSettingCtrl.prototype.getSubjects = function () {
        var _this = this;
        this.backendSrv
            .get(this.RestUrl.getSubjectByDeptBatchIdRestUrl() + 'deptId=' + this.departmentId + '&batchId=' + this.batchId)
            .then(function (result) {
            _this.subjects = result;
        });
    };
    TimeTableSettingCtrl.prototype.getTeachers = function () {
        var _this = this;
        this.backendSrv
            .get(this.RestUrl.getTeacherByQueryParamsRestUrl() + 'deptId=' + this.departmentId + '&branchId=' + this.branchId)
            .then(function (result) {
            _this.teachers = result;
        });
    };
    return TimeTableSettingCtrl;
}());
export { TimeTableSettingCtrl };
//# sourceMappingURL=TimeTableSettingCtrl.js.map