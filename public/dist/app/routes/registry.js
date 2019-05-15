var handlers = [];
export function applyRouteRegistrationHandlers($routeProvider) {
    for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
        var handler = handlers_1[_i];
        handler($routeProvider);
    }
}
export function addRouteRegistrationHandler(fn) {
    handlers.push(fn);
}
//# sourceMappingURL=registry.js.map