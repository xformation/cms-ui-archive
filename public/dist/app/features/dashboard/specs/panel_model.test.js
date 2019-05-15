import { PanelModel } from '../panel_model';
describe('PanelModel', function () {
    describe('when creating new panel model', function () {
        var model;
        beforeEach(function () {
            model = new PanelModel({
                type: 'table',
                showColumns: true,
            });
        });
        it('should apply defaults', function () {
            expect(model.gridPos.h).toBe(3);
        });
        it('should set model props on instance', function () {
            expect(model.showColumns).toBe(true);
        });
        it('getSaveModel should remove defaults', function () {
            var saveModel = model.getSaveModel();
            expect(saveModel.gridPos).toBe(undefined);
        });
        it('getSaveModel should remove nonPersistedProperties', function () {
            var saveModel = model.getSaveModel();
            expect(saveModel.events).toBe(undefined);
        });
        describe('when changing panel type', function () {
            beforeEach(function () {
                model.changeType('graph', true);
                model.alert = { id: 2 };
            });
            it('should remove table properties but keep core props', function () {
                expect(model.showColumns).toBe(undefined);
            });
            it('should restore table properties when changing back', function () {
                model.changeType('table', true);
                expect(model.showColumns).toBe(true);
            });
            it('should remove alert rule when changing type that does not support it', function () {
                model.changeType('table', true);
                expect(model.alert).toBe(undefined);
            });
        });
    });
});
//# sourceMappingURL=panel_model.test.js.map