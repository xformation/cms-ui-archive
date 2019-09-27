import coreModule from '../../core/core_module';
import appEvents from 'app/core/app_events';
// import { appEvents, NavModel } from 'app/core/core';
import { config } from '../localapp/config';

export class NavbarPopupCtrl {
  isOpen: boolean;
  top: any;
  giveSearchFocus: number;
  // navModel: NavModel;
  globalSettings: any;
  ayId: any;
  branchId: any;
  departmentId: any;

  /** @ngInject */
  constructor(private $scope, private $timeout, private backendSrv) {
    appEvents.on('show-navbar-popup', this.showPupup.bind(this), $scope);
    appEvents.on('hide-navbar-popup', this.hidePopup.bind(this), $scope);
    $scope.user = $scope.ctrl.backendSrv.contextSrv.user.login;
    // this.getGlobalConfigurations($scope.ctrl.backendSrv.contextSrv.user.login);
    this.getGlobalConfigurations($scope.ctrl.backendSrv.contextSrv.user.login);
  }

  hidePopup() {
    this.isOpen = false;
    const overflowComponent: any = document.querySelector('.scroll-canvas');
    overflowComponent.style.overflow = 'auto';
  }

  showPupup() {
    this.isOpen = true;
    this.giveSearchFocus = 0;
    this.$timeout(() => {
      this.giveSearchFocus = this.giveSearchFocus + 1;
      const overflowComponent: any = document.querySelector('.scroll-canvas');
      overflowComponent.style.overflow = 'hidden';
      const navBar = document.querySelector('.page-nav');
      this.top = navBar.clientHeight;
      this.applyExistingPreference(this.$scope.ctrl.backendSrv.contextSrv.user.login);
      const objMsgDiv = document.getElementById('msgDiv');
      objMsgDiv.innerText = '';
    }, 100);
  }

  onKeyDownOnSearch(event) {
    if (event.keyCode === 27) {
      this.hidePopup();
    }
  }

  getGlobalConfigurations(userName) {
    this.backendSrv.get(config.CMS_GLOBAL_CONFIG_URL + '?userName=' + userName).then(result => {
      this.globalSettings = result;
      console.log('global settings in navbarPopup : ', this.globalSettings);
      this.$scope.selectedBranches = this.globalSettings.branchList;
      this.$scope.selectedAcademicYears = this.globalSettings.academicYearList;
      this.$scope.selectedDepartments = this.globalSettings.departmentList;
      this.$scope.selectedCollege = this.globalSettings.college;
      this.ayId = this.globalSettings.selectedAcademicYearId;
      if (this.ayId === null || this.ayId === undefined || this.ayId === 0) {
        this.ayId = this.globalSettings.cmsAcademicYearVo.id;
      }
      this.branchId = this.globalSettings.selectedBranchId;
      if (this.branchId === null || this.branchId === undefined || this.branchId === 0) {
        this.branchId = this.globalSettings.branch.id;
      }
      this.departmentId = this.globalSettings.selectedDepartmentId;

      this.$scope.cmsAcademicYearVo = this.globalSettings.cmsAcademicYearVo;
      this.$scope.branch = this.globalSettings.branch;
      this.$scope.department = this.globalSettings.department;
    });
  }

  applyExistingPreference(userName) {
    const objAy = document.getElementById('selAy');
    const objBranch = document.getElementById('selBranch');
    this.setSelectedValue(objAy, this.ayId);
    this.setSelectedValue(objBranch, this.branchId);
    const objDept = document.getElementById('selDept');
    this.setSelectedValue(objDept, this.departmentId);
  }

  setSelectedValue(selectObj, valueToSet) {
    for (let i = 0; i < selectObj.options.length; i++) {
      if (parseInt(selectObj.options[i].value, 10) === valueToSet) {
        selectObj.options[i].selected = true;
        return;
      }
    }
  }

  onChangeBranch() {
    if (!this.branchId) {
      this.$scope.selectedDepartments = {};
      return;
    }
    this.getDepartment(this.branchId);
  }
  getDepartment(bId) {
    this.backendSrv.get(config.CMS_DEPARTMENT_BY_BRANCH_URL + bId).then(result => {
      this.$scope.selectedDepartments = result;
    });
  }

  validateAndPostChanges() {
    if (!this.ayId) {
      alert('Please select academic year');
      return;
    }
    if (!this.branchId) {
      alert('Please select branch');
      return;
    }
    if (!this.departmentId) {
      alert('Please select department');
      return;
    }
    const objBtnApply = document.getElementById('btnApply');
    objBtnApply.setAttribute('disabled', 'disabled');
    this.applyChange();
    objBtnApply.removeAttribute('disabled');
    const objMsgDiv = document.getElementById('msgDiv');
    objMsgDiv.innerText = 'Preferences applied successfully';
  }

  async applyChange() {
    await this.backendSrv
      .post(
        config.CMS_GLOBAL_CONFIG_URL +
          '?userName=' +
          this.$scope.user +
          '&academicYearId=' +
          this.ayId +
          '&branchId=' +
          this.branchId +
          '&departmentId=' +
          this.departmentId
      )
      .then(result => {});
  }
}

export function navbarPopupDirective() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/navbar-popup/partials/navbarPopupCtrl.html',
    controller: NavbarPopupCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    scope: {},
  };
}

coreModule.directive('navbarPopup', navbarPopupDirective);
