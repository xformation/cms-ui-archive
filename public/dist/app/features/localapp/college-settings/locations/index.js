import coreModule from 'app/core/core_module';
import { LocationsCtrl } from './LocationsCtrl';
export function locations() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/localapp/college-settings/locations/partials/locations.html',
        controller: LocationsCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        transclude: true,
        scope: { dashboard: '=' },
    };
}
coreModule.directive('locations', locations);
//# sourceMappingURL=index.js.map