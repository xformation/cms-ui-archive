// Libraries
import React from 'react';
export var PanelOptionSection = function (props) {
    return (React.createElement("div", { className: "panel-option-section" },
        props.title && (React.createElement("div", { className: "panel-option-section__header" },
            props.title,
            props.onClose && (React.createElement("button", { className: "btn btn-link", onClick: props.onClose },
                React.createElement("i", { className: "fa fa-remove" }))))),
        React.createElement("div", { className: "panel-option-section__body" }, props.children)));
};
//# sourceMappingURL=PanelOptionSection.js.map