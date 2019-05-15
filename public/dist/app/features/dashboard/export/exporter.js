import config from 'app/core/config';
import _ from 'lodash';
var DashboardExporter = /** @class */ (function () {
    function DashboardExporter(datasourceSrv) {
        this.datasourceSrv = datasourceSrv;
    }
    DashboardExporter.prototype.makeExportable = function (dashboard) {
        var _this = this;
        // clean up repeated rows and panels,
        // this is done on the live real dashboard instance, not on a clone
        // so we need to undo this
        // this is pretty hacky and needs to be changed
        dashboard.cleanUpRepeats();
        var saveModel = dashboard.getSaveModelClone();
        saveModel.id = null;
        // undo repeat cleanup
        dashboard.processRepeats();
        var inputs = [];
        var requires = {};
        var datasources = {};
        var promises = [];
        var variableLookup = {};
        for (var _i = 0, _a = saveModel.templating.list; _i < _a.length; _i++) {
            var variable = _a[_i];
            variableLookup[variable.name] = variable;
        }
        var templateizeDatasourceUsage = function (obj) {
            var datasource = obj.datasource;
            var datasourceVariable = null;
            // ignore data source properties that contain a variable
            if (datasource && datasource.indexOf('$') === 0) {
                datasourceVariable = variableLookup[datasource.substring(1)];
                if (datasourceVariable && datasourceVariable.current) {
                    datasource = datasourceVariable.current.value;
                }
            }
            promises.push(_this.datasourceSrv.get(datasource).then(function (ds) {
                if (ds.meta.builtIn) {
                    return;
                }
                // add data source type to require list
                requires['datasource' + ds.meta.id] = {
                    type: 'datasource',
                    id: ds.meta.id,
                    name: ds.meta.name,
                    version: ds.meta.info.version || '1.0.0',
                };
                // if used via variable we can skip templatizing usage
                if (datasourceVariable) {
                    return;
                }
                var refName = 'DS_' + ds.name.replace(' ', '_').toUpperCase();
                datasources[refName] = {
                    name: refName,
                    label: ds.name,
                    description: '',
                    type: 'datasource',
                    pluginId: ds.meta.id,
                    pluginName: ds.meta.name,
                };
                obj.datasource = '${' + refName + '}';
            }));
        };
        var processPanel = function (panel) {
            if (panel.datasource !== undefined) {
                templateizeDatasourceUsage(panel);
            }
            if (panel.targets) {
                for (var _i = 0, _a = panel.targets; _i < _a.length; _i++) {
                    var target = _a[_i];
                    if (target.datasource !== undefined) {
                        templateizeDatasourceUsage(target);
                    }
                }
            }
            var panelDef = config.panels[panel.type];
            if (panelDef) {
                requires['panel' + panelDef.id] = {
                    type: 'panel',
                    id: panelDef.id,
                    name: panelDef.name,
                    version: panelDef.info.version,
                };
            }
        };
        // check up panel data sources
        for (var _b = 0, _c = saveModel.panels; _b < _c.length; _b++) {
            var panel = _c[_b];
            processPanel(panel);
            // handle collapsed rows
            if (panel.collapsed !== undefined && panel.collapsed === true && panel.panels) {
                for (var _d = 0, _e = panel.panels; _d < _e.length; _d++) {
                    var rowPanel = _e[_d];
                    processPanel(rowPanel);
                }
            }
        }
        // templatize template vars
        for (var _f = 0, _g = saveModel.templating.list; _f < _g.length; _f++) {
            var variable = _g[_f];
            if (variable.type === 'query') {
                templateizeDatasourceUsage(variable);
                variable.options = [];
                variable.current = {};
                variable.refresh = variable.refresh > 0 ? variable.refresh : 1;
            }
        }
        // templatize annotations vars
        for (var _h = 0, _j = saveModel.annotations.list; _h < _j.length; _h++) {
            var annotationDef = _j[_h];
            templateizeDatasourceUsage(annotationDef);
        }
        // add grafana version
        requires['grafana'] = {
            type: 'grafana',
            id: 'grafana',
            name: 'Grafana',
            version: config.buildInfo.version,
        };
        return Promise.all(promises)
            .then(function () {
            _.each(datasources, function (value, key) {
                inputs.push(value);
            });
            // templatize constants
            for (var _i = 0, _a = saveModel.templating.list; _i < _a.length; _i++) {
                var variable = _a[_i];
                if (variable.type === 'constant') {
                    var refName = 'VAR_' + variable.name.replace(' ', '_').toUpperCase();
                    inputs.push({
                        name: refName,
                        type: 'constant',
                        label: variable.label || variable.name,
                        value: variable.current.value,
                        description: '',
                    });
                    // update current and option
                    variable.query = '${' + refName + '}';
                    variable.options[0] = variable.current = {
                        value: variable.query,
                        text: variable.query,
                    };
                }
            }
            // make inputs and requires a top thing
            var newObj = {};
            newObj['__inputs'] = inputs;
            newObj['__requires'] = _.sortBy(requires, ['id']);
            _.defaults(newObj, saveModel);
            return newObj;
        })
            .catch(function (err) {
            console.log('Export failed:', err);
            return {
                error: err,
            };
        });
    };
    return DashboardExporter;
}());
export { DashboardExporter };
//# sourceMappingURL=exporter.js.map