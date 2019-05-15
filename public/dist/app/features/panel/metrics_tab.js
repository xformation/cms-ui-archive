// Services & utils
import coreModule from 'app/core/core_module';
/** @ngInject */
export function metricsTabDirective() {
    'use strict';
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'public/app/features/panel/partials/metrics_tab.html',
    };
}
coreModule.directive('metricsTab', metricsTabDirective);
//# sourceMappingURL=metrics_tab.js.map