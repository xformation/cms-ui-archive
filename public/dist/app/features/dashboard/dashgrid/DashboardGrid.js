import * as tslib_1 from "tslib";
import React from 'react';
import { hot } from 'react-hot-loader';
import ReactGridLayout from 'react-grid-layout';
import { GRID_CELL_HEIGHT, GRID_CELL_VMARGIN, GRID_COLUMN_COUNT } from 'app/core/constants';
import { DashboardPanel } from './DashboardPanel';
import classNames from 'classnames';
import sizeMe from 'react-sizeme';
var lastGridWidth = 1200;
var ignoreNextWidthChange = false;
function GridWrapper(_a) {
    var size = _a.size, layout = _a.layout, onLayoutChange = _a.onLayoutChange, children = _a.children, onDragStop = _a.onDragStop, onResize = _a.onResize, onResizeStop = _a.onResizeStop, onWidthChange = _a.onWidthChange, className = _a.className, isResizable = _a.isResizable, isDraggable = _a.isDraggable, isFullscreen = _a.isFullscreen;
    var width = size.width > 0 ? size.width : lastGridWidth;
    // logic to ignore width changes (optimization)
    if (width !== lastGridWidth) {
        if (ignoreNextWidthChange) {
            ignoreNextWidthChange = false;
        }
        else if (!isFullscreen && Math.abs(width - lastGridWidth) > 8) {
            onWidthChange();
            lastGridWidth = width;
        }
    }
    return (React.createElement(ReactGridLayout, { width: lastGridWidth, className: className, isDraggable: isDraggable, isResizable: isResizable, measureBeforeMount: false, containerPadding: [0, 0], useCSSTransforms: false, margin: [GRID_CELL_VMARGIN, GRID_CELL_VMARGIN], cols: GRID_COLUMN_COUNT, rowHeight: GRID_CELL_HEIGHT, draggableHandle: ".grid-drag-handle", layout: layout, onResize: onResize, onResizeStop: onResizeStop, onDragStop: onDragStop, onLayoutChange: onLayoutChange }, children));
}
var SizedReactLayoutGrid = sizeMe({ monitorWidth: true })(GridWrapper);
var DashboardGrid = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardGrid, _super);
    function DashboardGrid(props) {
        var _this = _super.call(this, props) || this;
        _this.onLayoutChange = _this.onLayoutChange.bind(_this);
        _this.onResize = _this.onResize.bind(_this);
        _this.onResizeStop = _this.onResizeStop.bind(_this);
        _this.onDragStop = _this.onDragStop.bind(_this);
        _this.onWidthChange = _this.onWidthChange.bind(_this);
        // subscribe to dashboard events
        var dashboard = _this.props.dashboard;
        dashboard.on('panel-added', _this.triggerForceUpdate.bind(_this));
        dashboard.on('panel-removed', _this.triggerForceUpdate.bind(_this));
        dashboard.on('repeats-processed', _this.triggerForceUpdate.bind(_this));
        dashboard.on('view-mode-changed', _this.onViewModeChanged.bind(_this));
        dashboard.on('row-collapsed', _this.triggerForceUpdate.bind(_this));
        dashboard.on('row-expanded', _this.triggerForceUpdate.bind(_this));
        return _this;
    }
    DashboardGrid.prototype.buildLayout = function () {
        var layout = [];
        this.panelMap = {};
        for (var _i = 0, _a = this.props.dashboard.panels; _i < _a.length; _i++) {
            var panel = _a[_i];
            var stringId = panel.id.toString();
            this.panelMap[stringId] = panel;
            if (!panel.gridPos) {
                console.log('panel without gridpos');
                continue;
            }
            var panelPos = {
                i: stringId,
                x: panel.gridPos.x,
                y: panel.gridPos.y,
                w: panel.gridPos.w,
                h: panel.gridPos.h,
            };
            if (panel.type === 'row') {
                panelPos.w = GRID_COLUMN_COUNT;
                panelPos.h = 1;
                panelPos.isResizable = false;
                panelPos.isDraggable = panel.collapsed;
            }
            layout.push(panelPos);
        }
        return layout;
    };
    DashboardGrid.prototype.onLayoutChange = function (newLayout) {
        for (var _i = 0, newLayout_1 = newLayout; _i < newLayout_1.length; _i++) {
            var newPos = newLayout_1[_i];
            this.panelMap[newPos.i].updateGridPos(newPos);
        }
        this.props.dashboard.sortPanelsByGridPos();
    };
    DashboardGrid.prototype.triggerForceUpdate = function () {
        this.forceUpdate();
    };
    DashboardGrid.prototype.onWidthChange = function () {
        for (var _i = 0, _a = this.props.dashboard.panels; _i < _a.length; _i++) {
            var panel = _a[_i];
            panel.resizeDone();
        }
    };
    DashboardGrid.prototype.onViewModeChanged = function (payload) {
        ignoreNextWidthChange = true;
        this.forceUpdate();
    };
    DashboardGrid.prototype.updateGridPos = function (item, layout) {
        this.panelMap[item.i].updateGridPos(item);
        // react-grid-layout has a bug (#670), and onLayoutChange() is only called when the component is mounted.
        // So it's required to call it explicitly when panel resized or moved to save layout changes.
        this.onLayoutChange(layout);
    };
    DashboardGrid.prototype.onResize = function (layout, oldItem, newItem) {
        this.panelMap[newItem.i].updateGridPos(newItem);
    };
    DashboardGrid.prototype.onResizeStop = function (layout, oldItem, newItem) {
        this.updateGridPos(newItem, layout);
        this.panelMap[newItem.i].resizeDone();
    };
    DashboardGrid.prototype.onDragStop = function (layout, oldItem, newItem) {
        this.updateGridPos(newItem, layout);
    };
    DashboardGrid.prototype.renderPanels = function () {
        var panelElements = [];
        for (var _i = 0, _a = this.props.dashboard.panels; _i < _a.length; _i++) {
            var panel = _a[_i];
            var panelClasses = classNames({ 'react-grid-item--fullscreen': panel.fullscreen });
            panelElements.push(React.createElement("div", { key: panel.id.toString(), className: panelClasses, id: "panel-" + panel.id },
                React.createElement(DashboardPanel, { panel: panel, dashboard: this.props.dashboard, isEditing: panel.isEditing, isFullscreen: panel.fullscreen })));
        }
        return panelElements;
    };
    DashboardGrid.prototype.render = function () {
        return (React.createElement(SizedReactLayoutGrid, { className: classNames({ layout: true }), layout: this.buildLayout(), isResizable: this.props.dashboard.meta.canEdit, isDraggable: this.props.dashboard.meta.canEdit, onLayoutChange: this.onLayoutChange, onWidthChange: this.onWidthChange, onDragStop: this.onDragStop, onResize: this.onResize, onResizeStop: this.onResizeStop, isFullscreen: this.props.dashboard.meta.fullscreen }, this.renderPanels()));
    };
    return DashboardGrid;
}(React.Component));
export { DashboardGrid };
export default hot(module)(DashboardGrid);
//# sourceMappingURL=DashboardGrid.js.map