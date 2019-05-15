import * as tslib_1 from "tslib";
import _ from 'lodash';
import { PanelCtrl } from '../../../features/panel/panel_ctrl';
var PluginListCtrl = /** @class */ (function (_super) {
    tslib_1.__extends(PluginListCtrl, _super);
    /** @ngInject */
    function PluginListCtrl($scope, $injector, backendSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.backendSrv = backendSrv;
        // Set and populate defaults
        _this.panelDefaults = {};
        _.defaults(_this.panel, _this.panelDefaults);
        _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
        _this.pluginList = [];
        _this.viewModel = [
            { header: 'Installed Apps', list: [], type: 'app' },
            { header: 'Installed Panels', list: [], type: 'panel' },
            { header: 'Installed Datasources', list: [], type: 'datasource' },
        ];
        _this.update();
        return _this;
    }
    PluginListCtrl.prototype.onInitEditMode = function () {
        this.editorTabIndex = 1;
        this.addEditorTab('Options', 'public/app/plugins/panel/pluginlist/editor.html');
    };
    PluginListCtrl.prototype.gotoPlugin = function (plugin, evt) {
        if (evt) {
            evt.stopPropagation();
        }
        this.$location.url("plugins/" + plugin.id + "/edit");
    };
    PluginListCtrl.prototype.updateAvailable = function (plugin, $event) {
        $event.stopPropagation();
        $event.preventDefault();
        var modalScope = this.$scope.$new(true);
        modalScope.plugin = plugin;
        this.publishAppEvent('show-modal', {
            src: 'public/app/features/plugins/partials/update_instructions.html',
            scope: modalScope,
        });
    };
    PluginListCtrl.prototype.update = function () {
        var _this = this;
        this.backendSrv.get('api/plugins', { embedded: 0, core: 0 }).then(function (plugins) {
            _this.pluginList = plugins;
            _this.viewModel[0].list = _.filter(plugins, { type: 'app' });
            _this.viewModel[1].list = _.filter(plugins, { type: 'panel' });
            _this.viewModel[2].list = _.filter(plugins, { type: 'datasource' });
            for (var _i = 0, _a = _this.pluginList; _i < _a.length; _i++) {
                var plugin = _a[_i];
                if (plugin.hasUpdate) {
                    plugin.state = 'has-update';
                }
                else if (!plugin.enabled) {
                    plugin.state = 'not-enabled';
                }
            }
        });
    };
    PluginListCtrl.templateUrl = 'module.html';
    PluginListCtrl.scrollable = true;
    return PluginListCtrl;
}(PanelCtrl));
export { PluginListCtrl, PluginListCtrl as PanelCtrl };
//# sourceMappingURL=module.js.map