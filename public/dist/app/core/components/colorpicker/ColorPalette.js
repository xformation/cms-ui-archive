import * as tslib_1 from "tslib";
import React from 'react';
import { sortedColors } from 'app/core/utils/colors';
var ColorPalette = /** @class */ (function (_super) {
    tslib_1.__extends(ColorPalette, _super);
    function ColorPalette(props) {
        var _this = _super.call(this, props) || this;
        _this.paletteColors = sortedColors;
        _this.onColorSelect = _this.onColorSelect.bind(_this);
        return _this;
    }
    ColorPalette.prototype.onColorSelect = function (color) {
        var _this = this;
        return function () {
            _this.props.onColorSelect(color);
        };
    };
    ColorPalette.prototype.render = function () {
        var _this = this;
        var colorPaletteItems = this.paletteColors.map(function (paletteColor) {
            var cssClass = paletteColor.toLowerCase() === _this.props.color.toLowerCase() ? 'fa-circle-o' : 'fa-circle';
            return (React.createElement("i", { key: paletteColor, className: 'pointer fa ' + cssClass, style: { color: paletteColor }, onClick: _this.onColorSelect(paletteColor) }, "\u00A0"));
        });
        return (React.createElement("div", { className: "graph-legend-popover" },
            React.createElement("p", { className: "m-b-0" }, colorPaletteItems)));
    };
    return ColorPalette;
}(React.Component));
export { ColorPalette };
//# sourceMappingURL=ColorPalette.js.map