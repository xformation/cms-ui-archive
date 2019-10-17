// import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
import { config } from '../../config';
import * as moment from 'moment';
import { appEvents } from 'app/core/core';
// import * as $ from 'jquery';
// import { coreModule } from 'app/core/core';
// import angular from 'angular';

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
  showLectureReport = 0;
  preCreateLectureTabIndex = 0;
  $scope: any;
  // RestUrl: any;
  // departments: any;
  batches: any;
  teachers: any;
  filterTeachers: any;
  counter: any;
  totalLectures: any;
  // colleges: any;
  // branches: any;
  // collegeId: any;
  branchId: any;
  sections: any;
  batchId: any;
  departmentId: any;
  semesters: any;
  semesterId: any;
  sectionId: any;
  subjects: any;
  filterSubjects: any;
  subjectId: any;
  lectureTimings: any;
  isValid: any;
  timeTableValidationMessage: any;
  attendanceMasters: any;
  filterAttendanceMasters: any;
  terms: any;
  termId: any;
  academicYearId: any;
  lecturesCreated: any;
  isReadOnly: any;
  isViewOnly: any;
  isRequestMade: any;
  lectureReport: any;
  globalSettings: any;
  isLecFound: any;
  teacherId: any;
  fromLecDate: any;
  toLecDate: any;
  editBatchId: any;
  editSectionId: any;
  selectedAyYear: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.fromLecDate = new Date();
    this.isLecFound = 0;
    this.academicYearId = 0;
    this.departmentId = 0;
    this.lecturesCreated = [];
    this.subjects = [];
    this.filterSubjects = [];
    this.teachers = [];
    this.filterTeachers = [];
    this.isValid = true;
    // this.RestUrl = new GlobalRestUrlConstants();
    this.counter = 0;
    this.activeTabIndex = 0;
    this.showLectureReport = 0;
    this.$scope = $scope;
    this.lectureTimings = [];
    this.timeTableValidationMessage = '';
    this.globalSettings = {};
    // this.getColleges();
    // this.getBranches();
    this.getGlobalConfigurations(backendSrv.contextSrv.user.login);
    // this.getTerms();
    this.getCmsBatches();
    this.getCmsSections();
    this.getSemester();

    this.isReadOnly = false;
    this.isViewOnly = false;
    $scope.choices = [];
    $scope.idx = {};
    this.totalLectures = [];
    this.isRequestMade = false;

    $scope.updateTimeTable = cb => {
      console.log('$scope.lecture:::: ', $scope.lecture);
      console.log('$scope.lectureObject ::: ', $scope.lectureObject);
      if ($scope.lecture !== null && $scope.lecture !== undefined) {
        $scope.lecture.id = $scope.lectureObject.id;
      }
      if ($scope.lecture.lecDate === null || $scope.lecture.lecDate === undefined) {
        $scope.lecture.strLecDate = new Date($scope.lectureObject.lecDate).toLocaleDateString();
      } else {
        $scope.lecture.strLecDate = new Date($scope.lecture.lecDate).toLocaleDateString();
      }
      if ($scope.lecture.startTime === null || $scope.lecture.startTime === undefined) {
        $scope.lecture.startTime = $scope.lectureObject.startTime;
      } else {
        $scope.lecture.startTime = new Date($scope.lecture.startTime).toLocaleTimeString('en-US');
      }
      if ($scope.lecture.endTime === null || $scope.lecture.endTime === undefined) {
        $scope.lecture.endTime = $scope.lectureObject.endTime;
      } else {
        $scope.lecture.endTime = new Date($scope.lecture.endTime).toLocaleTimeString('en-US');
      }

      const lcDt = moment.utc($scope.lecture.strLecDate, 'MM/DD/YYYY');
      console.log('Lecture Date : ', lcDt.toDate());

      const c = new Date().toLocaleDateString();
      const curDt = moment.utc(c, 'MM/DD/YYYY');
      console.log('Current Date : ', curDt.toDate());

      if (lcDt.isBefore(curDt)) {
        if (cb) {
          cb('4');
        }
        return;
      }

      const lastDate = moment.utc($scope.academicYear.strEndDate, 'DD-MM-YYYY');
      console.log('academic year end date : ', lastDate);
      if (lcDt.isAfter(lastDate)) {
        if (cb) {
          cb('5');
        }
        return;
      }

      const stTime = moment.utc($scope.lecture.startTime, 'hh:mm:ss');
      const ndTime = moment.utc($scope.lecture.endTime, 'hh:mm:ss');

      if (stTime.isAfter(ndTime)) {
        if (cb) {
          cb('2');
        }
        return;
      }
      if (stTime.isSame(ndTime)) {
        if (cb) {
          cb('3');
        }
        return;
      }
      let sId = '0';
      if (
        $scope.lectureObject.attendancemaster.section !== null &&
        $scope.lectureObject.attendancemaster.section !== undefined
      ) {
        sId = $scope.lectureObject.attendancemaster.section.id;
      }
      backendSrv
        .put(
          `${config.CMS_LECTURE_URL}?sectionId=${sId}` +
            `&batchId=${$scope.lectureObject.attendancemaster.batch.id}` +
            `&subjectId=${$scope.lecture.subjectId}&teacherId=${$scope.lecture.teacherId}`,
          $scope.lecture
        )
        .then(
          result => {
            if (result.statusCode === 1) {
              if (confirm(result.statusDesc)) {
                backendSrv
                  .put(
                    `${config.CMS_LECTURE_URL}?sectionId=${sId}` +
                      `&batchId=${$scope.lectureObject.attendancemaster.batch.id}` +
                      `&subjectId=${$scope.lecture.subjectId}&teacherId=${$scope.lecture.teacherId}` +
                      `&confirm=confirm`,
                    $scope.lecture
                  )
                  .then(
                    result => {
                      if (cb) {
                        cb('1');
                      }
                    },
                    error => {
                      this.isRequestMade = false;
                    }
                  );
              } else {
                return;
              }
            } else {
              if (cb) {
                cb('1');
              }
            }
          },
          error => {
            this.isRequestMade = false;
          }
        );
    };

    $scope.getTeacherOnSubjectChangeForEdit = () => {
      const { batchId, sectionId, subjectId } = this.$scope.lecture;
      this.$scope.lecture = {};
      this.$scope.lecture.batchId = batchId;
      this.$scope.lecture.sectionId = sectionId;
      this.$scope.lecture.subjectId = subjectId;
      const selTeachers = [];
      this.backendSrv
        .get(
          config.CMS_AM_BY_BATCH_SECTION_URL +
            '?batchId=' +
            batchId +
            '&sectionId=' +
            sectionId +
            '&departmentId=' +
            this.departmentId
        )
        .then(result => {
          for (const i in result) {
            const sb = result[i].teach.subject;
            if (sb.id === parseInt(subjectId, 10)) {
              selTeachers.push(result[i].teach.teacher);
            }
          }
        });
      $scope.selectedTeachers = selTeachers;
    };

    // $scope.onChangeBatchForEdit = () => {
    //   const { batchId } = this.$scope.lecture;
    //   this.$scope.lecture = {};
    //   this.$scope.lecture.batchId = batchId;
    //   const selSections = [];
    //   if (batchId !== undefined) {
    //     this.backendSrv.get(config.CMS_SECTION_BY_BATCH_URL + batchId).then(result => {
    //       for (const i in result) {
    //         const section = result[i];
    //         selSections.push(section);
    //       }
    //     });
    //   }
    //   $scope.selectedSections = selSections;
    // };
  }

  getGlobalConfigurations(userName) {
    this.backendSrv.get(config.CMS_GLOBAL_CONFIG_URL + '?userName=' + userName).then(result => {
      if (result.selectedAcademicYearId === null || result.selectedAcademicYearId === 0) {
        this.academicYearId = result.cmsAcademicYearVo.id;
      } else {
        this.academicYearId = result.selectedAcademicYearId;
      }
      this.departmentId = result.selectedDepartmentId;
      this.branchId = result.selectedBranchId;
      // console.log('AYID :::: ', this.academicYearId);
      // console.log('BRANCHID :::: ', this.branchId);
      // console.log('DEPT ID :::: ', this.departmentId);
      this.getTerms(this.academicYearId);
      this.getCmsBatches();
      this.getAcademicYears();
      // this.selectedBranches = this.globalSettings.branchList;
    });
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
      if (this.counter === 0) {
        // this.lectureTimings = [];
        // this.resetDataOnEditLectures();
      }
    }
  }

  onClickCreateLectures() {
    // validate
    if (!this.branchId) {
      alert('Please select a branch');
      return;
    } else if (!this.termId) {
      alert('Please select a term');
      return;
    } else if (!this.departmentId) {
      alert('Please select a department');
      return;
    } else if (!this.batchId) {
      alert('Please select a year');
      return;
    }

    const elm = document.getElementById('createLectureDiv');
    // elm.className = 'info-container';
    if (this.totalLectures.length !== this.counter) {
      this.totalLectures.length = 0;
      this.lectureTimings = [];
      for (let i = 0; i < this.counter; i++) {
        this.totalLectures.push({ i });
      }
      if (this.counter === 0) {
        elm.className = 'hide';
        return;
      }
    } else {
      if (this.counter === 0) {
        alert('Please provide some value to number of lectures');
        return;
      }
    }
    elm.className = 'info-container';

    const lcRptDv = document.getElementById('createLectureReportDiv');
    lcRptDv.className = 'hide';
    this.showLectureReport = 1;
    const timings = this.lectureTimings;

    if (timings.length > 0) {
      this.next();
    }
  }

  getSemester() {
    this.backendSrv.get(config.CMS_SEMESTER_URL).then(result => {
      this.semesters = result;
    });
  }

  // getColleges() {
  //   this.backendSrv.get(config.COLLEGE_URL).then(result => {
  //     this.colleges = result;
  //   });
  // }

  // getBranches() {
  //   this.backendSrv.get(config.CMS_BRANCH_URL).then(result => {
  //     this.branches = result;
  //   });
  // }

  getTerms(ayId) {
    this.backendSrv.get(config.CMS_TERM_BY_ACYEAR_URL + '?academicYearId=' + ayId).then(result => {
      this.terms = result;
    });
  }

  // onChangeCollege() {
  //   if (!this.collegeId) {
  //     this.branches = {};
  //     return;
  //   }
  //   this.backendSrv.get(this.RestUrl.getBranchesByCollegeIdRestUrl() + this.collegeId).then(result => {
  //     this.branches = result;
  //   });
  // }

  // onChangeBranch() {
  //   if (!this.branchId) {
  //     this.departments = {};
  //     this.terms = {};
  //     return;
  //   }
  //   this.backendSrv.get(config.CMS_DEPARTMENT_BY_BRANCH_URL + this.branchId).then(result => {
  //     this.departments = result;
  //   });
  //   this.getTerms();
  // }

  // onChangeDepartment() {
  //   if (!this.departmentId) {
  //     this.batches = {};
  //     this.sections = {};
  //     // return;
  //   }
  //   this.getCmsBatches();
  //   this.getCmsSections();
  // }

  onChangeFilterBatch() {
    const sb = [];
    if (this.batchId !== null && this.batchId !== undefined && this.batchId !== '') {
      for (const i in this.subjects) {
        const b = this.subjects[i].batch;
        if (b.id === parseInt(this.batchId, 10)) {
          sb.push(this.subjects[i]);
        }
      }
      this.filterSubjects = sb;
    } else {
      this.filterSubjects = this.subjects;
    }
    this.onChangeBatch();
  }

  onChangeBatch() {
    if (!this.batchId) {
      this.sections = {};
      // return;
    }
    this.getCmsSections();
  }

  onChangeSection() {}

  onChangeTerm() {
    // if (!this.termId) {
    this.sections = {};
    this.batches = {};
    // return;
    // }
    this.getCmsBatches();
    this.getCmsSections();
  }

  next() {
    // if (this.counter <= 0 || this.totalLectures.length === 0) {
    //   alert('Please create lectures.');
    // } else {
    this.isValid = this.validateTimings();
    if (!this.isValid) {
      return;
    }
    this.isReadOnly = true;
    // this.getSubjects();
    // this.getTeachers();
    this.getAttendanceMasterByBatchAndSection(null);
    this.activateTab(1);
    this.showLectureReport = 1;
    const lcRptDv = document.getElementById('createLectureReportDiv');
    lcRptDv.className = 'hide';
    // }
  }

  validateTimings() {
    const timings = this.lectureTimings;
    let isValid = true;
    const msg = 'Please enter start and end time';
    // alert("timings.length: "+timings.length+", this.totalLectures.length: "+this.totalLectures.length);
    // if (timings.length === 0 && this.totalLectures.length > 0) {
    //   isValid = false;
    //   // this.timeTableValidationMessage = 'Please enter start and end time.';
    //   alert(msg);
    //   return isValid;
    // }
    for (let i = 0; i < timings.length; i++) {
      const time = timings[i];
      if (!time.startTime || !time.endTime) {
        isValid = false;
        // this.timeTableValidationMessage = 'Please enter start and end time.';
        alert(msg);
        break;
      }
      if (time.startTime && time.endTime && time.startTime.getTime() >= time.endTime.getTime()) {
        isValid = false;
        // this.timeTableValidationMessage = 'Please enter valid start and end time.';
        alert('Please enter valid start and end time');
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
            // this.timeTableValidationMessage = 'Please add atleast 30 mins to start time after break';
            alert('Please add atleast 30 mins to start time after break');
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
    if (this.sectionId === null || this.sectionId === undefined || this.sectionId === '') {
      this.sectionId = 0;
    }
    this.backendSrv
      .post(
        `${config.CMS_LECTURE_URL}?termId=${this.termId}&academicYearId=${this.academicYearId}` +
          `&sectionId=${this.sectionId}&batchId=${this.batchId}&branchId=${this.branchId}` +
          `&departmentId=${this.departmentId}`,
        JSON.stringify(payLoad)
      )
      .then(
        result => {
          this.lecturesCreated = result;
          const statusMsgDiv = document.getElementById('statusMsgDiv');
          if (result.length > 0) {
            this.isLecFound = 1;
            statusMsgDiv.className = 'hide';
          } else {
            this.isLecFound = 0;
            statusMsgDiv.className = '';
            statusMsgDiv.innerText = 'No lecture created. Duplicate lectures are discarded.';
          }
          this.isRequestMade = false;
          this.activateTab(2);
        },
        error => {
          this.isRequestMade = false;
        }
      );
  }

  back() {
    this.isReadOnly = false;
    this.activateTab(0);
    this.showLectureReport = 1;
    // const elm = document.getElementById('createLectureDiv');
    // elm.className = "info-container";
    const lcRptDv = document.getElementById('createLectureReportDiv');
    lcRptDv.className = 'hide';
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
        config.CMS_AM_BY_BATCH_SECTION_URL +
          '?batchId=' +
          this.batchId +
          '&sectionId=' +
          this.sectionId +
          '&departmentId=' +
          this.departmentId
      )
      .then(result => {
        this.attendanceMasters = result;
        this.subjects = [];
        for (const i in this.attendanceMasters) {
          const sb = this.attendanceMasters[i].teach.subject;
          let isFound = false;
          for (const j in this.subjects) {
            const tempSb = this.subjects[j];
            if (sb.id === tempSb.id) {
              isFound = true;
              break;
            }
          }
          if (!isFound) {
            this.subjects[i] = sb;
          }
        }
        if (cb) {
          cb();
        }
      });
  }

  onChangeFilterSubject() {
    const sb = [];
    let tId = 0;
    if (this.subjectId !== null && this.subjectId !== undefined && this.subjectId !== '') {
      for (const i in this.filterAttendanceMasters) {
        const b = this.filterAttendanceMasters[i].teach.subject;
        if (b.id === parseInt(this.subjectId, 10)) {
          if (tId !== this.filterAttendanceMasters[i].teach.teacher.id) {
            sb.push(this.filterAttendanceMasters[i].teach.teacher);
            tId = this.filterAttendanceMasters[i].teach.teacher.id;
          }
        }
      }
      this.filterTeachers = sb;
    } else {
      this.filterTeachers = this.teachers;
    }
  }

  getFilterAttendanceMasterByDepartment() {
    this.backendSrv.get(config.CMS_AM_BY_DEPARTMENT_URL + '?departmentId=' + this.departmentId).then(result => {
      this.filterAttendanceMasters = result;
    });
  }

  onChangeSubject(weekDay, index) {
    const subjectId = this.lectureTimings[index].subjects[weekDay];
    this.$scope.subjectWiseTeachers = this.$scope.subjectWiseTeachers || {};
    this.$scope.subjectWiseTeachers[weekDay] = this.$scope.subjectWiseTeachers[weekDay] || {};
    this.$scope.subjectWiseTeachers[weekDay][index] = [];
    const tempThAry = [];
    for (const i in this.attendanceMasters) {
      let isFound = false;
      const s = this.attendanceMasters[i].teach.subject;
      const t = this.attendanceMasters[i].teach.teacher;
      if (s.id === parseInt(subjectId, 10)) {
        for (const j in tempThAry) {
          const tempTh = tempThAry[j];
          if (t.id === tempTh.id) {
            isFound = true;
            break;
          }
        }
        if (!isFound) {
          tempThAry[i] = t;
        }

        // this.$scope.subjectWiseTeachers[weekDay][index].push(this.attendanceMasters[i].teach.teacher);
      }
    }
    for (const j in tempThAry) {
      this.$scope.subjectWiseTeachers[weekDay][index].push(tempThAry[j]);
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
        config.CMS_META_LECTURE_URL +
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
    // this.collegeId = lecture.branch.college.id;
    // this.onChangeCollege();
    this.branchId = lecture.branch.id + '';
    // this.onChangeBranch();
    this.termId = lecture.term.id + '';
    this.onChangeTerm();
    this.departmentId = lecture.department.id + '';
    // this.onChangeDepartment();
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
    // this.collegeId = '';
    // this.branchId = '';
    this.termId = '';
    // this.departmentId = '';
    this.batchId = '';
    this.sectionId = '';
    this.showLectureReport = 1;
    this.showPreCreateLectureUi();
  }

  showSearchLectureDiv() {
    this.activateTab(2);
    if (this.departmentId) {
      // this.getAttendanceMasterByBatchAndSection(null);
      this.getSubjects();
      this.getTeachers();
      this.getFilterAttendanceMasterByDepartment();
    }
    const elm = document.getElementById('viewSectionFilterDiv');
    elm.className = 'info-container m-b-3';

    const statusMsgDiv = document.getElementById('statusMsgDiv');
    statusMsgDiv.className = 'hide';
  }
  viewAllLectures() {
    if (!this.branchId) {
      alert('Please select a branch');
      return;
    }
    this.lecturesCreated = [];
    const statusMsgDiv = document.getElementById('statusMsgDiv');
    statusMsgDiv.className = 'hide';

    // const stDt =
    //   this.fromLecDate !== undefined && this.fromLecDate !== null && this.fromLecDate !== ''
    //     ? moment.utc(this.fromLecDate).format('DD-MM-YYYY')
    //     : undefined;
    const stDt = new Date(this.fromLecDate);
    let sdt = undefined;
    if (this.fromLecDate !== undefined && this.fromLecDate !== null && this.fromLecDate !== '') {
      sdt =
        (stDt.getDate() < 10 ? '0' + stDt.getDate() : stDt.getDate()) +
        '-' +
        (stDt.getMonth() + 1) +
        '-' +
        stDt.getFullYear();
    }

    const ndDt = new Date(this.toLecDate);
    let ndt = undefined;
    if (this.toLecDate !== undefined && this.toLecDate !== null && this.toLecDate !== '') {
      ndt =
        (ndDt.getDate() < 10 ? '0' + ndDt.getDate() : ndDt.getDate()) +
        '-' +
        (ndDt.getMonth() + 1) +
        '-' +
        ndDt.getFullYear();
    }

    if (
      this.fromLecDate !== undefined &&
      this.fromLecDate !== null &&
      this.fromLecDate !== '' &&
      this.toLecDate !== undefined &&
      this.toLecDate !== null &&
      this.toLecDate !== ''
    ) {
      // const startDt = moment.utc(sdt, 'MM/DD/YYYY');
      // const enDt = moment.utc(ndt, 'MM/DD/YYYY');
      const startDt = moment.utc(sdt, 'DD-MM-YYYY');
      const enDt = moment.utc(ndt, 'DD-MM-YYYY');

      if (enDt.isBefore(startDt)) {
        alert('To date cannot be a date prior to from date');
        return;
      }
    }
    this.isRequestMade = true;
    this.backendSrv
      .get(
        `${config.CMS_LECTURE_URL}?termId=${this.termId}&academicYearId=${this.academicYearId}` +
          `&sectionId=${this.sectionId}&batchId=${this.batchId}&branchId=${this.branchId}` +
          `&departmentId=${this.departmentId}&subjectId=${this.subjectId}` +
          `&teacherId=${this.teacherId}&fromDate=${sdt}&toDate=${ndt}`
      )
      .then(
        result => {
          this.lecturesCreated = result;
          const statusMsgDiv = document.getElementById('statusMsgDiv');
          if (result.length > 0) {
            this.isLecFound = 1;
            statusMsgDiv.className = 'hide';
          } else {
            this.isLecFound = 0;
            statusMsgDiv.className = '';
            statusMsgDiv.innerText = 'No lecture found.';
          }
          this.isRequestMade = false;
          this.activateTab(2);
        },
        error => {
          this.isRequestMade = false;
        }
      );

    // this.showLectureReport = 0;
  }

  showPreCreateLectureUi() {
    this.preCreateLectureTabIndex = 1;
    const preCreateLectureDiv = document.getElementById('preCreateLectureDiv');
    const preCreateLectureNextDiv = document.getElementById('preCreateLectureNextDiv');
    preCreateLectureDiv.className = 'gf-form-inline';
    preCreateLectureNextDiv.className = 'gf-form-inline';
  }
  hidePreCreateLectureUi() {
    this.preCreateLectureTabIndex = 0;
    const preCreateLectureDiv = document.getElementById('preCreateLectureDiv');
    preCreateLectureDiv.className = 'hide';
  }

  getCmsBatches() {
    if (this.departmentId === null || this.departmentId === undefined || this.departmentId === '') {
      return;
    }
    this.backendSrv.get(config.CMS_BATCH_BY_DEPARTMENT_URL + this.departmentId).then(result => {
      this.batches = result;
    });
  }

  getSubjects() {
    if (this.departmentId === null || this.departmentId === undefined || this.departmentId === '') {
      return;
    }
    this.backendSrv.get(config.CMS_SUBJECT_BY_DEPARTMENT_URL + '?departmentId=' + this.departmentId).then(result => {
      this.subjects = result;
      this.filterSubjects = result;
    });
  }

  getTeachers() {
    if (this.departmentId === null || this.departmentId === undefined || this.departmentId === '') {
      return;
    }
    this.backendSrv.get(config.CMS_TEACHER_BY_FILTER_PARAM_URL + '?deptId=' + this.departmentId).then(result => {
      this.teachers = result;
      this.filterTeachers = result;
    });
  }

  getCmsSections() {
    if (this.batchId === null || this.batchId === undefined || this.batchId === '') {
      return;
    }
    this.backendSrv.get(config.CMS_SECTION_BY_BATCH_URL + this.batchId).then(result => {
      this.sections = result;
    });
  }

  getSubjectOnBatchChangeForEdit(lectureObject) {
    const selSubjects = [];
    let sectionId = 0;
    if (lectureObject.attendancemaster.section !== null && lectureObject.attendancemaster.section !== undefined) {
      sectionId = lectureObject.attendancemaster.section.id;
    }
    this.backendSrv
      .get(
        config.CMS_AM_BY_BATCH_SECTION_URL +
          '?batchId=' +
          lectureObject.attendancemaster.batch.id +
          '&sectionId=' +
          sectionId +
          '&departmentId=' +
          this.departmentId
      )
      .then(result => {
        let sId = 0;
        for (const i in result) {
          const sb = result[i].teach.subject;
          if (sb.id !== sId) {
            selSubjects.push(sb);
            sId = sb.id;
          }
        }
      });

    return selSubjects;
    // $scope.selectedSubjects = selSubjects;
    // console.log("$scope.selectedSubjects from lecture model ::::::: ", $scope.selectedSubjects);
  }

  getAcademicYears() {
    this.backendSrv.get(config.CMS_ACADEMICYEAR_URL + this.academicYearId).then(result => {
      this.selectedAyYear = result;
      console.log('1. this.selectedAyYear:::: ', this.selectedAyYear);
    });
    return this.selectedAyYear;
  }
  editTimeTable(lectureObject) {
    const stDt = moment.utc(lectureObject.strLecDate, 'DD-MM-YYYY');
    const stTime = moment.utc(lectureObject.startTime, 'hh:mm:ss');
    const ndTime = moment.utc(lectureObject.endTime, 'hh:mm:ss');
    lectureObject.lecDate = stDt;
    const selectedSubjects = this.getSubjectOnBatchChangeForEdit(lectureObject);

    appEvents.emit('edit-timetable-modal', {
      icon: 'fa-trash',
      text: 'update',
      lecDateVal: moment.utc(stDt).format('YYYY-MM-DD'),
      startTimeVal: moment.utc(stTime).format('hh:mm:ss'),
      endTimeVal: moment.utc(ndTime).format('hh:mm:ss'),
      selectedSubjects: selectedSubjects,
      academicYear: this.selectedAyYear,
      // batches: this.batches,
      // sections: this.sections,
      // subjects: this.subjects,
      // teachers: this.teachers,
      // editBatchId: this.editBatchId,
      lectureObject: lectureObject,
      // selectedSections: this.$scope.selectedSections,
      // selectedSubjects: this.$scope.selectedSubjects,
      onEdit: (lecForm, lecture, lectureObject, selectedSubjects, academicYear, cb) => {
        this.$scope.lecForm = lecForm;
        this.$scope.lecture = lecture;
        this.$scope.selectedSubjects = selectedSubjects;
        // this.$scope.batches = batches;
        // this.$scope.sections = sections;
        // this.$scope.subjects = subjects;
        // this.$scope.editBatchId = editBatchId;
        this.$scope.lectureObject = lectureObject;
        this.$scope.academicYear = academicYear;
        this.$scope.updateTimeTable(cb);
      },
      // onChange: (lecForm, lecture, selectedSections) => {
      //   this.$scope.lecForm = lecForm;
      //   this.$scope.lecture = lecture;
      //   this.$scope.selectedSections = selectedSections;
      //   this.$scope.onChangeBatchForEdit();
      //   return this.$scope.selectedSections;
      // },
      // getSubjectOnBatchChange: (lecForm, lecture, selectedSubjects) => {
      //   this.$scope.lecForm = lecForm;
      //   this.$scope.lecture = lecture;
      //   this.$scope.selectedSubjects = selectedSubjects;
      //   this.$scope.getSubjectOnBatchChangeForEdit();
      //   return this.$scope.selectedSubjects;
      // },
      getTeacherOnSubjectChange: (lecForm, lecture, selectedTeachers) => {
        this.$scope.lecForm = lecForm;
        this.$scope.lecture = lecture;
        this.$scope.selectedTeachers = selectedTeachers;
        this.$scope.getTeacherOnSubjectChangeForEdit();
        return this.$scope.selectedTeachers;
      },
    });
  }

  deleteTimeTable(lectureObject) {
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Do you want to delete the lecture id ' + lectureObject.id + ' ?',
      icon: 'fa-trash',
      yesText: 'Delete',
      onConfirm: () => {
        // this.backendSrv.delete(config.CMS_LECTURE_URL + '/' + lectureObject.id).then(() => {
        //   this.viewAllLectures();
        // });
        this.backendSrv.delete(config.CMS_LECTURE_URL + '/' + lectureObject.id).then(result => {
          if (result.statusCode === 1) {
            alert(result.statusDesc);
          }
          this.viewAllLectures();
        });
      },
    });
  }
}
