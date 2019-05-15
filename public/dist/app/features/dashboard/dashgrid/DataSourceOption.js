import React from 'react';
import Tooltip from 'app/core/components/Tooltip/Tooltip';
export var DataSourceOptions = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, name = _a.name, value = _a.value, onChange = _a.onChange, tooltipInfo = _a.tooltipInfo;
    var dsOption = (React.createElement("div", { className: "gf-form gf-form--flex-end" },
        React.createElement("label", { className: "gf-form-label" }, label),
        React.createElement("input", { type: "text", className: "gf-form-input width-6", placeholder: placeholder, name: name, spellCheck: false, onBlur: function (evt) { return onChange(evt.target.value); } })));
    return tooltipInfo ? React.createElement(Tooltip, { content: tooltipInfo }, dsOption) : dsOption;
};
export default DataSourceOptions;
//# sourceMappingURL=DataSourceOption.js.map