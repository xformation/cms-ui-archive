import * as tslib_1 from "tslib";
import { ActionTypes } from './actions';
import { LayoutModes } from '../../../core/components/LayoutSelector/LayoutSelector';
var initialState = {
    dataSources: [],
    dataSource: {},
    layoutMode: LayoutModes.Grid,
    searchQuery: '',
    dataSourcesCount: 0,
    dataSourceTypes: [],
    dataSourceTypeSearchQuery: '',
    hasFetched: false,
    dataSourceMeta: {},
};
export var dataSourcesReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ActionTypes.LoadDataSources:
            return tslib_1.__assign({}, state, { hasFetched: true, dataSources: action.payload, dataSourcesCount: action.payload.length });
        case ActionTypes.LoadDataSource:
            return tslib_1.__assign({}, state, { dataSource: action.payload });
        case ActionTypes.SetDataSourcesSearchQuery:
            return tslib_1.__assign({}, state, { searchQuery: action.payload });
        case ActionTypes.SetDataSourcesLayoutMode:
            return tslib_1.__assign({}, state, { layoutMode: action.payload });
        case ActionTypes.LoadDataSourceTypes:
            return tslib_1.__assign({}, state, { dataSourceTypes: action.payload });
        case ActionTypes.SetDataSourceTypeSearchQuery:
            return tslib_1.__assign({}, state, { dataSourceTypeSearchQuery: action.payload });
        case ActionTypes.LoadDataSourceMeta:
            return tslib_1.__assign({}, state, { dataSourceMeta: action.payload });
        case ActionTypes.SetDataSourceName:
            return tslib_1.__assign({}, state, { dataSource: tslib_1.__assign({}, state.dataSource, { name: action.payload }) });
        case ActionTypes.SetIsDefault:
            return tslib_1.__assign({}, state, { dataSource: tslib_1.__assign({}, state.dataSource, { isDefault: action.payload }) });
    }
    return state;
};
export default {
    dataSources: dataSourcesReducer,
};
//# sourceMappingURL=reducers.js.map