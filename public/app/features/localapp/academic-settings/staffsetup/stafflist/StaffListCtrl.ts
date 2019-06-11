import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';
import { appEvents } from 'app/core/core';

export class StaffListCtrl {
  teachers: any;
  departments: any;
  batches: any;
  departmentId: any;
  batchId: any;
  sex: any;
  staffType: any;
  RestUrl: any;
  filteredTeachers: any;

  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.filteredTeachers = [];
    this.getTeachers();
    this.getDepartments();
    appEvents.on('get_departments', this.getDepartments.bind(this), $scope);
  }

  getDepartments() {
    this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(result => {
      this.departments = result;
    });
  }

  getTeachers() {
    this.backendSrv.get(this.RestUrl.getTeacherRestUrl()).then(result => {
      this.teachers = result;
    });
  }

  onChangeFilter() {
    const length = this.teachers.length;
    this.filteredTeachers = [];
    for (let i = 0; i < length; i++) {
      const teacher = this.teachers[i];
      let filterNumber = 0;
      if (this.departmentId) {
        if (teacher.department.id === parseInt(this.departmentId, 10)) {
          filterNumber++;
        } else {
          continue;
        }
      }
      if (this.batchId) {
        if (teacher.batch.id === parseInt(this.batchId, 10)) {
          filterNumber++;
        } else {
          continue;
        }
      }
      if (this.sex) {
        if (teacher.sex === this.sex) {
          filterNumber++;
        } else {
          continue;
        }
      }
      if (this.staffType) {
        if (teacher.staffType === this.staffType) {
          filterNumber++;
        } else {
          continue;
        }
      }
      if (filterNumber > 0) {
        this.filteredTeachers.push(teacher);
      }
    }
  }
}
