import * as tslib_1 from "tslib";
import _ from 'lodash';
import React, { PureComponent } from 'react';
import Highlighter from 'react-highlight-words';
import classnames from 'classnames';
import * as rangeUtil from 'app/core/utils/rangeutil';
import { LogsDedupDescription, LogsDedupStrategy, dedupLogRows, filterLogLevels, getParser, LogLevel, LogsMetaKind, calculateFieldStats, } from 'app/core/logs_model';
import { findHighlightChunksInText } from 'app/core/utils/text';
import { Switch } from 'app/core/components/Switch/Switch';
import ToggleButtonGroup, { ToggleButton } from 'app/core/components/ToggleButtonGroup/ToggleButtonGroup';
import Graph from './Graph';
import LogLabels, { Stats } from './LogLabels';
var PREVIEW_LIMIT = 100;
var graphOptions = {
    series: {
        stack: true,
        bars: {
            show: true,
            lineWidth: 5,
        },
    },
    yaxis: {
        tickDecimals: 0,
    },
};
/**
 * Renders a highlighted field.
 * When hovering, a stats icon is shown.
 */
var FieldHighlight = function (onClick) { return function (props) {
    return (React.createElement("span", { className: props.className, style: props.style },
        props.children,
        React.createElement("span", { className: "logs-row__field-highlight--icon fa fa-signal", onClick: function () { return onClick(props.children); } })));
}; };
/**
 * Renders a log line.
 *
 * When user hovers over it for a certain time, it lazily parses the log line.
 * Once a parser is found, it will determine fields, that will be highlighted.
 * When the user requests stats for a field, they will be calculated and rendered below the row.
 */
var Row = /** @class */ (function (_super) {
    tslib_1.__extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            fieldCount: 0,
            fieldLabel: null,
            fieldStats: null,
            fieldValue: null,
            parsed: false,
            parser: undefined,
            parsedFieldHighlights: [],
            showFieldStats: false,
        };
        _this.onClickClose = function () {
            _this.setState({ showFieldStats: false });
        };
        _this.onClickHighlight = function (fieldText) {
            var getRows = _this.props.getRows;
            var parser = _this.state.parser;
            var allRows = getRows();
            // Build value-agnostic row matcher based on the field label
            var fieldLabel = parser.getLabelFromField(fieldText);
            var fieldValue = parser.getValueFromField(fieldText);
            var matcher = parser.buildMatcher(fieldLabel);
            var fieldStats = calculateFieldStats(allRows, matcher);
            var fieldCount = fieldStats.reduce(function (sum, stat) { return sum + stat.count; }, 0);
            _this.setState({ fieldCount: fieldCount, fieldLabel: fieldLabel, fieldStats: fieldStats, fieldValue: fieldValue, showFieldStats: true });
        };
        _this.onMouseOverMessage = function () {
            // Don't parse right away, user might move along
            _this.mouseMessageTimer = setTimeout(_this.parseMessage, 500);
        };
        _this.onMouseOutMessage = function () {
            clearTimeout(_this.mouseMessageTimer);
            _this.setState({ parsed: false });
        };
        _this.parseMessage = function () {
            if (!_this.state.parsed) {
                var row = _this.props.row;
                var parser = getParser(row.entry);
                if (parser) {
                    // Use parser to highlight detected fields
                    var parsedFieldHighlights = parser.getFields(_this.props.row.entry);
                    _this.setState({ parsedFieldHighlights: parsedFieldHighlights, parsed: true, parser: parser });
                }
            }
        };
        return _this;
    }
    Row.prototype.componentWillUnmount = function () {
        clearTimeout(this.mouseMessageTimer);
    };
    Row.prototype.render = function () {
        var _a = this.props, getRows = _a.getRows, highlighterExpressions = _a.highlighterExpressions, onClickLabel = _a.onClickLabel, row = _a.row, showDuplicates = _a.showDuplicates, showLabels = _a.showLabels, showLocalTime = _a.showLocalTime, showUtc = _a.showUtc;
        var _b = this.state, fieldCount = _b.fieldCount, fieldLabel = _b.fieldLabel, fieldStats = _b.fieldStats, fieldValue = _b.fieldValue, parsed = _b.parsed, parsedFieldHighlights = _b.parsedFieldHighlights, showFieldStats = _b.showFieldStats;
        var previewHighlights = highlighterExpressions && !_.isEqual(highlighterExpressions, row.searchWords);
        var highlights = previewHighlights ? highlighterExpressions : row.searchWords;
        var needsHighlighter = highlights && highlights.length > 0;
        var highlightClassName = classnames('logs-row__match-highlight', {
            'logs-row__match-highlight--preview': previewHighlights,
        });
        return (React.createElement("div", { className: "logs-row" },
            showDuplicates && (React.createElement("div", { className: "logs-row__duplicates" }, row.duplicates > 0 ? row.duplicates + 1 + "x" : null)),
            React.createElement("div", { className: row.logLevel ? "logs-row__level logs-row__level--" + row.logLevel : '' }),
            showUtc && (React.createElement("div", { className: "logs-row__time", title: "Local: " + row.timeLocal + " (" + row.timeFromNow + ")" }, row.timestamp)),
            showLocalTime && (React.createElement("div", { className: "logs-row__time", title: row.timestamp + " (" + row.timeFromNow + ")" }, row.timeLocal)),
            showLabels && (React.createElement("div", { className: "logs-row__labels" },
                React.createElement(LogLabels, { getRows: getRows, labels: row.uniqueLabels, onClickLabel: onClickLabel }))),
            React.createElement("div", { className: "logs-row__message", onMouseEnter: this.onMouseOverMessage, onMouseLeave: this.onMouseOutMessage },
                parsed && (React.createElement(Highlighter, { autoEscape: true, highlightTag: FieldHighlight(this.onClickHighlight), textToHighlight: row.entry, searchWords: parsedFieldHighlights, highlightClassName: "logs-row__field-highlight" })),
                !parsed &&
                    needsHighlighter && (React.createElement(Highlighter, { textToHighlight: row.entry, searchWords: highlights, findChunks: findHighlightChunksInText, highlightClassName: highlightClassName })),
                !parsed && !needsHighlighter && row.entry,
                showFieldStats && (React.createElement("div", { className: "logs-row__stats" },
                    React.createElement(Stats, { stats: fieldStats, label: fieldLabel, value: fieldValue, onClickClose: this.onClickClose, rowCount: fieldCount }))))));
    };
    return Row;
}(PureComponent));
function renderMetaItem(value, kind) {
    if (kind === LogsMetaKind.LabelsMap) {
        return (React.createElement("span", { className: "logs-meta-item__labels" },
            React.createElement(LogLabels, { labels: value, plain: true })));
    }
    return value;
}
var Logs = /** @class */ (function (_super) {
    tslib_1.__extends(Logs, _super);
    function Logs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dedup: LogsDedupStrategy.none,
            deferLogs: true,
            hiddenLogLevels: new Set(),
            renderAll: false,
            showLabels: null,
            showLocalTime: true,
            showUtc: false,
        };
        _this.onChangeDedup = function (dedup) {
            _this.setState(function (prevState) {
                if (prevState.dedup === dedup) {
                    return { dedup: LogsDedupStrategy.none };
                }
                return { dedup: dedup };
            });
        };
        _this.onChangeLabels = function (event) {
            var target = event.target;
            _this.setState({
                showLabels: target.checked,
            });
        };
        _this.onChangeLocalTime = function (event) {
            var target = event.target;
            _this.setState({
                showLocalTime: target.checked,
            });
        };
        _this.onChangeUtc = function (event) {
            var target = event.target;
            _this.setState({
                showUtc: target.checked,
            });
        };
        _this.onToggleLogLevel = function (rawLevel, hiddenRawLevels) {
            var hiddenLogLevels = new Set(Array.from(hiddenRawLevels).map(function (level) { return LogLevel[level]; }));
            _this.setState({ hiddenLogLevels: hiddenLogLevels });
        };
        _this.onClickScan = function (event) {
            event.preventDefault();
            _this.props.onStartScanning();
        };
        _this.onClickStopScan = function (event) {
            event.preventDefault();
            _this.props.onStopScanning();
        };
        return _this;
    }
    Logs.prototype.componentDidMount = function () {
        var _this = this;
        // Staged rendering
        if (this.state.deferLogs) {
            var data = this.props.data;
            var rowCount = data && data.rows ? data.rows.length : 0;
            // Render all right away if not too far over the limit
            var renderAll_1 = rowCount <= PREVIEW_LIMIT * 2;
            this.deferLogsTimer = setTimeout(function () { return _this.setState({ deferLogs: false, renderAll: renderAll_1 }); }, rowCount);
        }
    };
    Logs.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        // Staged rendering
        if (prevState.deferLogs && !this.state.deferLogs && !this.state.renderAll) {
            this.renderAllTimer = setTimeout(function () { return _this.setState({ renderAll: true }); }, 2000);
        }
    };
    Logs.prototype.componentWillUnmount = function () {
        clearTimeout(this.deferLogsTimer);
        clearTimeout(this.renderAllTimer);
    };
    Logs.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, highlighterExpressions = _a.highlighterExpressions, _b = _a.loading, loading = _b === void 0 ? false : _b, onClickLabel = _a.onClickLabel, position = _a.position, range = _a.range, scanning = _a.scanning, scanRange = _a.scanRange;
        var _c = this.state, dedup = _c.dedup, deferLogs = _c.deferLogs, hiddenLogLevels = _c.hiddenLogLevels, renderAll = _c.renderAll, showLocalTime = _c.showLocalTime, showUtc = _c.showUtc;
        var showLabels = this.state.showLabels;
        var hasData = data && data.rows && data.rows.length > 0;
        var showDuplicates = dedup !== LogsDedupStrategy.none;
        // Filtering
        var filteredData = filterLogLevels(data, hiddenLogLevels);
        var dedupedData = dedupLogRows(filteredData, dedup);
        var dedupCount = dedupedData.rows.reduce(function (sum, row) { return sum + row.duplicates; }, 0);
        var meta = data.meta.slice();
        if (dedup !== LogsDedupStrategy.none) {
            meta.push({
                label: 'Dedup count',
                value: dedupCount,
                kind: LogsMetaKind.Number,
            });
        }
        // Staged rendering
        var processedRows = dedupedData.rows;
        var firstRows = processedRows.slice(0, PREVIEW_LIMIT);
        var lastRows = processedRows.slice(PREVIEW_LIMIT);
        // Check for labels
        if (showLabels === null) {
            if (hasData) {
                showLabels = data.rows.some(function (row) { return _.size(row.uniqueLabels) > 0; });
            }
            else {
                showLabels = true;
            }
        }
        var scanText = scanRange ? "Scanning " + rangeUtil.describeTimeRange(scanRange) : 'Scanning...';
        // React profiler becomes unusable if we pass all rows to all rows and their labels, using getter instead
        var getRows = function () { return processedRows; };
        return (React.createElement("div", { className: "logs-panel" },
            React.createElement("div", { className: "logs-panel-graph" },
                React.createElement(Graph, { data: data.series, height: "100px", range: range, id: "explore-logs-graph-" + position, onChangeTime: this.props.onChangeTime, onToggleSeries: this.onToggleLogLevel, userOptions: graphOptions })),
            React.createElement("div", { className: "logs-panel-options" },
                React.createElement("div", { className: "logs-panel-controls" },
                    React.createElement(Switch, { label: "Timestamp", checked: showUtc, onChange: this.onChangeUtc, transparent: true }),
                    React.createElement(Switch, { label: "Local time", checked: showLocalTime, onChange: this.onChangeLocalTime, transparent: true }),
                    React.createElement(Switch, { label: "Labels", checked: showLabels, onChange: this.onChangeLabels, transparent: true }),
                    React.createElement(ToggleButtonGroup, { label: "Dedup", transparent: true }, Object.keys(LogsDedupStrategy).map(function (dedupType, i) { return (React.createElement(ToggleButton, { key: i, value: dedupType, onChange: _this.onChangeDedup, selected: dedup === dedupType, tooltip: LogsDedupDescription[dedupType] }, dedupType)); })))),
            hasData &&
                meta && (React.createElement("div", { className: "logs-panel-meta" }, meta.map(function (item) { return (React.createElement("div", { className: "logs-panel-meta__item", key: item.label },
                React.createElement("span", { className: "logs-panel-meta__label" },
                    item.label,
                    ":"),
                React.createElement("span", { className: "logs-panel-meta__value" }, renderMetaItem(item.value, item.kind)))); }))),
            React.createElement("div", { className: "logs-rows" },
                hasData &&
                    !deferLogs &&
                    // Only inject highlighterExpression in the first set for performance reasons
                    firstRows.map(function (row) { return (React.createElement(Row, { key: row.key + row.duplicates, getRows: getRows, highlighterExpressions: highlighterExpressions, row: row, showDuplicates: showDuplicates, showLabels: showLabels, showLocalTime: showLocalTime, showUtc: showUtc, onClickLabel: onClickLabel })); }),
                hasData &&
                    !deferLogs &&
                    renderAll &&
                    lastRows.map(function (row) { return (React.createElement(Row, { key: row.key + row.duplicates, getRows: getRows, row: row, showDuplicates: showDuplicates, showLabels: showLabels, showLocalTime: showLocalTime, showUtc: showUtc, onClickLabel: onClickLabel })); }),
                hasData && deferLogs && React.createElement("span", null,
                    "Rendering ",
                    dedupedData.rows.length,
                    " rows...")),
            !loading &&
                !hasData &&
                !scanning && (React.createElement("div", { className: "logs-panel-nodata" },
                "No logs found.",
                React.createElement("a", { className: "link", onClick: this.onClickScan }, "Scan for older logs"))),
            scanning && (React.createElement("div", { className: "logs-panel-nodata" },
                React.createElement("span", null, scanText),
                React.createElement("a", { className: "link", onClick: this.onClickStopScan }, "Stop scan")))));
    };
    return Logs;
}(PureComponent));
export default Logs;
//# sourceMappingURL=Logs.js.map