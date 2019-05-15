import { appEvents } from 'app/core/core';
var LocationsCtrl = /** @class */ (function () {
    /** @ngInject */
    function LocationsCtrl($scope, backendSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.activeTabIndex = 0;
        this.query = '';
        this.getLocations();
        this.$scope = $scope;
        $scope.create = function () {
            if (!$scope.locationForm.$valid) {
                return;
            }
            backendSrv.post('http://localhost:8080/api/locations/', $scope.location).then(function () {
                _this.getLocations();
            });
        };
        $scope.update = function () {
            if (!$scope.locationForm.$valid) {
                return;
            }
            backendSrv.put('http://localhost:8080/api/locations/' + $scope.location.id, $scope.location).then(function () {
                // this.getLocations();
            });
        };
    }
    LocationsCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    LocationsCtrl.prototype.getLocations = function () {
        var _this = this;
        this.backendSrv.get("http://localhost:8080/api/locations/").then(function (result) {
            _this.locations = result;
        });
    };
    LocationsCtrl.prototype.navigateToPage = function (page) {
        this.getLocations();
    };
    LocationsCtrl.prototype.deleteLocation = function (location) {
        var _this = this;
        appEvents.emit('confirm-modal', {
            title: 'Delete',
            text: 'Do you want to delete ' + location.name + '?',
            icon: 'fa-trash',
            yesText: 'Delete',
            onConfirm: function () {
                _this.backendSrv.delete('http://localhost:8080/api/locations/' + location.id).then(function () {
                    _this.getLocations();
                });
            },
        });
    };
    LocationsCtrl.prototype.editLocation = function (location) {
        var _this = this;
        var text = location.name;
        appEvents.emit('edit-modal', {
            text: text,
            icon: 'fa-trash',
            onUpdate: function (locationForm, location) {
                _this.$scope.locationForm = locationForm;
                _this.$scope.location = location;
                _this.$scope.update();
            },
        });
    };
    LocationsCtrl.prototype.showModal = function () {
        var _this = this;
        var text = 'Do you want to delete the ';
        appEvents.emit('add-modal', {
            text: text,
            icon: 'fa-trash',
            onCreate: function (locationForm, location) {
                _this.$scope.locationForm = locationForm;
                _this.$scope.location = location;
                _this.$scope.create();
            },
        });
    };
    return LocationsCtrl;
}());
export { LocationsCtrl };
//# sourceMappingURL=LocationsCtrl.js.map