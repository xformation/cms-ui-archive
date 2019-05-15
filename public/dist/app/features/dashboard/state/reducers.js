import * as tslib_1 from "tslib";
import { ActionTypes } from './actions';
import { processAclItems } from 'app/core/utils/acl';
export var initialState = {
    permissions: [],
};
export var dashboardReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ActionTypes.LoadDashboardPermissions:
            return tslib_1.__assign({}, state, { permissions: processAclItems(action.payload) });
    }
    return state;
};
export default {
    dashboard: dashboardReducer,
};
//# sourceMappingURL=reducers.js.map