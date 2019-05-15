import coreModule from 'app/core/core_module';
import config from 'app/core/config';
import _ from 'lodash';
var NavModel = /** @class */ (function () {
    function NavModel() {
        this.breadcrumbs = [];
    }
    return NavModel;
}());
export { NavModel };
var NavModelSrv = /** @class */ (function () {
    /** @ngInject */
    function NavModelSrv() {
        this.navItems = config.bootData.navTree;
    }
    NavModelSrv.prototype.getCfgNode = function () {
        return _.find(this.navItems, { id: 'cfg' });
    };
    NavModelSrv.prototype.getNav = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var children = this.navItems;
        var nav = new NavModel();
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var id = args_1[_a];
            // if its a number then it's the index to use for main
            if (_.isNumber(id)) {
                nav.main = nav.breadcrumbs[id];
                break;
            }
            var node = _.find(children, { id: id });
            nav.breadcrumbs.push(node);
            nav.node = node;
            nav.main = node;
            children = node.children;
        }
        if (nav.main.children) {
            for (var _b = 0, _c = nav.main.children; _b < _c.length; _b++) {
                var item = _c[_b];
                item.active = false;
                if (item.url === nav.node.url) {
                    item.active = true;
                }
            }
        }
        return nav;
    };
    NavModelSrv.prototype.getNotFoundNav = function () {
        var node = {
            text: 'Page not found',
            icon: 'fa fa-fw fa-warning',
            subTitle: '404 Error',
        };
        return {
            breadcrumbs: [node],
            node: node,
            main: node,
        };
    };
    return NavModelSrv;
}());
export { NavModelSrv };
coreModule.service('navModelSrv', NavModelSrv);
//# sourceMappingURL=nav_model_srv.js.map