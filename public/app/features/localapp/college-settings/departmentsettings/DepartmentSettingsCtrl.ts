import { appEvents } from 'app/core/core';

export class DepartmentSettingsCtrl {
  departments: any;
  navModel: any;
  activeTabIndex = 0;
  $scope;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.getDepartments();
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getDepartments() {
    this.backendSrv.get(`http://localhost:8080/api/departments/`).then(result => {
      this.departments = result;
    });
  }

  showModal() {
    const text = 'Do you want to delete the ';

    appEvents.emit('department-modal', {
      text: text,
      icon: 'fa-trash',
    });
  }

  showImportModal() {
    const text = 'Do you want to delete the ';

    appEvents.emit('import-department-modal', {
      text: text,
      icon: 'fa-trash',
    });
  }
}
