import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class GeneralInfoCtrl {
  navModel: any;
  query: any;
  activeTabIndex = 0;
  logoSrc = '/public/img/college_logo.png';
  bgSrc = '/public/img/dashboard.png';
  isCollegeLogoChanged = false;
  isCollegeBgChanged = false;
  $scope: any;
  RestUrl: any;

  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.query = '';
    $scope.getFile = this.getFile.bind(this);
    $scope.getbgFile = this.getbgFile.bind(this);
    $scope.create = () => {
      if (!$scope.collegeForm.$valid) {
        return;
      }
      if (this.isCollegeLogoChanged) {
        $scope.cmsCollegeVo.logoImage = this.logoSrc;
      }
      if (this.isCollegeBgChanged) {
        $scope.cmsCollegeVo.bgImage = this.bgSrc;
      }
      backendSrv.post(this.RestUrl.getCollegeRestUrl(), $scope.cmsCollegeVo).then(result => {
        appEvents.emit("get_colleges", {});
        if (result === 200 || result === 201) {
          alert('College data saved successfully.');
        } else {
          alert('Due to some error college data could not be saved!');
        }
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
    this.isCollegeLogoChanged = true;
  }
  getbgFile(file) {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    const that = this;
    fileReader.onloadend = e => {
      that.bgSrc = e.target['result'];
      this.$scope.$apply();
    };
    fileReader.readAsDataURL(file);
    this.isCollegeBgChanged = true;
  }
}
