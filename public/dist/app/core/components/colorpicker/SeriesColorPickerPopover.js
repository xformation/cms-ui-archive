import * as tslib_1 from "tslib";
import React from 'react';
import { ColorPickerPopover } from './ColorPickerPopover';
import { react2AngularDirective } from 'app/core/utils/react2angular';
var SeriesColorPickerPopover = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesColorPickerPopover, _super);
    function SeriesColorPickerPopover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesColorPickerPopover.prototype.render = function () {
        return (React.createElement("div", { className: "graph-legend-popover" },
            this.props.yaxis && React.createElement(AxisSelector, { yaxis: this.props.yaxis, onToggleAxis: this.props.onToggleAxis }),
            React.createElement(ColorPickerPopover, { color: this.props.color, onColorSelect: this.props.onColorChange })));
    };
    return SeriesColorPickerPopover;
}(React.PureComponent));
export { SeriesColorPickerPopover };
var AxisSelector = /** @class */ (function (_super) {
    tslib_1.__extends(AxisSelector, _super);
    function AxisSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            yaxis: _this.props.yaxis,
        };
        _this.onToggleAxis = _this.onToggleAxis.bind(_this);
        return _this;
    }
    AxisSelector.prototype.onToggleAxis = function () {
        this.setState({
            yaxis: this.state.yaxis === 2 ? 1 : 2,
        });
        this.props.onToggleAxis();
    };
    AxisSelector.prototype.render = function () {
        var leftButtonClass = this.state.yaxis === 1 ? 'btn-success' : 'btn-inverse';
        var rightButtonClass = this.state.yaxis === 2 ? 'btn-success' : 'btn-inverse';
        return (React.createElement("div", { className: "p-b-1" },
            React.createElement("label", { className: "small p-r-1" }, "Y Axis:"),
            React.createElement("button", { onClick: this.onToggleAxis, className: 'btn btn-small ' + leftButtonClass }, "Left"),
            React.createElement("button", { onClick: this.onToggleAxis, className: 'btn btn-small ' + rightButtonClass }, "Right")));
    };
    return AxisSelector;
}(React.PureComponent));
export { AxisSelector };
react2AngularDirective('seriesColorPickerPopover', SeriesColorPickerPopover, [
    'series',
    'onColorChange',
    'onToggleAxis',
]);
//# sourceMappingURL=SeriesColorPickerPopover.js.map