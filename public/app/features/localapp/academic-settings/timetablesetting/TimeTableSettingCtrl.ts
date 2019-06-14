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
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;
  departments: any;
  batches: any;
  teachers: any;
  counter: any;
  totalLectures: any;
  colleges: any;
  branches: any;
  collegeId: any;
  branchId: any;
  sections: any;
  batchId: any;
  departmentId: any;
  semesters: any;
  semesterId: any;
  sectionId: any;
  subjects: any;
  subjectId: any;
  lectureTimings: any;
  isValid: any;
  timeTableValidationMessage: any;
  attendanceMasters: any;
  terms: any;
  termId: any;
  academicYearId: any;
  lecturesCreated: any;
  isReadOnly: any;
  isViewOnly: any;
  isRequestMade: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.lecturesCreated = [];
    this.subjects = [];
    this.teachers = [];
    this.isValid = true;
    this.RestUrl = new GlobalRestUrlConstants();
    this.counter = 0;
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.lectureTimings = [];
    this.timeTableValidationMessage = '';
    this.getColleges();
    this.getSemester();
    this.isReadOnly = false;
    this.isViewOnly = false;
    $scope.choices = [];
    $scope.idx = {};
    this.totalLectures = [];
    this.academicYearId = 1701;
    this.getTerms();
    this.isRequestMade = false;
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  changeCounter(opt) {
    if (!(this.isReadOnly || this.isViewOnly)) {
      this.counter += opt;
      if (this.counter < 0) {
        this.counter = 0;
      }
    }
  }

  onClickCreateLectures() {
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
    if (!this.collegeId) {
      this.branches = {};
      return;
    }
    this.backendSrv.get(this.RestUrl.getBranchesByCollegeIdRestUrl() + this.collegeId).then(result => {
      this.branches = result;
    });
  }

  onChangeBranch() {
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
      this.isReadOnly = true;
      // this.getSubjects();
      // this.getTeachers();
      this.getAttendanceMasterByBatchAndSection(null);
      this.activateTab(1);
    }
  }

  validateTimings() {
    const timings = this.lectureTimings;
    let isValid = true;
    if (timings.length === 0 && this.totalLectures.length > 0) {
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
      // if (nextTime && nextTime.startTime && time.endTime && nextTime.startTime.getTime() < time.endTime.getTime()) {
      //   isValid = false;
      //   this.timeTableValidationMessage = 'Please enter valid start time of upcoming lecture.';
      //   break;
      // }
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
        payLoad[counter] = new LectureSchedule(j, startTime, endTime, subjects[j], teachers[j]);
        counter++;
      }
    }
    this.isRequestMade = true;
    this.backendSrv
      .post(
      `${this.RestUrl.getCmsLecturesUrl()}termId=${this.termId}&academicYearId=${this.academicYearId}` +
      `&sectionId=${this.sectionId}&batchId=${this.batchId}&branchId=${this.branchId}` +
      `&departmentId=${this.departmentId}`,
      JSON.stringify(payLoad)
      )
      .then(result => {
        this.lecturesCreated = result;
        this.isRequestMade = false;
        this.activateTab(2);
      }, error => {
        this.isRequestMade = false;
      });
  }

  back() {
    this.isReadOnly = false;
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

  getAttendanceMasterByBatchAndSection(cb) {
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
        if (cb) {
          cb();
        }
      });
    //this.subjects = {};
  }

  onChangeSubject(weekDay, index) {
    const subjectId = this.lectureTimings[index].subjects[weekDay];
    this.$scope.subjectWiseTeachers = this.$scope.subjectWiseTeachers || {};
    this.$scope.subjectWiseTeachers[weekDay] = this.$scope.subjectWiseTeachers[weekDay] || {};
    this.$scope.subjectWiseTeachers[weekDay][index] = [];
    for (const i in this.attendanceMasters) {
      const s = this.attendanceMasters[i].teach.subject;
      if (s.id === parseInt(subjectId, 10)) {
        this.$scope.subjectWiseTeachers[weekDay][index].push(this.attendanceMasters[i].teach.teacher);
      }
    }
  }

  resetDataOnEditLectures() {
    this.lectureTimings = [];
    this.totalLectures = [];
    this.counter = 0;
    this.isReadOnly = false;
  }

  onViewLectures(index) {
    const lectures = this.lecturesCreated;
    this.getLecturesData(lectures, index);
    this.activateTab(0);
    this.isViewOnly = true;
  }

  onEditLectures(index) {
    const lectures = this.lecturesCreated;
    this.getLecturesData(lectures, index);
    this.activateTab(0);
    this.isViewOnly = false;
  }

  getLecturesData(lectures, i) {
    this.backendSrv
      .get(
      this.RestUrl.getSelectedLectures() +
      `?branchId=${lectures[i].branchId}` +
      `&departmentId=${lectures[i].departmentId}&termId=${lectures[i].termId}` +
      `&academicYear=${lectures[i].academicYear}&sectionId=${lectures[i].sectionId}` +
      `&batchId=${lectures[i].batchId}`
      )
      .then(result => {
        this.resetDataOnEditLectures();
        this.setDetailsOfLecture(result);
      });

    // this.backendSrv.get("http://18.234.66.133:8080/api/cmsmeta-lecture-selected?branchId=1851&" +
    //   "departmentId=1901&termId=1751&academicYear=1701&sectionId=2001&batchId=1951").then(result => {
    //     this.setDetailsOfLecture(result);
    //   });
  }

  setDetailsOfLecture(data) {
    const lecture = data[0];
    this.collegeId = lecture.branch.college.id;
    this.onChangeCollege();
    this.branchId = lecture.branch.id + '';
    this.onChangeBranch();
    this.termId = lecture.term.id + '';
    this.onChangeTerm();
    this.departmentId = lecture.department.id + '';
    this.onChangeDepartment();
    this.batchId = lecture.batch.id + '';
    this.onChangeBatch();
    this.sectionId = lecture.section.id + '';
    this.onChangeSection();
    const lectureTimings = {};
    for (let i = 0; i < data.length; i++) {
      const lec = data[i];
      const startTimeArr = this.convertTime12to24(lec.startTime);
      const endTimeArr = this.convertTime12to24(lec.endTime);
      const startTime = new Date(1970, 0, 1, startTimeArr[0], startTimeArr[1], 0);
      const endTime = new Date(1970, 0, 1, endTimeArr[0], endTimeArr[1], 0);
      const newData = lectureTimings[lec.startTime] || {
        subjects: {},
        startTime: startTime,
        endTime: endTime,
        isBreak: false,
        isSatLecture: true,
        teachers: {},
      };
      const subjects = newData.subjects;
      const teachers = newData.teachers;
      teachers[lec.weekDay] = lec.teacher.id + '';
      subjects[lec.weekDay] = lec.subject.id + '';
      lectureTimings[lec.startTime] = newData;
    }
    const keys = Object.keys(lectureTimings);
    for (let i = 0; i < keys.length; i++) {
      this.lectureTimings.push(lectureTimings[keys[i]]);
    }
    this.counter = this.lectureTimings.length;
    this.getAttendanceMasterByBatchAndSection(() => {
      const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      for (let i = 0; i < weekDays.length; i++) {
        for (let j = 0; j < this.counter; j++) {
          this.onChangeSubject(weekDays[i], j);
        }
      }
    });
    this.onClickCreateLectures();
  }

  convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');
    const splittedTime = time.split(':');
    let hours = splittedTime[0];
    const minutes = splittedTime[1];
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return [hours, minutes];
  }

  onClickAddTimeTable() {
    this.resetDataOnEditLectures();
    this.activeTabIndex = 0;
    this.collegeId = "";
    this.branchId = "";
    this.termId = "";
    this.departmentId = "";
    this.batchId = "";
    this.sectionId = "";
  }
}
