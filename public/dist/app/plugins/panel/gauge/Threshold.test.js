import * as tslib_1 from "tslib";
import React from 'react';
import { shallow } from 'enzyme';
import Thresholds from './Thresholds';
import { defaultProps } from './module';
import { BasicGaugeColor } from 'app/types';
var setup = function (propOverrides) {
    var props = {
        onChange: jest.fn(),
        options: tslib_1.__assign({}, defaultProps.options, { thresholds: [] }),
    };
    Object.assign(props, propOverrides);
    return shallow(React.createElement(Thresholds, tslib_1.__assign({}, props))).instance();
};
describe('Add threshold', function () {
    it('should add threshold', function () {
        var instance = setup();
        instance.onAddThreshold(0);
        expect(instance.state.thresholds).toEqual([{ index: 0, value: 50, color: 'rgb(127, 115, 64)' }]);
    });
    it('should add another threshold above a first', function () {
        var instance = setup({
            options: tslib_1.__assign({}, defaultProps.options, { thresholds: [{ index: 0, value: 50, color: 'rgb(127, 115, 64)' }] }),
        });
        instance.onAddThreshold(1);
        expect(instance.state.thresholds).toEqual([
            { index: 1, value: 75, color: 'rgb(170, 95, 61)' },
            { index: 0, value: 50, color: 'rgb(127, 115, 64)' },
        ]);
    });
});
describe('change threshold value', function () {
    it('should update value and resort rows', function () {
        var instance = setup();
        var mockThresholds = [
            { index: 0, value: 50, color: 'rgba(237, 129, 40, 0.89)' },
            { index: 1, value: 75, color: 'rgba(237, 129, 40, 0.89)' },
        ];
        instance.state = {
            baseColor: BasicGaugeColor.Green,
            thresholds: mockThresholds,
        };
        var mockEvent = { target: { value: 78 } };
        instance.onChangeThresholdValue(mockEvent, mockThresholds[0]);
        expect(instance.state.thresholds).toEqual([
            { index: 0, value: 78, color: 'rgba(237, 129, 40, 0.89)' },
            { index: 1, value: 75, color: 'rgba(237, 129, 40, 0.89)' },
        ]);
    });
});
//# sourceMappingURL=Threshold.test.js.map