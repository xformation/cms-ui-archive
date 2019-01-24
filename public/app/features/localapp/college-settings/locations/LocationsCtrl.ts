import { appEvents } from 'app/core/core';

export class LocationsCtrl {
  locations: any;
  navModel: any;
  query: any;
  activeTabIndex = 0;
  $scope: any;
  /** @ngInject */
  constructor($scope, private backendSrv) {
    this.activeTabIndex = 0;
    // this.$scope = $scope;
    this.query = '';
    this.getLocations();
    this.$scope = $scope;
    $scope.create = () => {
      console.log('Create start');
      if (!$scope.locationForm.$valid) {
        return;
      }
      backendSrv.post('http://localhost:8080/api/locations/', $scope.location).then(() => {
        this.getLocations();
      });
    };
    $scope.update = () => {
      if (!$scope.locationForm.$valid) {
        return;
      }
      backendSrv.put('http://localhost:8080/api/locations/' + $scope.location.id, $scope.location).then(() => {
        this.getLocations();
      });
    };
  }

  activateTab(tabIndex) {
    this.activeTabIndex = tabIndex;
  }

  getLocations() {
    this.backendSrv.get(`http://localhost:8080/api/locations/`).then(result => {
      this.locations = result;
    });
  }

  navigateToPage(page) {
    this.getLocations();
  }

  deleteLocation(location) {
    appEvents.emit('confirm-modal', {
      title: 'Delete',
      text: 'Do you want to delete ' + location.name + '?',
      icon: 'fa-trash',
      yesText: 'Delete',
      onConfirm: () => {
        this.backendSrv.delete('http://localhost:8080/api/locations/' + location.id).then(() => {
          this.getLocations();
        });
      },
    });
  }

  showModal() {
    const text = 'Do you want to delete the ';

    appEvents.emit('add-modal', {
      text: text,
      icon: 'fa-trash',
      onAdd: () => {
        this.backendSrv.post('http://localhost:8080/api/locations').then(() => {
          this.getLocations();
        });
      },
      scope: this.$scope,
    });
  }
}
