import { appEvents } from 'app/core/core';

export class CollegeBranchesCtrl {
  branches: any;
  navModel: any;
  activeTabIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.getBranches();
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getBranches() {
    this.backendSrv.get(`http://localhost:8080/api/branches/`).then(result => {
      this.branches = result;
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
      onAdd: () => {
        this.backendSrv.post('http://localhost:8080/api/branches').then(() => {
          this.getBranches();
        });
      },
      scope: this.$scope,
    });
  }
}
