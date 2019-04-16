import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class SubjectSetupCtrl {
  subjects: any;
  teachers: any;
  departments: any;
  // batches: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;
  colleges: any;
  branches: any;
  collegeId: any;
  branchId: any;
  isCollegeSelected: any;
  isBranchSelected: any;

  // departmentId: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
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
    // this.getBatches();
    $scope.create = cb => {
      if (!$scope.subjectForm.$valid) {
        return;
      }
      backendSrv.post(this.RestUrl.getSubjectRestUrl(), $scope.subject).then(
        () => {
          this.getSubjects();
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

    $scope.update = () => {
      if (!$scope.subjectForm.$valid) {
        return;
      }
      backendSrv.put(this.RestUrl.getSubjectRestUrl(), $scope.subject).then(() => {
        this.getSubjects();
      });
    };

    $scope.onChangeDepartment = () => {
      const { departmentId } = this.$scope.subject;
      this.backendSrv.get(this.RestUrl.getBatchByDepartmentIdRestUrl() + departmentId).then(result => {
        this.$scope.selectedBatches = result;
        console.log('First : selected batch list - ', $scope.selectedBatches);
      });
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getSubjects() {
    this.backendSrv.get(this.RestUrl.getSubjectRestUrl()).then(result => {
      this.subjects = result;
      console.log('Subjects', this.subjects);
    });
  }
  getDepartments() {
    this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(result => {
      this.departments = result;
      console.log('departments', this.departments);
    });
  }
  getTeachers() {
    this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(result => {
      this.teachers = result;
      console.log('teachers', this.teachers);
    });
  }
  // getBatches() {
  //   this.backendSrv.get(this.RestUrl.getBatchRestUrl()).then(result => {
  //     this.batches = result;
  //     console.log('Batches', this.batches);
  //   });
  // }

  deleteSubject(subject) {
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Do you want to delete ' + subject.subjectDesc + '?',
      icon: 'fa-trash',
      yesText: 'Delete',
      onConfirm: () => {
        this.backendSrv.delete(this.RestUrl.getSubjectRestUrl() + subject.id).then(() => {
          this.getSubjects();
        });
      },
    });
  }

  getColleges() {
    this.backendSrv.get(this.RestUrl.getCollegeRestUrl()).then(result => {
      this.colleges = result;
    });
  }

  onChangeCollege() {
    this.isCollegeSelected = 0;
    if (!this.collegeId) {
      this.branches = {};
      return;
    }
    this.backendSrv.get(this.RestUrl.getBranchesByCollegeIdRestUrl() + this.collegeId).then(result => {
      this.branches = result;
    });
  }

  onChangeBranch() {
    this.isBranchSelected = 0;
  }
  // onChangeDepartment() {
  //   alert(this.$scope.subject.departmentId);
  // }

  editSubject(subject) {
    appEvents.emit('subject-modal', {
      icon: 'fa-trash',
      text: 'update',
      subject: subject,
      departments: this.departments,
      // batches: this.batches,
      teachers: this.teachers,
      onUpdate: (subjectForm, subject) => {
        this.$scope.subjectForm = subjectForm;
        this.$scope.subject = subject;
        this.$scope.update();
      },
    });
  }

  showModal() {
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
      onCreate: (subjectForm, subject, collegeId, branchId, cb) => {
        this.$scope.subjectForm = subjectForm;
        this.$scope.subject = subject;
        this.$scope.subject.collegeId = collegeId;
        this.$scope.subject.branchId = branchId;

        this.$scope.create(cb);
      },
      onChange: (subjectForm, subject, selectedBatches) => {
        this.$scope.subjectForm = subjectForm;
        this.$scope.subject = subject;
        this.$scope.selectedBatches = selectedBatches;
        this.$scope.onChangeDepartment();
        return this.$scope.selectedBatches;
      },
    });
  }
}
