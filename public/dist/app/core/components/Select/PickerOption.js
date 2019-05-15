import * as tslib_1 from "tslib";
import React from 'react';
import { components } from '@torkelo/react-select';
export var Option = function (props) {
    var children = props.children, isSelected = props.isSelected, data = props.data;
    return (React.createElement(components.Option, tslib_1.__assign({}, props),
        React.createElement("div", { className: "gf-form-select-box__desc-option" },
            data.imgUrl && React.createElement("img", { className: "gf-form-select-box__desc-option__img", src: data.imgUrl }),
            React.createElement("div", { className: "gf-form-select-box__desc-option__body" },
                React.createElement("div", null, children),
                data.description && React.createElement("div", { className: "gf-form-select-box__desc-option__desc" }, data.description)),
            isSelected && React.createElement("i", { className: "fa fa-check", "aria-hidden": "true" }))));
};
// was not able to type this without typescript error
export var SingleValue = function (props) {
    var children = props.children, data = props.data;
    return (React.createElement(components.SingleValue, tslib_1.__assign({}, props),
        React.createElement("div", { className: "gf-form-select-box__img-value" },
            data.imgUrl && React.createElement("img", { className: "gf-form-select-box__desc-option__img", src: data.imgUrl }),
            children)));
};
export default Option;
//# sourceMappingURL=PickerOption.js.map