import * as tslib_1 from "tslib";
import React from 'react';
import AsyncSelect from '@torkelo/react-select/lib/Async';
import { TagOption } from './TagOption';
import { TagBadge } from './TagBadge';
import IndicatorsContainer from 'app/core/components/Select/IndicatorsContainer';
import NoOptionsMessage from 'app/core/components/Select/NoOptionsMessage';
import { components } from '@torkelo/react-select';
import ResetStyles from 'app/core/components/Select/ResetStyles';
var TagFilter = /** @class */ (function (_super) {
    tslib_1.__extends(TagFilter, _super);
    function TagFilter(props) {
        var _this = _super.call(this, props) || this;
        _this.onLoadOptions = function (query) {
            return _this.props.tagOptions().then(function (options) {
                return options.map(function (option) { return ({
                    value: option.term,
                    label: option.term,
                    count: option.count,
                }); });
            });
        };
        _this.onChange = function (newTags) {
            _this.props.onChange(newTags.map(function (tag) { return tag.value; }));
        };
        return _this;
    }
    TagFilter.prototype.render = function () {
        var tags = this.props.tags.map(function (tag) { return ({ value: tag, label: tag, count: 0 }); });
        var selectOptions = {
            classNamePrefix: 'gf-form-select-box',
            isMulti: true,
            defaultOptions: true,
            loadOptions: this.onLoadOptions,
            onChange: this.onChange,
            className: 'gf-form-input gf-form-input--form-dropdown',
            placeholder: 'Tags',
            loadingMessage: function () { return 'Loading...'; },
            noOptionsMessage: function () { return 'No tags found'; },
            getOptionValue: function (i) { return i.value; },
            getOptionLabel: function (i) { return i.label; },
            value: tags,
            styles: ResetStyles,
            filterOption: function (option, searchQuery) {
                var regex = RegExp(searchQuery, 'i');
                return regex.test(option.value);
            },
            components: {
                Option: TagOption,
                IndicatorsContainer: IndicatorsContainer,
                NoOptionsMessage: NoOptionsMessage,
                MultiValueLabel: function () {
                    return null; // We want the whole tag to be clickable so we use MultiValueRemove instead
                },
                MultiValueRemove: function (props) {
                    var data = props.data;
                    return (React.createElement(components.MultiValueRemove, tslib_1.__assign({}, props),
                        React.createElement(TagBadge, { key: data.label, label: data.label, removeIcon: true, count: data.count })));
                },
            },
        };
        return (React.createElement("div", { className: "gf-form gf-form--has-input-icon gf-form--grow" },
            React.createElement("div", { className: "tag-filter" },
                React.createElement(AsyncSelect, tslib_1.__assign({}, selectOptions))),
            React.createElement("i", { className: "gf-form-input-icon fa fa-tag" })));
    };
    return TagFilter;
}(React.Component));
export { TagFilter };
//# sourceMappingURL=TagFilter.js.map