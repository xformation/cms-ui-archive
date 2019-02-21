import { appEvents } from 'app/core/core';

export class CollegeBranchesCtrl {
  branches: any;
  states: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.query = '';
    this.getBranches();
    this.getStates();
    this.$scope = $scope;
    $scope.create = () => {
      if (!$scope.branchForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/branches/', $scope.branch).then(() => {
        this.getBranches();
      });
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getBranches() {
    this.backendSrv.get(`http://localhost:8080/api/branches/`).then(result => {
      this.branches = result;
    });
  }

  getStates() {
    this.backendSrv.get(`http://localhost:8080/api/states/`).then(result => {
      this.states = result;
      console.log('states', this.states);
    });
  }

  navigateToPage(page) {
    this.getBranches();
  }

  deleteBranch(branch) {
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Do you want to delete ' + branch.branchName + '?',
      icon: 'fa-trash',
      yesText: 'Delete',
      onConfirm: () => {
        this.backendSrv.delete('http://localhost:8080/api/branches/' + branch.id).then(() => {
          this.getBranches();
        });
      },
    });
  }

  showModal() {
    const text = 'Do you want to delete the ';

    appEvents.emit('branch-modal', {
      text: text,
      icon: 'fa-trash',
      onCreate: (branchForm, branch) => {
        this.$scope.branchForm = branchForm;
        this.$scope.branch = branch;
        this.$scope.create();
      },
    });
  }
}
