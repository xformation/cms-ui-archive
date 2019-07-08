// import { appEvents } from 'app/core/core';
import * as angular from 'angular';
import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
import $ from 'jquery';

export class ImportCtrl {
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  RestUrl: any;
  exlFile: any;
  clgObject: any;
  entityId: any;
  entities: any;
  /** @ngInject */
  constructor($scope, private $http, private backendSrv) {
    this.RestUrl = new GlobalRestUrlConstants();
    this.activeTabIndex = 0;
    this.query = '';
    this.$scope = $scope;
    $scope.file = '';
    this.exlFile = {};
    $scope.getFile = this.getFile.bind(this);
    this.clgObject = {};
    this.entities = {};
    this.entityId = '';
    this.getEntities();

    $scope.uploadFile = () => {
      if (this.entityId === '') {
        alert('Please select an entity from entity dropdown.');
        return;
      }
      if ($scope.file.name === undefined || $scope.file.name === '' || $scope.file.name === null) {
        alert('Please upload an excel file.');
        return;
      }
      this.postData();
    };

    $(() => {
      //  customUploadButton = () => {
      function customUploadButton() {
        $('.js-button-file-upload-input').on('change', function(this: HTMLElement) {
          const val = $(this)
            .val()
            .split(/(\\|\/)/g)
            .pop();
          if (val !== '') {
            $('.js-button-file-upload-text')
              .text(val)
              .parent()
              .removeClass('not-selected');
          } else {
            $('.js-button-file-upload-text')
              .text('')
              .parent()
              .addClass('not-selected');
          }
        });
      }
      customUploadButton();
    });
  }

  async postData() {
    const data = new FormData();
    data.append('file', this.$scope.file, this.$scope.file.name);

    const resp = await this.$http.post(this.RestUrl.getUploadCmsDataUrl() + '/' + this.entityId, data, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined },
    });
    console.log('Post response : ', resp);
    alert(resp.data.statusDesc);
    // .then(
    //   response => {
    //     alert('Data import successful.');
    //   },
    //   error => {
    //     alert('Data import failed due to some error.');
    //   }
    // );
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
  getEntities() {
    this.backendSrv.get(this.RestUrl.getUploadCmsDataUrl()).then(result => {
      this.entities = result;
      console.log('table names: ', result);
    });
  }
}
