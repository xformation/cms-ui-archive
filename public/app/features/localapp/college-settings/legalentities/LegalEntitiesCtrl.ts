import { appEvents } from 'app/core/core';

export class LegalEntitiesCtrl {
  bankAccounts: any;
  authorizedSignatories: any;
  navModel: any;
  activeTabIndex = 0;
  logoSrc = '/public/img/logo.png';
  $scope;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    this.$scope = $scope;
    $scope.getFile = this.getFile.bind(this);
    this.getBank();

    $scope.createBank = () => {
      if (!$scope.bankForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/bank-accounts/', $scope.bankAccount).then(() => {
        this.getBank();
      });
    };

    // this.getSignatory();
    // $scope.createSignatory = () => {
    //   if (!$scope.signatoryForm.$valid) {
    //     return;
    //   }
    //   backendSrv.post('http://localhost:8080/api/authorizedSignatories/', $scope.authorizedSignatory).then(() => {
    //     this.getSignatory();
    //   });
    // };
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
      console.log('Bank:', this.bankAccounts);
    });
  }

  // getSignatory() {
  //   this.backendSrv.get(`http://localhost:8080/api/authorizedSignatories/`).then(result => {
  //     this.authorizedSignatories = result;
  //     console.log('authorised', this.authorizedSignatories);
  //   });
  // }

  showSignatoryModal() {
    const text = 'Do you want to delete the ';

    appEvents.emit('signatory-modal', {
      text: text,
      icon: 'fa-trash',
    });
  }
  showBankModal() {
    const text = 'Do you want to delete the ';

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
