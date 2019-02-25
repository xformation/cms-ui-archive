export class StaffSetupCtrl {
  navModel: any;
  sections: any[];
  activeTabStaffId: string;
  activeTabIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor() {
    this.activeTabIndex = 0;
    this.activeTabStaffId = 'staff_list';
  }

  activeTabStaffCreate() {
    this.activeTabStaffId = 'staff_create';
  }
  activeTabStaffList() {
    this.activeTabStaffId = 'staff_list';
  }
  activeTabStaffProfile() {
    this.activeTabStaffId = 'staff_profile';
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
