import * as tslib_1 from "tslib";
import { ActionTypes } from 'app/core/actions/navModel';
import config from 'app/core/config';
export function buildInitialState() {
    var navIndex = {};
    var rootNodes = config.bootData.navTree;
    buildNavIndex(navIndex, rootNodes);
    return navIndex;
}
function buildNavIndex(navIndex, children, parentItem) {
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var node = children_1[_i];
        navIndex[node.id] = tslib_1.__assign({}, node, { parentItem: parentItem });
        if (node.children) {
            buildNavIndex(navIndex, node.children, node);
        }
    }
}
export var initialState = buildInitialState();
export var navIndexReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ActionTypes.UpdateNavIndex:
            var newPages = {};
            var payload = action.payload;
            for (var _i = 0, _a = payload.children; _i < _a.length; _i++) {
                var node = _a[_i];
                newPages[node.id] = tslib_1.__assign({}, node, { parentItem: payload });
            }
            return tslib_1.__assign({}, state, newPages);
    }
    return state;
};
//# sourceMappingURL=navModel.js.map