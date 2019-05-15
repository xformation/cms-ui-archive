import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import Portal from 'app/core/components/Portal/Portal';
import { Manager, Popper as ReactPopper, Reference } from 'react-popper';
import Transition from 'react-transition-group/Transition';
var defaultTransitionStyles = {
    transition: 'opacity 200ms linear',
    opacity: 0,
};
var transitionStyles = {
    exited: { opacity: 0 },
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
};
var Popper = /** @class */ (function (_super) {
    tslib_1.__extends(Popper, _super);
    function Popper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popper.prototype.render = function () {
        var _a = this.props, children = _a.children, renderContent = _a.renderContent, show = _a.show, placement = _a.placement, refClassName = _a.refClassName;
        var content = this.props.content;
        return (React.createElement(Manager, null,
            React.createElement(Reference, null, function (_a) {
                var ref = _a.ref;
                return (React.createElement("div", { className: "popper_ref " + (refClassName || ''), ref: ref }, children));
            }),
            React.createElement(Transition, { in: show, timeout: 100, mountOnEnter: true, unmountOnExit: true }, function (transitionState) { return (React.createElement(Portal, null,
                React.createElement(ReactPopper, { placement: placement }, function (_a) {
                    var ref = _a.ref, style = _a.style, placement = _a.placement, arrowProps = _a.arrowProps;
                    return (React.createElement("div", { ref: ref, style: tslib_1.__assign({}, style, defaultTransitionStyles, transitionStyles[transitionState]), "data-placement": placement, className: "popper" },
                        React.createElement("div", { className: "popper__background" },
                            renderContent(content),
                            React.createElement("div", { ref: arrowProps.ref, "data-placement": placement, className: "popper__arrow" }))));
                }))); })));
    };
    return Popper;
}(PureComponent));
export default Popper;
//# sourceMappingURL=Popper.js.map