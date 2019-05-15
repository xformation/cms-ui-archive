import * as tslib_1 from "tslib";
// Libraries
import React, { PureComponent } from 'react';
// Utils & Services
import { getAngularLoader } from 'app/core/services/AngularLoader';
// Components
import { EditorTabBody } from './EditorTabBody';
import { VizTypePicker } from './VizTypePicker';
import { FadeIn } from 'app/core/components/Animations/FadeIn';
import { PanelOptionSection } from './PanelOptionSection';
var VisualizationTab = /** @class */ (function (_super) {
    tslib_1.__extends(VisualizationTab, _super);
    function VisualizationTab(props) {
        var _this = _super.call(this, props) || this;
        _this.getPanelDefaultOptions = function () {
            var _a = _this.props, panel = _a.panel, plugin = _a.plugin;
            if (plugin.exports.PanelDefaults) {
                return panel.getOptions(plugin.exports.PanelDefaults.options);
            }
            return panel.getOptions(plugin.exports.PanelDefaults);
        };
        _this.onPanelOptionsChanged = function (options) {
            _this.props.panel.updateOptions(options);
            _this.forceUpdate();
        };
        _this.onOpenVizPicker = function () {
            _this.setState({ isVizPickerOpen: true });
        };
        _this.onCloseVizPicker = function () {
            _this.setState({ isVizPickerOpen: false });
        };
        _this.onSearchQueryChange = function (evt) {
            var value = evt.target.value;
            _this.setState({
                searchQuery: value,
            });
        };
        _this.renderToolbar = function () {
            var plugin = _this.props.plugin;
            var searchQuery = _this.state.searchQuery;
            if (_this.state.isVizPickerOpen) {
                return (React.createElement(React.Fragment, null,
                    React.createElement("label", { className: "gf-form--has-input-icon" },
                        React.createElement("input", { type: "text", className: "gf-form-input width-13", placeholder: "", onChange: _this.onSearchQueryChange, value: searchQuery, ref: function (elem) { return elem && elem.focus(); } }),
                        React.createElement("i", { className: "gf-form-input-icon fa fa-search" })),
                    React.createElement("button", { className: "btn btn-link toolbar__close", onClick: _this.onCloseVizPicker },
                        React.createElement("i", { className: "fa fa-chevron-up" }))));
            }
            else {
                return (React.createElement("div", { className: "toolbar__main", onClick: _this.onOpenVizPicker },
                    React.createElement("img", { className: "toolbar__main-image", src: plugin.info.logos.small }),
                    React.createElement("div", { className: "toolbar__main-name" }, plugin.name),
                    React.createElement("i", { className: "fa fa-caret-down" })));
            }
        };
        _this.onTypeChanged = function (plugin) {
            if (plugin.id === _this.props.plugin.id) {
                _this.setState({ isVizPickerOpen: false });
            }
            else {
                _this.props.onTypeChanged(plugin);
            }
        };
        _this.state = {
            isVizPickerOpen: false,
            searchQuery: '',
        };
        return _this;
    }
    VisualizationTab.prototype.renderPanelOptions = function () {
        var _this = this;
        var _a = this.props, plugin = _a.plugin, angularPanel = _a.angularPanel;
        var PanelOptions = plugin.exports.PanelOptions;
        if (angularPanel) {
            return React.createElement("div", { ref: function (element) { return (_this.element = element); } });
        }
        return (React.createElement(PanelOptionSection, null, PanelOptions ? (React.createElement(PanelOptions, { options: this.getPanelDefaultOptions(), onChange: this.onPanelOptionsChanged })) : (React.createElement("p", null, "Visualization has no options"))));
    };
    VisualizationTab.prototype.componentDidMount = function () {
        if (this.shouldLoadAngularOptions()) {
            this.loadAngularOptions();
        }
    };
    VisualizationTab.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.plugin !== prevProps.plugin) {
            this.cleanUpAngularOptions();
        }
        if (this.shouldLoadAngularOptions()) {
            this.loadAngularOptions();
        }
    };
    VisualizationTab.prototype.shouldLoadAngularOptions = function () {
        return this.props.angularPanel && this.element && !this.angularOptions;
    };
    VisualizationTab.prototype.loadAngularOptions = function () {
        var _this = this;
        var angularPanel = this.props.angularPanel;
        var scope = angularPanel.getScope();
        // When full page reloading in edit mode the angular panel has on fully compiled & instantiated yet
        if (!scope.$$childHead) {
            setTimeout(function () {
                _this.forceUpdate();
            });
            return;
        }
        var panelCtrl = scope.$$childHead.ctrl;
        var template = '';
        for (var i = 0; i < panelCtrl.editorTabs.length; i++) {
            template +=
                "\n      <div class=\"panel-option-section\" ng-cloak>" +
                    (i > 0 ? "<div class=\"panel-option-section__header\">{{ctrl.editorTabs[" + i + "].title}}</div>" : '') +
                    ("<div class=\"panel-option-section__body\">\n          <panel-editor-tab editor-tab=\"ctrl.editorTabs[" + i + "]\" ctrl=\"ctrl\"></panel-editor-tab>\n        </div>\n      </div>\n      ");
        }
        var loader = getAngularLoader();
        var scopeProps = { ctrl: panelCtrl };
        this.angularOptions = loader.load(this.element, scopeProps, template);
    };
    VisualizationTab.prototype.componentWillUnmount = function () {
        this.cleanUpAngularOptions();
    };
    VisualizationTab.prototype.cleanUpAngularOptions = function () {
        if (this.angularOptions) {
            this.angularOptions.destroy();
            this.angularOptions = null;
        }
    };
    VisualizationTab.prototype.render = function () {
        var plugin = this.props.plugin;
        var _a = this.state, isVizPickerOpen = _a.isVizPickerOpen, searchQuery = _a.searchQuery;
        return (React.createElement(EditorTabBody, { heading: "Visualization", renderToolbar: this.renderToolbar },
            React.createElement(React.Fragment, null,
                React.createElement(FadeIn, { in: isVizPickerOpen, duration: 200, unmountOnExit: true },
                    React.createElement(VizTypePicker, { current: plugin, onTypeChanged: this.onTypeChanged, searchQuery: searchQuery, onClose: this.onCloseVizPicker })),
                this.renderPanelOptions())));
    };
    return VisualizationTab;
}(PureComponent));
export { VisualizationTab };
//# sourceMappingURL=VisualizationTab.js.map