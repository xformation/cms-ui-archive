import * as tslib_1 from "tslib";
import React from 'react';
import ReactDOM from 'react-dom';
import Drop from 'tether-drop';
import { ColorPickerPopover } from './ColorPickerPopover';
import { react2AngularDirective } from 'app/core/utils/react2angular';
var ColorPicker = /** @class */ (function (_super) {
    tslib_1.__extends(ColorPicker, _super);
    function ColorPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openColorPicker = function () {
            var dropContent = React.createElement(ColorPickerPopover, { color: _this.props.color, onColorSelect: _this.onColorSelect });
            var dropContentElem = document.createElement('div');
            ReactDOM.render(dropContent, dropContentElem);
            var drop = new Drop({
                target: _this.pickerElem,
                content: dropContentElem,
                position: 'top center',
                classes: 'drop-popover',
                openOn: 'click',
                hoverCloseDelay: 200,
                tetherOptions: {
                    constraints: [{ to: 'scrollParent', attachment: 'none both' }],
                },
            });
            drop.on('close', _this.closeColorPicker);
            _this.colorPickerDrop = drop;
            _this.colorPickerDrop.open();
        };
        _this.closeColorPicker = function () {
            setTimeout(function () {
                if (_this.colorPickerDrop && _this.colorPickerDrop.tether) {
                    _this.colorPickerDrop.destroy();
                }
            }, 100);
        };
        _this.onColorSelect = function (color) {
            _this.props.onChange(color);
        };
        return _this;
    }
    ColorPicker.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "sp-replacer sp-light", onClick: this.openColorPicker, ref: function (element) { return (_this.pickerElem = element); } },
            React.createElement("div", { className: "sp-preview" },
                React.createElement("div", { className: "sp-preview-inner", style: { backgroundColor: this.props.color } }))));
    };
    return ColorPicker;
}(React.Component));
export { ColorPicker };
react2AngularDirective('colorPicker', ColorPicker, [
    'color',
    ['onChange', { watchDepth: 'reference', wrapApply: true }],
]);
//# sourceMappingURL=ColorPicker.js.map