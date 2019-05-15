import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import PageHeader from 'app/core/components/PageHeader/PageHeader';
import PageLoader from 'app/core/components/PageLoader/PageLoader';
import PluginSettings from './PluginSettings';
import BasicSettings from './BasicSettings';
import ButtonRow from './ButtonRow';
import appEvents from 'app/core/app_events';
import { getBackendSrv } from 'app/core/services/backend_srv';
import { getDatasourceSrv } from 'app/features/plugins/datasource_srv';
import { getDataSource, getDataSourceMeta } from '../state/selectors';
import { deleteDataSource, loadDataSource, setDataSourceName, setIsDefault, updateDataSource } from '../state/actions';
import { getNavModel } from 'app/core/selectors/navModel';
import { getRouteParamsId } from 'app/core/selectors/location';
import { getDataSourceLoadingNav } from '../state/navModel';
var DataSourceStates;
(function (DataSourceStates) {
    DataSourceStates["Alpha"] = "alpha";
    DataSourceStates["Beta"] = "beta";
})(DataSourceStates || (DataSourceStates = {}));
var DataSourceSettings = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourceSettings, _super);
    function DataSourceSettings(props) {
        var _this = _super.call(this, props) || this;
        _this.onSubmit = function (event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        return [4 /*yield*/, this.props.updateDataSource(tslib_1.__assign({}, this.state.dataSource, { name: this.props.dataSource.name }))];
                    case 1:
                        _a.sent();
                        this.testDataSource();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onDelete = function () {
            appEvents.emit('confirm-modal', {
                title: 'Delete',
                text: 'Are you sure you want to delete this data source?',
                yesText: 'Delete',
                icon: 'fa-trash',
                onConfirm: function () {
                    _this.confirmDelete();
                },
            });
        };
        _this.confirmDelete = function () {
            _this.props.deleteDataSource();
        };
        _this.onModelChange = function (dataSource) {
            _this.setState({
                dataSource: dataSource,
            });
        };
        _this.state = {
            dataSource: {},
        };
        return _this;
    }
    DataSourceSettings.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, loadDataSource, pageId;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, loadDataSource = _a.loadDataSource, pageId = _a.pageId;
                        return [4 /*yield*/, loadDataSource(pageId)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataSourceSettings.prototype.isReadOnly = function () {
        return this.props.dataSource.readOnly === true;
    };
    DataSourceSettings.prototype.shouldRenderInfoBox = function () {
        var state = this.props.dataSourceMeta.state;
        return state === DataSourceStates.Alpha || state === DataSourceStates.Beta;
    };
    DataSourceSettings.prototype.getInfoText = function () {
        var dataSourceMeta = this.props.dataSourceMeta;
        switch (dataSourceMeta.state) {
            case DataSourceStates.Alpha:
                return ('This plugin is marked as being in alpha state, which means it is in early development phase and updates' +
                    ' will include breaking changes.');
            case DataSourceStates.Beta:
                return ('This plugin is marked as being in a beta development state. This means it is in currently in active' +
                    ' development and could be missing important features.');
        }
        return null;
    };
    DataSourceSettings.prototype.renderIsReadOnlyMessage = function () {
        return (React.createElement("div", { className: "grafana-info-box span8" }, "This datasource was added by config and cannot be modified using the UI. Please contact your server admin to update this datasource."));
    };
    DataSourceSettings.prototype.testDataSource = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dsApi;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getDatasourceSrv().get(this.state.dataSource.name)];
                    case 1:
                        dsApi = _a.sent();
                        if (!dsApi.testDatasource) {
                            return [2 /*return*/];
                        }
                        this.setState({ isTesting: true, testingMessage: 'Testing...', testingStatus: 'info' });
                        getBackendSrv().withNoBackendCache(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var result, err_1, message;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, dsApi.testDatasource()];
                                    case 1:
                                        result = _a.sent();
                                        this.setState({
                                            isTesting: false,
                                            testingStatus: result.status,
                                            testingMessage: result.message,
                                        });
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_1 = _a.sent();
                                        message = '';
                                        if (err_1.statusText) {
                                            message = 'HTTP Error ' + err_1.statusText;
                                        }
                                        else {
                                            message = err_1.message;
                                        }
                                        this.setState({
                                            isTesting: false,
                                            testingStatus: 'error',
                                            testingMessage: message,
                                        });
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    DataSourceSettings.prototype.render = function () {
        var _this = this;
        var _a = this.props, dataSource = _a.dataSource, dataSourceMeta = _a.dataSourceMeta, navModel = _a.navModel, setDataSourceName = _a.setDataSourceName, setIsDefault = _a.setIsDefault;
        var _b = this.state, testingMessage = _b.testingMessage, testingStatus = _b.testingStatus;
        return (React.createElement("div", null,
            React.createElement(PageHeader, { model: navModel }),
            Object.keys(dataSource).length === 0 ? (React.createElement(PageLoader, { pageName: "Data source settings" })) : (React.createElement("div", { className: "page-container page-body" },
                React.createElement("div", null,
                    React.createElement("form", { onSubmit: this.onSubmit },
                        this.isReadOnly() && this.renderIsReadOnlyMessage(),
                        this.shouldRenderInfoBox() && React.createElement("div", { className: "grafana-info-box" }, this.getInfoText()),
                        React.createElement(BasicSettings, { dataSourceName: dataSource.name, isDefault: dataSource.isDefault, onDefaultChange: function (state) { return setIsDefault(state); }, onNameChange: function (name) { return setDataSourceName(name); } }),
                        dataSourceMeta.module && (React.createElement(PluginSettings, { dataSource: dataSource, dataSourceMeta: dataSourceMeta, onModelChange: this.onModelChange })),
                        React.createElement("div", { className: "gf-form-group section" }, testingMessage && (React.createElement("div", { className: "alert-" + testingStatus + " alert" },
                            React.createElement("div", { className: "alert-icon" }, testingStatus === 'error' ? (React.createElement("i", { className: "fa fa-exclamation-triangle" })) : (React.createElement("i", { className: "fa fa-check" }))),
                            React.createElement("div", { className: "alert-body" },
                                React.createElement("div", { className: "alert-title" }, testingMessage))))),
                        React.createElement(ButtonRow, { onSubmit: function (event) { return _this.onSubmit(event); }, isReadOnly: this.isReadOnly(), onDelete: this.onDelete })))))));
    };
    return DataSourceSettings;
}(PureComponent));
export { DataSourceSettings };
function mapStateToProps(state) {
    var pageId = getRouteParamsId(state.location);
    var dataSource = getDataSource(state.dataSources, pageId);
    return {
        navModel: getNavModel(state.navIndex, "datasource-settings-" + pageId, getDataSourceLoadingNav('settings')),
        dataSource: getDataSource(state.dataSources, pageId),
        dataSourceMeta: getDataSourceMeta(state.dataSources, dataSource.type),
        pageId: pageId,
    };
}
var mapDispatchToProps = {
    deleteDataSource: deleteDataSource,
    loadDataSource: loadDataSource,
    setDataSourceName: setDataSourceName,
    updateDataSource: updateDataSource,
    setIsDefault: setIsDefault,
};
export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(DataSourceSettings));
//# sourceMappingURL=DataSourceSettings.js.map