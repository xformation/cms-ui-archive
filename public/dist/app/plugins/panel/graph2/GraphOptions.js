import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
// Components
import { Switch } from 'app/core/components/Switch/Switch';
var GraphOptions = /** @class */ (function (_super) {
    tslib_1.__extends(GraphOptions, _super);
    function GraphOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onToggleLines = function () {
            _this.props.onChange(tslib_1.__assign({}, _this.props.options, { showLines: !_this.props.options.showLines }));
        };
        _this.onToggleBars = function () {
            _this.props.onChange(tslib_1.__assign({}, _this.props.options, { showBars: !_this.props.options.showBars }));
        };
        _this.onTogglePoints = function () {
            _this.props.onChange(tslib_1.__assign({}, _this.props.options, { showPoints: !_this.props.options.showPoints }));
        };
        return _this;
    }
    GraphOptions.prototype.render = function () {
        var _a = this.props.options, showBars = _a.showBars, showPoints = _a.showPoints, showLines = _a.showLines;
        return (React.createElement("div", null,
            React.createElement("div", { className: "section gf-form-group" },
                React.createElement("h5", { className: "section-heading" }, "Draw Modes"),
                React.createElement(Switch, { label: "Lines", labelClass: "width-5", checked: showLines, onChange: this.onToggleLines }),
                React.createElement(Switch, { label: "Bars", labelClass: "width-5", checked: showBars, onChange: this.onToggleBars }),
                React.createElement(Switch, { label: "Points", labelClass: "width-5", checked: showPoints, onChange: this.onTogglePoints })),
            React.createElement("div", { className: "section gf-form-group" },
                React.createElement("h5", { className: "section-heading" }, "Test Options"),
                React.createElement(Switch, { label: "Lines", labelClass: "width-5", checked: showLines, onChange: this.onToggleLines }),
                React.createElement(Switch, { label: "Bars", labelClass: "width-5", checked: showBars, onChange: this.onToggleBars }),
                React.createElement(Switch, { label: "Points", labelClass: "width-5", checked: showPoints, onChange: this.onTogglePoints }))));
    };
    return GraphOptions;
}(PureComponent));
export { GraphOptions };
//# sourceMappingURL=GraphOptions.js.map