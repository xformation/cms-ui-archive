import * as tslib_1 from "tslib";
// Libraries
import React, { PureComponent } from 'react';
import Remarkable from 'remarkable';
import _ from 'lodash';
// Components
import './../../panel/metrics_tab';
import { EditorTabBody } from './EditorTabBody';
import { DataSourcePicker } from 'app/core/components/Select/DataSourcePicker';
import { QueryInspector } from './QueryInspector';
import { QueryOptions } from './QueryOptions';
import { PanelOptionSection } from './PanelOptionSection';
// Services
import { getDatasourceSrv } from 'app/features/plugins/datasource_srv';
import { getBackendSrv } from 'app/core/services/backend_srv';
import { getAngularLoader } from 'app/core/services/AngularLoader';
import config from 'app/core/config';
var LoadingPlaceholder = function (_a) {
    var text = _a.text;
    return React.createElement("h2", null, text);
};
var QueriesTab = /** @class */ (function (_super) {
    tslib_1.__extends(QueriesTab, _super);
    function QueriesTab(props) {
        var _this = _super.call(this, props) || this;
        _this.datasources = getDatasourceSrv().getMetricSources();
        _this.backendSrv = getBackendSrv();
        _this.onChangeDataSource = function (datasource) {
            var panel = _this.props.panel;
            var currentDS = _this.state.currentDS;
            // switching to mixed
            if (datasource.meta.mixed) {
                panel.targets.forEach(function (target) {
                    target.datasource = panel.datasource;
                    if (!target.datasource) {
                        target.datasource = config.defaultDatasource;
                    }
                });
            }
            else if (currentDS) {
                // if switching from mixed
                if (currentDS.meta.mixed) {
                    for (var _i = 0, _a = panel.targets; _i < _a.length; _i++) {
                        var target = _a[_i];
                        delete target.datasource;
                    }
                }
                else if (currentDS.meta.id !== datasource.meta.id) {
                    // we are changing data source type, clear queries
                    panel.targets = [{ refId: 'A' }];
                }
            }
            panel.datasource = datasource.value;
            panel.refresh();
            _this.setState({
                currentDS: datasource,
            });
        };
        _this.loadHelp = function () {
            var currentDS = _this.state.currentDS;
            var hasHelp = currentDS.meta.hasQueryHelp;
            if (hasHelp) {
                _this.setState({
                    helpContent: React.createElement("h3", null, "Loading help..."),
                    isLoadingHelp: true,
                });
                _this.backendSrv
                    .get("/api/plugins/" + currentDS.meta.id + "/markdown/query_help")
                    .then(function (res) {
                    var md = new Remarkable();
                    var helpHtml = md.render(res);
                    _this.setState({
                        helpContent: React.createElement("div", { className: "markdown-html", dangerouslySetInnerHTML: { __html: helpHtml } }),
                        isLoadingHelp: false,
                    });
                })
                    .catch(function () {
                    _this.setState({
                        helpContent: React.createElement("h3", null, "'Error occured when loading help'"),
                        isLoadingHelp: false,
                    });
                });
            }
        };
        _this.renderQueryInspector = function () {
            var panel = _this.props.panel;
            return React.createElement(QueryInspector, { panel: panel, LoadingPlaceholder: LoadingPlaceholder });
        };
        _this.renderHelp = function () {
            var _a = _this.state, helpContent = _a.helpContent, isLoadingHelp = _a.isLoadingHelp;
            return isLoadingHelp ? React.createElement(LoadingPlaceholder, { text: "Loading help..." }) : helpContent;
        };
        _this.onAddQuery = function (query) {
            _this.props.panel.addQuery(query);
            _this.forceUpdate();
        };
        _this.onAddQueryClick = function () {
            if (_this.state.currentDS.meta.mixed) {
                _this.setState({ isAddingMixed: true });
                return;
            }
            _this.props.panel.addQuery();
            _this.component.digest();
            _this.forceUpdate();
        };
        _this.onRemoveQuery = function (query) {
            var panel = _this.props.panel;
            var index = _.indexOf(panel.targets, query);
            panel.targets.splice(index, 1);
            panel.refresh();
            _this.forceUpdate();
        };
        _this.onMoveQuery = function (query, direction) {
            var panel = _this.props.panel;
            var index = _.indexOf(panel.targets, query);
            _.move(panel.targets, index, index + direction);
            _this.forceUpdate();
        };
        _this.renderToolbar = function () {
            var currentDS = _this.state.currentDS;
            return React.createElement(DataSourcePicker, { datasources: _this.datasources, onChange: _this.onChangeDataSource, current: currentDS });
        };
        _this.renderMixedPicker = function () {
            return (React.createElement(DataSourcePicker, { datasources: _this.datasources, onChange: _this.onAddMixedQuery, current: null, autoFocus: true, onBlur: _this.onMixedPickerBlur }));
        };
        _this.onAddMixedQuery = function (datasource) {
            _this.onAddQuery({ datasource: datasource.name });
            _this.component.digest();
            _this.setState({ isAddingMixed: false });
        };
        _this.onMixedPickerBlur = function () {
            _this.setState({ isAddingMixed: false });
        };
        var panel = props.panel;
        _this.state = {
            currentDS: _this.datasources.find(function (datasource) { return datasource.value === panel.datasource; }),
            isLoadingHelp: false,
            helpContent: null,
            isPickerOpen: false,
            isAddingMixed: false,
        };
        return _this;
    }
    QueriesTab.prototype.getAngularQueryComponentScope = function () {
        var _a = this.props, panel = _a.panel, dashboard = _a.dashboard;
        return {
            panel: panel,
            dashboard: dashboard,
            refresh: function () { return panel.refresh(); },
            render: function () { return panel.render; },
            addQuery: this.onAddQuery,
            moveQuery: this.onMoveQuery,
            removeQuery: this.onRemoveQuery,
            events: panel.events,
        };
    };
    QueriesTab.prototype.componentDidMount = function () {
        if (!this.element) {
            return;
        }
        var loader = getAngularLoader();
        var template = '<metrics-tab />';
        var scopeProps = {
            ctrl: this.getAngularQueryComponentScope(),
        };
        this.component = loader.load(this.element, scopeProps, template);
    };
    QueriesTab.prototype.componentWillUnmount = function () {
        if (this.component) {
            this.component.destroy();
        }
    };
    QueriesTab.prototype.render = function () {
        var _this = this;
        var panel = this.props.panel;
        var _a = this.state, currentDS = _a.currentDS, isAddingMixed = _a.isAddingMixed;
        var hasQueryHelp = currentDS.meta.hasQueryHelp;
        var queryInspector = {
            title: 'Query Inspector',
            render: this.renderQueryInspector,
        };
        var dsHelp = {
            heading: 'Help',
            icon: 'fa fa-question',
            disabled: !hasQueryHelp,
            onClick: this.loadHelp,
            render: this.renderHelp,
        };
        return (React.createElement(EditorTabBody, { heading: "Queries", renderToolbar: this.renderToolbar, toolbarItems: [queryInspector, dsHelp] },
            React.createElement(React.Fragment, null,
                React.createElement(PanelOptionSection, null,
                    React.createElement("div", { className: "query-editor-rows" },
                        React.createElement("div", { ref: function (element) { return (_this.element = element); } }),
                        React.createElement("div", { className: "gf-form-query" },
                            React.createElement("div", { className: "gf-form gf-form-query-letter-cell" },
                                React.createElement("label", { className: "gf-form-label" },
                                    React.createElement("span", { className: "gf-form-query-letter-cell-carret muted" },
                                        React.createElement("i", { className: "fa fa-caret-down" })),
                                    ' ',
                                    React.createElement("span", { className: "gf-form-query-letter-cell-letter" }, panel.getNextQueryLetter()))),
                            React.createElement("div", { className: "gf-form" },
                                !isAddingMixed && (React.createElement("button", { className: "btn btn-secondary gf-form-btn", onClick: this.onAddQueryClick }, "Add Query")),
                                isAddingMixed && this.renderMixedPicker())))),
                React.createElement(PanelOptionSection, null,
                    React.createElement(QueryOptions, { panel: panel, datasource: currentDS })))));
    };
    return QueriesTab;
}(PureComponent));
export { QueriesTab };
//# sourceMappingURL=QueriesTab.js.map