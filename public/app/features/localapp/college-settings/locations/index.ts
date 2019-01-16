import coreModule from 'app/core/core_module';
import { LocationsCtrl } from './LocationsCtrl';
import appEvents from 'app/core/app_events';

export class ShowModal {
  showModal = () => {
    appEvents.emit('show-modal', {
      templateUrl: 'public/app/features/localapp/college-settings/locations/partials/locations.html',
    });
  };
}
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
