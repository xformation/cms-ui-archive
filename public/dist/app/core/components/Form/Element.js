import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { Label } from './Label';
import { uniqueId } from 'lodash';
var Element = /** @class */ (function (_super) {
    tslib_1.__extends(Element, _super);
    function Element() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.elementId = _this.props.id || uniqueId('form-element-');
        return _this;
    }
    Object.defineProperty(Element.prototype, "elementLabel", {
        get: function () {
            var _a = this.props, label = _a.label, labelClassName = _a.labelClassName;
            if (label) {
                return (React.createElement(Label, { htmlFor: this.elementId, className: labelClassName }, label));
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "children", {
        get: function () {
            var children = this.props.children;
            return React.cloneElement(children, { id: this.elementId });
        },
        enumerable: true,
        configurable: true
    });
    Element.prototype.render = function () {
        return (React.createElement("div", { className: "our-custom-wrapper-class" },
            this.elementLabel,
            this.children));
    };
    return Element;
}(PureComponent));
export { Element };
//# sourceMappingURL=Element.js.map