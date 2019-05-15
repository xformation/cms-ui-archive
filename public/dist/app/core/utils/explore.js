import * as tslib_1 from "tslib";
import _ from 'lodash';
import { renderUrl } from 'app/core/utils/url';
import kbn from 'app/core/utils/kbn';
import store from 'app/core/store';
import colors from 'app/core/utils/colors';
import { parse as parseDate } from 'app/core/utils/datemath';
import TimeSeries from 'app/core/time_series2';
import TableModel, { mergeTablesIntoModel } from 'app/core/table_model';
export var DEFAULT_RANGE = {
    from: 'now-6h',
    to: 'now',
};
var MAX_HISTORY_ITEMS = 100;
/**
 * Returns an Explore-URL that contains a panel's queries and the dashboard time range.
 *
 * @param panel Origin panel of the jump to Explore
 * @param panelTargets The origin panel's query targets
 * @param panelDatasource The origin panel's datasource
 * @param datasourceSrv Datasource service to query other datasources in case the panel datasource is mixed
 * @param timeSrv Time service to get the current dashboard range from
 */
export function getExploreUrl(panel, panelTargets, panelDatasource, datasourceSrv, timeSrv) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var exploreDatasource, exploreTargets, url, mixedExploreDatasource_1, _i, _a, t, datasource, range, state, exploreState;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    exploreDatasource = panelDatasource;
                    exploreTargets = panelTargets;
                    if (!(panelDatasource.meta.id === 'mixed' && panelTargets)) return [3 /*break*/, 5];
                    _i = 0, _a = panel.targets;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    t = _a[_i];
                    return [4 /*yield*/, datasourceSrv.get(t.datasource)];
                case 2:
                    datasource = _b.sent();
                    if (datasource && datasource.meta.explore) {
                        mixedExploreDatasource_1 = datasource;
                        return [3 /*break*/, 4];
                    }
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    // Add all its targets
                    if (mixedExploreDatasource_1) {
                        exploreDatasource = mixedExploreDatasource_1;
                        exploreTargets = panelTargets.filter(function (t) { return t.datasource === mixedExploreDatasource_1.name; });
                    }
                    _b.label = 5;
                case 5:
                    if (panelDatasource) {
                        range = timeSrv.timeRangeForUrl();
                        state = { range: range };
                        if (exploreDatasource.getExploreState) {
                            state = tslib_1.__assign({}, state, exploreDatasource.getExploreState(exploreTargets));
                        }
                        else {
                            state = tslib_1.__assign({}, state, { datasource: panelDatasource.name, queries: exploreTargets.map(function (t) { return (tslib_1.__assign({}, t, { datasource: panelDatasource.name })); }) });
                        }
                        exploreState = JSON.stringify(state);
                        url = renderUrl('/explore', { state: exploreState });
                    }
                    return [2 /*return*/, url];
            }
        });
    });
}
var clearQueryKeys = function (_a) {
    var key = _a.key, refId = _a.refId, rest = tslib_1.__rest(_a, ["key", "refId"]);
    return rest;
};
export function parseUrlState(initial) {
    if (initial) {
        try {
            var parsed = JSON.parse(decodeURI(initial));
            if (Array.isArray(parsed)) {
                if (parsed.length <= 3) {
                    throw new Error('Error parsing compact URL state for Explore.');
                }
                var range = {
                    from: parsed[0],
                    to: parsed[1],
                };
                var datasource = parsed[2];
                var queries = parsed.slice(3);
                return { datasource: datasource, queries: queries, range: range };
            }
            return parsed;
        }
        catch (e) {
            console.error(e);
        }
    }
    return { datasource: null, queries: [], range: DEFAULT_RANGE };
}
export function serializeStateToUrlParam(state, compact) {
    var urlState = {
        datasource: state.datasourceName,
        queries: state.initialQueries.map(clearQueryKeys),
        range: state.range,
    };
    if (compact) {
        return JSON.stringify([urlState.range.from, urlState.range.to, urlState.datasource].concat(urlState.queries));
    }
    return JSON.stringify(urlState);
}
export function generateKey(index) {
    if (index === void 0) { index = 0; }
    return "Q-" + Date.now() + "-" + Math.random() + "-" + index;
}
export function generateRefId(index) {
    if (index === void 0) { index = 0; }
    return "" + (index + 1);
}
export function generateQueryKeys(index) {
    if (index === void 0) { index = 0; }
    return { refId: generateRefId(index), key: generateKey(index) };
}
/**
 * Ensure at least one target exists and that targets have the necessary keys
 */
export function ensureQueries(queries) {
    if (queries && typeof queries === 'object' && queries.length > 0) {
        return queries.map(function (query, i) { return (tslib_1.__assign({}, query, generateQueryKeys(i))); });
    }
    return [tslib_1.__assign({}, generateQueryKeys())];
}
/**
 * A target is non-empty when it has keys (with non-empty values) other than refId and key.
 */
export function hasNonEmptyQuery(queries) {
    return queries.some(function (query) {
        return Object.keys(query)
            .map(function (k) { return query[k]; })
            .filter(function (v) { return v; }).length > 2;
    });
}
export function calculateResultsFromQueryTransactions(queryTransactions, datasource, graphInterval) {
    var graphResult = _.flatten(queryTransactions.filter(function (qt) { return qt.resultType === 'Graph' && qt.done && qt.result; }).map(function (qt) { return qt.result; }));
    var tableResult = mergeTablesIntoModel.apply(void 0, [new TableModel()].concat(queryTransactions
        .filter(function (qt) { return qt.resultType === 'Table' && qt.done && qt.result && qt.result.columns && qt.result.rows; })
        .map(function (qt) { return qt.result; })));
    var logsResult = datasource && datasource.mergeStreams
        ? datasource.mergeStreams(_.flatten(queryTransactions.filter(function (qt) { return qt.resultType === 'Logs' && qt.done && qt.result; }).map(function (qt) { return qt.result; })), graphInterval)
        : undefined;
    return {
        graphResult: graphResult,
        tableResult: tableResult,
        logsResult: logsResult,
    };
}
export function getIntervals(range, datasource, resolution) {
    if (!datasource || !resolution) {
        return { interval: '1s', intervalMs: 1000 };
    }
    var absoluteRange = {
        from: parseDate(range.from, false),
        to: parseDate(range.to, true),
    };
    return kbn.calculateInterval(absoluteRange, resolution, datasource.interval);
}
export function makeTimeSeriesList(dataList) {
    return dataList.map(function (seriesData, index) {
        var datapoints = seriesData.datapoints || [];
        var alias = seriesData.target;
        var colorIndex = index % colors.length;
        var color = colors[colorIndex];
        var series = new TimeSeries({
            datapoints: datapoints,
            alias: alias,
            color: color,
            unit: seriesData.unit,
        });
        return series;
    });
}
/**
 * Update the query history. Side-effect: store history in local storage
 */
export function updateHistory(history, datasourceId, queries) {
    var ts = Date.now();
    queries.forEach(function (query) {
        history = [{ query: query, ts: ts }].concat(history);
    });
    if (history.length > MAX_HISTORY_ITEMS) {
        history = history.slice(0, MAX_HISTORY_ITEMS);
    }
    // Combine all queries of a datasource type into one history
    var historyKey = "grafana.explore.history." + datasourceId;
    store.setObject(historyKey, history);
    return history;
}
export function clearHistory(datasourceId) {
    var historyKey = "grafana.explore.history." + datasourceId;
    store.delete(historyKey);
}
//# sourceMappingURL=explore.js.map