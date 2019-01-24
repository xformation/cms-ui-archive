import { appEvents } from 'app/core/core';

export class DepartmentSettingsCtrl {
  navModel: any;
  activeTabIndex = 0;
  $scope;
  /** @ngInject */
  constructor($scope) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
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
