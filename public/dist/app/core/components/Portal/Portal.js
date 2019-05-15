import * as tslib_1 from "tslib";
import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
var BodyPortal = /** @class */ (function (_super) {
    tslib_1.__extends(BodyPortal, _super);
    function BodyPortal(props) {
        var _this = _super.call(this, props) || this;
        _this.node = document.createElement('div');
        var _a = _this.props, className = _a.className, _b = _a.root, root = _b === void 0 ? document.body : _b;
        if (className) {
            _this.node.classList.add(className);
        }
        _this.portalRoot = root;
        _this.portalRoot.appendChild(_this.node);
        return _this;
    }
    BodyPortal.prototype.componentWillUnmount = function () {
        this.portalRoot.removeChild(this.node);
    };
    BodyPortal.prototype.render = function () {
        return ReactDOM.createPortal(this.props.children, this.node);
    };
    return BodyPortal;
}(PureComponent));
export default BodyPortal;
//# sourceMappingURL=Portal.js.map