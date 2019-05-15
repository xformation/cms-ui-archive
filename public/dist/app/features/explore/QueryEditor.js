import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { getAngularLoader } from 'app/core/services/AngularLoader';
import { getIntervals } from 'app/core/utils/explore';
import { getTimeSrv } from 'app/features/dashboard/time_srv';
import 'app/features/plugins/plugin_loader';
var QueryEditor = /** @class */ (function (_super) {
    tslib_1.__extends(QueryEditor, _super);
    function QueryEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryEditor.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, datasource, initialQuery, exploreEvents, range, loader, template, target, scopeProps;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                if (!this.element) {
                    return [2 /*return*/];
                }
                _a = this.props, datasource = _a.datasource, initialQuery = _a.initialQuery, exploreEvents = _a.exploreEvents, range = _a.range;
                this.initTimeSrv(range);
                loader = getAngularLoader();
                template = '<plugin-component type="query-ctrl"> </plugin-component>';
                target = tslib_1.__assign({ datasource: datasource.name }, initialQuery);
                scopeProps = {
                    target: target,
                    ctrl: tslib_1.__assign({ refresh: function () {
                            _this.props.onQueryChange(target, false);
                            _this.props.onExecuteQuery();
                        }, events: exploreEvents, panel: {
                            datasource: datasource,
                            targets: [target],
                        }, dashboard: {
                            getNextQueryLetter: function (x) { return ''; },
                        }, hideEditorRowActions: true }, getIntervals(range, datasource, null)),
                };
                this.component = loader.load(this.element, scopeProps, template);
                this.props.onQueryChange(target, false);
                return [2 /*return*/];
            });
        });
    };
    QueryEditor.prototype.componentWillUnmount = function () {
        if (this.component) {
            this.component.destroy();
        }
    };
    QueryEditor.prototype.initTimeSrv = function (range) {
        var timeSrv = getTimeSrv();
        timeSrv.init({
            time: range,
            refresh: false,
            getTimezone: function () { return 'utc'; },
            timeRangeUpdated: function () { return console.log('refreshDashboard!'); },
        });
    };
    QueryEditor.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { ref: function (element) { return (_this.element = element); }, style: { width: '100%' } });
    };
    return QueryEditor;
}(PureComponent));
export default QueryEditor;
//# sourceMappingURL=QueryEditor.js.map