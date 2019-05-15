import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
// import DefaultQueryField from './QueryField';
import QueryEditor from './QueryEditor';
import QueryTransactionStatus from './QueryTransactionStatus';
function getFirstHintFromTransactions(transactions) {
    var transaction = transactions.find(function (qt) { return qt.hints && qt.hints.length > 0; });
    if (transaction) {
        return transaction.hints[0];
    }
    return undefined;
}
var QueryRow = /** @class */ (function (_super) {
    tslib_1.__extends(QueryRow, _super);
    function QueryRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onExecuteQuery = function () {
            var onExecuteQuery = _this.props.onExecuteQuery;
            onExecuteQuery();
        };
        _this.onChangeQuery = function (value, override) {
            var _a = _this.props, index = _a.index, onChangeQuery = _a.onChangeQuery;
            if (onChangeQuery) {
                onChangeQuery(value, index, override);
            }
        };
        _this.onClickAddButton = function () {
            var _a = _this.props, index = _a.index, onAddQueryRow = _a.onAddQueryRow;
            if (onAddQueryRow) {
                onAddQueryRow(index);
            }
        };
        _this.onClickClearButton = function () {
            _this.onChangeQuery(null, true);
        };
        _this.onClickHintFix = function (action) {
            var _a = _this.props, index = _a.index, onClickHintFix = _a.onClickHintFix;
            if (onClickHintFix) {
                onClickHintFix(action, index);
            }
        };
        _this.onClickRemoveButton = function () {
            var _a = _this.props, index = _a.index, onRemoveQueryRow = _a.onRemoveQueryRow;
            if (onRemoveQueryRow) {
                onRemoveQueryRow(index);
            }
        };
        _this.onPressEnter = function () {
            var onExecuteQuery = _this.props.onExecuteQuery;
            if (onExecuteQuery) {
                onExecuteQuery();
            }
        };
        return _this;
    }
    QueryRow.prototype.render = function () {
        var _a = this.props, datasource = _a.datasource, history = _a.history, initialQuery = _a.initialQuery, transactions = _a.transactions, exploreEvents = _a.exploreEvents, range = _a.range;
        var transactionWithError = transactions.find(function (t) { return t.error !== undefined; });
        var hint = getFirstHintFromTransactions(transactions);
        var queryError = transactionWithError ? transactionWithError.error : null;
        var QueryField = datasource.pluginExports.ExploreQueryField;
        return (React.createElement("div", { className: "query-row" },
            React.createElement("div", { className: "query-row-status" },
                React.createElement(QueryTransactionStatus, { transactions: transactions })),
            React.createElement("div", { className: "query-row-field" }, QueryField ? (React.createElement(QueryField, { datasource: datasource, error: queryError, hint: hint, initialQuery: initialQuery, history: history, onClickHintFix: this.onClickHintFix, onPressEnter: this.onPressEnter, onQueryChange: this.onChangeQuery })) : (React.createElement(QueryEditor, { datasource: datasource, error: queryError, onQueryChange: this.onChangeQuery, onExecuteQuery: this.onExecuteQuery, initialQuery: initialQuery, exploreEvents: exploreEvents, range: range }))),
            React.createElement("div", { className: "query-row-tools" },
                React.createElement("button", { className: "btn navbar-button navbar-button--tight", onClick: this.onClickClearButton },
                    React.createElement("i", { className: "fa fa-times" })),
                React.createElement("button", { className: "btn navbar-button navbar-button--tight", onClick: this.onClickAddButton },
                    React.createElement("i", { className: "fa fa-plus" })),
                React.createElement("button", { className: "btn navbar-button navbar-button--tight", onClick: this.onClickRemoveButton },
                    React.createElement("i", { className: "fa fa-minus" })))));
    };
    return QueryRow;
}(PureComponent));
var QueryRows = /** @class */ (function (_super) {
    tslib_1.__extends(QueryRows, _super);
    function QueryRows() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryRows.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, initialQueries = _a.initialQueries, transactions = _a.transactions, handlers = tslib_1.__rest(_a, ["className", "initialQueries", "transactions"]);
        return (React.createElement("div", { className: className }, initialQueries.map(function (query, index) { return (React.createElement(QueryRow, tslib_1.__assign({ key: query.key, index: index, initialQuery: query, transactions: transactions.filter(function (t) { return t.rowIndex === index; }) }, handlers))); })));
    };
    return QueryRows;
}(PureComponent));
export default QueryRows;
//# sourceMappingURL=QueryRows.js.map