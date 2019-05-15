import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { getNavModel } from 'app/core/selectors/navModel';
import { getServerStats } from './state/apis';
import PageHeader from 'app/core/components/PageHeader/PageHeader';
var ServerStats = /** @class */ (function (_super) {
    tslib_1.__extends(ServerStats, _super);
    function ServerStats(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            stats: [],
        };
        return _this;
    }
    ServerStats.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var stats, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.props.getServerStats()];
                    case 1:
                        stats = _a.sent();
                        this.setState({ stats: stats });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServerStats.prototype.render = function () {
        var navModel = this.props.navModel;
        var stats = this.state.stats;
        return (React.createElement("div", null,
            React.createElement(PageHeader, { model: navModel }),
            React.createElement("div", { className: "page-container page-body" },
                React.createElement("table", { className: "filter-table form-inline" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Name"),
                            React.createElement("th", null, "Value"))),
                    React.createElement("tbody", null, stats.map(StatItem))))));
    };
    return ServerStats;
}(PureComponent));
export { ServerStats };
function StatItem(stat) {
    return (React.createElement("tr", { key: stat.name },
        React.createElement("td", null, stat.name),
        React.createElement("td", null, stat.value)));
}
var mapStateToProps = function (state) { return ({
    navModel: getNavModel(state.navIndex, 'server-stats'),
    getServerStats: getServerStats,
}); };
export default hot(module)(connect(mapStateToProps)(ServerStats));
//# sourceMappingURL=ServerStats.js.map