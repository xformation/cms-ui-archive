// import { appEvents } from 'app/core/core';
import * as angular from 'angular';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';

export class ImportCtrl {
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;
  exlFile: any;

  /** @ngInject */
  constructor($scope, private backendSrv, private $http) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
    $scope.file = '';
    this.exlFile = {};
    $scope.getFile = this.getFile.bind(this);

    $scope.uploadFile = () => {
      const data = new FormData();
      data.append('file', $scope.file, $scope.file.name);
      this.$http.post(this.RestUrl.getUploadCmsDataUrl() + '/college', data, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      }).then(response => {
        alert("success");
      }, error => {
        alert("failure");
      });
    };
  }

  getFile(file) {
    this.$scope.file = file;
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.exlFile = file;
    // }
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  navigateToPage(page) {
    // this.getLocations();
  }
}
