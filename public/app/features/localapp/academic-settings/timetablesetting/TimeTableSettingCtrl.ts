import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class TimeTableSettingCtrl {
  navModel: any;
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;
  departments: any;
  batches: any;
  teachers: any;
  clgObject: any;
  counter: any;
  totalLectures: any;
  colleges: any;
  branches: any;
  collegeId: any;
  branchId: any;
  sections: any;
  batchId: any;
  departmentId: any;
  isCollegeSelected: any;
  isBranchSelected: any;
  isSectionSelected: any;
  isNextSelected: any;
  semesters: any;
  semesterId: any;
  sectionId: any;
  subjects: any;
  subjectId: any;
  lectureTimings: any;
  isValid: any;
  timeTableValidationMessage: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.isValid = true;
    this.RestUrl = new GlobalRestUrlConstants();
    this.counter = 0;
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.clgObject = {};
    $scope.satLec = [];
    $scope.brkAfter = [];
    $scope.timeAry = [];
    $scope.subjectAry = [];
    this.lectureTimings = [];
    this.timeTableValidationMessage = "";
    // $scope.objsInArr = [];
    this.getColleges();
    this.getSemester();
    // this.getDepartments();
    // this.getBatches();

    // this.getBranchesByCollegeId();
    this.isCollegeSelected = 0;
    this.isBranchSelected = 0;
    this.isSectionSelected = 0;
    this.isNextSelected = 0;
    $scope.isReadOnly = true;
    $scope.choices = [];
    $scope.idx = {};
    this.totalLectures = [];
    // const counter = 5;
    // $scope.addNewChoice = () => {
    //   const newItemNo = $scope.choices.length + 1;
    //   for (let i = 0; i < counter; i++) {
    //     $scope.choices.push({ id: 'choice' + newItemNo, name: 'choice' + newItemNo });
    //   }
    // };

    // $scope.removeNewChoice = () => {
    //   const newItemNo = $scope.choices.length - 1;
    //   if (newItemNo !== 0) {
    //     $scope.choices.pop();
    //   }
    // };

    // $scope.showAddChoice = choice => {
    //   return choice.id === $scope.choices[$scope.choices.length - 1].id;
    // };

    // $scope.choices = [];

    // $scope.addNewChoice = () => {
    //   const newItemNo = $scope.choices.length + 1;
    //   for (let i = 0; i < 3; i++) {
    //     $scope.choices.push({ newItemNo });
    //   }
    // };

    // $scope.removeNewChoice = () => {
    //   const newItemNo = $scope.choices.length - 1;
    //   if (newItemNo !== 0) {
    //     $scope.choices.pop();
    //   }
    // };

    // $scope.showAddChoice = choice => {
    //   return choice.id === $scope.choices[$scope.choices.length - 1].id;
    // };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  changeCounter(opt) {
    if (opt === 'plus') {
      this.counter = this.counter + 1;
    }
    if (opt === 'minus' && this.counter > 0) {
      this.counter = this.counter - 1;
    }
  }

  addRows() {
    if (this.totalLectures.length !== this.counter) {
      this.totalLectures.length = 0;
      for (let i = 0; i < this.counter; i++) {
        this.totalLectures.push({ i });
      }
    }
  }

  // getDepartments() {
  //   this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(result => {
  //     this.departments = result;
  //     console.log('Departments ::::::: ', this.departments);
  //   });
  // }

  // getBatches() {
  //   this.backendSrv.get(this.RestUrl.getBatchRestUrl()).then(result => {
  //     this.batches = result;
  //   });
  // }

  getSemester() {
    this.backendSrv.get(this.RestUrl.getSemesterRestUrl()).then(result => {
      this.semesters = result;
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
    if (!this.branchId) {
      this.departments = {};
      return;
    }
    this.backendSrv.get(this.RestUrl.getDepartmentByBranchIdRestUrl() + this.branchId).then(result => {
      this.departments = result;
    });
  }

  onChangeDepartment() {
    if (!this.departmentId) {
      this.batches = {};
      return;
    }
    this.backendSrv.get(this.RestUrl.getBatchByDepartmentIdRestUrl() + this.departmentId).then(result => {
      this.batches = result;
    });
  }

  onChangeBatch() {
    if (!this.batchId) {
      this.sections = {};
      return;
    }
    this.backendSrv.get(this.RestUrl.getSectionByBatchRestUrl() + this.batchId).then(result => {
      this.sections = result;
    });
  }

  onChangeSection() {
    if (!this.sectionId) {
      this.isSectionSelected = 0;
    } else {
      this.isSectionSelected = 1;
    }
  }

  next() {
    if (this.counter <= 0) {
      alert('Please create lectures.');
    } else {
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
  }

  validateTimings() {
    const timings = this.lectureTimings;
    let isValid = true;
    if (timings.length === 0 && this.totalLectures > 0) {
      isValid = false;
      this.timeTableValidationMessage = "Please enter start and end time.";
      return isValid;
    }
    for (let i = 0; i < timings.length; i++) {
      const time = timings[i];
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
      const nextTime = timings[i + 1];
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
  }

  back() {
    this.isSectionSelected = 1;
    this.isNextSelected = 0;
    this.$scope.isReadOnly = true;
    this.activateTab(0);
  }

  getSubjects() {
    this.backendSrv
      .get(this.RestUrl.getSubjectByDeptBatchIdRestUrl() + 'deptId=' + this.departmentId + '&batchId=' + this.batchId)
      .then(result => {
        this.subjects = result;
      });
  }

  getTeachers() {
    this.backendSrv
      .get(this.RestUrl.getTeacherByQueryParamsRestUrl() + 'deptId=' + this.departmentId + '&branchId=' + this.branchId)
      .then(result => {
        this.teachers = result;
      });
  }
}
