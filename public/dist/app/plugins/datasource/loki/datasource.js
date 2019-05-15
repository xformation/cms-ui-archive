import * as tslib_1 from "tslib";
import _ from 'lodash';
import * as dateMath from 'app/core/utils/datemath';
import { makeSeriesForLogs } from 'app/core/logs_model';
import { addLabelToSelector } from 'app/plugins/datasource/prometheus/add_label_to_query';
import LanguageProvider from './language_provider';
import { mergeStreamsToLogs } from './result_transformer';
import { formatQuery, parseQuery } from './query_utils';
export var DEFAULT_LIMIT = 1000;
var DEFAULT_QUERY_PARAMS = {
    direction: 'BACKWARD',
    limit: DEFAULT_LIMIT,
    regexp: '',
    query: '',
};
function serializeParams(data) {
    return Object.keys(data)
        .map(function (k) {
        var v = data[k];
        return encodeURIComponent(k) + '=' + encodeURIComponent(v);
    })
        .join('&');
}
var LokiDatasource = /** @class */ (function () {
    /** @ngInject */
    function LokiDatasource(instanceSettings, backendSrv, templateSrv) {
        this.instanceSettings = instanceSettings;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.languageProvider = new LanguageProvider(this);
    }
    LokiDatasource.prototype._request = function (apiUrl, data, options) {
        var baseUrl = this.instanceSettings.url;
        var params = data ? serializeParams(data) : '';
        var url = "" + baseUrl + apiUrl + "?" + params;
        var req = tslib_1.__assign({}, options, { url: url });
        return this.backendSrv.datasourceRequest(req);
    };
    LokiDatasource.prototype.mergeStreams = function (streams, intervalMs) {
        var logs = mergeStreamsToLogs(streams);
        logs.series = makeSeriesForLogs(logs.rows, intervalMs);
        return logs;
    };
    LokiDatasource.prototype.prepareQueryTarget = function (target, options) {
        var interpolated = this.templateSrv.replace(target.expr);
        var start = this.getTime(options.range.from, false);
        var end = this.getTime(options.range.to, true);
        return tslib_1.__assign({}, DEFAULT_QUERY_PARAMS, parseQuery(interpolated), { start: start,
            end: end });
    };
    LokiDatasource.prototype.query = function (options) {
        var _this = this;
        var queryTargets = options.targets
            .filter(function (target) { return target.expr; })
            .map(function (target) { return _this.prepareQueryTarget(target, options); });
        if (queryTargets.length === 0) {
            return Promise.resolve({ data: [] });
        }
        var queries = queryTargets.map(function (target) { return _this._request('/api/prom/query', target); });
        return Promise.all(queries).then(function (results) {
            // Flatten streams from multiple queries
            var allStreams = results.reduce(function (acc, response, i) {
                var streams = response.data.streams || [];
                // Inject search for match highlighting
                var search = queryTargets[i].regexp;
                streams.forEach(function (s) {
                    s.search = search;
                });
                return acc.concat(streams);
            }, []);
            return { data: allStreams };
        });
    };
    LokiDatasource.prototype.importQueries = function (queries, originMeta) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.languageProvider.importQueries(queries, originMeta.id)];
            });
        });
    };
    LokiDatasource.prototype.metadataRequest = function (url) {
        // HACK to get label values for {job=|}, will be replaced when implementing LokiQueryField
        var apiUrl = url.replace('v1', 'prom');
        return this._request(apiUrl, { silent: true }).then(function (res) {
            var data = { data: { data: res.data.values || [] } };
            return data;
        });
    };
    LokiDatasource.prototype.modifyQuery = function (query, action) {
        var parsed = parseQuery(query.expr || '');
        var selector = parsed.query;
        switch (action.type) {
            case 'ADD_FILTER': {
                selector = addLabelToSelector(selector, action.key, action.value);
                break;
            }
            default:
                break;
        }
        var expression = formatQuery(selector, parsed.regexp);
        return tslib_1.__assign({}, query, { expr: expression });
    };
    LokiDatasource.prototype.getHighlighterExpression = function (query) {
        return parseQuery(query.expr).regexp;
    };
    LokiDatasource.prototype.getTime = function (date, roundUp) {
        if (_.isString(date)) {
            date = dateMath.parse(date, roundUp);
        }
        return Math.ceil(date.valueOf() * 1e6);
    };
    LokiDatasource.prototype.testDatasource = function () {
        return this._request('/api/prom/label')
            .then(function (res) {
            if (res && res.data && res.data.values && res.data.values.length > 0) {
                return { status: 'success', message: 'Data source connected and labels found.' };
            }
            return {
                status: 'error',
                message: 'Data source connected, but no labels received. Verify that Loki and Promtail is configured properly.',
            };
        })
            .catch(function (err) {
            var message = 'Loki: ';
            if (err.statusText) {
                message += err.statusText;
            }
            else {
                message += 'Cannot connect to Loki';
            }
            if (err.status) {
                message += ". " + err.status;
            }
            if (err.data && err.data.message) {
                message += ". " + err.data.message;
            }
            else if (err.data) {
                message += ". " + err.data;
            }
            return { status: 'error', message: message };
        });
    };
    return LokiDatasource;
}());
export default LokiDatasource;
//# sourceMappingURL=datasource.js.map