import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class CollegeBranchesCtrl {
  branches: any;
  navModel: any;
  states: any;
  cities: any;
  colleges: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;
  selectedCities: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
    this.getBranches();
    this.getState();
    this.getCity();
    this.getColleges();
    this.$scope.getState = this.getState.bind(this);
    this.$scope.getCity = this.getCity.bind(this);
    this.selectedCities = {};
    $scope.create = () => {
      if (!$scope.branchForm.$valid) {
        return;
      }
      backendSrv.post(this.RestUrl.getBranchRestUrl(), $scope.branch).then(() => {
        this.getBranches();
      });
    };
    $scope.update = () => {
      if (!$scope.branchForm.$valid) {
        return;
      }
      backendSrv.put(this.RestUrl.getBranchRestUrl(), $scope.branch).then(() => {
        this.getBranches();
      });
    };
    $scope.onChangeState = () => {
      const { stateId } = this.$scope.branch;
      this.$scope.branch = {};
      this.$scope.branch.stateId = stateId;
      const selCities = [];
      for (const i in this.cities) {
        const city = this.cities[i];
        if (city.stateId === parseInt(stateId, 10)) {
          selCities.push(city);
        }
      }
      $scope.selectedCities = selCities;
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getBranches() {
    this.backendSrv.get(this.RestUrl.getBranchRestUrl()).then(result => {
      this.branches = result;
    });
  }

  getState() {
    this.backendSrv.get(this.RestUrl.getStateRestUrl()).then(result => {
      this.states = result;
    });
  }

  getCity() {
    this.backendSrv.get(this.RestUrl.getCityRestUrl()).then(result => {
      this.cities = result;
    });
  }

  getColleges() {
    this.backendSrv.get(this.RestUrl.getCollegeRestUrl()).then(result => {
      this.colleges = result;
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
        this.backendSrv.delete(this.RestUrl.getBranchRestUrl() + branch.id).then(() => {
          this.getBranches();
        });
      },
    });
  }

  editBranch(branch) {
    appEvents.emit('branch-modal', {
      icon: 'fa-trash',
      text: 'update',
      branch: branch,
      states: this.states,
      cities: this.cities,
      colleges: this.colleges,
      selectedCities: this.$scope.selectedCities,
      onUpdate: (branchForm, branch) => {
        this.$scope.branchForm = branchForm;
        this.$scope.branch = branch;
        this.$scope.update();
      },
      onChange: (branchForm, branch, cities, selectedCities) => {
        this.$scope.branchForm = branchForm;
        this.$scope.branch = branch;
        this.$scope.cities = cities;
        this.$scope.selectedCities = selectedCities;
        this.$scope.onChangeState();
        return this.$scope.selectedCities;
      },
    });
  }

  showModal() {
    appEvents.emit('branch-modal', {
      text: 'create',
      icon: 'fa-trash',
      states: this.states,
      cities: this.cities,
      colleges: this.colleges,
      selectedCities: this.$scope.selectedCities,
      onCreate: (branchForm, branch) => {
        this.$scope.branchForm = branchForm;
        this.$scope.branch = branch;
        this.$scope.create();
      },
      onChange: (branchForm, branch, cities, selectedCities) => {
        this.$scope.branchForm = branchForm;
        this.$scope.branch = branch;
        this.$scope.cities = cities;
        this.$scope.selectedCities = selectedCities;
        this.$scope.onChangeState();
        return this.$scope.selectedCities;
      },
    });
  }
}
