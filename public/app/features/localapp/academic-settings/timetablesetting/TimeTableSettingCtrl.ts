export class TimeTableSettingCtrl {
  navModel: any;
  activeTabIndex = 0;
  $scope;
  /** @ngInject */
  constructor($scope) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
  }

  // filter(range, function() {
  //   return function(input, total) {
  //     total = parseInt(total);
  //     for (let i = 0; i < total; i++) input.push(i);
  //     return input;
  //   };
  // });

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
