import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import Popper from './Popper';
import withPopper from './withPopper';
var Tooltip = /** @class */ (function (_super) {
    tslib_1.__extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.prototype.render = function () {
        var _a = this.props, children = _a.children, hidePopper = _a.hidePopper, showPopper = _a.showPopper, className = _a.className, restProps = tslib_1.__rest(_a, ["children", "hidePopper", "showPopper", "className"]);
        return (React.createElement("div", { className: "popper__manager " + className, onMouseEnter: showPopper, onMouseLeave: hidePopper },
            React.createElement(Popper, tslib_1.__assign({}, restProps), children)));
    };
    return Tooltip;
}(PureComponent));
export default withPopper(Tooltip);
//# sourceMappingURL=Tooltip.js.map