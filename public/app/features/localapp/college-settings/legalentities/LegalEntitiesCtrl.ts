import { appEvents } from 'app/core/core';

export class LegalEntitiesCtrl {
  bankAccounts: any;
  authorizedSignatories: any;
  authSignatory: any;
  legalEntities: any;
  navModel: any;
  branches: any;
  states: any;
  cities: any;
  activeTabIndex = 0;
  logoSrc = '/public/img/logo.png';
  $scope;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
    $scope.getFile = this.getFile.bind(this);
    this.getBank();
    this.getSignatory();
    this.getLegalEntity();
    this.getBranch();
    this.getState();
    this.getCity();
    this.Check();
    $scope.createBank = () => {
      if (!$scope.bankForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/bank-accounts/', $scope.bankAccount).then(() => {
        this.getBank();
        console.log('Bank:', this.bankAccounts);
      });
    };

    $scope.createSignatory = () => {
      if (!$scope.signatoryForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/authorized-signatories/', $scope.authorizedSignatory).then(() => {
        this.getSignatory();
        console.log('Authorised:', this.authorizedSignatories);
      });
    };

    $scope.create = () => {
      console.log('Legal:', this.legalEntities);
      if (!$scope.legalForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/legal-entities/', $scope.legalEntity).then(() => {
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
    this.backendSrv.get(`http://localhost:8080/api/bank-accounts/`).then(result => {
      this.bankAccounts = result;
    });
  }

  getState() {
    this.backendSrv.get(`http://localhost:8080/api/states/`).then(result => {
      this.states = result;
    });
  }

  getCity() {
    this.backendSrv.get(`http://localhost:8080/api/cities/`).then(result => {
      this.cities = result;
    });
  }

  getBranch() {
    this.backendSrv.get(`http://localhost:8080/api/branches/`).then(result => {
      this.branches = result;
    });
  }

  getSignatory() {
    this.backendSrv.get(`http://localhost:8080/api/authorized-signatories/`).then(result => {
      this.authorizedSignatories = result;
    });
  }

  Check() {
    console.log('Function printed');
  }

  getSignatorySetId(authorizedSignatory) {
    this.backendSrv.get(`http://localhost:8080/api/authorized-signatories/` + 1201).then(() => {
      // this.authSignatory = result;
    });
    console.log('IdData:', authorizedSignatory);
  }

  getLegalEntity() {
    this.backendSrv.get(`http://localhost:8080/api/legal-entities/`).then(result => {
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
}
