export class StaffCreateCtrl {
  navModel: any;
  sections: any[];
  activeTabStaffId: string;
  activeTabIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor() {
    this.activeTabIndex = 0;
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
