import * as tslib_1 from "tslib";
import React from 'react';
import { shallow } from 'enzyme';
import ValueMappings from './ValueMappings';
import { defaultProps } from './module';
import { MappingType } from 'app/types';
var setup = function (propOverrides) {
    var props = {
        onChange: jest.fn(),
        options: tslib_1.__assign({}, defaultProps.options, { mappings: [
                { id: 1, operator: '', type: MappingType.ValueToText, value: '20', text: 'Ok' },
                { id: 2, operator: '', type: MappingType.RangeToText, from: '21', to: '30', text: 'Meh' },
            ] }),
    };
    Object.assign(props, propOverrides);
    var wrapper = shallow(React.createElement(ValueMappings, tslib_1.__assign({}, props)));
    var instance = wrapper.instance();
    return {
        instance: instance,
        wrapper: wrapper,
    };
};
describe('Render', function () {
    it('should render component', function () {
        var wrapper = setup().wrapper;
        expect(wrapper).toMatchSnapshot();
    });
});
describe('On remove mapping', function () {
    it('Should remove mapping with id 0', function () {
        var instance = setup().instance;
        instance.onRemoveMapping(1);
        expect(instance.state.mappings).toEqual([
            { id: 2, operator: '', type: MappingType.RangeToText, from: '21', to: '30', text: 'Meh' },
        ]);
    });
    it('should remove mapping with id 1', function () {
        var instance = setup().instance;
        instance.onRemoveMapping(2);
        expect(instance.state.mappings).toEqual([
            { id: 1, operator: '', type: MappingType.ValueToText, value: '20', text: 'Ok' },
        ]);
    });
});
describe('Next id to add', function () {
    it('should be 4', function () {
        var instance = setup().instance;
        instance.addMapping();
        expect(instance.state.nextIdToAdd).toEqual(4);
    });
    it('should default to 1', function () {
        var instance = setup({ options: tslib_1.__assign({}, defaultProps.options) }).instance;
        expect(instance.state.nextIdToAdd).toEqual(1);
    });
});
//# sourceMappingURL=ValueMappings.test.js.map