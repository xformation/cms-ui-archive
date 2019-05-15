import * as tslib_1 from "tslib";
import React from 'react';
import { hot } from 'react-hot-loader';
import _ from 'lodash';
import store from 'app/core/store';
import { DEFAULT_RANGE, calculateResultsFromQueryTransactions, ensureQueries, getIntervals, generateKey, generateQueryKeys, hasNonEmptyQuery, makeTimeSeriesList, updateHistory, } from 'app/core/utils/explore';
import { DataSourcePicker } from 'app/core/components/Select/DataSourcePicker';
import TableModel from 'app/core/table_model';
import { Emitter } from 'app/core/utils/emitter';
import * as dateMath from 'app/core/utils/datemath';
import Panel from './Panel';
import QueryRows from './QueryRows';
import Graph from './Graph';
import Logs from './Logs';
import Table from './Table';
import ErrorBoundary from './ErrorBoundary';
import { Alert } from './Error';
import TimePicker, { parseTime } from './TimePicker';
/**
 * Explore provides an area for quick query iteration for a given datasource.
 * Once a datasource is selected it populates the query section at the top.
 * When queries are run, their results are being displayed in the main section.
 * The datasource determines what kind of query editor it brings, and what kind
 * of results viewers it supports.
 *
 * QUERY HANDLING
 *
 * TLDR: to not re-render Explore during edits, query editing is not "controlled"
 * in a React sense: values need to be pushed down via `initialQueries`, while
 * edits travel up via `this.modifiedQueries`.
 *
 * By default the query rows start without prior state: `initialQueries` will
 * contain one empty DataQuery. While the user modifies the DataQuery, the
 * modifications are being tracked in `this.modifiedQueries`, which need to be
 * used whenever a query is sent to the datasource to reflect what the user sees
 * on the screen. Query"react-popper": "^0.7.5", rows can be initialized or reset using `initialQueries`,
 * by giving the respec"react-popper": "^0.7.5",tive row a new key. This wipes the old row and its state.
 * This property is als"react-popper": "^0.7.5",o used to govern how many query rows there are (minimum 1).
 *
 * This flow makes sure that a query row can be arbitrarily complex without the
 * fear of being wiped or re-initialized via props. The query row is free to keep
 * its own state while the user edits or builds a query. Valid queries can be sent
 * up to Explore via the `onChangeQuery` prop.
 *
 * DATASOURCE REQUESTS
 *
 * A click on Run Query creates transactions for all DataQueries for all expanded
 * result viewers. New runs are discarding previous runs. Upon completion a transaction
 * saves the result. The result viewers construct their data from the currently existing
 * transactions.
 *
 * The result viewers determine some of the query options sent to the datasource, e.g.,
 * `format`, to indicate eventual transformations by the datasources' result transformers.
 */
var Explore = /** @class */ (function (_super) {
    tslib_1.__extends(Explore, _super);
    function Explore(props) {
        var _this = _super.call(this, props) || this;
        _this.getRef = function (el) {
            _this.el = el;
        };
        _this.onAddQueryRow = function (index) {
            // Local cache
            _this.modifiedQueries[index + 1] = tslib_1.__assign({}, generateQueryKeys(index + 1));
            _this.setState(function (state) {
                var initialQueries = state.initialQueries, queryTransactions = state.queryTransactions;
                var nextQueries = initialQueries.slice(0, index + 1).concat([
                    tslib_1.__assign({}, _this.modifiedQueries[index + 1])
                ], initialQueries.slice(index + 1));
                // Ongoing transactions need to update their row indices
                var nextQueryTransactions = queryTransactions.map(function (qt) {
                    if (qt.rowIndex > index) {
                        return tslib_1.__assign({}, qt, { rowIndex: qt.rowIndex + 1 });
                    }
                    return qt;
                });
                return {
                    initialQueries: nextQueries,
                    logsHighlighterExpressions: undefined,
                    queryTransactions: nextQueryTransactions,
                };
            });
        };
        _this.onChangeDatasource = function (option) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var origin, datasourceName, datasource;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        origin = this.state.datasource;
                        this.setState({
                            datasource: null,
                            datasourceError: null,
                            datasourceLoading: true,
                            queryTransactions: [],
                        });
                        datasourceName = option.value;
                        return [4 /*yield*/, this.props.datasourceSrv.get(datasourceName)];
                    case 1:
                        datasource = _a.sent();
                        this.setDatasource(datasource, origin);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onChangeQuery = function (value, index, override) {
            // Null value means reset
            if (value === null) {
                value = tslib_1.__assign({}, generateQueryKeys(index));
            }
            // Keep current value in local cache
            _this.modifiedQueries[index] = value;
            if (override) {
                _this.setState(function (state) {
                    // Replace query row by injecting new key
                    var initialQueries = state.initialQueries, queryTransactions = state.queryTransactions;
                    var query = tslib_1.__assign({}, value, generateQueryKeys(index));
                    var nextQueries = initialQueries.slice();
                    nextQueries[index] = query;
                    _this.modifiedQueries = nextQueries.slice();
                    // Discard ongoing transaction related to row query
                    var nextQueryTransactions = queryTransactions.filter(function (qt) { return qt.rowIndex !== index; });
                    return {
                        initialQueries: nextQueries,
                        queryTransactions: nextQueryTransactions,
                    };
                }, _this.onSubmit);
            }
            else if (_this.state.datasource.getHighlighterExpression && _this.modifiedQueries.length === 1) {
                // Live preview of log search matches. Can only work on single row query for now
                _this.updateLogsHighlights(value);
            }
        };
        _this.onChangeTime = function (nextRange, scanning) {
            var range = tslib_1.__assign({}, nextRange);
            if (_this.state.scanning && !scanning) {
                _this.onStopScanning();
            }
            _this.setState({ range: range, scanning: scanning }, function () { return _this.onSubmit(); });
        };
        _this.onClickClear = function () {
            _this.onStopScanning();
            _this.modifiedQueries = ensureQueries();
            _this.setState(function (prevState) { return ({
                initialQueries: _this.modifiedQueries.slice(),
                queryTransactions: [],
                showingStartPage: Boolean(prevState.StartPage),
            }); }, _this.saveState);
        };
        _this.onClickCloseSplit = function () {
            var onChangeSplit = _this.props.onChangeSplit;
            if (onChangeSplit) {
                onChangeSplit(false);
            }
        };
        _this.onClickGraphButton = function () {
            _this.setState(function (state) {
                var showingGraph = !state.showingGraph;
                var nextQueryTransactions = state.queryTransactions;
                if (!showingGraph) {
                    // Discard transactions related to Graph query
                    nextQueryTransactions = state.queryTransactions.filter(function (qt) { return qt.resultType !== 'Graph'; });
                }
                return { queryTransactions: nextQueryTransactions, showingGraph: showingGraph };
            }, function () {
                if (_this.state.showingGraph) {
                    _this.onSubmit();
                }
            });
        };
        _this.onClickLogsButton = function () {
            _this.setState(function (state) {
                var showingLogs = !state.showingLogs;
                var nextQueryTransactions = state.queryTransactions;
                if (!showingLogs) {
                    // Discard transactions related to Logs query
                    nextQueryTransactions = state.queryTransactions.filter(function (qt) { return qt.resultType !== 'Logs'; });
                }
                return { queryTransactions: nextQueryTransactions, showingLogs: showingLogs };
            }, function () {
                if (_this.state.showingLogs) {
                    _this.onSubmit();
                }
            });
        };
        // Use this in help pages to set page to a single query
        _this.onClickExample = function (query) {
            var nextQueries = [tslib_1.__assign({}, query, generateQueryKeys())];
            _this.modifiedQueries = nextQueries.slice();
            _this.setState({ initialQueries: nextQueries }, _this.onSubmit);
        };
        _this.onClickSplit = function () {
            var onChangeSplit = _this.props.onChangeSplit;
            if (onChangeSplit) {
                var state = _this.cloneState();
                onChangeSplit(true, state);
            }
        };
        _this.onClickTableButton = function () {
            _this.setState(function (state) {
                var showingTable = !state.showingTable;
                if (showingTable) {
                    return { showingTable: showingTable, queryTransactions: state.queryTransactions };
                }
                // Toggle off needs discarding of table queries
                var nextQueryTransactions = state.queryTransactions.filter(function (qt) { return qt.resultType !== 'Table'; });
                var results = calculateResultsFromQueryTransactions(nextQueryTransactions, state.datasource, state.graphInterval);
                return tslib_1.__assign({}, results, { queryTransactions: nextQueryTransactions, showingTable: showingTable });
            }, function () {
                if (_this.state.showingTable) {
                    _this.onSubmit();
                }
            });
        };
        _this.onClickLabel = function (key, value) {
            _this.onModifyQueries({ type: 'ADD_FILTER', key: key, value: value });
        };
        _this.onModifyQueries = function (action, index) {
            var datasource = _this.state.datasource;
            if (datasource && datasource.modifyQuery) {
                var preventSubmit_1 = action.preventSubmit;
                _this.setState(function (state) {
                    var initialQueries = state.initialQueries, queryTransactions = state.queryTransactions;
                    var nextQueries;
                    var nextQueryTransactions;
                    if (index === undefined) {
                        // Modify all queries
                        nextQueries = initialQueries.map(function (query, i) { return (tslib_1.__assign({}, datasource.modifyQuery(_this.modifiedQueries[i], action), generateQueryKeys(i))); });
                        // Discard all ongoing transactions
                        nextQueryTransactions = [];
                    }
                    else {
                        // Modify query only at index
                        nextQueries = initialQueries.map(function (query, i) {
                            // Synchronise all queries with local query cache to ensure consistency
                            // TODO still needed?
                            return i === index
                                ? tslib_1.__assign({}, datasource.modifyQuery(_this.modifiedQueries[i], action), generateQueryKeys(i)) : query;
                        });
                        nextQueryTransactions = queryTransactions
                            // Consume the hint corresponding to the action
                            .map(function (qt) {
                            if (qt.hints != null && qt.rowIndex === index) {
                                qt.hints = qt.hints.filter(function (hint) { return hint.fix.action !== action; });
                            }
                            return qt;
                        })
                            // Preserve previous row query transaction to keep results visible if next query is incomplete
                            .filter(function (qt) { return preventSubmit_1 || qt.rowIndex !== index; });
                    }
                    _this.modifiedQueries = nextQueries.slice();
                    return {
                        initialQueries: nextQueries,
                        queryTransactions: nextQueryTransactions,
                    };
                }, 
                // Accepting certain fixes do not result in a well-formed query which should not be submitted
                !preventSubmit_1 ? function () { return _this.onSubmit(); } : null);
            }
        };
        _this.onRemoveQueryRow = function (index) {
            // Remove from local cache
            _this.modifiedQueries = _this.modifiedQueries.slice(0, index).concat(_this.modifiedQueries.slice(index + 1));
            _this.setState(function (state) {
                var initialQueries = state.initialQueries, queryTransactions = state.queryTransactions;
                if (initialQueries.length <= 1) {
                    return null;
                }
                // Remove row from react state
                var nextQueries = initialQueries.slice(0, index).concat(initialQueries.slice(index + 1));
                // Discard transactions related to row query
                var nextQueryTransactions = queryTransactions.filter(function (qt) { return qt.rowIndex !== index; });
                var results = calculateResultsFromQueryTransactions(nextQueryTransactions, state.datasource, state.graphInterval);
                return tslib_1.__assign({}, results, { initialQueries: nextQueries, logsHighlighterExpressions: undefined, queryTransactions: nextQueryTransactions });
            }, function () { return _this.onSubmit(); });
        };
        _this.onStartScanning = function () {
            _this.setState({ scanning: true }, _this.scanPreviousRange);
        };
        _this.scanPreviousRange = function () {
            var scanRange = _this.timepickerRef.current.move(-1, true);
            _this.setState({ scanRange: scanRange });
        };
        _this.onStopScanning = function () {
            clearTimeout(_this.scanTimer);
            _this.setState(function (state) {
                var queryTransactions = state.queryTransactions;
                var nextQueryTransactions = queryTransactions.filter(function (qt) { return qt.scanning && !qt.done; });
                return { queryTransactions: nextQueryTransactions, scanning: false, scanRange: undefined };
            });
        };
        _this.onSubmit = function () {
            var _a = _this.state, showingLogs = _a.showingLogs, showingGraph = _a.showingGraph, showingTable = _a.showingTable, supportsGraph = _a.supportsGraph, supportsLogs = _a.supportsLogs, supportsTable = _a.supportsTable;
            // Keep table queries first since they need to return quickly
            if (showingTable && supportsTable) {
                _this.runQueries('Table', {
                    format: 'table',
                    instant: true,
                    valueWithRefId: true,
                }, function (data) { return data[0]; });
            }
            if (showingGraph && supportsGraph) {
                _this.runQueries('Graph', {
                    format: 'time_series',
                    instant: false,
                }, makeTimeSeriesList);
            }
            if (showingLogs && supportsLogs) {
                _this.runQueries('Logs', { format: 'logs' });
            }
            _this.saveState();
        };
        _this.updateLogsHighlights = _.debounce(function (value, index) {
            _this.setState(function (state) {
                var datasource = state.datasource;
                if (datasource.getHighlighterExpression) {
                    var logsHighlighterExpressions = [state.datasource.getHighlighterExpression(value)];
                    return { logsHighlighterExpressions: logsHighlighterExpressions };
                }
                return null;
            });
        }, 500);
        _this.saveState = function () {
            var _a = _this.props, stateKey = _a.stateKey, onSaveState = _a.onSaveState;
            onSaveState(stateKey, _this.cloneState());
        };
        var splitState = props.splitState;
        var initialQueries;
        if (splitState) {
            // Split state overrides everything
            _this.state = splitState;
            initialQueries = splitState.initialQueries;
        }
        else {
            var _a = props.urlState, datasource = _a.datasource, queries = _a.queries, range = _a.range;
            initialQueries = ensureQueries(queries);
            var initialRange = { from: parseTime(range.from), to: parseTime(range.to) } || tslib_1.__assign({}, DEFAULT_RANGE);
            // Millies step for helper bar charts
            var initialGraphInterval = 15 * 1000;
            _this.state = {
                datasource: null,
                datasourceError: null,
                datasourceLoading: null,
                datasourceMissing: false,
                datasourceName: datasource,
                exploreDatasources: [],
                graphInterval: initialGraphInterval,
                graphResult: [],
                initialQueries: initialQueries,
                history: [],
                logsResult: null,
                queryTransactions: [],
                range: initialRange,
                scanning: false,
                showingGraph: true,
                showingLogs: true,
                showingStartPage: false,
                showingTable: true,
                supportsGraph: null,
                supportsLogs: null,
                supportsTable: null,
                tableResult: new TableModel(),
            };
        }
        _this.modifiedQueries = initialQueries.slice();
        _this.exploreEvents = new Emitter();
        _this.timepickerRef = React.createRef();
        return _this;
    }
    Explore.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var datasourceSrv, datasourceName, datasources, exploreDatasources, datasource;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datasourceSrv = this.props.datasourceSrv;
                        datasourceName = this.state.datasourceName;
                        if (!datasourceSrv) {
                            throw new Error('No datasource service passed as props.');
                        }
                        datasources = datasourceSrv.getExternal();
                        exploreDatasources = datasources.map(function (ds) { return ({
                            value: ds.name,
                            name: ds.name,
                            meta: ds.meta,
                        }); });
                        if (!(datasources.length > 0)) return [3 /*break*/, 6];
                        this.setState({ datasourceLoading: true, exploreDatasources: exploreDatasources });
                        datasource = void 0;
                        if (!datasourceName) return [3 /*break*/, 2];
                        return [4 /*yield*/, datasourceSrv.get(datasourceName)];
                    case 1:
                        datasource = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, datasourceSrv.get()];
                    case 3:
                        datasource = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.setDatasource(datasource)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        this.setState({ datasourceMissing: true });
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Explore.prototype.componentWillUnmount = function () {
        this.exploreEvents.removeAllListeners();
        clearTimeout(this.scanTimer);
    };
    Explore.prototype.setDatasource = function (datasource, origin) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, initialQueries, range, supportsGraph, supportsLogs, supportsTable, datasourceId, datasourceError, testResult, error_1, historyKey, history, modifiedQueries, nextQueries, StartPage, graphInterval;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.state, initialQueries = _a.initialQueries, range = _a.range;
                        supportsGraph = datasource.meta.metrics;
                        supportsLogs = datasource.meta.logs;
                        supportsTable = datasource.meta.tables;
                        datasourceId = datasource.meta.id;
                        datasourceError = null;
                        // Keep ID to track selection
                        this.requestedDatasourceId = datasourceId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, datasource.testDatasource()];
                    case 2:
                        testResult = _b.sent();
                        datasourceError = testResult.status === 'success' ? null : testResult.message;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        datasourceError = (error_1 && error_1.statusText) || 'Network error';
                        return [3 /*break*/, 4];
                    case 4:
                        if (datasourceId !== this.requestedDatasourceId) {
                            // User already changed datasource again, discard results
                            return [2 /*return*/];
                        }
                        historyKey = "grafana.explore.history." + datasourceId;
                        history = store.getObject(historyKey, []);
                        if (datasource.init) {
                            datasource.init();
                        }
                        modifiedQueries = this.modifiedQueries;
                        if (!origin) return [3 /*break*/, 8];
                        if (!(origin.meta.id === datasource.meta.id)) return [3 /*break*/, 5];
                        // Keep same queries if same type of datasource
                        modifiedQueries = this.modifiedQueries.slice();
                        return [3 /*break*/, 8];
                    case 5:
                        if (!datasource.importQueries) return [3 /*break*/, 7];
                        return [4 /*yield*/, datasource.importQueries(this.modifiedQueries, origin.meta)];
                    case 6:
                        // Datasource-specific importers
                        modifiedQueries = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        // Default is blank queries
                        modifiedQueries = ensureQueries();
                        _b.label = 8;
                    case 8:
                        nextQueries = initialQueries.map(function (q, i) { return (tslib_1.__assign({}, modifiedQueries[i], generateQueryKeys(i))); });
                        this.modifiedQueries = modifiedQueries;
                        StartPage = datasource.pluginExports.ExploreStartPage;
                        graphInterval = getIntervals(range, datasource, this.el ? this.el.offsetWidth : 0).intervalMs;
                        this.setState({
                            StartPage: StartPage,
                            datasource: datasource,
                            datasourceError: datasourceError,
                            graphInterval: graphInterval,
                            history: history,
                            supportsGraph: supportsGraph,
                            supportsLogs: supportsLogs,
                            supportsTable: supportsTable,
                            datasourceLoading: false,
                            datasourceName: datasource.name,
                            initialQueries: nextQueries,
                            logsHighlighterExpressions: undefined,
                            showingStartPage: Boolean(StartPage),
                        }, function () {
                            if (datasourceError === null) {
                                _this.onSubmit();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Explore.prototype.buildQueryOptions = function (query, queryOptions) {
        var _a = this.state, datasource = _a.datasource, range = _a.range;
        var _b = getIntervals(range, datasource, this.el.offsetWidth), interval = _b.interval, intervalMs = _b.intervalMs;
        var configuredQueries = [
            tslib_1.__assign({}, query, queryOptions),
        ];
        // Clone range for query request
        // const queryRange: RawTimeRange = { ...range };
        // const { from, to, raw } = this.timeSrv.timeRange();
        // Most datasource is using `panelId + query.refId` for cancellation logic.
        // Using `format` here because it relates to the view panel that the request is for.
        // However, some datasources don't use `panelId + query.refId`, but only `panelId`.
        // Therefore panel id has to be unique.
        var panelId = queryOptions.format + "-" + query.key;
        return {
            interval: interval,
            intervalMs: intervalMs,
            panelId: panelId,
            targets: configuredQueries,
            range: {
                from: dateMath.parse(range.from, false),
                to: dateMath.parse(range.to, true),
                raw: range,
            },
            rangeRaw: range,
            scopedVars: {
                __interval: { text: interval, value: interval },
                __interval_ms: { text: intervalMs, value: intervalMs },
            },
        };
    };
    Explore.prototype.startQueryTransaction = function (query, rowIndex, resultType, options) {
        var queryOptions = this.buildQueryOptions(query, options);
        var transaction = {
            query: query,
            resultType: resultType,
            rowIndex: rowIndex,
            id: generateKey(),
            done: false,
            latency: 0,
            options: queryOptions,
            scanning: this.state.scanning,
        };
        // Using updater style because we might be modifying queryTransactions in quick succession
        this.setState(function (state) {
            var queryTransactions = state.queryTransactions;
            // Discarding existing transactions of same type
            var remainingTransactions = queryTransactions.filter(function (qt) { return !(qt.resultType === resultType && qt.rowIndex === rowIndex); });
            // Append new transaction
            var nextQueryTransactions = remainingTransactions.concat([transaction]);
            var results = calculateResultsFromQueryTransactions(nextQueryTransactions, state.datasource, state.graphInterval);
            return tslib_1.__assign({}, results, { queryTransactions: nextQueryTransactions, showingStartPage: false, graphInterval: queryOptions.intervalMs });
        });
        return transaction;
    };
    Explore.prototype.completeQueryTransaction = function (transactionId, result, latency, queries, datasourceId) {
        var _this = this;
        var datasource = this.state.datasource;
        if (datasource.meta.id !== datasourceId) {
            // Navigated away, queries did not matter
            return;
        }
        this.setState(function (state) {
            var history = state.history, queryTransactions = state.queryTransactions;
            var scanning = state.scanning;
            // Transaction might have been discarded
            var transaction = queryTransactions.find(function (qt) { return qt.id === transactionId; });
            if (!transaction) {
                return null;
            }
            // Get query hints
            var hints;
            if (datasource.getQueryHints) {
                hints = datasource.getQueryHints(transaction.query, result);
            }
            // Mark transactions as complete
            var nextQueryTransactions = queryTransactions.map(function (qt) {
                if (qt.id === transactionId) {
                    return tslib_1.__assign({}, qt, { hints: hints,
                        latency: latency,
                        result: result, done: true });
                }
                return qt;
            });
            var results = calculateResultsFromQueryTransactions(nextQueryTransactions, state.datasource, state.graphInterval);
            var nextHistory = updateHistory(history, datasourceId, queries);
            // Keep scanning for results if this was the last scanning transaction
            if (scanning) {
                if (_.size(result) === 0) {
                    var other = nextQueryTransactions.find(function (qt) { return qt.scanning && !qt.done; });
                    if (!other) {
                        _this.scanTimer = setTimeout(_this.scanPreviousRange, 1000);
                    }
                }
                else {
                    // We can stop scanning if we have a result
                    scanning = false;
                }
            }
            return tslib_1.__assign({}, results, { scanning: scanning, history: nextHistory, queryTransactions: nextQueryTransactions });
        });
    };
    Explore.prototype.failQueryTransaction = function (transactionId, response, datasourceId) {
        var datasource = this.state.datasource;
        if (datasource.meta.id !== datasourceId || response.cancelled) {
            // Navigated away, queries did not matter
            return;
        }
        console.error(response);
        var error;
        if (response.data) {
            if (typeof response.data === 'string') {
                error = response.data;
            }
            else if (response.data.error) {
                error = response.data.error;
                if (response.data.response) {
                    error = (React.createElement(React.Fragment, null,
                        React.createElement("span", null, response.data.error),
                        React.createElement("details", null, response.data.response)));
                }
            }
            else {
                throw new Error('Could not handle error response');
            }
        }
        else if (response.message) {
            error = response.message;
        }
        else if (typeof response === 'string') {
            error = response;
        }
        else {
            error = 'Unknown error during query transaction. Please check JS console logs.';
        }
        this.setState(function (state) {
            // Transaction might have been discarded
            if (!state.queryTransactions.find(function (qt) { return qt.id === transactionId; })) {
                return null;
            }
            // Mark transactions as complete
            var nextQueryTransactions = state.queryTransactions.map(function (qt) {
                if (qt.id === transactionId) {
                    return tslib_1.__assign({}, qt, { error: error, done: true });
                }
                return qt;
            });
            return {
                queryTransactions: nextQueryTransactions,
            };
        });
    };
    Explore.prototype.runQueries = function (resultType, queryOptions, resultGetter) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var queries, datasource, datasourceId;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                queries = this.modifiedQueries.slice();
                if (!hasNonEmptyQuery(queries)) {
                    this.setState({
                        queryTransactions: [],
                    });
                    return [2 /*return*/];
                }
                datasource = this.state.datasource;
                datasourceId = datasource.meta.id;
                // Run all queries concurrentlyso
                queries.forEach(function (query, rowIndex) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var transaction, now, res, latency, results, response_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                transaction = this.startQueryTransaction(query, rowIndex, resultType, queryOptions);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                now = Date.now();
                                return [4 /*yield*/, datasource.query(transaction.options)];
                            case 2:
                                res = _a.sent();
                                this.exploreEvents.emit('data-received', res.data || []);
                                latency = Date.now() - now;
                                results = resultGetter ? resultGetter(res.data) : res.data;
                                this.completeQueryTransaction(transaction.id, results, latency, queries, datasourceId);
                                return [3 /*break*/, 4];
                            case 3:
                                response_1 = _a.sent();
                                this.exploreEvents.emit('data-error', response_1);
                                this.failQueryTransaction(transaction.id, response_1, datasourceId);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Explore.prototype.cloneState = function () {
        // Copy state, but copy queries including modifications
        return tslib_1.__assign({}, this.state, { queryTransactions: [], initialQueries: this.modifiedQueries.slice() });
    };
    Explore.prototype.render = function () {
        var _a = this.props, position = _a.position, split = _a.split;
        var _b = this.state, StartPage = _b.StartPage, datasource = _b.datasource, datasourceError = _b.datasourceError, datasourceLoading = _b.datasourceLoading, datasourceMissing = _b.datasourceMissing, exploreDatasources = _b.exploreDatasources, graphResult = _b.graphResult, history = _b.history, initialQueries = _b.initialQueries, logsHighlighterExpressions = _b.logsHighlighterExpressions, logsResult = _b.logsResult, queryTransactions = _b.queryTransactions, range = _b.range, scanning = _b.scanning, scanRange = _b.scanRange, showingGraph = _b.showingGraph, showingLogs = _b.showingLogs, showingStartPage = _b.showingStartPage, showingTable = _b.showingTable, supportsGraph = _b.supportsGraph, supportsLogs = _b.supportsLogs, supportsTable = _b.supportsTable, tableResult = _b.tableResult;
        var graphHeight = showingGraph && showingTable ? '200px' : '400px';
        var exploreClass = split ? 'explore explore-split' : 'explore';
        var selectedDatasource = datasource ? exploreDatasources.find(function (d) { return d.name === datasource.name; }) : undefined;
        var graphLoading = queryTransactions.some(function (qt) { return qt.resultType === 'Graph' && !qt.done; });
        var tableLoading = queryTransactions.some(function (qt) { return qt.resultType === 'Table' && !qt.done; });
        var logsLoading = queryTransactions.some(function (qt) { return qt.resultType === 'Logs' && !qt.done; });
        var loading = queryTransactions.some(function (qt) { return !qt.done; });
        return (React.createElement("div", { className: exploreClass, ref: this.getRef },
            React.createElement("div", { className: "navbar" },
                position === 'left' ? (React.createElement("div", null,
                    React.createElement("a", { className: "navbar-page-btn" },
                        React.createElement("i", { className: "fa fa-rocket" }),
                        "Explore"))) : (React.createElement("div", { className: "navbar-buttons explore-first-button" },
                    React.createElement("button", { className: "btn navbar-button", onClick: this.onClickCloseSplit }, "Close Split"))),
                !datasourceMissing ? (React.createElement("div", { className: "navbar-buttons" },
                    React.createElement(DataSourcePicker, { onChange: this.onChangeDatasource, datasources: exploreDatasources, current: selectedDatasource }))) : null,
                React.createElement("div", { className: "navbar__spacer" }),
                position === 'left' && !split ? (React.createElement("div", { className: "navbar-buttons" },
                    React.createElement("button", { className: "btn navbar-button", onClick: this.onClickSplit }, "Split"))) : null,
                React.createElement(TimePicker, { ref: this.timepickerRef, range: range, onChangeTime: this.onChangeTime }),
                React.createElement("div", { className: "navbar-buttons" },
                    React.createElement("button", { className: "btn navbar-button navbar-button--no-icon", onClick: this.onClickClear }, "Clear All")),
                React.createElement("div", { className: "navbar-buttons relative" },
                    React.createElement("button", { className: "btn navbar-button navbar-button--primary", onClick: this.onSubmit },
                        "Run Query",
                        ' ',
                        loading ? React.createElement("i", { className: "fa fa-spinner fa-spin run-icon" }) : React.createElement("i", { className: "fa fa-level-down run-icon" })))),
            datasourceLoading ? React.createElement("div", { className: "explore-container" }, "Loading datasource...") : null,
            datasourceMissing ? (React.createElement("div", { className: "explore-container" }, "Please add a datasource that supports Explore (e.g., Prometheus).")) : null,
            datasourceError && (React.createElement("div", { className: "explore-container" },
                React.createElement(Alert, { message: "Error connecting to datasource: " + datasourceError }))),
            datasource && !datasourceError ? (React.createElement("div", { className: "explore-container" },
                React.createElement(QueryRows, { datasource: datasource, history: history, initialQueries: initialQueries, onAddQueryRow: this.onAddQueryRow, onChangeQuery: this.onChangeQuery, onClickHintFix: this.onModifyQueries, onExecuteQuery: this.onSubmit, onRemoveQueryRow: this.onRemoveQueryRow, transactions: queryTransactions, exploreEvents: this.exploreEvents, range: range }),
                React.createElement("main", { className: "m-t-2" },
                    React.createElement(ErrorBoundary, null,
                        showingStartPage && React.createElement(StartPage, { onClickExample: this.onClickExample }),
                        !showingStartPage && (React.createElement(React.Fragment, null,
                            supportsGraph && (React.createElement(Panel, { label: "Graph", isOpen: showingGraph, loading: graphLoading, onToggle: this.onClickGraphButton },
                                React.createElement(Graph, { data: graphResult, height: graphHeight, id: "explore-graph-" + position, onChangeTime: this.onChangeTime, range: range, split: split }))),
                            supportsTable && (React.createElement(Panel, { label: "Table", loading: tableLoading, isOpen: showingTable, onToggle: this.onClickTableButton },
                                React.createElement(Table, { data: tableResult, loading: tableLoading, onClickCell: this.onClickLabel }))),
                            supportsLogs && (React.createElement(Panel, { label: "Logs", loading: logsLoading, isOpen: showingLogs, onToggle: this.onClickLogsButton },
                                React.createElement(Logs, { data: logsResult, key: logsResult.id, highlighterExpressions: logsHighlighterExpressions, loading: logsLoading, position: position, onChangeTime: this.onChangeTime, onClickLabel: this.onClickLabel, onStartScanning: this.onStartScanning, onStopScanning: this.onStopScanning, range: range, scanning: scanning, scanRange: scanRange }))))))))) : null));
    };
    return Explore;
}(React.PureComponent));
export { Explore };
export default hot(module)(Explore);
//# sourceMappingURL=Explore.js.map