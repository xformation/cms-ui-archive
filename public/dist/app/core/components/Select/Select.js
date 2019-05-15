import * as tslib_1 from "tslib";
// Libraries
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { default as ReactSelect } from '@torkelo/react-select';
import { default as ReactAsyncSelect } from '@torkelo/react-select/lib/Async';
import { components } from '@torkelo/react-select';
// Components
import { Option, SingleValue } from './PickerOption';
import OptionGroup from './OptionGroup';
import IndicatorsContainer from './IndicatorsContainer';
import NoOptionsMessage from './NoOptionsMessage';
import ResetStyles from './ResetStyles';
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar';
export var MenuList = function (props) {
    return (React.createElement(components.MenuList, tslib_1.__assign({}, props),
        React.createElement(CustomScrollbar, { autoHide: false }, props.children)));
};
var Select = /** @class */ (function (_super) {
    tslib_1.__extends(Select, _super);
    function Select() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Select.prototype.render = function () {
        var _a = this.props, defaultValue = _a.defaultValue, getOptionLabel = _a.getOptionLabel, getOptionValue = _a.getOptionValue, onChange = _a.onChange, options = _a.options, placeholder = _a.placeholder, width = _a.width, value = _a.value, className = _a.className, isDisabled = _a.isDisabled, isLoading = _a.isLoading, isSearchable = _a.isSearchable, isClearable = _a.isClearable, backspaceRemovesValue = _a.backspaceRemovesValue, isMulti = _a.isMulti, autoFocus = _a.autoFocus, openMenuOnFocus = _a.openMenuOnFocus, onBlur = _a.onBlur, maxMenuHeight = _a.maxMenuHeight, noOptionsMessage = _a.noOptionsMessage;
        var widthClass = '';
        if (width) {
            widthClass = 'width-' + width;
        }
        var selectClassNames = classNames('gf-form-input', 'gf-form-input--form-dropdown', widthClass, className);
        return (React.createElement(ReactSelect, { classNamePrefix: "gf-form-select-box", className: selectClassNames, components: {
                Option: Option,
                SingleValue: SingleValue,
                IndicatorsContainer: IndicatorsContainer,
                MenuList: MenuList,
                Group: OptionGroup,
            }, defaultValue: defaultValue, value: value, getOptionLabel: getOptionLabel, getOptionValue: getOptionValue, menuShouldScrollIntoView: false, isSearchable: isSearchable, onChange: onChange, options: options, placeholder: placeholder || 'Choose', styles: ResetStyles, isDisabled: isDisabled, isLoading: isLoading, isClearable: isClearable, autoFocus: autoFocus, onBlur: onBlur, openMenuOnFocus: openMenuOnFocus, maxMenuHeight: maxMenuHeight, noOptionsMessage: noOptionsMessage, isMulti: isMulti, backspaceRemovesValue: backspaceRemovesValue }));
    };
    Select.defaultProps = {
        width: null,
        className: '',
        isDisabled: false,
        isSearchable: true,
        isClearable: false,
        isMulti: false,
        openMenuOnFocus: false,
        autoFocus: false,
        isLoading: false,
        backspaceRemovesValue: true,
        maxMenuHeight: 300,
    };
    return Select;
}(PureComponent));
export { Select };
var AsyncSelect = /** @class */ (function (_super) {
    tslib_1.__extends(AsyncSelect, _super);
    function AsyncSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncSelect.prototype.render = function () {
        var _a = this.props, defaultValue = _a.defaultValue, getOptionLabel = _a.getOptionLabel, getOptionValue = _a.getOptionValue, onChange = _a.onChange, placeholder = _a.placeholder, width = _a.width, value = _a.value, className = _a.className, loadOptions = _a.loadOptions, defaultOptions = _a.defaultOptions, isLoading = _a.isLoading, loadingMessage = _a.loadingMessage, noOptionsMessage = _a.noOptionsMessage, isDisabled = _a.isDisabled, isSearchable = _a.isSearchable, isClearable = _a.isClearable, backspaceRemovesValue = _a.backspaceRemovesValue, autoFocus = _a.autoFocus, onBlur = _a.onBlur, openMenuOnFocus = _a.openMenuOnFocus, maxMenuHeight = _a.maxMenuHeight, isMulti = _a.isMulti;
        var widthClass = '';
        if (width) {
            widthClass = 'width-' + width;
        }
        var selectClassNames = classNames('gf-form-input', 'gf-form-input--form-dropdown', widthClass, className);
        return (React.createElement(ReactAsyncSelect, { classNamePrefix: "gf-form-select-box", className: selectClassNames, components: {
                Option: Option,
                SingleValue: SingleValue,
                IndicatorsContainer: IndicatorsContainer,
                NoOptionsMessage: NoOptionsMessage,
            }, defaultValue: defaultValue, value: value, getOptionLabel: getOptionLabel, getOptionValue: getOptionValue, menuShouldScrollIntoView: false, onChange: onChange, loadOptions: loadOptions, isLoading: isLoading, defaultOptions: defaultOptions, placeholder: placeholder || 'Choose', styles: ResetStyles, loadingMessage: loadingMessage, noOptionsMessage: noOptionsMessage, isDisabled: isDisabled, isSearchable: isSearchable, isClearable: isClearable, autoFocus: autoFocus, onBlur: onBlur, openMenuOnFocus: openMenuOnFocus, maxMenuHeight: maxMenuHeight, isMulti: isMulti, backspaceRemovesValue: backspaceRemovesValue }));
    };
    AsyncSelect.defaultProps = {
        width: null,
        className: '',
        components: {},
        loadingMessage: function () { return 'Loading...'; },
        isDisabled: false,
        isClearable: false,
        isMulti: false,
        isSearchable: true,
        backspaceRemovesValue: true,
        autoFocus: false,
        openMenuOnFocus: false,
        maxMenuHeight: 300,
    };
    return AsyncSelect;
}(PureComponent));
export { AsyncSelect };
export default Select;
//# sourceMappingURL=Select.js.map