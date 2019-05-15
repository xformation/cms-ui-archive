import * as tslib_1 from "tslib";
import React from 'react';
import ReactDOM from 'react-dom';
import Drop from 'tether-drop';
import { SeriesColorPickerPopover } from './SeriesColorPickerPopover';
var SeriesColorPicker = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesColorPicker, _super);
    function SeriesColorPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.onClickToOpen = function () {
            if (_this.colorPickerDrop) {
                _this.destroyDrop();
            }
            var _a = _this.props, color = _a.color, yaxis = _a.yaxis, onColorChange = _a.onColorChange, onToggleAxis = _a.onToggleAxis;
            var dropContent = (React.createElement(SeriesColorPickerPopover, { color: color, yaxis: yaxis, onColorChange: onColorChange, onToggleAxis: onToggleAxis }));
            var dropContentElem = document.createElement('div');
            ReactDOM.render(dropContent, dropContentElem);
            var drop = new Drop({
                target: _this.pickerElem,
                content: dropContentElem,
                position: 'bottom center',
                classes: 'drop-popover',
                openOn: 'hover',
                hoverCloseDelay: 200,
                remove: true,
                tetherOptions: {
                    constraints: [{ to: 'scrollParent', attachment: 'none both' }],
                },
            });
            drop.on('close', _this.closeColorPicker.bind(_this));
            _this.colorPickerDrop = drop;
            _this.colorPickerDrop.open();
        };
        return _this;
    }
    SeriesColorPicker.prototype.componentWillUnmount = function () {
        this.destroyDrop();
    };
    SeriesColorPicker.prototype.closeColorPicker = function () {
        var _this = this;
        setTimeout(function () {
            _this.destroyDrop();
        }, 100);
    };
    SeriesColorPicker.prototype.destroyDrop = function () {
        if (this.colorPickerDrop && this.colorPickerDrop.tether) {
            this.colorPickerDrop.destroy();
            this.colorPickerDrop = null;
        }
    };
    SeriesColorPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, optionalClass = _a.optionalClass, children = _a.children;
        return (React.createElement("div", { className: optionalClass, ref: function (e) { return (_this.pickerElem = e); }, onClick: this.onClickToOpen }, children));
    };
    SeriesColorPicker.defaultProps = {
        optionalClass: '',
        yaxis: undefined,
        onToggleAxis: function () { },
    };
    return SeriesColorPicker;
}(React.Component));
export { SeriesColorPicker };
//# sourceMappingURL=SeriesColorPicker.js.map