import coreModule from 'app/core/core_module';
import { StaffListCtrl } from './StaffListCtrl';

const checkboxTemplate = `
<label>
    <input type="checkbox" ng-model="ctrl.checked" ng-change="ctrl.internalOnChange()">
</label>
`;

export function staffList() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/features/localapp/academic-settings/staffsetup/stafflist/partials/staff_list.html',
    controller: StaffListCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    transclude: true,
    scope: {
      dashboard: '=',
    },
  };
}

export class SwitchCtrl {
  onChange: any;
  checked: any;

  /** @ngInject */
  constructor($scope, private $timeout) {}

  internalOnChange() {
    return this.$timeout(() => {
      return this.onChange();
    });
  }
}

export function checkboxDirective() {
  return {
    restrict: 'E',
    controller: SwitchCtrl,
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      checked: '=',
      onChange: '&',
    },
    template: checkboxTemplate,
  };
}

coreModule.directive('staffList', staffList, 'gfFormCheckbox', checkboxDirective);
