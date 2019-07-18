import { GlobalRestUrlConstants } from '../../../GlobalRestUrlConstants';
import { appEvents } from 'app/core/core';
// import * as fileExport from 'app/core/utils/file_export';


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
  isCheckAll: any;
  asRows = true;
  excel = false;
  data: any;

  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.isCheckAll = false;
    this.filteredTeachers = [];
    this.asRows = true;
    this.excel = false;
    this.getTeachers();
    this.getDepartments();
    this.getBatches();
    appEvents.on('get_departments', this.getDepartments.bind(this), $scope);
  }

  getBatches() {
    this.backendSrv.get(this.RestUrl.getBatchRestUrl()).then(result => {
      this.batches = result;
    });
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
        if (teacher.department.academicyear.id === parseInt(this.batchId, 10)) {
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


  exportStaffs() {
    const staffsToExport = [];
    const length = this.filteredTeachers.length;
    const fileType: any = document.querySelector("#fileType");
    if (fileType.value === "") {
      alert("Please select a file type to export");
      return;
    }

    for (let x = 0; x < length; x++) {
      for (let i = 0; i < length; i++) {
        const teacher = this.filteredTeachers[i];
        // const chkBox: any = document.querySelector("#chk");
        if (teacher) {
          staffsToExport.push(teacher);
        }
      }
    }
    if (staffsToExport.length > 0) {
      const csvContent = this.convertArrayOfObjectsToCSV(staffsToExport);
      this.download(csvContent, "stafflist.csv", "text/csv;encoding:utf-8");
    } else {
      alert("Please select records to export");
    }
  }


  convertArrayOfObjectsToCSV(data: any) {
    let result: any, ctr: any, keys: any, columnDelimiter: any, lineDelimiter: any;

    data = data || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = ',';
    lineDelimiter = '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach((item: any) => {
      ctr = 0;
      keys.forEach((key: any) => {
        if (ctr > 0) {
          result += columnDelimiter;

          result += item[key];
          ctr++;
        }
      });
      result += lineDelimiter;
    });

    return result;
  }

  download(content: any, fileName: any, mimeType: any) {
    const a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';

    if (navigator.msSaveBlob) { // IE10
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
  }

  checkAllTeachers() {
    const length = this.filteredTeachers.length;
    for (let i = 0; i < length; i++) {
      const teacher = this.filteredTeachers[i];
      teacher.isChecked = this.isCheckAll;
    }
  }

  onTeacherCheckedChange(index) {
    if (this.filteredTeachers[index]) {
      if (!this.filteredTeachers[index].isCheckAll) {
        this.isCheckAll = false;
      }
    }
  }
}
