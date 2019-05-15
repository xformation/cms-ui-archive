import * as tslib_1 from "tslib";
import React from 'react';
import $ from 'jquery';
import tinycolor from 'tinycolor2';
import { ColorPalette } from './ColorPalette';
import { SpectrumPicker } from './SpectrumPicker';
var DEFAULT_COLOR = '#000000';
var ColorPickerPopover = /** @class */ (function (_super) {
    tslib_1.__extends(ColorPickerPopover, _super);
    function ColorPickerPopover(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            tab: 'palette',
            color: _this.props.color || DEFAULT_COLOR,
            colorString: _this.props.color || DEFAULT_COLOR,
        };
        return _this;
    }
    ColorPickerPopover.prototype.setPickerNavElem = function (elem) {
        this.pickerNavElem = $(elem);
    };
    ColorPickerPopover.prototype.setColor = function (color) {
        var newColor = tinycolor(color);
        if (newColor.isValid()) {
            this.setState({
                color: newColor.toString(),
                colorString: newColor.toString(),
            });
            this.props.onColorSelect(color);
        }
    };
    ColorPickerPopover.prototype.sampleColorSelected = function (color) {
        this.setColor(color);
    };
    ColorPickerPopover.prototype.spectrumColorSelected = function (color) {
        var rgbColor = color.toRgbString();
        this.setColor(rgbColor);
    };
    ColorPickerPopover.prototype.onColorStringChange = function (e) {
        var colorString = e.target.value;
        this.setState({
            colorString: colorString,
        });
        var newColor = tinycolor(colorString);
        if (newColor.isValid()) {
            // Update only color state
            var newColorString = newColor.toString();
            this.setState({
                color: newColorString,
            });
            this.props.onColorSelect(newColorString);
        }
    };
    ColorPickerPopover.prototype.onColorStringBlur = function (e) {
        var colorString = e.target.value;
        this.setColor(colorString);
    };
    ColorPickerPopover.prototype.componentDidMount = function () {
        var _this = this;
        this.pickerNavElem.find('li:first').addClass('active');
        this.pickerNavElem.on('show', function (e) {
            // use href attr (#name => name)
            var tab = e.target.hash.slice(1);
            _this.setState({
                tab: tab,
            });
        });
    };
    ColorPickerPopover.prototype.render = function () {
        var paletteTab = (React.createElement("div", { id: "palette" },
            React.createElement(ColorPalette, { color: this.state.color, onColorSelect: this.sampleColorSelected.bind(this) })));
        var spectrumTab = (React.createElement("div", { id: "spectrum" },
            React.createElement(SpectrumPicker, { color: this.state.color, onColorSelect: this.spectrumColorSelected.bind(this), options: {} })));
        var currentTab = this.state.tab === 'palette' ? paletteTab : spectrumTab;
        return (React.createElement("div", { className: "gf-color-picker" },
            React.createElement("ul", { className: "nav nav-tabs", id: "colorpickernav", ref: this.setPickerNavElem.bind(this) },
                React.createElement("li", { className: "gf-tabs-item-colorpicker" },
                    React.createElement("a", { href: "#palette", "data-toggle": "tab" }, "Colors")),
                React.createElement("li", { className: "gf-tabs-item-colorpicker" },
                    React.createElement("a", { href: "#spectrum", "data-toggle": "tab" }, "Custom"))),
            React.createElement("div", { className: "gf-color-picker__body" }, currentTab),
            React.createElement("div", null,
                React.createElement("input", { className: "gf-form-input gf-form-input--small", value: this.state.colorString, onChange: this.onColorStringChange.bind(this), onBlur: this.onColorStringBlur.bind(this) }))));
    };
    return ColorPickerPopover;
}(React.Component));
export { ColorPickerPopover };
//# sourceMappingURL=ColorPickerPopover.js.map