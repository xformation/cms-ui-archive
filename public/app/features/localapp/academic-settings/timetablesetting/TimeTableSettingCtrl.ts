export class TimeTableSettingCtrl {
  navModel: any;
  activeTabIndex = 0;
  $scope;
  /** @ngInject */
  constructor($scope) {
    this.activeTabIndex = 0;
    this.$scope = $scope;

    $scope.choices = [];
    const counter = 5;
    $scope.addNewChoice = () => {
      const newItemNo = $scope.choices.length + 1;
      for (let i = 0; i < counter; i++) {
        $scope.choices.push({ id: 'choice' + newItemNo, name: 'choice' + newItemNo });
      }
    };

    $scope.removeNewChoice = () => {
      const newItemNo = $scope.choices.length - 1;
      if (newItemNo !== 0) {
        $scope.choices.pop();
      }
    };

    $scope.showAddChoice = choice => {
      return choice.id === $scope.choices[$scope.choices.length - 1].id;
    };

    // $scope.choices = [];

    // $scope.addNewChoice = () => {
    //   const newItemNo = $scope.choices.length + 1;
    //   for (let i = 0; i < 3; i++) {
    //     $scope.choices.push({ newItemNo });
    //   }
    // };

    // $scope.removeNewChoice = () => {
    //   const newItemNo = $scope.choices.length - 1;
    //   if (newItemNo !== 0) {
    //     $scope.choices.pop();
    //   }
    // };

    // $scope.showAddChoice = (choice) => {
    //   return choice.id === $scope.choices[$scope.choices.length - 1].id;
    // };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }
}
