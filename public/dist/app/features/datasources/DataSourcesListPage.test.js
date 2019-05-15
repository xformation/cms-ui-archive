import * as tslib_1 from "tslib";
import React from 'react';
import { shallow } from 'enzyme';
import { DataSourcesListPage } from './DataSourcesListPage';
import { LayoutModes } from '../../core/components/LayoutSelector/LayoutSelector';
import { getMockDataSources } from './__mocks__/dataSourcesMocks';
var setup = function (propOverrides) {
    var props = {
        dataSources: [],
        layoutMode: LayoutModes.Grid,
        loadDataSources: jest.fn(),
        navModel: {},
        dataSourcesCount: 0,
        searchQuery: '',
        setDataSourcesSearchQuery: jest.fn(),
        setDataSourcesLayoutMode: jest.fn(),
        hasFetched: false,
    };
    Object.assign(props, propOverrides);
    return shallow(React.createElement(DataSourcesListPage, tslib_1.__assign({}, props)));
};
describe('Render', function () {
    it('should render component', function () {
        var wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });
    it('should render action bar and datasources', function () {
        var wrapper = setup({
            dataSources: getMockDataSources(5),
            dataSourcesCount: 5,
            hasFetched: true,
        });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=DataSourcesListPage.test.js.map