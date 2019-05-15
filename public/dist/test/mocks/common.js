export var backendSrv = {
    get: jest.fn(),
    getDashboard: jest.fn(),
    getDashboardByUid: jest.fn(),
    getFolderByUid: jest.fn(),
    post: jest.fn(),
};
export function createNavTree() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var root = [];
    var node = root;
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        var child = { id: arg, url: "/url/" + arg, text: arg + "-Text", children: [] };
        node.push(child);
        node = child.children;
    }
    return root;
}
export function createNavModel(title) {
    var tabs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        tabs[_i - 1] = arguments[_i];
    }
    var node = {
        id: title,
        text: title,
        icon: 'fa fa-fw fa-warning',
        subTitle: 'subTitle',
        url: title,
        children: [],
        breadcrumbs: [],
    };
    for (var _a = 0, tabs_1 = tabs; _a < tabs_1.length; _a++) {
        var tab = tabs_1[_a];
        node.children.push({
            id: tab,
            icon: 'icon',
            subTitle: 'subTitle',
            url: title,
            text: title,
            active: false,
        });
    }
    node.children[0].active = true;
    return {
        node: node,
        main: node,
    };
}
//# sourceMappingURL=common.js.map