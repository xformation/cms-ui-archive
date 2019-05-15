import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
// Components
import Graph from 'app/viz/Graph';
// Services & Utils
import { getTimeSeriesVMs } from 'app/viz/state/timeSeries';
// Types
import { NullValueMode } from 'app/types';
var GraphPanel = /** @class */ (function (_super) {
    tslib_1.__extends(GraphPanel, _super);
    function GraphPanel(props) {
        return _super.call(this, props) || this;
    }
    GraphPanel.prototype.render = function () {
        var _a = this.props, timeSeries = _a.timeSeries, timeRange = _a.timeRange, width = _a.width, height = _a.height;
        var _b = this.props.options, showLines = _b.showLines, showBars = _b.showBars, showPoints = _b.showPoints;
        var vmSeries = getTimeSeriesVMs({
            timeSeries: timeSeries,
            nullValueMode: NullValueMode.Ignore,
        });
        return (React.createElement(Graph, { timeSeries: vmSeries, timeRange: timeRange, showLines: showLines, showPoints: showPoints, showBars: showBars, width: width, height: height }));
    };
    return GraphPanel;
}(PureComponent));
export { GraphPanel };
//# sourceMappingURL=GraphPanel.js.map