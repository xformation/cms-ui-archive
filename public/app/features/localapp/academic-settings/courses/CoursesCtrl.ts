// import { appEvents } from 'app/core/core';

export class CoursesCtrl {
  navModel: any;
  query: any;
  activeTabIndex = 0;

  /** @ngInject */
  constructor($scope) {
    this.activeTabIndex = 0;
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
