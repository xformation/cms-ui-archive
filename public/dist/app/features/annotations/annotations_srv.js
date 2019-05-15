// Libaries
import angular from 'angular';
import _ from 'lodash';
// Components
import './editor_ctrl';
import coreModule from 'app/core/core_module';
// Utils & Services
import { makeRegions, dedupAnnotations } from './events_processing';
var AnnotationsSrv = /** @class */ (function () {
    /** @ngInject */
    function AnnotationsSrv($rootScope, $q, datasourceSrv, backendSrv, timeSrv) {
        this.$rootScope = $rootScope;
        this.$q = $q;
        this.datasourceSrv = datasourceSrv;
        this.backendSrv = backendSrv;
        this.timeSrv = timeSrv;
    }
    AnnotationsSrv.prototype.init = function (dashboard) {
        var _this = this;
        // clear promises on refresh events
        dashboard.on('refresh', function () {
            _this.globalAnnotationsPromise = null;
            _this.alertStatesPromise = null;
            _this.datasourcePromises = null;
        });
    };
    AnnotationsSrv.prototype.getAnnotations = function (options) {
        var _this = this;
        return this.$q
            .all([this.getGlobalAnnotations(options), this.getAlertStates(options)])
            .then(function (results) {
            // combine the annotations and flatten results
            var annotations = _.flattenDeep(results[0]);
            // filter out annotations that do not belong to requesting panel
            annotations = _.filter(annotations, function (item) {
                // if event has panel id and query is of type dashboard then panel and requesting panel id must match
                if (item.panelId && item.source.type === 'dashboard') {
                    return item.panelId === options.panel.id;
                }
                return true;
            });
            annotations = dedupAnnotations(annotations);
            annotations = makeRegions(annotations, options);
            // look for alert state for this panel
            var alertState = _.find(results[1], { panelId: options.panel.id });
            return {
                annotations: annotations,
                alertState: alertState,
            };
        })
            .catch(function (err) {
            if (!err.message && err.data && err.data.message) {
                err.message = err.data.message;
            }
            console.log('AnnotationSrv.query error', err);
            _this.$rootScope.appEvent('alert-error', ['Annotation Query Failed', err.message || err]);
            return [];
        });
    };
    AnnotationsSrv.prototype.getAlertStates = function (options) {
        if (!options.dashboard.id) {
            return this.$q.when([]);
        }
        // ignore if no alerts
        if (options.panel && !options.panel.alert) {
            return this.$q.when([]);
        }
        if (options.range.raw.to !== 'now') {
            return this.$q.when([]);
        }
        if (this.alertStatesPromise) {
            return this.alertStatesPromise;
        }
        this.alertStatesPromise = this.backendSrv.get('/api/alerts/states-for-dashboard', {
            dashboardId: options.dashboard.id,
        });
        return this.alertStatesPromise;
    };
    AnnotationsSrv.prototype.getGlobalAnnotations = function (options) {
        var _this = this;
        var dashboard = options.dashboard;
        if (this.globalAnnotationsPromise) {
            return this.globalAnnotationsPromise;
        }
        var range = this.timeSrv.timeRange();
        var promises = [];
        var dsPromises = [];
        var _loop_1 = function (annotation) {
            if (!annotation.enable) {
                return "continue";
            }
            if (annotation.snapshotData) {
                return { value: this_1.translateQueryResult(annotation, annotation.snapshotData) };
            }
            var datasourcePromise = this_1.datasourceSrv.get(annotation.datasource);
            dsPromises.push(datasourcePromise);
            promises.push(datasourcePromise
                .then(function (datasource) {
                // issue query against data source
                return datasource.annotationQuery({
                    range: range,
                    rangeRaw: range.raw,
                    annotation: annotation,
                    dashboard: dashboard,
                });
            })
                .then(function (results) {
                // store response in annotation object if this is a snapshot call
                if (dashboard.snapshot) {
                    annotation.snapshotData = angular.copy(results);
                }
                // translate result
                return _this.translateQueryResult(annotation, results);
            }));
        };
        var this_1 = this;
        for (var _i = 0, _a = dashboard.annotations.list; _i < _a.length; _i++) {
            var annotation = _a[_i];
            var state_1 = _loop_1(annotation);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.datasourcePromises = this.$q.all(dsPromises);
        this.globalAnnotationsPromise = this.$q.all(promises);
        return this.globalAnnotationsPromise;
    };
    AnnotationsSrv.prototype.saveAnnotationEvent = function (annotation) {
        this.globalAnnotationsPromise = null;
        return this.backendSrv.post('/api/annotations', annotation);
    };
    AnnotationsSrv.prototype.updateAnnotationEvent = function (annotation) {
        this.globalAnnotationsPromise = null;
        return this.backendSrv.put("/api/annotations/" + annotation.id, annotation);
    };
    AnnotationsSrv.prototype.deleteAnnotationEvent = function (annotation) {
        this.globalAnnotationsPromise = null;
        var deleteUrl = "/api/annotations/" + annotation.id;
        if (annotation.isRegion) {
            deleteUrl = "/api/annotations/region/" + annotation.regionId;
        }
        return this.backendSrv.delete(deleteUrl);
    };
    AnnotationsSrv.prototype.translateQueryResult = function (annotation, results) {
        // if annotation has snapshotData
        // make clone and remove it
        if (annotation.snapshotData) {
            annotation = angular.copy(annotation);
            delete annotation.snapshotData;
        }
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var item = results_1[_i];
            item.source = annotation;
        }
        return results;
    };
    return AnnotationsSrv;
}());
export { AnnotationsSrv };
coreModule.service('annotationsSrv', AnnotationsSrv);
//# sourceMappingURL=annotations_srv.js.map