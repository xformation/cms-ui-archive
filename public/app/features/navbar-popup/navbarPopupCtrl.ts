import coreModule from '../../core/core_module';
// import { react2AngularDirective } from '../../core/utils/react2angular';
// import { GlobalPrefSectionItem } from '../../../app/core/components/sidemenu/GlobalPrefSectionItem';
import appEvents from 'app/core/app_events';
// import { appEvents, NavModel } from 'app/core/core';
import { config } from '../localapp/config';
import store from '../../core/store';
// import { OnInit, Router, ActivatedRoute } from 'angular';
// import { CmsGlobalParameters } from './cms_globalparameter';
// import { Observable } from 'rxjs';
import wsCmsBackendServiceClient from './wsCmsBackendServiceClient';

export class NavbarPopupCtrl {
  isOpen: boolean;
  top: any;
  giveSearchFocus: number;
  // navModel: NavModel;
  globalSettings: any;
  ayId: any;
  branchId: any;
  departmentId: any;
  // cmsGlobalParameters: CmsGlobalParameters;

  /** @ngInject */
  constructor(private $scope, private $timeout, private backendSrv) {
    appEvents.on('show-navbar-popup', this.showPupup.bind(this), $scope);
    appEvents.on('hide-navbar-popup', this.hidePopup.bind(this), $scope);
    $scope.user = $scope.ctrl.backendSrv.contextSrv.user.login;
    // this.getGlobalConfigurations($scope.ctrl.backendSrv.contextSrv.user.login);
    this.ayId = 0;
    this.branchId = 0;
    this.departmentId = 0;
    this.initGlobalObjectFromRest($scope.user);
    // this.getGlobalConfigurations($scope.ctrl.backendSrv.contextSrv.user.login);
    // $scope.init();
  }
  // getGlobalParmsFromService() {
  //   const globalParametersObservable = this.globalParameterSrv.getGlobalParameters();
  //   globalParametersObservable.subscribe((cmsGlobalParameters: CmsGlobalParameters) => {
  //     this.cmsGlobalParameters = cmsGlobalParameters;
  //   });
  // }

  // initGlobalObject() {
  //   console.log('global settings in navbarPopup : ', this.cmsGlobalParameters);
  //   this.$scope.selectedAcademicYears = this.cmsGlobalParameters.academicYearList;
  //   this.$scope.selectedBranches = this.cmsGlobalParameters.branchList;
  //   this.$scope.selectedDepartments = this.cmsGlobalParameters.departmentList;

  //   this.ayId = this.cmsGlobalParameters.academicYearId;
  //   this.branchId = this.cmsGlobalParameters.branchId;
  //   this.departmentId = this.cmsGlobalParameters.departmentId;

  //   this.$scope.selectedCollege = this.cmsGlobalParameters.college;
  //   this.$scope.cmsAcademicYearVo = this.cmsGlobalParameters.academicYear;
  //   this.$scope.branch = this.cmsGlobalParameters.branch;
  //   this.$scope.department = this.cmsGlobalParameters.department;

  // }

  async initGlobalObjectFromRest(userName) {
    await this.backendSrv
      .get(config.CMS_GLOBAL_CONFIG_URL + '?userName=' + userName)
      .then(result => {
        this.globalSettings = result;
        console.log('global settings in navbarPopup : ', this.globalSettings);
        this.$scope.selectedBranches = this.globalSettings.branchList;
        this.$scope.selectedAcademicYears = this.globalSettings.academicYearList;
        this.$scope.selectedDepartments = {};
        this.$scope.originalDepartmentList = this.globalSettings.departmentList;
        this.$scope.selectedCollege = this.globalSettings.college;
        this.ayId = this.globalSettings.selectedAcademicYearId;
        if (this.ayId === null || this.ayId === undefined || this.ayId === 0) {
          this.ayId = this.globalSettings.academicYear.id;
        }
        this.branchId = this.globalSettings.selectedBranchId;
        if (this.branchId === null || this.branchId === undefined || this.branchId === 0) {
          if (this.globalSettings.branch) {
            this.branchId = this.globalSettings.branch.id;
          }
        }
        this.departmentId = this.globalSettings.selectedDepartmentId;

        this.$scope.academicYear = this.globalSettings.academicYear;
        this.$scope.branch = this.globalSettings.branch;
        this.$scope.department = this.globalSettings.department;
        // this.cmsGlobalParameters = new CmsGlobalParameters(this.ayId, this.branchId, this.departmentId,
        //   this.globalSettings.academicYearList, this.globalSettings.branchList, this.globalSettings.departmentList,
        //   this.globalSettings.college, this.globalSettings.cmsAcademicYearVo, this.globalSettings.branch, this.globalSettings.department);
        store.set('ayId', this.ayId);
        store.set('bId', this.branchId);
        store.set('deptId', this.departmentId);
      })
      .catch(() => {
        console.log('Due to some error/exception, cannot access global settings. ');
      });
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
    // store.set('', '');
  }

  onKeyDownOnSearch(event) {
    if (event.keyCode === 27) {
      this.hidePopup();
    }
  }

  getGlobalConfigurations(userName) {
    this.backendSrv
      .get(config.CMS_GLOBAL_CONFIG_URL + '?userName=' + userName)
      .then(result => {
        this.globalSettings = result;
        console.log('global settings in navbarPopup : ', this.globalSettings);
        this.$scope.selectedBranches = this.globalSettings.branchList;
        this.$scope.selectedAcademicYears = this.globalSettings.academicYearList;
        this.$scope.selectedDepartments = this.globalSettings.departmentList;
        this.$scope.selectedCollege = this.globalSettings.college;
        this.ayId = this.globalSettings.selectedAcademicYearId;
        if (this.ayId === null || this.ayId === undefined || this.ayId === 0) {
          this.ayId = this.globalSettings.academicYear.id;
        }
        this.branchId = this.globalSettings.selectedBranchId;
        if (this.branchId === null || this.branchId === undefined || this.branchId === 0) {
          if (this.globalSettings.branch) {
            this.branchId = this.globalSettings.branch.id;
          }
        }
        this.departmentId = this.globalSettings.selectedDepartmentId;

        this.$scope.academicYear = this.globalSettings.academicYear;
        this.$scope.branch = this.globalSettings.branch;
        this.$scope.department = this.globalSettings.department;
        store.set('ayId', this.ayId);
        store.set('bId', this.branchId);
        store.set('deptId', this.departmentId);
      })
      .catch(() => {
        console.log('Due to some error/exception, cannot access global settings. ');
      });
  }

  applyExistingPreference(userName) {
    if (userName === 'admin' || userName === 'cmsadmin') {
      const objAy = document.getElementById('selAy');
      const objBranch = document.getElementById('selBranch');
      this.setSelectedValue(objAy, this.ayId);
      this.setSelectedValue(objBranch, this.branchId);
      const objDept = document.getElementById('selDept');
      this.setSelectedValue(objDept, this.departmentId);
    } else {
      const objAy = document.getElementById('hdnAyId');
      const objBranch = document.getElementById('hdnBranchId');
      this.setSelectedValue(objAy, this.ayId);
      this.setSelectedValue(objBranch, this.branchId);
      const objDept = document.getElementById('hdnDeptId');
      this.setSelectedValue(objDept, this.departmentId);
    }

    store.set('ayId', this.ayId);
    store.set('bId', this.branchId);
    store.set('deptId', this.departmentId);
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
    const temp = this.$scope.originalDepartmentList;
    this.$scope.selectedDepartments = {};
    if (!this.branchId) {
      return;
    }
    const temp2 = [];
    for (let i = 0; i < temp.length; i++) {
      if (parseInt(temp[i].branchId, 10) === parseInt(this.branchId, 10)) {
        temp2.push(temp[i]);
      }
    }
    this.$scope.selectedDepartments = temp2;

    // this.getDepartment(this.branchId);
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
    // window.location.reload();
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
      .then(result => {
        console.log('Global settings successfully applied.');
      })
      .catch(() => {
        console.log('Due to some error/exception, cannot access global settings. ');
      });
    this.registerSocket();
    store.set('ayId', this.ayId);
    store.set('bId', this.branchId);
    store.set('deptId', this.departmentId);
  }

  registerSocket() {
    // let self = this;
    const socket = wsCmsBackendServiceClient.getInstance();

    socket.onmessage = (response: any) => {
      //   let message = JSON.parse(response.data);
      console.log('message received from server on navbar popup ::: ', response);
    };

    socket.onopen = () => {
      console.log('broadcast_selected_preferences. Logged in user : ' + this.backendSrv.contextSrv.user.login);
      socket.send(this.backendSrv.contextSrv.user.login);
    };

    window.onbeforeunload = () => {
      console.log('websocket connection is going to be closed with cms backend service');
    };
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
