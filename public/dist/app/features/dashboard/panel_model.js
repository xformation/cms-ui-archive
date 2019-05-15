import * as tslib_1 from "tslib";
import { Emitter } from 'app/core/utils/emitter';
import _ from 'lodash';
import { PANEL_OPTIONS_KEY_PREFIX } from 'app/core/constants';
var notPersistedProperties = {
    events: true,
    fullscreen: true,
    isEditing: true,
    hasRefreshed: true,
    cachedPluginOptions: true,
};
// For angular panels we need to clean up properties when changing type
// To make sure the change happens without strange bugs happening when panels use same
// named property with different type / value expectations
// This is not required for react panels
var mustKeepProps = {
    id: true,
    gridPos: true,
    type: true,
    title: true,
    scopedVars: true,
    repeat: true,
    repeatIteration: true,
    repeatPanelId: true,
    repeatDirection: true,
    repeatedByRow: true,
    minSpan: true,
    collapsed: true,
    panels: true,
    targets: true,
    datasource: true,
    timeFrom: true,
    timeShift: true,
    hideTimeOverride: true,
    maxDataPoints: true,
    interval: true,
    description: true,
    links: true,
    fullscreen: true,
    isEditing: true,
    hasRefreshed: true,
    events: true,
    cacheTimeout: true,
    nullPointMode: true,
    cachedPluginOptions: true,
    transparent: true,
};
var defaults = {
    gridPos: { x: 0, y: 0, h: 3, w: 6 },
    datasource: null,
    targets: [{}],
    cachedPluginOptions: {},
    transparent: false,
};
var PanelModel = /** @class */ (function () {
    function PanelModel(model) {
        this.events = new Emitter();
        // copy properties from persisted model
        for (var property in model) {
            this[property] = model[property];
        }
        // defaults
        _.defaultsDeep(this, _.cloneDeep(defaults));
    }
    PanelModel.prototype.getOptions = function (panelDefaults) {
        return _.defaultsDeep(this[this.getOptionsKey()] || {}, panelDefaults);
    };
    PanelModel.prototype.updateOptions = function (options) {
        var update = {};
        update[this.getOptionsKey()] = options;
        Object.assign(this, update);
        this.render();
    };
    PanelModel.prototype.getOptionsKey = function () {
        return PANEL_OPTIONS_KEY_PREFIX + this.type;
    };
    PanelModel.prototype.getSaveModel = function () {
        var model = {};
        for (var property in this) {
            if (notPersistedProperties[property] || !this.hasOwnProperty(property)) {
                continue;
            }
            if (_.isEqual(this[property], defaults[property])) {
                continue;
            }
            model[property] = _.cloneDeep(this[property]);
        }
        return model;
    };
    PanelModel.prototype.setViewMode = function (fullscreen, isEditing) {
        this.fullscreen = fullscreen;
        this.isEditing = isEditing;
        this.events.emit('view-mode-changed');
    };
    PanelModel.prototype.updateGridPos = function (newPos) {
        var sizeChanged = false;
        if (this.gridPos.w !== newPos.w || this.gridPos.h !== newPos.h) {
            sizeChanged = true;
        }
        this.gridPos.x = newPos.x;
        this.gridPos.y = newPos.y;
        this.gridPos.w = newPos.w;
        this.gridPos.h = newPos.h;
        if (sizeChanged) {
            this.events.emit('panel-size-changed');
        }
    };
    PanelModel.prototype.resizeDone = function () {
        this.events.emit('panel-size-changed');
    };
    PanelModel.prototype.refresh = function () {
        this.hasRefreshed = true;
        this.events.emit('refresh');
    };
    PanelModel.prototype.render = function () {
        if (!this.hasRefreshed) {
            this.refresh();
        }
        else {
            this.events.emit('render');
        }
    };
    PanelModel.prototype.initialized = function () {
        this.events.emit('panel-initialized');
    };
    PanelModel.prototype.getOptionsToRemember = function () {
        var _this = this;
        return Object.keys(this).reduce(function (acc, property) {
            var _a;
            if (notPersistedProperties[property] || mustKeepProps[property]) {
                return acc;
            }
            return tslib_1.__assign({}, acc, (_a = {}, _a[property] = _this[property], _a));
        }, {});
    };
    PanelModel.prototype.saveCurrentPanelOptions = function () {
        this.cachedPluginOptions[this.type] = this.getOptionsToRemember();
    };
    PanelModel.prototype.restorePanelOptions = function (pluginId) {
        var _this = this;
        var prevOptions = this.cachedPluginOptions[pluginId] || {};
        Object.keys(prevOptions).map(function (property) {
            _this[property] = prevOptions[property];
        });
    };
    PanelModel.prototype.changeType = function (pluginId, fromAngularPanel) {
        this.saveCurrentPanelOptions();
        this.type = pluginId;
        // for angular panels only we need to remove all events and let angular panels do some cleanup
        if (fromAngularPanel) {
            this.destroy();
            for (var _i = 0, _a = _.keys(this); _i < _a.length; _i++) {
                var key = _a[_i];
                if (mustKeepProps[key]) {
                    continue;
                }
                delete this[key];
            }
        }
        this.restorePanelOptions(pluginId);
    };
    PanelModel.prototype.addQuery = function (query) {
        query = query || { refId: 'A' };
        query.refId = this.getNextQueryLetter();
        query.isNew = true;
        this.targets.push(query);
    };
    PanelModel.prototype.getNextQueryLetter = function () {
        var _this = this;
        var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return _.find(letters, function (refId) {
            return _.every(_this.targets, function (other) {
                return other.refId !== refId;
            });
        });
    };
    PanelModel.prototype.destroy = function () {
        this.events.emit('panel-teardown');
        this.events.removeAllListeners();
    };
    return PanelModel;
}());
export { PanelModel };
//# sourceMappingURL=panel_model.js.map