import $ from 'jquery';
import angular from 'angular';
var Profiler = /** @class */ (function () {
    function Profiler() {
    }
    Profiler.prototype.init = function (config, $rootScope) {
        var _this = this;
        this.enabled = config.buildInfo.env === 'development';
        this.timings = {};
        this.timings.appStart = { loadStart: new Date().getTime() };
        this.$rootScope = $rootScope;
        this.window = window;
        if (!this.enabled) {
            return;
        }
        $rootScope.$watch(function () {
            _this.digestCounter++;
            return false;
        }, function () { });
        $rootScope.onAppEvent('refresh', this.refresh.bind(this), $rootScope);
        $rootScope.onAppEvent('dashboard-fetch-end', this.dashboardFetched.bind(this), $rootScope);
        $rootScope.onAppEvent('dashboard-initialized', this.dashboardInitialized.bind(this), $rootScope);
        $rootScope.onAppEvent('panel-initialized', this.panelInitialized.bind(this), $rootScope);
    };
    Profiler.prototype.refresh = function () {
        var _this = this;
        this.timings.query = 0;
        this.timings.render = 0;
        setTimeout(function () {
            console.log('panel count: ' + _this.panelsInitCount);
            console.log('total query: ' + _this.timings.query);
            console.log('total render: ' + _this.timings.render);
            console.log('avg render: ' + _this.timings.render / _this.panelsInitCount);
        }, 5000);
    };
    Profiler.prototype.dashboardFetched = function () {
        this.timings.dashboardLoadStart = new Date().getTime();
        this.panelsInitCount = 0;
        this.digestCounter = 0;
        this.panelsInitCount = 0;
        this.panelsRendered = 0;
        this.timings.query = 0;
        this.timings.render = 0;
    };
    Profiler.prototype.dashboardInitialized = function () {
        var _this = this;
        setTimeout(function () {
            console.log('Dashboard::Performance Total Digests: ' + _this.digestCounter);
            console.log('Dashboard::Performance Total Watchers: ' + _this.getTotalWatcherCount());
            console.log('Dashboard::Performance Total ScopeCount: ' + _this.scopeCount);
            var timeTaken = _this.timings.lastPanelInitializedAt - _this.timings.dashboardLoadStart;
            console.log('Dashboard::Performance All panels initialized in ' + timeTaken + ' ms');
            // measure digest performance
            var rootDigestStart = window.performance.now();
            for (var i = 0; i < 30; i++) {
                _this.$rootScope.$apply();
            }
            console.log('Dashboard::Performance Root Digest ' + (window.performance.now() - rootDigestStart) / 30);
        }, 3000);
    };
    Profiler.prototype.getTotalWatcherCount = function () {
        var count = 0;
        var scopes = 0;
        var root = $(document.getElementsByTagName('body'));
        var f = function (element) {
            if (element.data().hasOwnProperty('$scope')) {
                scopes++;
                angular.forEach(element.data().$scope.$$watchers, function () {
                    count++;
                });
            }
            angular.forEach(element.children(), function (childElement) {
                f($(childElement));
            });
        };
        f(root);
        this.scopeCount = scopes;
        return count;
    };
    Profiler.prototype.renderingCompleted = function (panelId, panelTimings) {
        // add render counter to root scope
        // used by phantomjs render.js to know when panel has rendered
        this.panelsRendered = (this.panelsRendered || 0) + 1;
        // this window variable is used by backend rendering tools to know
        // all panels have completed rendering
        this.window.panelsRendered = this.panelsRendered;
        if (this.enabled) {
            panelTimings.renderEnd = new Date().getTime();
            this.timings.query += panelTimings.queryEnd - panelTimings.queryStart;
            this.timings.render += panelTimings.renderEnd - panelTimings.renderStart;
        }
    };
    Profiler.prototype.panelInitialized = function () {
        if (!this.enabled) {
            return;
        }
        this.panelsInitCount++;
        this.timings.lastPanelInitializedAt = new Date().getTime();
    };
    return Profiler;
}());
export { Profiler };
var profiler = new Profiler();
export { profiler };
//# sourceMappingURL=profiler.js.map