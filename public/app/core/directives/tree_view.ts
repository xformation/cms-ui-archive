import coreModule from '../core_module';

export function treeView($timeout) {
  return {
    restrict: 'E',
    scope: { family: '=' },
    template: `<i class="fa fa-plus-square-o tree-sign" ng-class="{'hide': (!family.collapse && family.children.length > 0) || !family.children}"></i>
            <i class="fa fa-minus-square-o tree-sign" ng-class="{'hide': (family.collapse && family.children.length > 0) || !family.children}"></i>
            <p class="tree-node-title">
                <input ng-checked="family.checked" type="checkbox" id="{{family.id}}" />
                <label for="{{family.id}}">{{ family.name }}</label>
            </p>
            <ul ng-class="{'hide': family.collapse}">
                <li ng-repeat="child in family.children">
                    <tree-view family="child"></tree-view>
                </li>
            </ul>`,
    link: (scope, element, attrs) => {
      $timeout(() => {
        const nodeTitle = element.find('>.tree-node-title');
        nodeTitle.off('click').on('click', e => {
          onClickNode(e, scope);
        });
        const treeSign = element.find('>.tree-sign');
        treeSign.off('click').on('click', e => {
          onClickNode(e, scope);
        });
        const checkbox = nodeTitle.find('input');
        checkbox.off('click').on('click', e => {
          const family = scope.family;
          e.preventDefault();
          e.stopPropagation();
          const isChecked = e.target.checked;
          family.checked = isChecked;
          if (family.children && family.children.length > 0) {
            const children = family.children;
            children.forEach(child => {
              child.checked = isChecked;
            });
          }
          scope.$apply();
        });
        function onClickNode(e, scope) {
          const family = scope.family;
          if (family.children && family.children.length > 0) {
            family.collapse = !family.collapse;
            scope.$apply();
          }
        }
      });
    },
  };
}

coreModule.directive('treeView', ['$timeout', treeView]);
