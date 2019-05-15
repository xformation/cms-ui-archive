//import { describe, beforeEach, it, expect, angularMocks } from 'test/lib/common';
import 'app/features/dashboard/view_state_srv';
import config from 'app/core/config';
import { DashboardViewState } from '../view_state_srv';
import { DashboardModel } from '../dashboard_model';
describe('when updating view state', function () {
    var location = {
        replace: jest.fn(),
        search: jest.fn(),
    };
    var $scope = {
        appEvent: jest.fn(),
        onAppEvent: jest.fn(function () { }),
        dashboard: new DashboardModel({
            panels: [{ id: 1 }],
        }),
    };
    var viewState;
    beforeEach(function () {
        config.bootData = {
            user: {
                orgId: 1,
            },
        };
    });
    describe('to fullscreen true and edit true', function () {
        beforeEach(function () {
            location.search = jest.fn(function () {
                return { fullscreen: true, edit: true, panelId: 1 };
            });
            viewState = new DashboardViewState($scope, location, {});
        });
        it('should update querystring and view state', function () {
            var updateState = { fullscreen: true, edit: true, panelId: 1 };
            viewState.update(updateState);
            expect(location.search).toHaveBeenCalledWith({
                edit: true,
                editview: null,
                fullscreen: true,
                orgId: 1,
                panelId: 1,
            });
            expect(viewState.dashboard.meta.fullscreen).toBe(true);
            expect(viewState.state.fullscreen).toBe(true);
        });
    });
    describe('to fullscreen false', function () {
        beforeEach(function () {
            viewState = new DashboardViewState($scope, location, {});
        });
        it('should remove params from query string', function () {
            viewState.update({ fullscreen: true, panelId: 1, edit: true });
            viewState.update({ fullscreen: false });
            expect(viewState.dashboard.meta.fullscreen).toBe(false);
            expect(viewState.state.fullscreen).toBe(null);
        });
    });
});
//# sourceMappingURL=viewstate_srv.test.js.map