import React from 'react';
var ButtonRow = function (_a) {
    var isReadOnly = _a.isReadOnly, onDelete = _a.onDelete, onSubmit = _a.onSubmit;
    return (React.createElement("div", { className: "gf-form-button-row" },
        React.createElement("button", { type: "submit", className: "btn btn-success", disabled: isReadOnly, onClick: function (event) { return onSubmit(event); } }, "Save & Test"),
        React.createElement("button", { type: "submit", className: "btn btn-danger", disabled: isReadOnly, onClick: onDelete }, "Delete"),
        React.createElement("a", { className: "btn btn-inverse", href: "/datasources" }, "Back")));
};
export default ButtonRow;
//# sourceMappingURL=ButtonRow.js.map