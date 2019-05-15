var _this = this;
import * as tslib_1 from "tslib";
import uniqBy from 'lodash/uniqBy';
import { alignOptions, aggOptions } from './constants';
export var extractServicesFromMetricDescriptors = function (metricDescriptors) { return uniqBy(metricDescriptors, 'service'); };
export var getMetricTypesByService = function (metricDescriptors, service) {
    return metricDescriptors.filter(function (m) { return m.service === service; });
};
export var getMetricTypes = function (metricDescriptors, metricType, interpolatedMetricType, selectedService) {
    var metricTypes = getMetricTypesByService(metricDescriptors, selectedService).map(function (m) { return ({
        value: m.type,
        name: m.displayName,
    }); });
    var metricTypeExistInArray = metricTypes.some(function (m) { return m.value === interpolatedMetricType; });
    var selectedMetricType = metricTypeExistInArray ? metricType : metricTypes[0].value;
    return {
        metricTypes: metricTypes,
        selectedMetricType: selectedMetricType,
    };
};
export var getAlignmentOptionsByMetric = function (metricValueType, metricKind) {
    return !metricValueType
        ? []
        : alignOptions.filter(function (i) {
            return i.valueTypes.indexOf(metricValueType) !== -1 && i.metricKinds.indexOf(metricKind) !== -1;
        });
};
export var getAggregationOptionsByMetric = function (valueType, metricKind) {
    return !metricKind
        ? []
        : aggOptions.filter(function (i) {
            return i.valueTypes.indexOf(valueType) !== -1 && i.metricKinds.indexOf(metricKind) !== -1;
        });
};
export var getLabelKeys = function (datasource, selectedMetricType) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var refId, response, labelKeys;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refId = 'handleLabelKeysQuery';
                return [4 /*yield*/, datasource.getLabels(selectedMetricType, refId)];
            case 1:
                response = _a.sent();
                labelKeys = response.meta
                    ? Object.keys(response.meta.resourceLabels).map(function (l) { return "resource.label." + l; }).concat(Object.keys(response.meta.metricLabels).map(function (l) { return "metric.label." + l; })) : [];
                return [2 /*return*/, labelKeys];
        }
    });
}); };
//# sourceMappingURL=functions.js.map