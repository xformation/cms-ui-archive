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
  constructor($scope, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
    $scope.file = '';
    this.exlFile = {};
    $scope.getFile = this.getFile.bind(this);

    $scope.uploadFile = () => {
      // const file = $scope.file;
      const data = new FormData();
      data.append('file', $scope.file, $scope.file.name);
      const config = {
        transformRequest: angular.identity,
        // transformResponse: angular.identity,
        headers: {
          'Content-Type': undefined,
        },
      };
      this.backendSrv.post(this.RestUrl.getUploadCmsDataUrl() + '/college', data, config).then(result => {
        if (result === 200 || result === 201) {
          alert('Cms data data uploaded successfully.');
        } else {
          alert('Due to some error cms data could not be uploaded.');
        }
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
