import _ from 'lodash';
import $ from 'jquery';
import Remarkable from 'remarkable';
import config from 'app/core/config';
import { profiler } from 'app/core/core';
import { duplicatePanel, copyPanel as copyPanelUtil, editPanelJson as editPanelJsonUtil, sharePanel as sharePanelUtil, } from 'app/features/dashboard/utils/panel';
import { GRID_CELL_HEIGHT, GRID_CELL_VMARGIN, PANEL_HEADER_HEIGHT, PANEL_BORDER } from 'app/core/constants';
var PanelCtrl = /** @class */ (function () {
    function PanelCtrl($scope, $injector) {
        var _this = this;
        this.$injector = $injector;
        this.$location = $injector.get('$location');
        this.$scope = $scope;
        this.$timeout = $injector.get('$timeout');
        this.editorTabIndex = 0;
        this.events = this.panel.events;
        this.timing = {};
        var plugin = config.panels[this.panel.type];
        if (plugin) {
            this.pluginId = plugin.id;
            this.pluginName = plugin.name;
        }
        $scope.$on('component-did-mount', function () { return _this.panelDidMount(); });
    }
    PanelCtrl.prototype.panelDidMount = function () {
        this.events.emit('component-did-mount');
        this.dashboard.panelInitialized(this.panel);
    };
    PanelCtrl.prototype.renderingCompleted = function () {
        profiler.renderingCompleted(this.panel.id, this.timing);
    };
    PanelCtrl.prototype.refresh = function () {
        this.panel.refresh();
    };
    PanelCtrl.prototype.publishAppEvent = function (evtName, evt) {
        this.$scope.$root.appEvent(evtName, evt);
    };
    PanelCtrl.prototype.changeView = function (fullscreen, edit) {
        this.publishAppEvent('panel-change-view', {
            fullscreen: fullscreen,
            edit: edit,
            panelId: this.panel.id,
        });
    };
    PanelCtrl.prototype.viewPanel = function () {
        this.changeView(true, false);
    };
    PanelCtrl.prototype.editPanel = function () {
        this.changeView(true, true);
    };
    PanelCtrl.prototype.exitFullscreen = function () {
        this.changeView(false, false);
    };
    PanelCtrl.prototype.initEditMode = function () {
        this.editorTabs = [];
        this.editModeInitiated = true;
        this.events.emit('init-edit-mode', null);
    };
    PanelCtrl.prototype.addEditorTab = function (title, directiveFn, index, icon) {
        var editorTab = { title: title, directiveFn: directiveFn, icon: icon };
        if (_.isString(directiveFn)) {
            editorTab.directiveFn = function () {
                return { templateUrl: directiveFn };
            };
        }
        if (index) {
            this.editorTabs.splice(index, 0, editorTab);
        }
        else {
            this.editorTabs.push(editorTab);
        }
    };
    PanelCtrl.prototype.getMenu = function () {
        var menu = [];
        menu.push({
            text: 'View',
            click: 'ctrl.viewPanel();',
            icon: 'fa fa-fw fa-eye',
            shortcut: 'v',
        });
        if (this.dashboard.meta.canEdit) {
            menu.push({
                text: 'Edit',
                click: 'ctrl.editPanel();',
                role: 'Editor',
                icon: 'fa fa-fw fa-edit',
                shortcut: 'e',
            });
        }
        menu.push({
            text: 'Share',
            click: 'ctrl.sharePanel();',
            icon: 'fa fa-fw fa-share',
            shortcut: 'p s',
        });
        // Additional items from sub-class
        menu.push.apply(menu, this.getAdditionalMenuItems());
        var extendedMenu = this.getExtendedMenu();
        menu.push({
            text: 'More ...',
            click: '',
            icon: 'fa fa-fw fa-cube',
            submenu: extendedMenu,
        });
        if (this.dashboard.meta.canEdit) {
            menu.push({ divider: true, role: 'Editor' });
            menu.push({
                text: 'Remove',
                click: 'ctrl.removePanel();',
                role: 'Editor',
                icon: 'fa fa-fw fa-trash',
                shortcut: 'p r',
            });
        }
        return menu;
    };
    PanelCtrl.prototype.getExtendedMenu = function () {
        var menu = [];
        if (!this.panel.fullscreen && this.dashboard.meta.canEdit) {
            menu.push({
                text: 'Duplicate',
                click: 'ctrl.duplicate()',
                role: 'Editor',
                shortcut: 'p d',
            });
            menu.push({
                text: 'Copy',
                click: 'ctrl.copyPanel()',
                role: 'Editor',
            });
        }
        menu.push({
            text: 'Panel JSON',
            click: 'ctrl.editPanelJson(); dismiss();',
        });
        this.events.emit('init-panel-actions', menu);
        return menu;
    };
    // Override in sub-class to add items before extended menu
    PanelCtrl.prototype.getAdditionalMenuItems = function () {
        return [];
    };
    PanelCtrl.prototype.otherPanelInFullscreenMode = function () {
        return this.dashboard.meta.fullscreen && !this.panel.fullscreen;
    };
    PanelCtrl.prototype.calculatePanelHeight = function () {
        if (this.panel.fullscreen) {
            var docHeight = $('.react-grid-layout').height();
            var editHeight = Math.floor(docHeight * 0.35);
            var fullscreenHeight = Math.floor(docHeight * 0.8);
            this.containerHeight = this.panel.isEditing ? editHeight : fullscreenHeight;
        }
        else {
            this.containerHeight = this.panel.gridPos.h * GRID_CELL_HEIGHT + (this.panel.gridPos.h - 1) * GRID_CELL_VMARGIN;
        }
        if (this.panel.soloMode) {
            this.containerHeight = $(window).height();
        }
        // hacky solution
        if (this.panel.isEditing && !this.editModeInitiated) {
            this.initEditMode();
        }
        this.height = this.containerHeight - (PANEL_BORDER + PANEL_HEADER_HEIGHT);
    };
    PanelCtrl.prototype.render = function (payload) {
        this.timing.renderStart = new Date().getTime();
        this.events.emit('render', payload);
    };
    PanelCtrl.prototype.duplicate = function () {
        duplicatePanel(this.dashboard, this.panel);
    };
    PanelCtrl.prototype.removePanel = function () {
        this.publishAppEvent('panel-remove', {
            panelId: this.panel.id,
        });
    };
    PanelCtrl.prototype.editPanelJson = function () {
        editPanelJsonUtil(this.dashboard, this.panel);
    };
    PanelCtrl.prototype.copyPanel = function () {
        copyPanelUtil(this.panel);
    };
    PanelCtrl.prototype.sharePanel = function () {
        sharePanelUtil(this.dashboard, this.panel);
    };
    PanelCtrl.prototype.getInfoMode = function () {
        if (this.error) {
            return 'error';
        }
        if (!!this.panel.description) {
            return 'info';
        }
        if (this.panel.links && this.panel.links.length) {
            return 'links';
        }
        return '';
    };
    PanelCtrl.prototype.getInfoContent = function (options) {
        var markdown = this.panel.description;
        if (options.mode === 'tooltip') {
            markdown = this.error || this.panel.description;
        }
        var linkSrv = this.$injector.get('linkSrv');
        var sanitize = this.$injector.get('$sanitize');
        var templateSrv = this.$injector.get('templateSrv');
        var interpolatedMarkdown = templateSrv.replace(markdown, this.panel.scopedVars);
        var html = '<div class="markdown-html">';
        html += new Remarkable().render(interpolatedMarkdown);
        if (this.panel.links && this.panel.links.length > 0) {
            html += '<ul>';
            for (var _i = 0, _a = this.panel.links; _i < _a.length; _i++) {
                var link = _a[_i];
                var info = linkSrv.getPanelLinkAnchorInfo(link, this.panel.scopedVars);
                html +=
                    '<li><a class="panel-menu-link" href="' +
                        info.href +
                        '" target="' +
                        info.target +
                        '">' +
                        info.title +
                        '</a></li>';
            }
            html += '</ul>';
        }
        html += '</div>';
        return sanitize(html);
    };
    PanelCtrl.prototype.openInspector = function () {
        var modalScope = this.$scope.$new();
        modalScope.panel = this.panel;
        modalScope.dashboard = this.dashboard;
        modalScope.panelInfoHtml = this.getInfoContent({ mode: 'inspector' });
        modalScope.inspector = $.extend(true, {}, this.inspector);
        this.publishAppEvent('show-modal', {
            src: 'public/app/features/dashboard/partials/inspector.html',
            scope: modalScope,
        });
    };
    return PanelCtrl;
}());
export { PanelCtrl };
//# sourceMappingURL=panel_ctrl.js.map