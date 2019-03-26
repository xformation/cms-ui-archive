import { appEvents } from 'app/core/core';
import { config } from '../../config';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class LegalEntitiesCtrl {
  bankAccounts: any;
  authorizedSignatories: any;
  legalEntities: any;
  navModel: any;
  clgObject: any;
  activeTabIndex = 0;
  logoSrc = '/public/img/logo.png';
  $scope;
  dependedObj = {};
  RestUrl: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.$scope.legalEntity = {};
    $scope.getFile = this.getFile.bind(this);
    this.getBank();
    this.getSignatory();
    this.getLegalEntity();
    this.getBranch();
    this.getState();
    this.getCity();
    this.Check();

    this.clgObject = {};

    $scope.createBank = () => {
      if (!$scope.bankForm.$valid) {
        return;
      }
      backendSrv.post(`${config.api_url}/api/bank-accounts/`, $scope.bankAccount).then(() => {
        this.getBank();
        console.log('Bank:', this.bankAccounts);
      });
    };

    $scope.createSignatory = () => {
      if (!$scope.signatoryForm.$valid) {
        return;
      }
      backendSrv.post(`${config.api_url}/api/authorized-signatories/`, $scope.authorizedSignatory).then(() => {
        this.getSignatory();
        console.log('Authorised:', this.authorizedSignatories);
      });
    };

    $scope.create = () => {
      if (!$scope.legalForm.$valid) {
        return;
      }
      backendSrv.post(`${config.api_url}/api/legal-entities/`, $scope.legalEntity).then(() => {
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
  }

  getBank() {
    this.backendSrv.get(`${config.api_url}/api/bank-accounts/`).then(result => {
      this.bankAccounts = result;
    });
  }

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
    });
  }

  getSignatory() {
    this.backendSrv.get(`${config.api_url}/api/authorized-signatories/`).then(result => {
      this.authorizedSignatories = result;
    });
  }

  Check() {
    console.log('Function printed');
  }

  getLegalEntity() {
    this.backendSrv.get(`${config.api_url}/api/legal-entities/`).then(result => {
      this.legalEntities = result;
    });
  }

  showSignatoryModal() {
    const text = 'Add New';

    appEvents.emit('signatory-modal', {
      text: text,
      icon: 'fa-trash',
      onCreate: (signatoryForm, authorizedSignatory) => {
        this.$scope.signatoryForm = signatoryForm;
        this.$scope.authorizedSignatory = authorizedSignatory;
        this.$scope.createSignatory();
      },
    });
  }

  showBankModal() {
    const text = 'Add New';

    appEvents.emit('bank-modal', {
      text: text,
      icon: 'fa-trash',
      onCreate: (bankForm, bankAccount) => {
        this.$scope.bankForm = bankForm;
        this.$scope.bankAccount = bankAccount;
        this.$scope.createBank();
      },
    });
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
      if (branch.cityId === parseInt(cityId, 10)) {
        selectedBranches.push(branch);
      }
    }
    this.clgObject.selectedBranches = selectedBranches;
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
