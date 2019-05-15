import * as tslib_1 from "tslib";
import React from 'react';
import { components } from '@torkelo/react-select';
export var NoOptionsMessage = function (props) {
    var children = props.children;
    return (React.createElement(components.Option, tslib_1.__assign({}, props),
        React.createElement("div", { className: "gf-form-select-box__desc-option" },
            React.createElement("div", { className: "gf-form-select-box__desc-option__body" }, children))));
};
export default NoOptionsMessage;
//# sourceMappingURL=NoOptionsMessage.js.map