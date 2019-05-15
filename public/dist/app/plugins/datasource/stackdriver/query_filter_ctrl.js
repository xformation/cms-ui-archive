import * as tslib_1 from "tslib";
import coreModule from 'app/core/core_module';
import _ from 'lodash';
import { FilterSegments } from './filter_segments';
import appEvents from 'app/core/app_events';
var StackdriverFilter = /** @class */ (function () {
    /** @ngInject */
    function StackdriverFilter() {
        return {
            templateUrl: 'public/app/plugins/datasource/stackdriver/partials/query.filter.html',
            controller: 'StackdriverFilterCtrl',
            controllerAs: 'ctrl',
            restrict: 'E',
            scope: {
                target: '=',
                datasource: '=',
                refresh: '&',
                defaultDropdownValue: '<',
                defaultServiceValue: '<',
                hideGroupBys: '<',
            },
        };
    }
    return StackdriverFilter;
}());
export { StackdriverFilter };
var StackdriverFilterCtrl = /** @class */ (function () {
    /** @ngInject */
    function StackdriverFilterCtrl($scope, uiSegmentSrv, templateSrv, $rootScope) {
        this.$scope = $scope;
        this.uiSegmentSrv = uiSegmentSrv;
        this.templateSrv = templateSrv;
        this.$rootScope = $rootScope;
        this.defaultRemoveGroupByValue = '-- remove group by --';
        this.resourceTypeValue = 'resource.type';
        this.datasource = $scope.datasource;
        this.target = $scope.target;
        this.metricType = $scope.defaultDropdownValue;
        this.service = $scope.defaultServiceValue;
        this.metricDescriptors = [];
        this.metrics = [];
        this.services = [];
        this.getCurrentProject()
            .then(this.loadMetricDescriptors.bind(this))
            .then(this.getLabels.bind(this));
        this.initSegments($scope.hideGroupBys);
    }
    StackdriverFilterCtrl.prototype.initSegments = function (hideGroupBys) {
        var _this = this;
        if (!hideGroupBys) {
            this.groupBySegments = this.target.aggregation.groupBys.map(function (groupBy) {
                return _this.uiSegmentSrv.getSegmentForValue(groupBy);
            });
            this.ensurePlusButton(this.groupBySegments);
        }
        this.removeSegment = this.uiSegmentSrv.newSegment({ fake: true, value: '-- remove group by --' });
        this.filterSegments = new FilterSegments(this.uiSegmentSrv, this.target, this.getFilterKeys.bind(this), this.getFilterValues.bind(this));
        this.filterSegments.buildSegmentModel();
    };
    StackdriverFilterCtrl.prototype.getCurrentProject = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _a, error_1;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 3, , 4]);
                                    if (!(!this.target.defaultProject || this.target.defaultProject === 'loading project...')) return [3 /*break*/, 2];
                                    _a = this.target;
                                    return [4 /*yield*/, this.datasource.getDefaultProject()];
                                case 1:
                                    _a.defaultProject = _b.sent();
                                    _b.label = 2;
                                case 2:
                                    resolve(this.target.defaultProject);
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_1 = _b.sent();
                                    appEvents.emit('ds-request-error', error_1);
                                    reject();
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    StackdriverFilterCtrl.prototype.loadMetricDescriptors = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.target.defaultProject !== 'loading project...')) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.datasource.getMetricTypes(this.target.defaultProject)];
                    case 1:
                        _a.metricDescriptors = _b.sent();
                        this.services = this.getServicesList();
                        this.metrics = this.getMetricsList();
                        return [2 /*return*/, this.metricDescriptors];
                    case 2: return [2 /*return*/, []];
                }
            });
        });
    };
    StackdriverFilterCtrl.prototype.getServicesList = function () {
        var _this = this;
        var defaultValue = { value: this.$scope.defaultServiceValue, text: this.$scope.defaultServiceValue };
        var services = this.metricDescriptors.map(function (m) {
            return {
                value: m.service,
                text: m.serviceShortName,
            };
        });
        if (services.find(function (m) { return m.value === _this.target.service; })) {
            this.service = this.target.service;
        }
        return services.length > 0 ? [defaultValue].concat(_.uniqBy(services, 'value')) : [];
    };
    StackdriverFilterCtrl.prototype.getMetricsList = function () {
        var _this = this;
        var metrics = this.metricDescriptors.map(function (m) {
            return {
                service: m.service,
                value: m.type,
                serviceShortName: m.serviceShortName,
                text: m.displayName,
                title: m.description,
            };
        });
        var result;
        if (this.target.service === this.$scope.defaultServiceValue) {
            result = metrics.map(function (m) { return (tslib_1.__assign({}, m, { text: m.service + " - " + m.text })); });
        }
        else {
            result = metrics.filter(function (m) { return m.service === _this.target.service; });
        }
        if (result.find(function (m) { return m.value === _this.templateSrv.replace(_this.target.metricType); })) {
            this.metricType = this.target.metricType;
        }
        else if (result.length > 0) {
            this.metricType = this.target.metricType = result[0].value;
        }
        return result;
    };
    StackdriverFilterCtrl.prototype.getLabels = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.loadLabelsPromise = new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var meta, error_2;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.datasource.getLabels(this.target.metricType, this.target.refId)];
                            case 1:
                                meta = (_a.sent()).meta;
                                this.metricLabels = meta.metricLabels;
                                this.resourceLabels = meta.resourceLabels;
                                this.resourceTypes = meta.resourceTypes;
                                resolve();
                                return [3 /*break*/, 3];
                            case 2:
                                error_2 = _a.sent();
                                if (error_2.data && error_2.data.message) {
                                    console.log(error_2.data.message);
                                }
                                else {
                                    console.log(error_2);
                                }
                                appEvents.emit('alert-error', ['Error', 'Error loading metric labels for ' + this.target.metricType]);
                                resolve();
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    StackdriverFilterCtrl.prototype.onServiceChange = function () {
        var _this = this;
        this.target.service = this.service;
        this.metrics = this.getMetricsList();
        this.setMetricType();
        this.getLabels();
        if (!this.metrics.find(function (m) { return m.value === _this.target.metricType; })) {
            this.target.metricType = this.$scope.defaultDropdownValue;
        }
        else {
            this.$scope.refresh();
        }
    };
    StackdriverFilterCtrl.prototype.onMetricTypeChange = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.setMetricType();
                this.$scope.refresh();
                this.getLabels();
                return [2 /*return*/];
            });
        });
    };
    StackdriverFilterCtrl.prototype.setMetricType = function () {
        var _this = this;
        this.target.metricType = this.metricType;
        var _a = this.metricDescriptors.find(function (m) { return m.type === _this.templateSrv.replace(_this.metricType); }), valueType = _a.valueType, metricKind = _a.metricKind, unit = _a.unit;
        this.target.unit = unit;
        this.target.valueType = valueType;
        this.target.metricKind = metricKind;
        this.$rootScope.$broadcast('metricTypeChanged');
    };
    StackdriverFilterCtrl.prototype.createLabelKeyElements = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var elements;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadLabelsPromise];
                    case 1:
                        _a.sent();
                        elements = Object.keys(this.metricLabels || {}).map(function (l) {
                            return _this.uiSegmentSrv.newSegment({
                                value: "metric.label." + l,
                                expandable: false,
                            });
                        });
                        elements = elements.concat(Object.keys(this.resourceLabels || {}).map(function (l) {
                            return _this.uiSegmentSrv.newSegment({
                                value: "resource.label." + l,
                                expandable: false,
                            });
                        }));
                        if (this.resourceTypes && this.resourceTypes.length > 0) {
                            elements = elements.concat([
                                this.uiSegmentSrv.newSegment({
                                    value: this.resourceTypeValue,
                                    expandable: false,
                                }),
                            ]);
                        }
                        return [2 /*return*/, elements];
                }
            });
        });
    };
    StackdriverFilterCtrl.prototype.getFilterKeys = function (segment, removeText) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var elements, noValueOrPlusButton;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createLabelKeyElements()];
                    case 1:
                        elements = _a.sent();
                        if (this.target.filters.indexOf(this.resourceTypeValue) !== -1) {
                            elements = elements.filter(function (e) { return e.value !== _this.resourceTypeValue; });
                        }
                        noValueOrPlusButton = !segment || segment.type === 'plus-button';
                        if (noValueOrPlusButton && elements.length === 0) {
                            return [2 /*return*/, []];
                        }
                        this.removeSegment.value = removeText;
                        return [2 /*return*/, elements.concat([this.removeSegment])];
                }
            });
        });
    };
    StackdriverFilterCtrl.prototype.getGroupBys = function (segment) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var elements, noValueOrPlusButton;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createLabelKeyElements()];
                    case 1:
                        elements = _a.sent();
                        elements = elements.filter(function (e) { return _this.target.aggregation.groupBys.indexOf(e.value) === -1; });
                        noValueOrPlusButton = !segment || segment.type === 'plus-button';
                        if (noValueOrPlusButton && elements.length === 0) {
                            return [2 /*return*/, []];
                        }
                        this.removeSegment.value = this.defaultRemoveGroupByValue;
                        return [2 /*return*/, elements.concat([this.removeSegment])];
                }
            });
        });
    };
    StackdriverFilterCtrl.prototype.groupByChanged = function (segment, index) {
        if (segment.value === this.removeSegment.value) {
            this.groupBySegments.splice(index, 1);
        }
        else {
            segment.type = 'value';
        }
        var reducer = function (memo, seg) {
            if (!seg.fake) {
                memo.push(seg.value);
            }
            return memo;
        };
        this.target.aggregation.groupBys = this.groupBySegments.reduce(reducer, []);
        this.ensurePlusButton(this.groupBySegments);
        this.$rootScope.$broadcast('metricTypeChanged');
        this.$scope.refresh();
    };
    StackdriverFilterCtrl.prototype.getFilters = function (segment, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var hasNoFilterKeys;
            return tslib_1.__generator(this, function (_a) {
                hasNoFilterKeys = this.metricLabels && Object.keys(this.metricLabels).length === 0;
                return [2 /*return*/, this.filterSegments.getFilters(segment, index, hasNoFilterKeys)];
            });
        });
    };
    StackdriverFilterCtrl.prototype.getFilterValues = function (index) {
        var filterKey = this.templateSrv.replace(this.filterSegments.filterSegments[index - 2].value);
        if (!filterKey || !this.metricLabels || Object.keys(this.metricLabels).length === 0) {
            return [];
        }
        var shortKey = filterKey.substring(filterKey.indexOf('.label.') + 7);
        if (filterKey.startsWith('metric.label.') && this.metricLabels.hasOwnProperty(shortKey)) {
            return this.metricLabels[shortKey];
        }
        if (filterKey.startsWith('resource.label.') && this.resourceLabels.hasOwnProperty(shortKey)) {
            return this.resourceLabels[shortKey];
        }
        if (filterKey === this.resourceTypeValue) {
            return this.resourceTypes;
        }
        return [];
    };
    StackdriverFilterCtrl.prototype.filterSegmentUpdated = function (segment, index) {
        this.target.filters = this.filterSegments.filterSegmentUpdated(segment, index);
        this.$scope.refresh();
    };
    StackdriverFilterCtrl.prototype.ensurePlusButton = function (segments) {
        var count = segments.length;
        var lastSegment = segments[Math.max(count - 1, 0)];
        if (!lastSegment || lastSegment.type !== 'plus-button') {
            segments.push(this.uiSegmentSrv.newPlusButton());
        }
    };
    return StackdriverFilterCtrl;
}());
export { StackdriverFilterCtrl };
coreModule.directive('stackdriverFilter', StackdriverFilter);
coreModule.controller('StackdriverFilterCtrl', StackdriverFilterCtrl);
//# sourceMappingURL=query_filter_ctrl.js.map