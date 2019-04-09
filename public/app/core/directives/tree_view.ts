import coreModule from '../core_module';

export function treeView($timeout) {
  return {
    restrict: 'E',
    scope: { family: '=' },
    template: `<i class="fa fa-plus-square-o tree-sign" ng-click="onClickCollapse(family)"
    ng-class="{'hide': (!family.collapse && family.children.length > 0) || !family.children}"></i>
            <i class="fa fa-minus-square-o tree-sign" ng-click="onClickCollapse(family)"
            ng-class="{'hide': (family.collapse && family.children.length > 0) || !family.children}"></i>
            <p class="tree-node-title">
                <input ng-model="family.checked" ng-change="onChangeCheckbox(family)" type="checkbox" id="{{family.id}}" />
                <label for="{{family.id}}">{{ family.name }}</label>
            </p>
            <ul ng-class="{'hide': family.collapse}">
                <li ng-repeat="child in family.children">
                    <tree-view family="child"></tree-view>
                </li>
            </ul>`,
    link: (scope, element, attrs) => {
      scope.onClickCollapse = (family) => {
        family.collapse = !family.collapse;
      };
      scope.onChangeCheckbox = (family) => {
        if (family.children && family.children.length > 0) {
          const children = family.children;
          children.forEach(child => {
            child.checked = family.checked;
          });
        }
      };
    },
  };
}

coreModule.directive('treeView', ['$timeout', treeView]);
