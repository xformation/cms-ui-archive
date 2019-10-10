import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
import { config } from '../../config';

export class DepartmentSetupCtrl {
  departments: any;
  branches: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;
  academicYears: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.query = '';
    this.getDepartments();
    this.getBranches();
    this.getAcademicYears();
    this.$scope = $scope;
    $scope.create = () => {
      if (!$scope.departmentForm.$valid) {
        return;
      }
      backendSrv.post(this.RestUrl.getDepartmentRestUrl(), $scope.department).then(() => {
        appEvents.emit('get_departments', {});
        this.getDepartments();
      });
    };
    $scope.update = () => {
      if (!$scope.departmentForm.$valid) {
        return;
      }
      backendSrv.put(this.RestUrl.getDepartmentRestUrl(), $scope.department).then(() => {
        appEvents.emit('get_departments', {});
        this.getDepartments();
      });
    };
    appEvents.on('get_academicyears', this.getAcademicYears.bind(this), $scope);
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getDepartments() {
    this.backendSrv.get(this.RestUrl.getDepartmentRestUrl()).then(result => {
      this.departments = result;
    });
  }

  getBranches() {
    this.backendSrv.get(config.CMS_BRANCH_URL).then(result => {
      this.branches = result;
    });
  }

  getAcademicYears() {
    this.backendSrv.get(config.CMS_ACADEMICYEAR_URL).then(result => {
      this.academicYears = result;
    });
  }

  deleteDepartment(department) {
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Do you want to delete ' + department.name + '?',
      icon: 'fa-trash',
      yesText: 'Delete',
      onConfirm: () => {
        this.backendSrv.delete(this.RestUrl.getDepartmentRestUrl() + department.id).then(() => {
          appEvents.emit('get_departments', {});
          this.getDepartments();
        });
      },
    });
  }

  showModal() {
    appEvents.emit('department-modal', {
      text: 'create',
      icon: 'fa-trash',
      branches: this.branches,
      academicYears: this.academicYears,
      onCreate: (departmentForm, department) => {
        this.$scope.departmentForm = departmentForm;
        this.$scope.department = department;
        this.$scope.create();
      },
    });
  }

  editDepartment(department) {
    if (department.branch != null) {
      department.branchId = department.branch.id.toString();
    }
    if (department.academicyear != null) {
      department.academicyearId = department.academicyear.id.toString();
    }
    appEvents.emit('department-modal', {
      icon: 'fa-trash',
      text: 'update',
      branches: this.branches,
      academicYears: this.academicYears,
      department: department,
      onUpdate: (departmentForm, department) => {
        this.$scope.departmentForm = departmentForm;
        this.$scope.department = department;
        this.$scope.update();
      },
    });
  }
}
