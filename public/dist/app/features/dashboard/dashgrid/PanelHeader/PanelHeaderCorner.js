import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import Tooltip from 'app/core/components/Tooltip/Tooltip';
import templateSrv from 'app/features/templating/template_srv';
import { LinkSrv } from 'app/features/dashboard/panellinks/link_srv';
import { getTimeSrv } from 'app/features/dashboard/time_srv';
import Remarkable from 'remarkable';
var InfoModes;
(function (InfoModes) {
    InfoModes["Error"] = "Error";
    InfoModes["Info"] = "Info";
    InfoModes["Links"] = "Links";
})(InfoModes || (InfoModes = {}));
var PanelHeaderCorner = /** @class */ (function (_super) {
    tslib_1.__extends(PanelHeaderCorner, _super);
    function PanelHeaderCorner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeSrv = getTimeSrv();
        _this.getInfoMode = function () {
            var panel = _this.props.panel;
            if (!!panel.description) {
                return InfoModes.Info;
            }
            if (panel.links && panel.links.length) {
                return InfoModes.Links;
            }
            return undefined;
        };
        _this.getInfoContent = function () {
            var panel = _this.props.panel;
            var markdown = panel.description;
            var linkSrv = new LinkSrv(templateSrv, _this.timeSrv);
            var interpolatedMarkdown = templateSrv.replace(markdown, panel.scopedVars);
            var remarkableInterpolatedMarkdown = new Remarkable().render(interpolatedMarkdown);
            var html = (React.createElement("div", { className: "markdown-html" },
                React.createElement("div", { dangerouslySetInnerHTML: { __html: remarkableInterpolatedMarkdown } }),
                panel.links &&
                    panel.links.length > 0 && (React.createElement("ul", { className: "text-left" }, panel.links.map(function (link, idx) {
                    var info = linkSrv.getPanelLinkAnchorInfo(link, panel.scopedVars);
                    return (React.createElement("li", { key: idx },
                        React.createElement("a", { className: "panel-menu-link", href: info.href, target: info.target }, info.title)));
                })))));
            return html;
        };
        return _this;
    }
    PanelHeaderCorner.prototype.render = function () {
        var infoMode = this.getInfoMode();
        if (!infoMode) {
            return null;
        }
        return (React.createElement(React.Fragment, null, infoMode === InfoModes.Info || infoMode === InfoModes.Links ? (React.createElement(Tooltip, { content: this.getInfoContent, className: "popper__manager--block", refClassName: "panel-info-corner panel-info-corner--" + infoMode.toLowerCase(), placement: "bottom-start" },
            React.createElement("i", { className: "fa" }),
            React.createElement("span", { className: "panel-info-corner-inner" }))) : null));
    };
    return PanelHeaderCorner;
}(Component));
export { PanelHeaderCorner };
export default PanelHeaderCorner;
//# sourceMappingURL=PanelHeaderCorner.js.map