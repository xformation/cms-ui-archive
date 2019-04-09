import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class LegalEntitiesCtrl {
  bankAccounts: any;
  authorizedSignatories: any;
  cmsSelectedBankAccounts: any;
  cmsSelectedAuthorizedSignatories: any;
  legalEntities: any;
  navModel: any;
  colleges: any;
  cmsBranches: any;
  cmsSelectedBranches: any;
  clgObject: any;
  activeTabIndex = 0;
  logoSrc = '/public/img/legalentity_logo.png';
  isLogoChanged = false;
  $scope;
  dependedObj = {};
  RestUrl: any;
  collegeId: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
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
    $scope.createBank = cb => {
      if (!$scope.bankForm.$valid) {
        return;
      }
      backendSrv.post(this.RestUrl.getBankAccountRestUrl(), $scope.bankAccount).then(
        () => {
          //this.getBank();
          this.getBankAccountsByCollegeId();
          console.log('Bank:', this.bankAccounts);
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

    $scope.createSignatory = cb => {
      if (!$scope.signatoryForm.$valid) {
        return;
      }
      backendSrv.post(this.RestUrl.getAuthorizedSignatoryRestUrl(), $scope.authorizedSignatory).then(
        () => {
          //this.getSignatory();
          this.getAuthorizedSignatoriesByCollegeId();
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

    $scope.create = () => {
      if (!$scope.legalForm.$valid) {
        return;
      }
      if (
        !$scope.legalEntity.legalNameOfTheCollege ||
        !$scope.legalEntity.dateOfIncorporation ||
        !$scope.legalEntity.collegeIdentificationNumber ||
        !$scope.legalEntity.typeOfCollege ||
        !$scope.legalEntity.registeredOfficeAddress1
      ) {
        this.activateTab(0);
        return;
      }
      if (
        !$scope.legalEntity.pan ||
        !$scope.legalEntity.tan ||
        !$scope.legalEntity.tanCircleNumber ||
        !$scope.legalEntity.citTdsLocation ||
        !$scope.legalEntity.formSignatory
      ) {
        this.activateTab(1);
        return;
      }
      if (!$scope.legalEntity.pfNumber || !$scope.legalEntity.pfSignatory || !$scope.legalEntity.pfRegistrationDate) {
        this.activateTab(2);
        return;
      }
      if (
        !$scope.legalEntity.esiNumber ||
        !$scope.legalEntity.esiSignatory ||
        !$scope.legalEntity.esiRegistrationDate
      ) {
        this.activateTab(3);
        return;
      }
      $scope.legalEntity.collegeId = this.collegeId;
      if (this.isLogoChanged) {
        $scope.legalEntity.logoFile = this.logoSrc;
      }
      backendSrv.post(this.RestUrl.getLegalEntitiesRestUrl(), $scope.legalEntity).then(() => {
        console.log('Legal:', this.legalEntities);
      });
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getFile(file) {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    const that = this;
    fileReader.onloadend = e => {
      that.logoSrc = e.target['result'];
      this.$scope.$apply();
    };
    fileReader.readAsDataURL(file);
    this.isLogoChanged = true;
  }

  /*getBank() {
    this.backendSrv.get(this.RestUrl.getBankAccountRestUrl()).then(result => {
      this.bankAccounts = result;
    });
  }*/

  getState() {
    this.backendSrv.get(this.RestUrl.getStateRestUrl()).then(result => {
      this.clgObject.states = result;
    });
  }

  getCity() {
    this.backendSrv.get(this.RestUrl.getCityRestUrl()).then(result => {
      this.clgObject.cities = result;
    });
  }

  getBranch() {
    this.backendSrv.get(this.RestUrl.getBranchRestUrl()).then(result => {
      this.clgObject.branches = result;
      this.cmsBranches = result;
      this.cmsSelectedBranches.branches = result;
    });
  }

  getBranchesByCollegeId() {
    if (!this.collegeId) {
      return;
    }
    this.backendSrv.get(this.RestUrl.getBranchesByCollegeIdRestUrl() + this.collegeId).then(result => {
      this.cmsSelectedBranches.branches = result;

      this.clgObject.branches = result;
      this.cmsBranches = result;
    });
  }

  getAuthorizedSignatoriesByCollegeId() {
    this.backendSrv.get(this.RestUrl.getAuthorizedSignatoriesByCollegeIdRestUrl() + this.collegeId).then(result => {
      this.cmsSelectedAuthorizedSignatories = result;
      this.authorizedSignatories = result;
    });
  }

  getBankAccountsByCollegeId() {
    this.backendSrv.get(this.RestUrl.getBankAccountsByCollegeIdRestUrl() + this.collegeId).then(result => {
      this.cmsSelectedBankAccounts = result;
      this.bankAccounts = result;
    });
  }

  /*getSignatory() {
    this.backendSrv.get(this.RestUrl.getAuthorizedSignatoryRestUrl()).then(result => {
      this.authorizedSignatories = result;
    });
  }*/

  getColleges() {
    this.backendSrv.get(this.RestUrl.getCollegeRestUrl()).then(result => {
      this.colleges = result;
      this.clgObject.colleges = result;
    });
  }
  Check() {
    console.log('Function printed');
  }

  getLegalEntity() {
    this.backendSrv.get(this.RestUrl.getLegalEntitiesRestUrl()).then(result => {
      this.legalEntities = result;
    });
  }

  showSignatoryModal() {
    const text = 'Add New';
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
      onCreate: (signatoryForm, authorizedSignatory, collegeId, cb) => {
        this.$scope.signatoryForm = signatoryForm;
        this.$scope.authorizedSignatory = authorizedSignatory;
        this.$scope.authorizedSignatory.collegeId = collegeId;
        this.$scope.createSignatory(cb);
      },
    });
  }

  showBankModal() {
    const text = 'Add New';
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
      onCreate: (bankForm, bankAccount, collegeId, cb) => {
        this.$scope.bankForm = bankForm;
        this.$scope.bankAccount = bankAccount;
        this.$scope.bankAccount.collegeId = collegeId;
        this.$scope.createBank(cb);
      },
    });
  }

  onChangeCollege() {
    this.getAuthorizedSignatoriesByCollegeId();
    this.getBankAccountsByCollegeId();
    this.getBranchesByCollegeId();
  }

  onChangeState() {
    const { stateId } = this.$scope.legalEntity;
    this.$scope.legalEntity = {};
    this.$scope.legalEntity.stateId = stateId;
    const { cities } = this.clgObject;
    const selectedCities = [];
    for (const i in cities) {
      const city = cities[i];
      if (city.stateId === parseInt(stateId, 10)) {
        selectedCities.push(city);
      }
    }
    this.clgObject.selectedCities = selectedCities;
    this.getBranchesByCollegeId();
  }

  onChangeCity() {
    const { stateId, cityId } = this.$scope.legalEntity;
    this.$scope.legalEntity = {
      stateId,
      cityId,
    };
    const { branches } = this.clgObject;
    const selectedBranches = [];
    for (const i in branches) {
      const branch = branches[i];
      if (branch.city != null) {
        if (branch.city.id === parseInt(cityId, 10)) {
          selectedBranches.push(branch);
        }
      }
    }
    this.clgObject.selectedBranches = selectedBranches;
    this.getBranchesByCollegeId();
  }

  onChangeBranch() {
    const { branchId, cityId, stateId } = this.$scope.legalEntity;
    for (const i in this.legalEntities) {
      const legalEntity = this.legalEntities[i];
      if (legalEntity.branchId === parseInt(branchId, 10)) {
        this.$scope.legalEntity = {
          ...legalEntity,
          stateId,
          cityId,
          branchId,
          dateOfIncorporation: new Date(legalEntity['dateOfIncorporation']),
          pfRegistrationDate: new Date(legalEntity['pfRegistrationDate']),
          esiRegistrationDate: new Date(legalEntity['esiRegistrationDate']),
          ptRegistrationDate: new Date(legalEntity['ptRegistrationDate']),
        };
        break;
      }
    }
  }

  onChangePfSignatory() {
    const { pfSignatory } = this.$scope.legalEntity;
    for (const i in this.authorizedSignatories) {
      const signatory = this.authorizedSignatories[i];
      if (signatory.id === parseInt(pfSignatory, 10)) {
        this.$scope.legalEntity.pfSignatoryFatherName = signatory.signatoryFatherName;
        this.$scope.legalEntity.pfSignatoryDesignation = signatory.signatoryDesignation;
        break;
      }
    }
  }

  onChangeEsiSignatory() {
    const { esiSignatory } = this.$scope.legalEntity;
    for (const i in this.authorizedSignatories) {
      const signatory = this.authorizedSignatories[i];
      if (signatory.id === parseInt(esiSignatory, 10)) {
        this.$scope.legalEntity.esiSignatoryFatherName = signatory.signatoryFatherName;
        this.$scope.legalEntity.esiSignatoryDesignation = signatory.signatoryDesignation;
        break;
      }
    }
  }
}
