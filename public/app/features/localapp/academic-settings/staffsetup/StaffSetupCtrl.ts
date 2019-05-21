import { appEvents } from 'app/core/core';

export class StaffSetupCtrl {
  navModel: any;
  sections: any[];
  activeTabStaffId: string;
  activeTabIndex = 0;
  activeBtnIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor($scope) {
    this.activeTabIndex = 0;
    this.activeBtnIndex = 0;
    this.activeTabStaffId = 'staff_list';
    appEvents.on("change_staff_list",this.activeTabStaffList.bind(this),$scope);
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

  activeBtn(tabIndex) {
    this.activeBtnIndex = tabIndex;
  }
}
