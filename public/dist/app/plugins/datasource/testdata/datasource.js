import _ from 'lodash';
import TableModel from 'app/core/table_model';
var TestDataDatasource = /** @class */ (function () {
    /** @ngInject */
    function TestDataDatasource(instanceSettings, backendSrv, $q) {
        this.backendSrv = backendSrv;
        this.$q = $q;
        this.id = instanceSettings.id;
    }
    TestDataDatasource.prototype.query = function (options) {
        var _this = this;
        var queries = _.filter(options.targets, function (item) {
            return item.hide !== true;
        }).map(function (item) {
            return {
                refId: item.refId,
                scenarioId: item.scenarioId,
                intervalMs: options.intervalMs,
                maxDataPoints: options.maxDataPoints,
                stringInput: item.stringInput,
                points: item.points,
                alias: item.alias,
                datasourceId: _this.id,
            };
        });
        if (queries.length === 0) {
            return this.$q.when({ data: [] });
        }
        return this.backendSrv
            .datasourceRequest({
            method: 'POST',
            url: '/api/tsdb/query',
            data: {
                from: options.range.from.valueOf().toString(),
                to: options.range.to.valueOf().toString(),
                queries: queries,
            },
        })
            .then(function (res) {
            var data = [];
            if (res.data.results) {
                _.forEach(res.data.results, function (queryRes) {
                    if (queryRes.tables) {
                        for (var _i = 0, _a = queryRes.tables; _i < _a.length; _i++) {
                            var table = _a[_i];
                            var model = new TableModel();
                            model.rows = table.rows;
                            model.columns = table.columns;
                            data.push(model);
                        }
                    }
                    for (var _b = 0, _c = queryRes.series; _b < _c.length; _b++) {
                        var series = _c[_b];
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
    TestDataDatasource.prototype.annotationQuery = function (options) {
        var timeWalker = options.range.from.valueOf();
        var to = options.range.to.valueOf();
        var events = [];
        var eventCount = 10;
        var step = (to - timeWalker) / eventCount;
        for (var i = 0; i < eventCount; i++) {
            events.push({
                annotation: options.annotation,
                time: timeWalker,
                text: 'This is the text, <a href="https://grafana.com">Grafana.com</a>',
                tags: ['text', 'server'],
            });
            timeWalker += step;
        }
        return this.$q.when(events);
    };
    TestDataDatasource.prototype.testDatasource = function () {
        return Promise.resolve({
            status: 'success',
            message: 'Data source is working',
        });
    };
    return TestDataDatasource;
}());
export { TestDataDatasource };
//# sourceMappingURL=datasource.js.map