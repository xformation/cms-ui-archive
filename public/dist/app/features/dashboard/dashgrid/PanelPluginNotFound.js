import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
var PanelPluginNotFound = /** @class */ (function (_super) {
    tslib_1.__extends(PanelPluginNotFound, _super);
    function PanelPluginNotFound(props) {
        return _super.call(this, props) || this;
    }
    PanelPluginNotFound.prototype.render = function () {
        var style = {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
        };
        return (React.createElement("div", { style: style },
            React.createElement("div", { className: "alert alert-error", style: { margin: '0 auto' } },
                "Panel plugin with id ",
                this.props.pluginId,
                " could not be found")));
    };
    return PanelPluginNotFound;
}(PureComponent));
export function getPanelPluginNotFound(id) {
    var NotFound = /** @class */ (function (_super) {
        tslib_1.__extends(NotFound, _super);
        function NotFound() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NotFound.prototype.render = function () {
            return React.createElement(PanelPluginNotFound, { pluginId: id });
        };
        return NotFound;
    }(PureComponent));
    return {
        id: id,
        name: id,
        sort: 100,
        module: '',
        baseUrl: '',
        info: {
            author: {
                name: '',
            },
            description: '',
            links: [],
            logos: {
                large: '',
                small: '',
            },
            screenshots: [],
            updated: '',
            version: '',
        },
        exports: {
            Panel: NotFound,
        },
    };
}
//# sourceMappingURL=PanelPluginNotFound.js.map