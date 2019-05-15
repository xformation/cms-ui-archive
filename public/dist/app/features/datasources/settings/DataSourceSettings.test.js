import * as tslib_1 from "tslib";
import React from 'react';
import { shallow } from 'enzyme';
import { DataSourceSettings } from './DataSourceSettings';
import { getMockDataSource } from '../__mocks__/dataSourcesMocks';
import { getMockPlugin } from '../../plugins/__mocks__/pluginMocks';
var setup = function (propOverrides) {
    var props = {
        navModel: {},
        dataSource: getMockDataSource(),
        dataSourceMeta: getMockPlugin(),
        pageId: 1,
        deleteDataSource: jest.fn(),
        loadDataSource: jest.fn(),
        setDataSourceName: jest.fn(),
        updateDataSource: jest.fn(),
        setIsDefault: jest.fn(),
    };
    Object.assign(props, propOverrides);
    return shallow(React.createElement(DataSourceSettings, tslib_1.__assign({}, props)));
};
describe('Render', function () {
    it('should render component', function () {
        var wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });
    it('should render loader', function () {
        var wrapper = setup({
            dataSource: {},
        });
        expect(wrapper).toMatchSnapshot();
    });
    it('should render beta info text', function () {
        var wrapper = setup({
            dataSourceMeta: tslib_1.__assign({}, getMockPlugin(), { state: 'beta' }),
        });
        expect(wrapper).toMatchSnapshot();
    });
    it('should render alpha info text', function () {
        var wrapper = setup({
            dataSourceMeta: tslib_1.__assign({}, getMockPlugin(), { state: 'alpha' }),
        });
        expect(wrapper).toMatchSnapshot();
    });
    it('should render is ready only message', function () {
        var wrapper = setup({
            dataSource: tslib_1.__assign({}, getMockDataSource(), { readOnly: true }),
        });
        expect(wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=DataSourceSettings.test.js.map