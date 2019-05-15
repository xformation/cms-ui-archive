import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import MappingRow from './MappingRow';
import { MappingType } from 'app/types';
var ValueMappings = /** @class */ (function (_super) {
    tslib_1.__extends(ValueMappings, _super);
    function ValueMappings(props) {
        var _this = _super.call(this, props) || this;
        _this.addMapping = function () {
            return _this.setState(function (prevState) { return ({
                mappings: prevState.mappings.concat([
                    {
                        id: prevState.nextIdToAdd,
                        operator: '',
                        value: '',
                        text: '',
                        type: MappingType.ValueToText,
                        from: '',
                        to: '',
                    },
                ]),
                nextIdToAdd: prevState.nextIdToAdd + 1,
            }); });
        };
        _this.onRemoveMapping = function (id) {
            _this.setState(function (prevState) { return ({
                mappings: prevState.mappings.filter(function (m) {
                    return m.id !== id;
                }),
            }); }, function () {
                _this.props.onChange(tslib_1.__assign({}, _this.props.options, { mappings: _this.state.mappings }));
            });
        };
        _this.updateGauge = function (mapping) {
            _this.setState(function (prevState) { return ({
                mappings: prevState.mappings.map(function (m) {
                    if (m.id === mapping.id) {
                        return tslib_1.__assign({}, mapping);
                    }
                    return m;
                }),
            }); }, function () {
                _this.props.onChange(tslib_1.__assign({}, _this.props.options, { mappings: _this.state.mappings }));
            });
        };
        var mappings = props.options.mappings;
        _this.state = {
            mappings: mappings || [],
            nextIdToAdd: mappings.length > 0 ? _this.getMaxIdFromMappings(mappings) : 1,
        };
        return _this;
    }
    ValueMappings.prototype.getMaxIdFromMappings = function (mappings) {
        return Math.max.apply(null, mappings.map(function (mapping) { return mapping.id; }).map(function (m) { return m; })) + 1;
    };
    ValueMappings.prototype.render = function () {
        var _this = this;
        var mappings = this.state.mappings;
        return (React.createElement("div", { className: "section gf-form-group" },
            React.createElement("h5", { className: "section-heading" }, "Value mappings"),
            React.createElement("div", null, mappings.length > 0 &&
                mappings.map(function (mapping, index) { return (React.createElement(MappingRow, { key: mapping.text + "-" + index, mapping: mapping, updateMapping: _this.updateGauge, removeMapping: function () { return _this.onRemoveMapping(mapping.id); } })); })),
            React.createElement("div", { className: "add-mapping-row", onClick: this.addMapping },
                React.createElement("div", { className: "add-mapping-row-icon" },
                    React.createElement("i", { className: "fa fa-plus" })),
                React.createElement("div", { className: "add-mapping-row-label" }, "Add mapping"))));
    };
    return ValueMappings;
}(PureComponent));
export default ValueMappings;
//# sourceMappingURL=ValueMappings.js.map