var _this = this;
import * as tslib_1 from "tslib";
import { ActionTypes } from './actions';
import { OrgRole, PermissionLevel } from 'app/types';
import { initialState, dashboardReducer } from './reducers';
describe('dashboard reducer', function () {
    describe('loadDashboardPermissions', function () {
        var state;
        beforeEach(function () {
            var action = {
                type: ActionTypes.LoadDashboardPermissions,
                payload: [
                    { id: 2, dashboardId: 1, role: OrgRole.Viewer, permission: PermissionLevel.View },
                    { id: 3, dashboardId: 1, role: OrgRole.Editor, permission: PermissionLevel.Edit },
                ],
            };
            state = dashboardReducer(initialState, action);
        });
        it('should add permissions to state', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                expect(state.permissions.length).toBe(2);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=reducers.test.js.map