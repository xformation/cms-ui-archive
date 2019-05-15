var _this = this;
import * as tslib_1 from "tslib";
import { StackdriverAggregationCtrl } from '../query_aggregation_ctrl';
describe('StackdriverAggregationCtrl', function () {
    var ctrl;
    describe('aggregation and alignment options', function () {
        describe('when new query result is returned from the server', function () {
            describe('and result is double and gauge and no group by is used', function () {
                beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        ctrl = new StackdriverAggregationCtrl({
                            $on: function () { },
                            target: {
                                valueType: 'DOUBLE',
                                metricKind: 'GAUGE',
                                aggregation: { crossSeriesReducer: '', groupBys: [] },
                            },
                        }, {
                            replace: function (s) { return s; },
                        });
                        return [2 /*return*/];
                    });
                }); });
                it('should populate all aggregate options except two', function () {
                    ctrl.setAggOptions();
                    expect(ctrl.aggOptions.length).toBe(11);
                    expect(ctrl.aggOptions.map(function (o) { return o.value; })).toEqual(expect['not'].arrayContaining(['REDUCE_COUNT_TRUE', 'REDUCE_COUNT_FALSE']));
                });
                it('should populate all alignment options except two', function () {
                    ctrl.setAlignOptions();
                    expect(ctrl.alignOptions.length).toBe(9);
                    expect(ctrl.alignOptions.map(function (o) { return o.value; })).toEqual(expect['not'].arrayContaining(['REDUCE_COUNT_TRUE', 'REDUCE_COUNT_FALSE']));
                });
            });
            describe('and result is double and gauge and a group by is used', function () {
                beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        ctrl = new StackdriverAggregationCtrl({
                            $on: function () { },
                            target: {
                                valueType: 'DOUBLE',
                                metricKind: 'GAUGE',
                                aggregation: { crossSeriesReducer: 'REDUCE_NONE', groupBys: ['resource.label.projectid'] },
                            },
                        }, {
                            replace: function (s) { return s; },
                        });
                        return [2 /*return*/];
                    });
                }); });
                it('should populate all aggregate options except three', function () {
                    ctrl.setAggOptions();
                    expect(ctrl.aggOptions.length).toBe(10);
                    expect(ctrl.aggOptions.map(function (o) { return o.value; })).toEqual(expect['not'].arrayContaining(['REDUCE_COUNT_TRUE', 'REDUCE_COUNT_FALSE', 'REDUCE_NONE']));
                });
                it('should select some other reducer than REDUCE_NONE', function () {
                    ctrl.setAggOptions();
                    expect(ctrl.target.aggregation.crossSeriesReducer).not.toBe('');
                    expect(ctrl.target.aggregation.crossSeriesReducer).not.toBe('REDUCE_NONE');
                });
            });
        });
    });
});
//# sourceMappingURL=query_aggregation_ctrl.test.js.map