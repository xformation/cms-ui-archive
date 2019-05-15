import * as tslib_1 from "tslib";
import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
var LegalEntitiesCtrl = /** @class */ (function () {
    /** @ngInject */
    function LegalEntitiesCtrl($scope, backendSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.logoSrc = '/public/img/legalentity_logo.png';
        this.isLogoChanged = false;
        this.dependedObj = {};
        this.RestUrl = new GlobalRestUrlConstants();
        this.activeTabIndex = 0;
        this.$scope = $scope;
        this.$scope.legalEntity = {};
        $scope.getFile = this.getFile.bind(this);
        $scope.getBranchesByCollegeId = this.getBranchesByCollegeId.bind(this);
        this.collegeId = 0;
        //this.getBank();
        //this.getSignatory();
        this.getLegalEntity();
        this.getBranch();
        this.getState();
        this.getCity();
        this.Check();
        this.getColleges();
        this.clgObject = {};
        this.cmsSelectedBranches = {};
        $scope.createBank = function (cb) {
            if (!$scope.bankForm.$valid) {
                return;
            }
            backendSrv.post(_this.RestUrl.getBankAccountRestUrl(), $scope.bankAccount).then(function () {
                //this.getBank();
                _this.getBankAccountsByCollegeId();
                console.log('Bank:', _this.bankAccounts);
                if (cb) {
                    cb('1');
                }
            }, function () {
                if (cb) {
                    cb('0');
                }
            });
        };
        $scope.createSignatory = function (cb) {
            if (!$scope.signatoryForm.$valid) {
                return;
            }
            backendSrv.post(_this.RestUrl.getAuthorizedSignatoryRestUrl(), $scope.authorizedSignatory).then(function () {
                //this.getSignatory();
                _this.getAuthorizedSignatoriesByCollegeId();
                if (cb) {
                    cb('1');
                }
            }, function () {
                if (cb) {
                    cb('0');
                }
            });
        };
        $scope.create = function () {
            if (!$scope.legalForm.$valid) {
                return;
            }
            if (!$scope.legalEntity.legalNameOfTheCollege ||
                !$scope.legalEntity.dateOfIncorporation ||
                !$scope.legalEntity.collegeIdentificationNumber ||
                !$scope.legalEntity.typeOfCollege ||
                !$scope.legalEntity.registeredOfficeAddress1) {
                _this.activateTab(0);
                return;
            }
            if (!$scope.legalEntity.pan ||
                !$scope.legalEntity.tan ||
                !$scope.legalEntity.tanCircleNumber ||
                !$scope.legalEntity.citTdsLocation ||
                !$scope.legalEntity.formSignatory) {
                _this.activateTab(1);
                return;
            }
            if (!$scope.legalEntity.pfNumber || !$scope.legalEntity.pfSignatory || !$scope.legalEntity.pfRegistrationDate) {
                _this.activateTab(2);
                return;
            }
            if (!$scope.legalEntity.esiNumber ||
                !$scope.legalEntity.esiSignatory ||
                !$scope.legalEntity.esiRegistrationDate) {
                _this.activateTab(3);
                return;
            }
            $scope.legalEntity.collegeId = _this.collegeId;
            if (_this.isLogoChanged) {
                $scope.legalEntity.logoFile = _this.logoSrc;
            }
            backendSrv.post(_this.RestUrl.getLegalEntitiesRestUrl(), $scope.legalEntity).then(function () {
                console.log('Legal:', _this.legalEntities);
            });
        };
    }
    LegalEntitiesCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    LegalEntitiesCtrl.prototype.getFile = function (file) {
        var _this = this;
        if (!file) {
            return;
        }
        var fileReader = new FileReader();
        var that = this;
        fileReader.onloadend = function (e) {
            that.logoSrc = e.target['result'];
            _this.$scope.$apply();
        };
        fileReader.readAsDataURL(file);
        this.isLogoChanged = true;
    };
    /*getBank() {
      this.backendSrv.get(this.RestUrl.getBankAccountRestUrl()).then(result => {
        this.bankAccounts = result;
      });
    }*/
    LegalEntitiesCtrl.prototype.getState = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getStateRestUrl()).then(function (result) {
            _this.clgObject.states = result;
        });
    };
    LegalEntitiesCtrl.prototype.getCity = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getCityRestUrl()).then(function (result) {
            _this.clgObject.cities = result;
        });
    };
    LegalEntitiesCtrl.prototype.getBranch = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getBranchRestUrl()).then(function (result) {
            _this.clgObject.branches = result;
            _this.cmsBranches = result;
            _this.cmsSelectedBranches.branches = result;
        });
    };
    LegalEntitiesCtrl.prototype.getBranchesByCollegeId = function () {
        var _this = this;
        if (!this.collegeId) {
            return;
        }
        this.backendSrv.get(this.RestUrl.getBranchesByCollegeIdRestUrl() + this.collegeId).then(function (result) {
            _this.cmsSelectedBranches.branches = result;
            _this.clgObject.branches = result;
            _this.cmsBranches = result;
        });
    };
    LegalEntitiesCtrl.prototype.getAuthorizedSignatoriesByCollegeId = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getAuthorizedSignatoriesByCollegeIdRestUrl() + this.collegeId).then(function (result) {
            _this.cmsSelectedAuthorizedSignatories = result;
            _this.authorizedSignatories = result;
        });
    };
    LegalEntitiesCtrl.prototype.getBankAccountsByCollegeId = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getBankAccountsByCollegeIdRestUrl() + this.collegeId).then(function (result) {
            _this.cmsSelectedBankAccounts = result;
            _this.bankAccounts = result;
        });
    };
    /*getSignatory() {
      this.backendSrv.get(this.RestUrl.getAuthorizedSignatoryRestUrl()).then(result => {
        this.authorizedSignatories = result;
      });
    }*/
    LegalEntitiesCtrl.prototype.getColleges = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getCollegeRestUrl()).then(function (result) {
            _this.colleges = result;
            _this.clgObject.colleges = result;
        });
    };
    LegalEntitiesCtrl.prototype.Check = function () {
        console.log('Function printed');
    };
    LegalEntitiesCtrl.prototype.getLegalEntity = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getLegalEntitiesRestUrl()).then(function (result) {
            _this.legalEntities = result;
        });
    };
    LegalEntitiesCtrl.prototype.showSignatoryModal = function () {
        var _this = this;
        var text = 'Add New';
        if (this.collegeId <= 0) {
            alert('Select a college from college drop down');
            return;
        }
        this.getBranchesByCollegeId();
        appEvents.emit('signatory-modal', {
            text: text,
            icon: 'fa-trash',
            cmsSelectedBranches: this.cmsSelectedBranches,
            collegeId: this.collegeId,
            onCreate: function (signatoryForm, authorizedSignatory, collegeId, cb) {
                _this.$scope.signatoryForm = signatoryForm;
                _this.$scope.authorizedSignatory = authorizedSignatory;
                _this.$scope.authorizedSignatory.collegeId = collegeId;
                _this.$scope.createSignatory(cb);
            },
        });
    };
    LegalEntitiesCtrl.prototype.showBankModal = function () {
        var _this = this;
        var text = 'Add New';
        if (this.collegeId <= 0) {
            alert('Select a college from college drop down');
            return;
        }
        this.getBranchesByCollegeId();
        appEvents.emit('bank-modal', {
            text: text,
            icon: 'fa-trash',
            cmsSelectedBranches: this.cmsSelectedBranches,
            collegeId: this.collegeId,
            onCreate: function (bankForm, bankAccount, collegeId, cb) {
                _this.$scope.bankForm = bankForm;
                _this.$scope.bankAccount = bankAccount;
                _this.$scope.bankAccount.collegeId = collegeId;
                _this.$scope.createBank(cb);
            },
        });
    };
    LegalEntitiesCtrl.prototype.onChangeCollege = function () {
        this.getAuthorizedSignatoriesByCollegeId();
        this.getBankAccountsByCollegeId();
        this.getBranchesByCollegeId();
    };
    LegalEntitiesCtrl.prototype.onChangeState = function () {
        var stateId = this.$scope.legalEntity.stateId;
        this.$scope.legalEntity = {};
        this.$scope.legalEntity.stateId = stateId;
        var cities = this.clgObject.cities;
        var selectedCities = [];
        for (var i in cities) {
            var city = cities[i];
            if (city.stateId === parseInt(stateId, 10)) {
                selectedCities.push(city);
            }
        }
        this.clgObject.selectedCities = selectedCities;
        this.getBranchesByCollegeId();
    };
    LegalEntitiesCtrl.prototype.onChangeCity = function () {
        var _a = this.$scope.legalEntity, stateId = _a.stateId, cityId = _a.cityId;
        this.$scope.legalEntity = {
            stateId: stateId,
            cityId: cityId,
        };
        var branches = this.clgObject.branches;
        var selectedBranches = [];
        for (var i in branches) {
            var branch = branches[i];
            if (branch.city != null) {
                if (branch.city.id === parseInt(cityId, 10)) {
                    selectedBranches.push(branch);
                }
            }
        }
        this.clgObject.selectedBranches = selectedBranches;
        this.getBranchesByCollegeId();
    };
    LegalEntitiesCtrl.prototype.onChangeBranch = function () {
        var _a = this.$scope.legalEntity, branchId = _a.branchId, cityId = _a.cityId, stateId = _a.stateId;
        for (var i in this.legalEntities) {
            var legalEntity = this.legalEntities[i];
            if (legalEntity.branchId === parseInt(branchId, 10)) {
                this.$scope.legalEntity = tslib_1.__assign({}, legalEntity, { stateId: stateId,
                    cityId: cityId,
                    branchId: branchId, dateOfIncorporation: new Date(legalEntity['dateOfIncorporation']), pfRegistrationDate: new Date(legalEntity['pfRegistrationDate']), esiRegistrationDate: new Date(legalEntity['esiRegistrationDate']), ptRegistrationDate: new Date(legalEntity['ptRegistrationDate']) });
                break;
            }
        }
    };
    LegalEntitiesCtrl.prototype.onChangePfSignatory = function () {
        var pfSignatory = this.$scope.legalEntity.pfSignatory;
        for (var i in this.authorizedSignatories) {
            var signatory = this.authorizedSignatories[i];
            if (signatory.id === parseInt(pfSignatory, 10)) {
                this.$scope.legalEntity.pfSignatoryFatherName = signatory.signatoryFatherName;
                this.$scope.legalEntity.pfSignatoryDesignation = signatory.signatoryDesignation;
                break;
            }
        }
    };
    LegalEntitiesCtrl.prototype.onChangeEsiSignatory = function () {
        var esiSignatory = this.$scope.legalEntity.esiSignatory;
        for (var i in this.authorizedSignatories) {
            var signatory = this.authorizedSignatories[i];
            if (signatory.id === parseInt(esiSignatory, 10)) {
                this.$scope.legalEntity.esiSignatoryFatherName = signatory.signatoryFatherName;
                this.$scope.legalEntity.esiSignatoryDesignation = signatory.signatoryDesignation;
                break;
            }
        }
    };
    return LegalEntitiesCtrl;
}());
export { LegalEntitiesCtrl };
//# sourceMappingURL=LegalEntitiesCtrl.js.map