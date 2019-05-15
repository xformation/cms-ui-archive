import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
var CollegeBranchesCtrl = /** @class */ (function () {
    /** @ngInject */
    function CollegeBranchesCtrl($scope, backendSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
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
        $scope.create = function (cb) {
            if (!$scope.branchForm.$valid) {
                return;
            }
            return backendSrv.post(_this.RestUrl.getBranchRestUrl(), $scope.branch).then(function () {
                _this.getBranches();
                if (cb) {
                    cb('1');
                }
            }, function () {
                if (cb) {
                    cb('0');
                }
            });
        };
        $scope.update = function (cb) {
            if (!$scope.branchForm.$valid) {
                return;
            }
            backendSrv.put(_this.RestUrl.getBranchRestUrl(), $scope.branch).then(function () {
                _this.getBranches();
                if (cb) {
                    cb('1');
                }
            }, function () {
                if (cb) {
                    cb('0');
                }
            });
        };
        $scope.onChangeState = function () {
            var stateId = _this.$scope.branch.stateId;
            _this.$scope.branch = {};
            _this.$scope.branch.stateId = stateId;
            var selCities = [];
            for (var i in _this.cities) {
                var city = _this.cities[i];
                if (city.stateId === parseInt(stateId, 10)) {
                    selCities.push(city);
                }
            }
            $scope.selectedCities = selCities;
        };
    }
    CollegeBranchesCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    CollegeBranchesCtrl.prototype.getBranches = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getBranchRestUrl()).then(function (result) {
            _this.branches = result;
        });
    };
    CollegeBranchesCtrl.prototype.getState = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getStateRestUrl()).then(function (result) {
            _this.states = result;
        });
    };
    CollegeBranchesCtrl.prototype.getCity = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getCityRestUrl()).then(function (result) {
            _this.cities = result;
        });
    };
    CollegeBranchesCtrl.prototype.getColleges = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getCollegeRestUrl()).then(function (result) {
            _this.colleges = result;
        });
    };
    CollegeBranchesCtrl.prototype.navigateToPage = function (page) {
        this.getBranches();
    };
    CollegeBranchesCtrl.prototype.deleteBranch = function (branch) {
        var _this = this;
        this.deletionStatus = 0;
        appEvents.emit('confirm-modal', {
            title: 'Delete',
            text: 'Do you want to delete ' + branch.branchName + '?',
            icon: 'fa-trash',
            yesText: 'Delete',
            onConfirm: function () {
                _this.backendSrv.delete(_this.RestUrl.getBranchRestUrl() + branch.id).then(function (result) {
                    _this.deletionStatus = result;
                    _this.getBranches();
                });
            },
        });
    };
    CollegeBranchesCtrl.prototype.editBranch = function (branch) {
        var _this = this;
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
            onUpdate: function (branchForm, branch, cb) {
                _this.$scope.branchForm = branchForm;
                _this.$scope.branch = branch;
                _this.$scope.update(cb);
            },
            onChange: function (branchForm, branch, cities, selectedCities) {
                _this.$scope.branchForm = branchForm;
                _this.$scope.branch = branch;
                _this.$scope.cities = cities;
                _this.$scope.selectedCities = selectedCities;
                _this.$scope.onChangeState();
                return _this.$scope.selectedCities;
            },
        });
    };
    CollegeBranchesCtrl.prototype.showModal = function () {
        var _this = this;
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
            onCreate: function (branchForm, branch, cb) {
                _this.$scope.branchForm = branchForm;
                _this.$scope.branch = branch;
                _this.$scope.create(cb);
            },
            onChange: function (branchForm, branch, cities, selectedCities) {
                _this.$scope.branchForm = branchForm;
                _this.$scope.branch = branch;
                _this.$scope.cities = cities;
                _this.$scope.selectedCities = selectedCities;
                _this.$scope.onChangeState();
                return _this.$scope.selectedCities;
            },
        });
    };
    return CollegeBranchesCtrl;
}());
export { CollegeBranchesCtrl };
//# sourceMappingURL=CollegeBranchesCtrl.js.map