import coreModule from 'app/core/core_module';
import { CoursesCtrl } from './CoursesCtrl';

export function courses() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/academic-settings/courses/partials/courses.html',
    controller: CoursesCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: { dashboard: '=' },
  };
}

coreModule.directive('courses', courses);
