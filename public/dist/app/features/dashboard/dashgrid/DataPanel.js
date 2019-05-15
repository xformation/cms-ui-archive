import * as tslib_1 from "tslib";
// Library
import React, { Component } from 'react';
// Services
import { getDatasourceSrv } from 'app/features/plugins/datasource_srv';
// Utils
import kbn from 'app/core/utils/kbn';
// Types
import { LoadingState } from 'app/types';
var DataPanel = /** @class */ (function (_super) {
    tslib_1.__extends(DataPanel, _super);
    function DataPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.dataSourceSrv = getDatasourceSrv();
        _this.isUnmounted = false;
        _this.issueQueries = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, isVisible, queries, datasource, panelId, dashboardId, timeRange, widthPixels, maxDataPoints, ds, minInterval, intervalRes, queryOptions, resp, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, isVisible = _a.isVisible, queries = _a.queries, datasource = _a.datasource, panelId = _a.panelId, dashboardId = _a.dashboardId, timeRange = _a.timeRange, widthPixels = _a.widthPixels, maxDataPoints = _a.maxDataPoints;
                        if (!isVisible) {
                            return [2 /*return*/];
                        }
                        if (!queries.length) {
                            this.setState({ loading: LoadingState.Done });
                            return [2 /*return*/];
                        }
                        this.setState({ loading: LoadingState.Loading });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.dataSourceSrv.get(datasource)];
                    case 2:
                        ds = _b.sent();
                        minInterval = this.props.minInterval || ds.interval;
                        intervalRes = kbn.calculateInterval(timeRange, widthPixels, minInterval);
                        queryOptions = {
                            timezone: 'browser',
                            panelId: panelId,
                            dashboardId: dashboardId,
                            range: timeRange,
                            rangeRaw: timeRange.raw,
                            interval: intervalRes.interval,
                            intervalMs: intervalRes.intervalMs,
                            targets: queries,
                            maxDataPoints: maxDataPoints || widthPixels,
                            scopedVars: {},
                            cacheTimeout: null,
                        };
                        console.log('Issuing DataPanel query', queryOptions);
                        return [4 /*yield*/, ds.query(queryOptions)];
                    case 3:
                        resp = _b.sent();
                        console.log('Issuing DataPanel query Resp', resp);
                        if (this.isUnmounted) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            loading: LoadingState.Done,
                            response: resp,
                            isFirstLoad: false,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        console.log('Loading error', err_1);
                        this.setState({ loading: LoadingState.Error, isFirstLoad: false });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            loading: LoadingState.NotStarted,
            response: {
                data: [],
            },
            isFirstLoad: true,
        };
        return _this;
    }
    DataPanel.prototype.componentDidMount = function () {
        this.issueQueries();
    };
    DataPanel.prototype.componentWillUnmount = function () {
        this.isUnmounted = true;
    };
    DataPanel.prototype.componentDidUpdate = function (prevProps) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!this.hasPropsChanged(prevProps)) {
                    return [2 /*return*/];
                }
                this.issueQueries();
                return [2 /*return*/];
            });
        });
    };
    DataPanel.prototype.hasPropsChanged = function (prevProps) {
        return this.props.refreshCounter !== prevProps.refreshCounter;
    };
    DataPanel.prototype.render = function () {
        var queries = this.props.queries;
        var _a = this.state, response = _a.response, loading = _a.loading, isFirstLoad = _a.isFirstLoad;
        var timeSeries = response.data;
        if (isFirstLoad && loading === LoadingState.Loading) {
            return this.renderLoadingSpinner();
        }
        if (!queries.length) {
            return (React.createElement("div", { className: "panel-empty" },
                React.createElement("p", null, "Add a query to get some data!")));
        }
        return (React.createElement(React.Fragment, null,
            this.renderLoadingSpinner(),
            this.props.children({
                timeSeries: timeSeries,
                loading: loading,
            })));
    };
    DataPanel.prototype.renderLoadingSpinner = function () {
        var loading = this.state.loading;
        if (loading === LoadingState.Loading) {
            return (React.createElement("div", { className: "panel-loading" },
                React.createElement("i", { className: "fa fa-spinner fa-spin" })));
        }
        return null;
    };
    DataPanel.defaultProps = {
        isVisible: true,
        panelId: 1,
        dashboardId: 1,
    };
    return DataPanel;
}(Component));
export { DataPanel };
//# sourceMappingURL=DataPanel.js.map