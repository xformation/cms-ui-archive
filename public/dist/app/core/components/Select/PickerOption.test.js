import * as tslib_1 from "tslib";
import React from 'react';
import renderer from 'react-test-renderer';
import PickerOption from './PickerOption';
var model = {
    cx: jest.fn(),
    clearValue: jest.fn(),
    onSelect: jest.fn(),
    getStyles: jest.fn(),
    getValue: jest.fn(),
    hasValue: true,
    isMulti: false,
    options: [],
    selectOption: jest.fn(),
    selectProps: {},
    setValue: jest.fn(),
    isDisabled: false,
    isFocused: false,
    isSelected: false,
    innerRef: null,
    innerProps: null,
    label: 'Option label',
    type: null,
    children: 'Model title',
    data: {
        title: 'Model title',
        imgUrl: 'url/to/avatar',
        label: 'User picker label',
    },
    className: 'class-for-user-picker',
};
describe('PickerOption', function () {
    it('renders correctly', function () {
        var tree = renderer.create(React.createElement(PickerOption, tslib_1.__assign({}, model))).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=PickerOption.test.js.map