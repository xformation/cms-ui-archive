import * as tslib_1 from "tslib";
import { DEFAULT_RANGE, serializeStateToUrlParam, parseUrlState, updateHistory, clearHistory, hasNonEmptyQuery, } from './explore';
import store from 'app/core/store';
var DEFAULT_EXPLORE_STATE = {
    datasource: null,
    datasourceError: null,
    datasourceLoading: null,
    datasourceMissing: false,
    datasourceName: '',
    exploreDatasources: [],
    graphInterval: 1000,
    history: [],
    initialQueries: [],
    queryTransactions: [],
    range: DEFAULT_RANGE,
    showingGraph: true,
    showingLogs: true,
    showingTable: true,
    supportsGraph: null,
    supportsLogs: null,
    supportsTable: null,
};
describe('state functions', function () {
    describe('parseUrlState', function () {
        it('returns default state on empty string', function () {
            expect(parseUrlState('')).toMatchObject({
                datasource: null,
                queries: [],
                range: DEFAULT_RANGE,
            });
        });
        it('returns a valid Explore state from URL parameter', function () {
            var paramValue = '%7B"datasource":"Local","queries":%5B%7B"expr":"metric"%7D%5D,"range":%7B"from":"now-1h","to":"now"%7D%7D';
            expect(parseUrlState(paramValue)).toMatchObject({
                datasource: 'Local',
                queries: [{ expr: 'metric' }],
                range: {
                    from: 'now-1h',
                    to: 'now',
                },
            });
        });
        it('returns a valid Explore state from a compact URL parameter', function () {
            var paramValue = '%5B"now-1h","now","Local",%7B"expr":"metric"%7D%5D';
            expect(parseUrlState(paramValue)).toMatchObject({
                datasource: 'Local',
                queries: [{ expr: 'metric' }],
                range: {
                    from: 'now-1h',
                    to: 'now',
                },
            });
        });
    });
    describe('serializeStateToUrlParam', function () {
        it('returns url parameter value for a state object', function () {
            var state = tslib_1.__assign({}, DEFAULT_EXPLORE_STATE, { datasourceName: 'foo', range: {
                    from: 'now-5h',
                    to: 'now',
                }, initialQueries: [
                    {
                        refId: '1',
                        expr: 'metric{test="a/b"}',
                    },
                    {
                        refId: '2',
                        expr: 'super{foo="x/z"}',
                    },
                ] });
            expect(serializeStateToUrlParam(state)).toBe('{"datasource":"foo","queries":[{"expr":"metric{test=\\"a/b\\"}"},' +
                '{"expr":"super{foo=\\"x/z\\"}"}],"range":{"from":"now-5h","to":"now"}}');
        });
        it('returns url parameter value for a state object', function () {
            var state = tslib_1.__assign({}, DEFAULT_EXPLORE_STATE, { datasourceName: 'foo', range: {
                    from: 'now-5h',
                    to: 'now',
                }, initialQueries: [
                    {
                        refId: '1',
                        expr: 'metric{test="a/b"}',
                    },
                    {
                        refId: '2',
                        expr: 'super{foo="x/z"}',
                    },
                ] });
            expect(serializeStateToUrlParam(state, true)).toBe('["now-5h","now","foo",{"expr":"metric{test=\\"a/b\\"}"},{"expr":"super{foo=\\"x/z\\"}"}]');
        });
    });
    describe('interplay', function () {
        it('can parse the serialized state into the original state', function () {
            var state = tslib_1.__assign({}, DEFAULT_EXPLORE_STATE, { datasourceName: 'foo', range: {
                    from: 'now - 5h',
                    to: 'now',
                }, initialQueries: [
                    {
                        refId: '1',
                        expr: 'metric{test="a/b"}',
                    },
                    {
                        refId: '2',
                        expr: 'super{foo="x/z"}',
                    },
                ] });
            var serialized = serializeStateToUrlParam(state);
            var parsed = parseUrlState(serialized);
            // Account for datasource vs datasourceName
            var datasource = parsed.datasource, queries = parsed.queries, rest = tslib_1.__rest(parsed, ["datasource", "queries"]);
            var resultState = tslib_1.__assign({}, rest, { datasource: DEFAULT_EXPLORE_STATE.datasource, datasourceName: datasource, initialQueries: queries });
            expect(state).toMatchObject(resultState);
        });
    });
});
describe('updateHistory()', function () {
    var datasourceId = 'myDatasource';
    var key = "grafana.explore.history." + datasourceId;
    beforeEach(function () {
        clearHistory(datasourceId);
        expect(store.exists(key)).toBeFalsy();
    });
    test('should save history item to localStorage', function () {
        var expected = [
            {
                query: { refId: '1', expr: 'metric' },
            },
        ];
        expect(updateHistory([], datasourceId, [{ refId: '1', expr: 'metric' }])).toMatchObject(expected);
        expect(store.exists(key)).toBeTruthy();
        expect(store.getObject(key)).toMatchObject(expected);
    });
});
describe('hasNonEmptyQuery', function () {
    test('should return true if one query is non-empty', function () {
        expect(hasNonEmptyQuery([{ refId: '1', key: '2', expr: 'foo' }])).toBeTruthy();
    });
    test('should return false if query is empty', function () {
        expect(hasNonEmptyQuery([{ refId: '1', key: '2' }])).toBeFalsy();
    });
    test('should return false if no queries exist', function () {
        expect(hasNonEmptyQuery([])).toBeFalsy();
    });
});
//# sourceMappingURL=explore.test.js.map