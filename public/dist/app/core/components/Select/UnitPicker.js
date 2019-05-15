import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import Select from './Select';
import kbn from 'app/core/utils/kbn';
var UnitPicker = /** @class */ (function (_super) {
    tslib_1.__extends(UnitPicker, _super);
    function UnitPicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnitPicker.prototype.render = function () {
        var _a = this.props, defaultValue = _a.defaultValue, onChange = _a.onChange, width = _a.width;
        var unitGroups = kbn.getUnitFormats();
        // Need to transform the data structure to work well with Select
        var groupOptions = unitGroups.map(function (group) {
            var options = group.submenu.map(function (unit) {
                return {
                    label: unit.text,
                    value: unit.value,
                };
            });
            return {
                label: group.text,
                options: options,
            };
        });
        var value = groupOptions.map(function (group) {
            return group.options.find(function (option) { return option.value === defaultValue; });
        });
        return (React.createElement(Select, { width: width, defaultValue: value, isSearchable: true, options: groupOptions, placeholder: "Choose", onChange: onChange }));
    };
    UnitPicker.defaultProps = {
        width: 12,
    };
    return UnitPicker;
}(PureComponent));
export default UnitPicker;
//# sourceMappingURL=UnitPicker.js.map