import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
import { config } from '../../config';

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
  deletionStatus: any;
  isCollegeSelected: number;
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
    this.deletionStatus = 0;
    $scope.create = cb => {
      if (!$scope.branchForm.$valid) {
        return;
      }
      return backendSrv.post(this.RestUrl.getBranchRestUrl(), $scope.branch).then(
        () => {
          this.getBranches();
          if (cb) {
            cb('1');
          }
        },
        () => {
          if (cb) {
            cb('0');
          }
        }
      );
    };
    $scope.update = cb => {
      if (!$scope.branchForm.$valid) {
        return;
      }
      backendSrv.put(this.RestUrl.getBranchRestUrl(), $scope.branch).then(
        () => {
          this.getBranches();
          if (cb) {
            cb('1');
          }
        },
        () => {
          if (cb) {
            cb('0');
          }
        }
      );
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

    appEvents.on('get_colleges', this.getColleges.bind(this), $scope);
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
    this.backendSrv.get(config.COLLEGE_URL).then(result => {
      this.colleges = result;
    });
  }

  navigateToPage(page) {
    this.getBranches();
  }

  deleteBranch(branch) {
    this.deletionStatus = 0;
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Do you want to delete ' + branch.branchName + '?',
      icon: 'fa-trash',
      yesText: 'Delete',
      onConfirm: () => {
        this.backendSrv.delete(this.RestUrl.getBranchRestUrl() + branch.id).then(result => {
          this.deletionStatus = result;
          this.getBranches();
        });
      },
    });
  }

  editBranch(branch) {
    this.deletionStatus = 0;
    if (branch.state != null) {
      branch.stateId = branch.state.id.toString();
    }
    if (branch.city != null) {
      branch.cityId = branch.city.id.toString();
    }
    if (branch.college != null) {
      branch.collegeId = branch.college.id.toString();
    }
    this.$scope.branch = branch;
    this.$scope.onChangeState();

    appEvents.emit('branch-modal', {
      icon: 'fa-trash',
      text: 'update',
      branch: branch,
      states: this.states,
      cities: this.cities,
      colleges: this.colleges,
      selectedCities: this.$scope.selectedCities,
      onUpdate: (branchForm, branch, cb) => {
        this.$scope.branchForm = branchForm;
        this.$scope.branch = branch;
        this.$scope.update(cb);
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
    if (!this.colleges) {
      this.isCollegeSelected = 1;
      return;
    }
    appEvents.emit('branch-modal', {
      text: 'create',
      icon: 'fa-trash',
      states: this.states,
      cities: this.cities,
      colleges: this.colleges,
      selectedCities: this.$scope.selectedCities,
      onCreate: (branchForm, branch, cb) => {
        this.$scope.branchForm = branchForm;
        this.$scope.branch = branch;
        this.$scope.create(cb);
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
