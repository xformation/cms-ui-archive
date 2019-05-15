var ClassSetupCtrl = /** @class */ (function () {
    /** @ngInject */
    function ClassSetupCtrl($scope) {
        this.activeTabIndex = 0;
        this.logoSrc = '/public/img/logo-placeholder.png';
        this.bgSrc = '/public/img/dashboard.png';
        this.activeTabIndex = 0;
        this.$scope = $scope;
        $scope.getFile = this.getFile.bind(this);
        $scope.getbgFile = this.getbgFile.bind(this);
    }
    ClassSetupCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    ClassSetupCtrl.prototype.getFile = function (file) {
        var _this = this;
        if (!file) {
            return;
        }
        var fileReader = new FileReader();
        var that = this;
        fileReader.onloadend = function (e) {
            that.logoSrc = e.target['result'];
            _this.$scope.$apply();
        };
        fileReader.readAsDataURL(file);
    };
    ClassSetupCtrl.prototype.getbgFile = function (file) {
        var _this = this;
        if (!file) {
            return;
        }
        var fileReader = new FileReader();
        var that = this;
        fileReader.onloadend = function (e) {
            that.bgSrc = e.target['result'];
            _this.$scope.$apply();
        };
        fileReader.readAsDataURL(file);
    };
    return ClassSetupCtrl;
}());
export { ClassSetupCtrl };
//# sourceMappingURL=ClassSetupCtrl.js.map