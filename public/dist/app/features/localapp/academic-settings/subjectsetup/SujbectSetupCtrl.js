import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
var SubjectSetupCtrl = /** @class */ (function () {
    // departmentId: any;
    /** @ngInject */
    function SubjectSetupCtrl($scope, backendSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.RestUrl = new GlobalRestUrlConstants();
        this.activeTabIndex = 0;
        this.query = '';
        this.$scope = $scope;
        this.isCollegeSelected = 0;
        this.isBranchSelected = 0;
        this.getColleges();
        this.getSubjects();
        this.getDepartments();
        this.getTeachers();
        this.getBatches();
        $scope.create = function (cb) {
            if (!$scope.subjectForm.$valid) {
                return;
            }
            backendSrv.post(_this.RestUrl.getSubjectRestUrl(), $scope.subject).then(function () {
                _this.getSubjects();
                if (cb) {
                    cb('1');
                }
            }, function () {
                if (cb) {
                    cb('0');
                }
            });
        };
        $scope.update = function () {
            if (!$scope.subjectForm.$valid) {
                return;
            }
            backendSrv.put(_this.RestUrl.getSubjectRestUrl(), $scope.subject).then(function () {
                _this.getSubjects();
            });
        };
        $scope.onChangeDepartment = function () {
            var departmentId = _this.$scope.subject.departmentId;
            _this.backendSrv.get(_this.RestUrl.getBatchByDepartmentIdRestUrl() + departmentId).then(function (result) {
                _this.$scope.selectedBatches = result;
                console.log('First : selected batch list - ', $scope.selectedBatches);
            });
        };
    }
    SubjectSetupCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    SubjectSetupCtrl.prototype.getSubjects = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getSubjectRestUrl()).then(function (result) {
            _this.subjects = result;
            console.log('Subjects', _this.subjects);
        });
    };
    SubjectSetupCtrl.prototype.getDepartments = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(function (result) {
            _this.departments = result;
            console.log('departments', _this.departments);
        });
    };
    SubjectSetupCtrl.prototype.getTeachers = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(function (result) {
            _this.teachers = result;
            console.log('teachers', _this.teachers);
        });
    };
    SubjectSetupCtrl.prototype.getBatches = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getBatchRestUrl()).then(function (result) {
            _this.batches = result;
            console.log('Batches', _this.batches);
        });
    };
    SubjectSetupCtrl.prototype.deleteSubject = function (subject) {
        var _this = this;
        appEvents.emit('confirm-modal', {
            title: 'Delete',
            text: 'Do you want to delete ' + subject.subjectDesc + '?',
            icon: 'fa-trash',
            yesText: 'Delete',
            onConfirm: function () {
                _this.backendSrv.delete(_this.RestUrl.getSubjectRestUrl() + subject.id).then(function () {
                    _this.getSubjects();
                });
            },
        });
    };
    SubjectSetupCtrl.prototype.getColleges = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getCollegeRestUrl()).then(function (result) {
            _this.colleges = result;
        });
    };
    SubjectSetupCtrl.prototype.onChangeCollege = function () {
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
    SubjectSetupCtrl.prototype.onChangeBranch = function () {
        this.isBranchSelected = 0;
    };
    // onChangeDepartment() {
    //   alert(this.$scope.subject.departmentId);
    // }
    SubjectSetupCtrl.prototype.editSubject = function (subject) {
        var _this = this;
        appEvents.emit('subject-modal', {
            icon: 'fa-trash',
            text: 'update',
            subject: subject,
            departments: this.departments,
            // batches: this.batches,
            teachers: this.teachers,
            onUpdate: function (subjectForm, subject) {
                _this.$scope.subjectForm = subjectForm;
                _this.$scope.subject = subject;
                _this.$scope.update();
            },
        });
    };
    SubjectSetupCtrl.prototype.showModal = function () {
        var _this = this;
        if (!this.collegeId) {
            this.isCollegeSelected = 1;
            return;
        }
        if (!this.branchId) {
            this.isBranchSelected = 1;
            return;
        }
        appEvents.emit('subject-modal', {
            text: 'create',
            icon: 'fa-trash',
            departments: this.departments,
            // batches: this.batches,
            teachers: this.teachers,
            collegeId: this.collegeId,
            branchId: this.branchId,
            selectedBatches: this.$scope.selectedBatches,
            onCreate: function (subjectForm, subject, collegeId, branchId, cb) {
                _this.$scope.subjectForm = subjectForm;
                _this.$scope.subject = subject;
                _this.$scope.subject.collegeId = collegeId;
                _this.$scope.subject.branchId = branchId;
                _this.$scope.create(cb);
            },
            onChange: function (subjectForm, subject, selectedBatches) {
                _this.$scope.subjectForm = subjectForm;
                _this.$scope.subject = subject;
                _this.$scope.selectedBatches = selectedBatches;
                _this.$scope.onChangeDepartment();
                return _this.$scope.selectedBatches;
            },
        });
    };
    return SubjectSetupCtrl;
}());
export { SubjectSetupCtrl };
//# sourceMappingURL=SujbectSetupCtrl.js.map