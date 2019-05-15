import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import PageHeader from 'app/core/components/PageHeader/PageHeader';
import { addDataSource, loadDataSourceTypes, setDataSourceTypeSearchQuery } from './state/actions';
import { getNavModel } from 'app/core/selectors/navModel';
import { getDataSourceTypes } from './state/selectors';
var NewDataSourcePage = /** @class */ (function (_super) {
    tslib_1.__extends(NewDataSourcePage, _super);
    function NewDataSourcePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDataSourceTypeClicked = function (type) {
            _this.props.addDataSource(type);
        };
        _this.onSearchQueryChange = function (event) {
            _this.props.setDataSourceTypeSearchQuery(event.target.value);
        };
        return _this;
    }
    NewDataSourcePage.prototype.componentDidMount = function () {
        this.props.loadDataSourceTypes();
    };
    NewDataSourcePage.prototype.render = function () {
        var _this = this;
        var _a = this.props, navModel = _a.navModel, dataSourceTypes = _a.dataSourceTypes, dataSourceTypeSearchQuery = _a.dataSourceTypeSearchQuery;
        return (React.createElement("div", null,
            React.createElement(PageHeader, { model: navModel }),
            React.createElement("div", { className: "page-container page-body" },
                React.createElement("h2", { className: "add-data-source-header" }, "Choose data source type"),
                React.createElement("div", { className: "add-data-source-search" },
                    React.createElement("label", { className: "gf-form--has-input-icon" },
                        React.createElement("input", { type: "text", className: "gf-form-input width-20", value: dataSourceTypeSearchQuery, onChange: this.onSearchQueryChange, placeholder: "Filter by name or type" }),
                        React.createElement("i", { className: "gf-form-input-icon fa fa-search" }))),
                React.createElement("div", { className: "add-data-source-grid" }, dataSourceTypes.map(function (type, index) {
                    return (React.createElement("div", { onClick: function () { return _this.onDataSourceTypeClicked(type); }, className: "add-data-source-grid-item", key: type.id + "-" + index },
                        React.createElement("img", { className: "add-data-source-grid-item-logo", src: type.info.logos.small }),
                        React.createElement("span", { className: "add-data-source-grid-item-text" }, type.name)));
                })))));
    };
    return NewDataSourcePage;
}(PureComponent));
function mapStateToProps(state) {
    return {
        navModel: getNavModel(state.navIndex, 'datasources'),
        dataSourceTypes: getDataSourceTypes(state.dataSources),
    };
}
var mapDispatchToProps = {
    addDataSource: addDataSource,
    loadDataSourceTypes: loadDataSourceTypes,
    setDataSourceTypeSearchQuery: setDataSourceTypeSearchQuery,
};
export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(NewDataSourcePage));
//# sourceMappingURL=NewDataSourcePage.js.map