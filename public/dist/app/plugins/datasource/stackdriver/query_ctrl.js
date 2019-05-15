import * as tslib_1 from "tslib";
import _ from 'lodash';
import { QueryCtrl } from 'app/plugins/sdk';
import './query_aggregation_ctrl';
import './query_filter_ctrl';
var StackdriverQueryCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(StackdriverQueryCtrl, _super);
    /** @ngInject */
    function StackdriverQueryCtrl($scope, $injector) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.defaultDropdownValue = 'Select Metric';
        _this.defaultServiceValue = 'All Services';
        _this.defaults = {
            defaultProject: 'loading project...',
            metricType: _this.defaultDropdownValue,
            service: _this.defaultServiceValue,
            metric: '',
            unit: '',
            aggregation: {
                crossSeriesReducer: 'REDUCE_MEAN',
                alignmentPeriod: 'stackdriver-auto',
                perSeriesAligner: 'ALIGN_MEAN',
                groupBys: [],
            },
            filters: [],
            showAggregationOptions: false,
            aliasBy: '',
            metricKind: '',
            valueType: '',
        };
        _.defaultsDeep(_this.target, _this.defaults);
        _this.panelCtrl.events.on('data-received', _this.onDataReceived.bind(_this), $scope);
        _this.panelCtrl.events.on('data-error', _this.onDataError.bind(_this), $scope);
        return _this;
    }
    StackdriverQueryCtrl.prototype.onDataReceived = function (dataList) {
        this.lastQueryError = null;
        this.lastQueryMeta = null;
        var anySeriesFromQuery = _.find(dataList, { refId: this.target.refId });
        if (anySeriesFromQuery) {
            this.lastQueryMeta = anySeriesFromQuery.meta;
            this.lastQueryMeta.rawQueryString = decodeURIComponent(this.lastQueryMeta.rawQuery);
        }
    };
    StackdriverQueryCtrl.prototype.onDataError = function (err) {
        if (err.data && err.data.results) {
            var queryRes = err.data.results[this.target.refId];
            if (queryRes && queryRes.error) {
                this.lastQueryMeta = queryRes.meta;
                this.lastQueryMeta.rawQueryString = decodeURIComponent(this.lastQueryMeta.rawQuery);
                var jsonBody = void 0;
                try {
                    jsonBody = JSON.parse(queryRes.error);
                }
                catch (_a) {
                    this.lastQueryError = queryRes.error;
                }
                this.lastQueryError = jsonBody.error.message;
            }
        }
    };
    StackdriverQueryCtrl.templateUrl = 'partials/query.editor.html';
    return StackdriverQueryCtrl;
}(QueryCtrl));
export { StackdriverQueryCtrl };
//# sourceMappingURL=query_ctrl.js.map