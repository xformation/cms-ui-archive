import * as tslib_1 from "tslib";
// Libraries
import $ from 'jquery';
import React, { PureComponent } from 'react';
import 'vendor/flot/jquery.flot';
import 'vendor/flot/jquery.flot.time';
var Graph = /** @class */ (function (_super) {
    tslib_1.__extends(Graph, _super);
    function Graph() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Graph.prototype.componentDidUpdate = function () {
        this.draw();
    };
    Graph.prototype.componentDidMount = function () {
        this.draw();
    };
    Graph.prototype.draw = function () {
        var _a = this.props, width = _a.width, timeSeries = _a.timeSeries, timeRange = _a.timeRange, showLines = _a.showLines, showBars = _a.showBars, showPoints = _a.showPoints;
        if (!width) {
            return;
        }
        var ticks = width / 100;
        var min = timeRange.from.valueOf();
        var max = timeRange.to.valueOf();
        var flotOptions = {
            legend: {
                show: false,
            },
            series: {
                lines: {
                    show: showLines,
                    linewidth: 1,
                    zero: false,
                },
                points: {
                    show: showPoints,
                    fill: 1,
                    fillColor: false,
                    radius: 2,
                },
                bars: {
                    show: showBars,
                    fill: 1,
                    barWidth: 1,
                    zero: false,
                    lineWidth: 0,
                },
                shadowSize: 0,
            },
            xaxis: {
                mode: 'time',
                min: min,
                max: max,
                label: 'Datetime',
                ticks: ticks,
                timeformat: time_format(ticks, min, max),
            },
            grid: {
                minBorderMargin: 0,
                markings: [],
                backgroundColor: null,
                borderWidth: 0,
                // hoverable: true,
                clickable: true,
                color: '#a1a1a1',
                margin: { left: 0, right: 0 },
                labelMarginX: 0,
            },
        };
        try {
            console.log('Graph render');
            $.plot(this.element, timeSeries, flotOptions);
        }
        catch (err) {
            console.log('Graph rendering error', err, flotOptions, timeSeries);
        }
    };
    Graph.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "graph-panel" },
            React.createElement("div", { className: "graph-panel__chart", ref: function (e) { return (_this.element = e); } })));
    };
    Graph.defaultProps = {
        showLines: true,
        showPoints: false,
        showBars: false,
    };
    return Graph;
}(PureComponent));
export { Graph };
// Copied from graph.ts
function time_format(ticks, min, max) {
    if (min && max && ticks) {
        var range = max - min;
        var secPerTick = range / ticks / 1000;
        var oneDay = 86400000;
        var oneYear = 31536000000;
        if (secPerTick <= 45) {
            return '%H:%M:%S';
        }
        if (secPerTick <= 7200 || range <= oneDay) {
            return '%H:%M';
        }
        if (secPerTick <= 80000) {
            return '%m/%d %H:%M';
        }
        if (secPerTick <= 2419200 || range <= oneYear) {
            return '%m/%d';
        }
        return '%Y-%m';
    }
    return '%H:%M';
}
export default Graph;
//# sourceMappingURL=Graph.js.map