jest.mock('app/core/core', function () { return ({}); });
jest.mock('app/core/config', function () {
    return {
        exploreEnabled: true,
        panels: {
            test: {
                id: 'test',
                name: 'test',
            },
        },
    };
});
import q from 'q';
import { PanelModel } from 'app/features/dashboard/panel_model';
import { MetricsPanelCtrl } from '../metrics_panel_ctrl';
describe('MetricsPanelCtrl', function () {
    var ctrl;
    beforeEach(function () {
        ctrl = setupController();
    });
    describe('when getting additional menu items', function () {
        var additionalItems;
        describe('and has no datasource set', function () {
            beforeEach(function () {
                additionalItems = ctrl.getAdditionalMenuItems();
            });
            it('should not return any items', function () {
                expect(additionalItems.length).toBe(0);
            });
        });
        describe('and has datasource set that supports explore and user has powers', function () {
            beforeEach(function () {
                ctrl.contextSrv = { isEditor: true };
                ctrl.datasource = { meta: { explore: true } };
                additionalItems = ctrl.getAdditionalMenuItems();
            });
            it('should not return any items', function () {
                expect(additionalItems.length).toBe(1);
            });
        });
    });
});
function setupController() {
    var injectorStub = {
        get: function (type) {
            switch (type) {
                case '$q': {
                    return q;
                }
                default: {
                    return jest.fn();
                }
            }
        },
    };
    var scope = {
        panel: { events: [] },
        appEvent: jest.fn(),
        onAppEvent: jest.fn(),
        $on: jest.fn(),
        colors: [],
    };
    MetricsPanelCtrl.prototype.panel = new PanelModel({ type: 'test' });
    return new MetricsPanelCtrl(scope, injectorStub);
}
//# sourceMappingURL=metrics_panel_ctrl.test.js.map