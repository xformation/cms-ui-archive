import * as tslib_1 from "tslib";
import { getBackendSrv } from 'app/core/services/backend_srv';
import appEvents from 'app/core/app_events';
import { loadPluginDashboards } from '../../plugins/state/actions';
export var ActionTypes;
(function (ActionTypes) {
    ActionTypes["LoadDashboardPermissions"] = "LOAD_DASHBOARD_PERMISSIONS";
    ActionTypes["LoadStarredDashboards"] = "LOAD_STARRED_DASHBOARDS";
})(ActionTypes || (ActionTypes = {}));
export var loadDashboardPermissions = function (items) { return ({
    type: ActionTypes.LoadDashboardPermissions,
    payload: items,
}); };
export function getDashboardPermissions(id) {
    var _this = this;
    return function (dispatch) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var permissions;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBackendSrv().get("/api/dashboards/id/" + id + "/permissions")];
                case 1:
                    permissions = _a.sent();
                    dispatch(loadDashboardPermissions(permissions));
                    return [2 /*return*/];
            }
        });
    }); };
}
function toUpdateItem(item) {
    return {
        userId: item.userId,
        teamId: item.teamId,
        role: item.role,
        permission: item.permission,
    };
}
export function updateDashboardPermission(dashboardId, itemToUpdate, level) {
    var _this = this;
    return function (dispatch, getStore) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var dashboard, itemsToUpdate, _i, _a, item, updated;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dashboard = getStore().dashboard;
                    itemsToUpdate = [];
                    for (_i = 0, _a = dashboard.permissions; _i < _a.length; _i++) {
                        item = _a[_i];
                        if (item.inherited) {
                            continue;
                        }
                        updated = toUpdateItem(item);
                        // if this is the item we want to update, update it's permisssion
                        if (itemToUpdate === item) {
                            updated.permission = level;
                        }
                        itemsToUpdate.push(updated);
                    }
                    return [4 /*yield*/, getBackendSrv().post("/api/dashboards/id/" + dashboardId + "/permissions", { items: itemsToUpdate })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, dispatch(getDashboardPermissions(dashboardId))];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
}
export function removeDashboardPermission(dashboardId, itemToDelete) {
    var _this = this;
    return function (dispatch, getStore) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var dashboard, itemsToUpdate, _i, _a, item;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dashboard = getStore().dashboard;
                    itemsToUpdate = [];
                    for (_i = 0, _a = dashboard.permissions; _i < _a.length; _i++) {
                        item = _a[_i];
                        if (item.inherited || item === itemToDelete) {
                            continue;
                        }
                        itemsToUpdate.push(toUpdateItem(item));
                    }
                    return [4 /*yield*/, getBackendSrv().post("/api/dashboards/id/" + dashboardId + "/permissions", { items: itemsToUpdate })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, dispatch(getDashboardPermissions(dashboardId))];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
}
export function addDashboardPermission(dashboardId, newItem) {
    var _this = this;
    return function (dispatch, getStore) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var dashboard, itemsToUpdate, _i, _a, item;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dashboard = getStore().dashboard;
                    itemsToUpdate = [];
                    for (_i = 0, _a = dashboard.permissions; _i < _a.length; _i++) {
                        item = _a[_i];
                        if (item.inherited) {
                            continue;
                        }
                        itemsToUpdate.push(toUpdateItem(item));
                    }
                    itemsToUpdate.push({
                        userId: newItem.userId,
                        teamId: newItem.teamId,
                        role: newItem.role,
                        permission: newItem.permission,
                    });
                    return [4 /*yield*/, getBackendSrv().post("/api/dashboards/id/" + dashboardId + "/permissions", { items: itemsToUpdate })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, dispatch(getDashboardPermissions(dashboardId))];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
}
export function importDashboard(data, dashboardTitle) {
    var _this = this;
    return function (dispatch) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBackendSrv().post('/api/dashboards/import', data)];
                case 1:
                    _a.sent();
                    appEvents.emit('alert-success', ['Dashboard Imported', dashboardTitle]);
                    dispatch(loadPluginDashboards());
                    return [2 /*return*/];
            }
        });
    }); };
}
export function removeDashboard(uri) {
    var _this = this;
    return function (dispatch) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBackendSrv().delete("/api/dashboards/" + uri)];
                case 1:
                    _a.sent();
                    dispatch(loadPluginDashboards());
                    return [2 /*return*/];
            }
        });
    }); };
}
//# sourceMappingURL=actions.js.map