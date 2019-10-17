import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
import { config } from '../../config';

export class SubjectSetupCtrl {
  subjects: any;
  teachers: any;
  departments: any;
  batches: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;
  // colleges: any;
  branches: any;
  departmentId: any;
  branchId: any;
  // isCollegeSelected: any;
  // isBranchSelected: any;

  // departmentId: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    const params = new URLSearchParams(location.search);
    // const sigUser = params.get('signedInUser');
    // let ayId = params.get('ayid') ;
    // let bId = params.get('bid') ;
    // let dpid = params.get('dptid') ;
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
    // this.isCollegeSelected = 0;
    // this.isBranchSelected = 0;
    this.branchId = params.get('bid');
    this.departmentId = params.get('dptid');
    // this.getColleges();
    this.departments = [];
    this.getSubjects();
    this.getDepartments();
    this.getTeachers();
    this.getBatches();
    $scope.create = cb => {
      if (!$scope.subjectForm.$valid) {
        return;
      }
      if (
        ($scope.subject.sectionA === undefined || $scope.subject.sectionA === null || $scope.subject.sectionA === '') &&
        ($scope.subject.sectionB === undefined || $scope.subject.sectionB === null || $scope.subject.sectionB === '') &&
        ($scope.subject.sectionC === undefined || $scope.subject.sectionC === null || $scope.subject.sectionC === '') &&
        ($scope.subject.sectionD === undefined || $scope.subject.sectionD === null || $scope.subject.sectionD === '')
      ) {
        if (cb) {
          cb('2');
        }
        return;
      }
      const urlParam =
        '?sectionA=' +
        $scope.subject.sectionA +
        '&sectionB=' +
        $scope.subject.sectionB +
        '&sectionC=' +
        $scope.subject.sectionC +
        '&sectionD=' +
        $scope.subject.sectionD;
      backendSrv.post(config.CMS_SUBJECT_URL + urlParam, $scope.subject).then(
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

    $scope.onChangeDepartment = cb => {
      const { departmentId } = this.$scope.subject;
      if (departmentId === null || departmentId === undefined) {
        return;
      }
      this.backendSrv.get(config.CMS_BATCH_BY_DEPARTMENT_URL + departmentId).then(result => {
        this.$scope.selectedBatches = result;
        if (cb) {
          cb(result);
        }
      });
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getSubjects() {
    if (this.departmentId === null || this.departmentId === undefined || this.departmentId === 0) {
      console.log('getSubjects()- Department Id - null/undefined/zero : ', this.departmentId);
      return;
    }
    this.backendSrv.get(config.CMS_SUBJECT_BY_DEPARTMENT_URL + '?departmentId=' + this.departmentId).then(result => {
      this.subjects = result;
      console.log('Subjects', this.subjects);
    });
  }
  getDepartments() {
    if (this.departmentId === null || this.departmentId === undefined || this.departmentId === 0) {
      console.log('getDepartments() - Department Id - null/undefined/zero : ', this.departmentId);
      return;
    }
    this.backendSrv.get(config.CMS_DEPARTMENT_URL + this.departmentId).then(result => {
      this.departments.push(result);
      console.log('departments', this.departments);
    });
  }
  getTeachers() {
    if (this.departmentId === null || this.departmentId === undefined || this.departmentId === 0) {
      console.log('getTeachers() - Department Id - null/undefined/zero : ', this.departmentId);
      return;
    }
    this.backendSrv.get(config.CMS_TEACHER_BY_FILTER_PARAM_URL + '?deptId=' + this.departmentId).then(result => {
      this.teachers = result;
      console.log('teachers', this.teachers);
    });
  }
  getBatches() {
    this.backendSrv.get(config.CMS_BATCH_BY_DEPARTMENT_URL + this.departmentId).then(result => {
      this.batches = result;
      this.$scope.selectedBatches = result;
      console.log('Batches', this.batches);
    });
  }

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

  // getColleges() {
  //   this.backendSrv.get(config.COLLEGE_URL).then(result => {
  //     this.colleges = result;
  //   });
  // }

  // onChangeCollege() {
  //   this.isCollegeSelected = 0;
  //   if (!this.collegeId) {
  //     this.branches = {};
  //     return;
  //   }
  //   this.backendSrv.get(config.CMS_BRANCH_BY_COLLEGE_URL + '/' + this.collegeId).then(result => {
  //     this.branches = result;
  //   });
  // }

  // onChangeBranch() {
  //   this.isBranchSelected = 0;
  // }
  // onChangeDepartment() {
  //   alert(this.$scope.subject.departmentId);
  // }

  editSubject(subject) {
    if (subject.department != null) {
      subject.departmentId = subject.department.id.toString();
    }
    if (subject.batch != null) {
      subject.batchId = subject.batch.id.toString();
    }
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
    if (!this.branchId) {
      // this.isBranchSelected = 1;
      alert('Please select a branch');
      return;
    }
    if (!this.departmentId) {
      alert('Please select a department');
      return;
    }
    appEvents.emit('subject-modal', {
      text: 'create',
      icon: 'fa-trash',
      departments: this.departments,
      // batches: this.batches,
      teachers: this.teachers,
      departmentId: this.departmentId,
      branchId: this.branchId,
      selectedBatches: this.$scope.selectedBatches,
      onCreate: (subjectForm, subject, departmentId, branchId, cb) => {
        this.$scope.subjectForm = subjectForm;
        this.$scope.subject = subject;
        this.$scope.subject.departmentId = departmentId;
        this.$scope.subject.branchId = branchId;

        this.$scope.create(cb);
      },
      onChange: (subjectForm, subject, selectedBatches, cb) => {
        this.$scope.subjectForm = subjectForm;
        this.$scope.subject = subject;
        this.$scope.selectedBatches = selectedBatches;
        this.$scope.onChangeDepartment(cb);
      },
    });
  }
}
