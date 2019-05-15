import React from 'react';
import Tooltip from '../Tooltip/Tooltip';
export var Label = function (props) {
    return (React.createElement("span", { className: "gf-form-label width-" + (props.width ? props.width : '10') },
        React.createElement("span", null, props.children),
        props.tooltip && (React.createElement(Tooltip, { className: "gf-form-help-icon--right-normal", placement: "auto", content: props.tooltip },
            React.createElement("i", { className: "gicon gicon-question gicon--has-hover" })))));
};
//# sourceMappingURL=Label.js.map