import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
// import { weekdays } from 'moment';

class LectureSchedule {
  weekDay: any;
  startTime: any;
  endTime: any;
  subjectId: any;
  teacherId: any;
  constructor(weekDay, startTime, endTime, subjectId, teacherId) {
    this.weekDay = weekDay;
    this.startTime = startTime;
    this.endTime = endTime;
    this.subjectId = subjectId;
    this.teacherId = teacherId;
  }
}

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
  lec: any;
  attendanceMasters: any;
  terms: any;
  termId: any;
  academicYearId: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.subjects = [];
    this.teachers = [];
    this.isValid = true;
    this.RestUrl = new GlobalRestUrlConstants();
    this.counter = 0;
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.clgObject = {};
    this.lectureTimings = [];
    this.timeTableValidationMessage = '';
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
    this.academicYearId = 1701;
    this.getTerms();
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

  getTerms() {
    this.backendSrv
      .get(this.RestUrl.getTermByAcademicYearIdRestUrl() + '?academicYearId=' + this.academicYearId)
      .then(result => {
        this.terms = result;
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
      this.terms = {};
      return;
    }
    this.backendSrv.get(this.RestUrl.getDepartmentByBranchIdRestUrl() + this.branchId).then(result => {
      this.departments = result;
    });
    this.getTerms();
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

  onChangeTerm() {
    if (!this.termId) {
      this.sections = {};
      return;
    }
    if (this.batchId) {
      this.backendSrv.get(this.RestUrl.getSectionByBatchRestUrl() + this.batchId).then(result => {
        this.sections = result;
      });
    }
  }

  next() {
    if (this.counter <= 0 || this.totalLectures.length === 0) {
      alert('Please create lectures.');
    } else {
      this.isValid = this.validateTimings();
      if (!this.isValid) {
        return;
      }
      this.isSectionSelected = 0;
      this.isNextSelected = 1;
      this.$scope.isReadOnly = false;
      // this.getSubjects();
      // this.getTeachers();
      this.getAttendanceMasterByBatchAndSection();
      this.activateTab(1);
    }
  }

  validateTimings() {
    const timings = this.lectureTimings;
    let isValid = true;
    if (timings.length === 0 && this.totalLectures > 0) {
      isValid = false;
      this.timeTableValidationMessage = 'Please enter start and end time.';
      return isValid;
    }
    for (let i = 0; i < timings.length; i++) {
      const time = timings[i];
      if (!time.startTime || !time.endTime) {
        isValid = false;
        this.timeTableValidationMessage = 'Please enter start and end time.';
        break;
      }
      if (time.startTime && time.endTime && time.startTime.getTime() >= time.endTime.getTime()) {
        isValid = false;
        this.timeTableValidationMessage = 'Please enter valid start and end time.';
        break;
      }
      const nextTime = timings[i + 1];
      if (nextTime && nextTime.startTime && time.endTime && nextTime.startTime.getTime() < time.endTime.getTime()) {
        isValid = false;
        this.timeTableValidationMessage = 'Please enter valid start time of upcoming lecture.';
        break;
      }
      if (time.isBreak) {
        if (nextTime) {
          if (
            nextTime.startTime &&
            time.endTime &&
            nextTime.startTime.getTime() < time.endTime.getTime() + 30 * 60 * 1000
          ) {
            isValid = false;
            this.timeTableValidationMessage = 'Please add atleast 30 mins to start time after break';
            break;
          }
        }
      }
    }
    return isValid;
  }

  saveLectures() {
    const lectureTimings = this.lectureTimings;
    const payLoad = [];
    let counter = 0;
    for (let i = 0; i < lectureTimings.length; i++) {
      const timings = lectureTimings[i];
      // const data = payLoad[i] || [];
      const subjects = timings.subjects;
      const teachers = timings.teachers;
      const startTime = timings.startTime.toLocaleTimeString('en-US');
      const endTime = timings.endTime.toLocaleTimeString('en-US');

      for (const j in subjects) {
        // data[counter] = {
        //   weekDay: j,
        //   startTime: startTime,
        //   endTime: endTime,
        //   subjectId: subjects[j],
        //   teacherId: teachers[j]
        // };
        this.lec = new LectureSchedule(j, startTime, endTime, subjects[j], teachers[j]);
        payLoad[counter] = this.lec;
        counter++;
      }
      // payLoad[i] = data;
      // payLoad[i] = this.lec;
    }
    this.backendSrv
      .post(
        `${this.RestUrl.getCmsLecturesUrl()}termId=${this.termId}&academicYearId=${this.academicYearId}&sectionId=${
          this.sectionId
        }
        &batchId=${this.batchId}&branchId=${this.branchId}&departmentId=${this.departmentId}`,
        JSON.stringify(payLoad)
      )
      .then(result => {
        // this.colleges = result;
        this.activateTab(2);
      });
  }

  back() {
    this.isSectionSelected = 1;
    this.isNextSelected = 0;
    this.$scope.isReadOnly = true;
    this.activateTab(0);
  }

  // getSubjects() {
  //   this.backendSrv
  //     .get(this.RestUrl.getSubjectByDeptBatchIdRestUrl() + 'deptId=' + this.departmentId + '&batchId=' + this.batchId)
  //     .then(result => {
  //       this.subjects = result;
  //     });
  // }

  // getTeachers() {
  //   this.backendSrv
  //     .get(this.RestUrl.getTeacherByQueryParamsRestUrl() + 'deptId=' + this.departmentId + '&branchId=' + this.branchId)
  //     .then(result => {
  //       this.teachers = result;
  //     });
  // }

  getAttendanceMasterByBatchAndSection() {
    this.backendSrv
      .get(
        this.RestUrl.getAttendanceMasterByBatchAndSectioinUrl() +
          '?batchId=' +
          this.batchId +
          '&sectionId=' +
          this.sectionId
      )
      .then(result => {
        this.attendanceMasters = result;
        this.subjects = [];
        //  0 this.teachers = [];
        for (const i in this.attendanceMasters) {
          const sb = this.attendanceMasters[i].teach.subject;
          // const thr = this.attendanceMasters[i].teach.teacher;
          this.subjects[i] = sb;
          // this.teachers[i] = thr;
        }
      });
    //this.subjects = {};
  }

  onChangeSubject(weekDay) {
    const selThrs = [];
    // let cnt = 0;

    for (const i in this.attendanceMasters) {
      const s = this.attendanceMasters[i].teach.subject;

      for (let x = 0; x < this.lectureTimings.length; x++) {
        const timings = this.lectureTimings[x];
        // if (this.lectureTimings[cnt] != null) {
        const selSub = timings.subjects;
        for (const j in selSub) {
          if (j === weekDay) {
            if (s.id === parseInt(selSub[j], 10)) {
              selThrs.push(this.attendanceMasters[i].teach.teacher);
            }
          }
        }
        // }
      }

      // cnt++;
    }
    // this.teachers = selThrs;
    if (weekDay === 'MONDAY') {
      this.$scope.theacherMonday = selThrs;
    } else if (weekDay === 'TUESDAY') {
      this.$scope.theacherTuesday = selThrs;
    } else if (weekDay === 'WEDNESDAY') {
      this.$scope.theacherWednesday = selThrs;
    } else if (weekDay === 'THURSDAY') {
      this.$scope.theacherThursday = selThrs;
    } else if (weekDay === 'FRIDAY') {
      this.$scope.theacherFriday = selThrs;
    } else if (weekDay === 'SATURDAY') {
      this.$scope.theacherSaturday = selThrs;
    }
  }
}
