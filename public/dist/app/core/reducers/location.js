import * as tslib_1 from "tslib";
import { renderUrl } from 'app/core/utils/url';
import _ from 'lodash';
export var initialState = {
    url: '',
    path: '',
    query: {},
    routeParams: {},
};
export var locationReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'UPDATE_LOCATION': {
            var _a = action.payload, path = _a.path, routeParams = _a.routeParams;
            var query = action.payload.query || state.query;
            if (action.payload.partial) {
                query = _.defaults(query, state.query);
                query = _.omitBy(query, _.isNull);
            }
            return {
                url: renderUrl(path || state.path, query),
                path: path || state.path,
                query: tslib_1.__assign({}, query),
                routeParams: routeParams || state.routeParams,
            };
        }
    }
    return state;
};
//# sourceMappingURL=location.js.map