var _this = this;
import * as tslib_1 from "tslib";
import LokiDatasource from './datasource';
describe('LokiDatasource', function () {
    var instanceSettings = {
        url: 'myloggingurl',
    };
    describe('when performing testDataSource', function () {
        var ds;
        var result;
        describe('and call succeeds', function () {
            beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var backendSrv;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            backendSrv = {
                                datasourceRequest: function () {
                                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            return [2 /*return*/, Promise.resolve({
                                                    status: 200,
                                                    data: {
                                                        values: ['avalue'],
                                                    },
                                                })];
                                        });
                                    });
                                },
                            };
                            ds = new LokiDatasource(instanceSettings, backendSrv, {});
                            return [4 /*yield*/, ds.testDatasource()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return successfully', function () {
                expect(result.status).toBe('success');
            });
        });
        describe('and call fails with 401 error', function () {
            beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var backendSrv;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            backendSrv = {
                                datasourceRequest: function () {
                                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            return [2 /*return*/, Promise.reject({
                                                    statusText: 'Unauthorized',
                                                    status: 401,
                                                    data: {
                                                        message: 'Unauthorized',
                                                    },
                                                })];
                                        });
                                    });
                                },
                            };
                            ds = new LokiDatasource(instanceSettings, backendSrv, {});
                            return [4 /*yield*/, ds.testDatasource()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return error status and a detailed error message', function () {
                expect(result.status).toEqual('error');
                expect(result.message).toBe('Loki: Unauthorized. 401. Unauthorized');
            });
        });
        describe('and call fails with 404 error', function () {
            beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var backendSrv;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            backendSrv = {
                                datasourceRequest: function () {
                                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            return [2 /*return*/, Promise.reject({
                                                    statusText: 'Not found',
                                                    status: 404,
                                                    data: '404 page not found',
                                                })];
                                        });
                                    });
                                },
                            };
                            ds = new LokiDatasource(instanceSettings, backendSrv, {});
                            return [4 /*yield*/, ds.testDatasource()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return error status and a detailed error message', function () {
                expect(result.status).toEqual('error');
                expect(result.message).toBe('Loki: Not found. 404. 404 page not found');
            });
        });
        describe('and call fails with 502 error', function () {
            beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var backendSrv;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            backendSrv = {
                                datasourceRequest: function () {
                                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            return [2 /*return*/, Promise.reject({
                                                    statusText: 'Bad Gateway',
                                                    status: 502,
                                                    data: '',
                                                })];
                                        });
                                    });
                                },
                            };
                            ds = new LokiDatasource(instanceSettings, backendSrv, {});
                            return [4 /*yield*/, ds.testDatasource()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return error status and a detailed error message', function () {
                expect(result.status).toEqual('error');
                expect(result.message).toBe('Loki: Bad Gateway. 502');
            });
        });
    });
});
//# sourceMappingURL=datasource.test.js.map