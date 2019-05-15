import React from 'react';
var CHEAT_SHEET_ITEMS = [
    {
        title: 'Logs From a Job',
        expression: '{job="default/prometheus"}',
        label: 'Returns all log lines emitted by instances of this job.',
    },
    {
        title: 'Search For Text',
        expression: '{app="cassandra"} Maximum memory usage',
        label: 'Returns all log lines for the selector and highlights the given text in the results.',
    },
];
export default (function (props) { return (React.createElement("div", null,
    React.createElement("h2", null, "Loki Cheat Sheet"),
    CHEAT_SHEET_ITEMS.map(function (item) { return (React.createElement("div", { className: "cheat-sheet-item", key: item.expression },
        React.createElement("div", { className: "cheat-sheet-item__title" }, item.title),
        React.createElement("div", { className: "cheat-sheet-item__expression", onClick: function (e) { return props.onClickExample({ refId: '1', expr: item.expression }); } },
            React.createElement("code", null, item.expression)),
        React.createElement("div", { className: "cheat-sheet-item__label" }, item.label))); }))); });
//# sourceMappingURL=LokiCheatSheet.js.map