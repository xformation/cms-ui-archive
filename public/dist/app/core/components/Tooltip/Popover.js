import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import Popper from './Popper';
import withPopper from './withPopper';
var Popover = /** @class */ (function (_super) {
    tslib_1.__extends(Popover, _super);
    function Popover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popover.prototype.render = function () {
        var _a = this.props, children = _a.children, hidePopper = _a.hidePopper, showPopper = _a.showPopper, className = _a.className, restProps = tslib_1.__rest(_a, ["children", "hidePopper", "showPopper", "className"]);
        var togglePopper = restProps.show ? hidePopper : showPopper;
        return (React.createElement("div", { className: "popper__manager " + className, onClick: togglePopper },
            React.createElement(Popper, tslib_1.__assign({}, restProps), children)));
    };
    return Popover;
}(PureComponent));
export default withPopper(Popover);
//# sourceMappingURL=Popover.js.map