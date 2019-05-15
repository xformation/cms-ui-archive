import angular from 'angular';
import coreModule from 'app/core/core_module';
var PanelLoader = /** @class */ (function () {
    /** @ngInject */
    function PanelLoader($compile, $rootScope) {
        this.$compile = $compile;
        this.$rootScope = $rootScope;
    }
    PanelLoader.prototype.load = function (elem, panel, dashboard) {
        var template = '<plugin-component type="panel" class="panel-height-helper"></plugin-component>';
        var panelScope = this.$rootScope.$new();
        panelScope.panel = panel;
        panelScope.dashboard = dashboard;
        var compiledElem = this.$compile(template)(panelScope);
        var rootNode = angular.element(elem);
        rootNode.append(compiledElem);
        return {
            destroy: function () {
                panelScope.$destroy();
                compiledElem.remove();
            },
        };
    };
    return PanelLoader;
}());
export { PanelLoader };
coreModule.service('panelLoader', PanelLoader);
//# sourceMappingURL=PanelLoader.js.map