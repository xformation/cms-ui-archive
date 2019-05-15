import _ from 'lodash';
import TableModel from 'app/core/table_model';
var ResultTransformer = /** @class */ (function () {
    function ResultTransformer(templateSrv) {
        this.templateSrv = templateSrv;
    }
    ResultTransformer.prototype.transform = function (response, options) {
        var prometheusResult = response.data.data.result;
        if (options.format === 'table') {
            return [
                this.transformMetricDataToTable(prometheusResult, options.responseListLength, options.refId, options.valueWithRefId),
            ];
        }
        else if (prometheusResult && options.format === 'heatmap') {
            var seriesList = [];
            prometheusResult.sort(sortSeriesByLabel);
            for (var _i = 0, prometheusResult_1 = prometheusResult; _i < prometheusResult_1.length; _i++) {
                var metricData = prometheusResult_1[_i];
                seriesList.push(this.transformMetricData(metricData, options, options.start, options.end));
            }
            seriesList = this.transformToHistogramOverTime(seriesList);
            return seriesList;
        }
        else if (prometheusResult) {
            var seriesList = [];
            for (var _a = 0, prometheusResult_2 = prometheusResult; _a < prometheusResult_2.length; _a++) {
                var metricData = prometheusResult_2[_a];
                if (response.data.data.resultType === 'matrix') {
                    seriesList.push(this.transformMetricData(metricData, options, options.start, options.end));
                }
                else if (response.data.data.resultType === 'vector') {
                    seriesList.push(this.transformInstantMetricData(metricData, options));
                }
            }
            return seriesList;
        }
        return [];
    };
    ResultTransformer.prototype.transformMetricData = function (metricData, options, start, end) {
        var dps = [];
        var metricLabel = null;
        metricLabel = this.createMetricLabel(metricData.metric, options);
        var stepMs = parseInt(options.step, 10) * 1000;
        var baseTimestamp = start * 1000;
        if (metricData.values === undefined) {
            throw new Error('Prometheus heatmap error: data should be a time series');
        }
        for (var _i = 0, _a = metricData.values; _i < _a.length; _i++) {
            var value = _a[_i];
            var dpValue = parseFloat(value[1]);
            if (_.isNaN(dpValue)) {
                dpValue = null;
            }
            var timestamp = parseFloat(value[0]) * 1000;
            for (var t = baseTimestamp; t < timestamp; t += stepMs) {
                dps.push([null, t]);
            }
            baseTimestamp = timestamp + stepMs;
            dps.push([dpValue, timestamp]);
        }
        var endTimestamp = end * 1000;
        for (var t = baseTimestamp; t <= endTimestamp; t += stepMs) {
            dps.push([null, t]);
        }
        return {
            datapoints: dps,
            query: options.query,
            target: metricLabel,
        };
    };
    ResultTransformer.prototype.transformMetricDataToTable = function (md, resultCount, refId, valueWithRefId) {
        var table = new TableModel();
        var i, j;
        var metricLabels = {};
        if (!md || md.length === 0) {
            return table;
        }
        // Collect all labels across all metrics
        _.each(md, function (series) {
            for (var label in series.metric) {
                if (!metricLabels.hasOwnProperty(label)) {
                    metricLabels[label] = 1;
                }
            }
        });
        // Sort metric labels, create columns for them and record their index
        var sortedLabels = _.keys(metricLabels).sort();
        table.columns.push({ text: 'Time', type: 'time' });
        _.each(sortedLabels, function (label, labelIndex) {
            metricLabels[label] = labelIndex + 1;
            table.columns.push({ text: label, filterable: !label.startsWith('__') });
        });
        var valueText = resultCount > 1 || valueWithRefId ? "Value #" + refId : 'Value';
        table.columns.push({ text: valueText });
        // Populate rows, set value to empty string when label not present.
        _.each(md, function (series) {
            if (series.value) {
                series.values = [series.value];
            }
            if (series.values) {
                for (i = 0; i < series.values.length; i++) {
                    var values = series.values[i];
                    var reordered = [values[0] * 1000];
                    if (series.metric) {
                        for (j = 0; j < sortedLabels.length; j++) {
                            var label = sortedLabels[j];
                            if (series.metric.hasOwnProperty(label)) {
                                reordered.push(series.metric[label]);
                            }
                            else {
                                reordered.push('');
                            }
                        }
                    }
                    reordered.push(parseFloat(values[1]));
                    table.rows.push(reordered);
                }
            }
        });
        return table;
    };
    ResultTransformer.prototype.transformInstantMetricData = function (md, options) {
        var dps = [];
        var metricLabel = null;
        metricLabel = this.createMetricLabel(md.metric, options);
        dps.push([parseFloat(md.value[1]), md.value[0] * 1000]);
        return { target: metricLabel, datapoints: dps, labels: md.metric };
    };
    ResultTransformer.prototype.createMetricLabel = function (labelData, options) {
        var label = '';
        if (_.isUndefined(options) || _.isEmpty(options.legendFormat)) {
            label = this.getOriginalMetricName(labelData);
        }
        else {
            label = this.renderTemplate(this.templateSrv.replace(options.legendFormat), labelData);
        }
        if (!label || label === '{}') {
            label = options.query;
        }
        return label;
    };
    ResultTransformer.prototype.renderTemplate = function (aliasPattern, aliasData) {
        var aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
        return aliasPattern.replace(aliasRegex, function (match, g1) {
            if (aliasData[g1]) {
                return aliasData[g1];
            }
            return g1;
        });
    };
    ResultTransformer.prototype.getOriginalMetricName = function (labelData) {
        var metricName = labelData.__name__ || '';
        delete labelData.__name__;
        var labelPart = _.map(_.toPairs(labelData), function (label) {
            return label[0] + '="' + label[1] + '"';
        }).join(',');
        return metricName + '{' + labelPart + '}';
    };
    ResultTransformer.prototype.transformToHistogramOverTime = function (seriesList) {
        /*      t1 = timestamp1, t2 = timestamp2 etc.
                t1  t2  t3          t1  t2  t3
        le10    10  10  0     =>    10  10  0
        le20    20  10  30    =>    10  0   30
        le30    30  10  35    =>    10  0   5
        */
        for (var i = seriesList.length - 1; i > 0; i--) {
            var topSeries = seriesList[i].datapoints;
            var bottomSeries = seriesList[i - 1].datapoints;
            if (!topSeries || !bottomSeries) {
                throw new Error('Prometheus heatmap transform error: data should be a time series');
            }
            for (var j = 0; j < topSeries.length; j++) {
                var bottomPoint = bottomSeries[j] || [0];
                topSeries[j][0] -= bottomPoint[0];
            }
        }
        return seriesList;
    };
    return ResultTransformer;
}());
export { ResultTransformer };
function sortSeriesByLabel(s1, s2) {
    var le1, le2;
    try {
        // fail if not integer. might happen with bad queries
        le1 = parseHistogramLabel(s1.metric.le);
        le2 = parseHistogramLabel(s2.metric.le);
    }
    catch (err) {
        console.log(err);
        return 0;
    }
    if (le1 > le2) {
        return 1;
    }
    if (le1 < le2) {
        return -1;
    }
    return 0;
}
function parseHistogramLabel(le) {
    if (le === '+Inf') {
        return +Infinity;
    }
    return Number(le);
}
//# sourceMappingURL=result_transformer.js.map