import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
var Label = /** @class */ (function (_super) {
    tslib_1.__extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.prototype.render = function () {
        var _a = this.props, children = _a.children, htmlFor = _a.htmlFor, className = _a.className;
        return (React.createElement("label", { className: "custom-label-class " + (className || ''), htmlFor: htmlFor }, children));
    };
    return Label;
}(PureComponent));
export { Label };
//# sourceMappingURL=Label.js.map