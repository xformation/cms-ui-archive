import { appEvents } from 'app/core/core';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
import { config } from '../../config';

export class GeneralInfoCtrl {
  navModel: any;
  query: any;
  activeTabIndex = 0;
  logoSrc: any = '/public/img/college_logo.png';
  bgSrc: any = '/public/img/dashboard.png';
  isCollegeLogoChanged = false;
  isCollegeBgChanged = false;
  $scope: any;
  RestUrl: any;
  colleges: any;

  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.$scope = $scope;
    this.query = '';
    this.logoSrc = '/public/img/college_logo.png';
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
      backendSrv.post(config.COLLEGE_URL, $scope.cmsCollegeVo).then(result => {
        appEvents.emit('get_colleges', {});
        if (result === 200 || result === 201) {
          this.getColleges();
          alert('College data saved successfully.');
        } else if (result === 500) {
          this.getColleges();
          alert('College already exists.');
        } else {
          alert('Due to some error college data could not be saved!');
        }
      });
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getColleges() {
    this.backendSrv.get(config.COLLEGE_URL).then(result => {
      this.colleges = result;
    });
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
