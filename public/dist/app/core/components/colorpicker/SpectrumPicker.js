import * as tslib_1 from "tslib";
import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import 'vendor/spectrum';
var SpectrumPicker = /** @class */ (function (_super) {
    tslib_1.__extends(SpectrumPicker, _super);
    function SpectrumPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.onSpectrumMove = _this.onSpectrumMove.bind(_this);
        _this.setComponentElem = _this.setComponentElem.bind(_this);
        return _this;
    }
    SpectrumPicker.prototype.setComponentElem = function (elem) {
        this.elem = $(elem);
    };
    SpectrumPicker.prototype.onSpectrumMove = function (color) {
        this.isMoving = true;
        this.props.onColorSelect(color);
    };
    SpectrumPicker.prototype.componentDidMount = function () {
        var spectrumOptions = _.assignIn({
            flat: true,
            showAlpha: true,
            showButtons: false,
            color: this.props.color,
            appendTo: this.elem,
            move: this.onSpectrumMove,
        }, this.props.options);
        this.elem.spectrum(spectrumOptions);
        this.elem.spectrum('show');
        this.elem.spectrum('set', this.props.color);
    };
    SpectrumPicker.prototype.componentWillUpdate = function (nextProps) {
        // If user move pointer over spectrum field this produce 'move' event and component
        // may update props.color. We don't want to update spectrum color in this case, so we can use
        // isMoving flag for tracking moving state. Flag should be cleared in componentDidUpdate() which
        // is called after updating occurs (when user finished moving).
        if (!this.isMoving) {
            this.elem.spectrum('set', nextProps.color);
        }
    };
    SpectrumPicker.prototype.componentDidUpdate = function () {
        if (this.isMoving) {
            this.isMoving = false;
        }
    };
    SpectrumPicker.prototype.componentWillUnmount = function () {
        this.elem.spectrum('destroy');
    };
    SpectrumPicker.prototype.render = function () {
        return React.createElement("div", { className: "spectrum-container", ref: this.setComponentElem });
    };
    return SpectrumPicker;
}(React.Component));
export { SpectrumPicker };
//# sourceMappingURL=SpectrumPicker.js.map