import { appEvents } from 'app/core/core';

export class DepartmentSetupCtrl {
  departments: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.query = '';
    this.getDepartments();
    this.$scope = $scope;
    $scope.create = () => {
      if (!$scope.departmentForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/departments/', $scope.department).then(() => {
        this.getDepartments();
      });
    };
    $scope.update = () => {
      if (!$scope.departmentForm.$valid) {
        return;
      }
      backendSrv.put('http://localhost:8080/api/departments/', $scope.department).then(() => {
        this.getDepartments();
      });
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getDepartments() {
    this.backendSrv.get(`http://localhost:8080/api/departments/`).then(result => {
      this.departments = result;
    });
  }

  deleteDepartment(department) {
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Do you want to delete ' + department.name + '?',
      icon: 'fa-trash',
      yesText: 'Delete',
      onConfirm: () => {
        this.backendSrv.delete('http://localhost:8080/api/departments/' + department.id).then(() => {
          this.getDepartments();
        });
      },
    });
  }

  showModal() {
    appEvents.emit('department-modal', {
      text: 'create',
      icon: 'fa-trash',
      onCreate: (departmentForm, department) => {
        this.$scope.departmentForm = departmentForm;
        this.$scope.department = department;
        this.$scope.create();
      },
    });
  }

  editDepartment(department) {
    appEvents.emit('department-modal', {
      icon: 'fa-trash',
      text: 'update',
      department: department,
      onUpdate: (departmentForm, department) => {
        this.$scope.departmentForm = departmentForm;
        this.$scope.department = department;
        this.$scope.update();
      },
    });
  }
}
