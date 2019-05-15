import _ from 'lodash';
var GrafanaDatasource = /** @class */ (function () {
    /** @ngInject */
    function GrafanaDatasource(backendSrv, $q, templateSrv) {
        this.backendSrv = backendSrv;
        this.$q = $q;
        this.templateSrv = templateSrv;
    }
    GrafanaDatasource.prototype.query = function (options) {
        return this.backendSrv
            .get('/api/tsdb/testdata/random-walk', {
            from: options.range.from.valueOf(),
            to: options.range.to.valueOf(),
            intervalMs: options.intervalMs,
            maxDataPoints: options.maxDataPoints,
        })
            .then(function (res) {
            var data = [];
            if (res.results) {
                _.forEach(res.results, function (queryRes) {
                    for (var _i = 0, _a = queryRes.series; _i < _a.length; _i++) {
                        var series = _a[_i];
                        data.push({
                            target: series.name,
                            datapoints: series.points,
                        });
                    }
                });
            }
            return { data: data };
        });
    };
    GrafanaDatasource.prototype.metricFindQuery = function (options) {
        return this.$q.when({ data: [] });
    };
    GrafanaDatasource.prototype.annotationQuery = function (options) {
        var params = {
            from: options.range.from.valueOf(),
            to: options.range.to.valueOf(),
            limit: options.annotation.limit,
            tags: options.annotation.tags,
            matchAny: options.annotation.matchAny,
        };
        if (options.annotation.type === 'dashboard') {
            // if no dashboard id yet return
            if (!options.dashboard.id) {
                return this.$q.when([]);
            }
            // filter by dashboard id
            params.dashboardId = options.dashboard.id;
            // remove tags filter if any
            delete params.tags;
        }
        else {
            // require at least one tag
            if (!_.isArray(options.annotation.tags) || options.annotation.tags.length === 0) {
                return this.$q.when([]);
            }
            var tags = [];
            for (var _i = 0, _a = params.tags; _i < _a.length; _i++) {
                var t = _a[_i];
                var renderedValues = this.templateSrv.replace(t, {}, 'pipe');
                for (var _b = 0, _c = renderedValues.split('|'); _b < _c.length; _b++) {
                    var tt = _c[_b];
                    tags.push(tt);
                }
            }
            params.tags = tags;
        }
        return this.backendSrv.get('/api/annotations', params);
    };
    return GrafanaDatasource;
}());
export { GrafanaDatasource };
//# sourceMappingURL=datasource.js.map