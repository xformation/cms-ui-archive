import { GlobalRestUrlConstants } from '../../GlobalRestUrlConstants';
var GeneralInfoCtrl = /** @class */ (function () {
    /** @ngInject */
    function GeneralInfoCtrl($scope, backendSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.activeTabIndex = 0;
        this.logoSrc = '/public/img/college_logo.png';
        this.bgSrc = '/public/img/dashboard.png';
        this.isCollegeLogoChanged = false;
        this.isCollegeBgChanged = false;
        this.RestUrl = new GlobalRestUrlConstants();
        this.activeTabIndex = 0;
        this.$scope = $scope;
        this.query = '';
        this.getColleges();
        $scope.getFile = this.getFile.bind(this);
        $scope.getbgFile = this.getbgFile.bind(this);
        $scope.create = function () {
            if (!$scope.collegeForm.$valid) {
                return;
            }
            if (_this.isCollegeLogoChanged) {
                $scope.cmsCollegeVo.logoImage = _this.logoSrc;
            }
            if (_this.isCollegeBgChanged) {
                $scope.cmsCollegeVo.bgImage = _this.bgSrc;
            }
            backendSrv.post(_this.RestUrl.getCollegeRestUrl(), $scope.cmsCollegeVo).then(function (result) {
                _this.getColleges();
                if (result === 200 || result === 201) {
                    console.log(_this.colleges);
                    alert('College data saved successfully.');
                }
                else {
                    alert('Due to some error college data could not be saved!');
                }
            });
        };
    }
    GeneralInfoCtrl.prototype.activateTab = function (tabIndex) {
        this.activeTabIndex = tabIndex;
    };
    GeneralInfoCtrl.prototype.getFile = function (file) {
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
        this.isCollegeLogoChanged = true;
    };
    GeneralInfoCtrl.prototype.getbgFile = function (file) {
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
        this.isCollegeBgChanged = true;
    };
    GeneralInfoCtrl.prototype.getColleges = function () {
        var _this = this;
        this.backendSrv.get(this.RestUrl.getCollegeRestUrl()).then(function (result) {
            _this.colleges = result;
            console.log(_this.colleges);
        });
    };
    return GeneralInfoCtrl;
}());
export { GeneralInfoCtrl };
//# sourceMappingURL=GeneralInfoCtrl.js.map