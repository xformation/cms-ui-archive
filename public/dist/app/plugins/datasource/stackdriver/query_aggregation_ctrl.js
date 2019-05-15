import coreModule from 'app/core/core_module';
import * as options from './constants';
import { getAlignmentOptionsByMetric, getAggregationOptionsByMetric } from './functions';
import kbn from 'app/core/utils/kbn';
var StackdriverAggregation = /** @class */ (function () {
    function StackdriverAggregation() {
        return {
            templateUrl: 'public/app/plugins/datasource/stackdriver/partials/query.aggregation.html',
            controller: 'StackdriverAggregationCtrl',
            restrict: 'E',
            scope: {
                target: '=',
                alignmentPeriod: '<',
                refresh: '&',
            },
        };
    }
    return StackdriverAggregation;
}());
export { StackdriverAggregation };
var StackdriverAggregationCtrl = /** @class */ (function () {
    /** @ngInject */
    function StackdriverAggregationCtrl($scope, templateSrv) {
        this.$scope = $scope;
        this.templateSrv = templateSrv;
        this.$scope.ctrl = this;
        this.target = $scope.target;
        this.alignmentPeriods = options.alignmentPeriods;
        this.aggOptions = options.aggOptions;
        this.alignOptions = options.alignOptions;
        this.setAggOptions();
        this.setAlignOptions();
        var self = this;
        $scope.$on('metricTypeChanged', function () {
            self.setAggOptions();
            self.setAlignOptions();
        });
    }
    StackdriverAggregationCtrl.prototype.setAlignOptions = function () {
        var _this = this;
        this.alignOptions = getAlignmentOptionsByMetric(this.target.valueType, this.target.metricKind);
        if (!this.alignOptions.find(function (o) { return o.value === _this.templateSrv.replace(_this.target.aggregation.perSeriesAligner); })) {
            this.target.aggregation.perSeriesAligner = this.alignOptions.length > 0 ? this.alignOptions[0].value : '';
        }
    };
    StackdriverAggregationCtrl.prototype.setAggOptions = function () {
        var _this = this;
        this.aggOptions = getAggregationOptionsByMetric(this.target.valueType, this.target.metricKind);
        if (!this.aggOptions.find(function (o) { return o.value === _this.templateSrv.replace(_this.target.aggregation.crossSeriesReducer); })) {
            this.deselectAggregationOption('REDUCE_NONE');
        }
        if (this.target.aggregation.groupBys.length > 0) {
            this.aggOptions = this.aggOptions.filter(function (o) { return o.value !== 'REDUCE_NONE'; });
            this.deselectAggregationOption('REDUCE_NONE');
        }
    };
    StackdriverAggregationCtrl.prototype.formatAlignmentText = function () {
        var _this = this;
        var selectedAlignment = this.alignOptions.find(function (ap) { return ap.value === _this.templateSrv.replace(_this.target.aggregation.perSeriesAligner); });
        return kbn.secondsToHms(this.$scope.alignmentPeriod) + " interval (" + (selectedAlignment ? selectedAlignment.text : '') + ")";
    };
    StackdriverAggregationCtrl.prototype.deselectAggregationOption = function (notValidOptionValue) {
        var newValue = this.aggOptions.find(function (o) { return o.value !== notValidOptionValue; });
        this.target.aggregation.crossSeriesReducer = newValue ? newValue.value : '';
    };
    return StackdriverAggregationCtrl;
}());
export { StackdriverAggregationCtrl };
coreModule.directive('stackdriverAggregation', StackdriverAggregation);
coreModule.controller('StackdriverAggregationCtrl', StackdriverAggregationCtrl);
//# sourceMappingURL=query_aggregation_ctrl.js.map