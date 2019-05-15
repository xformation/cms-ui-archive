import coreModule from '../core_module';
export function treeView($timeout) {
    return {
        restrict: 'E',
        scope: {
            family: '=',
            onClick: '&'
        },
        template: "<i class=\"fa fa-plus-square-o tree-sign\" ng-click=\"onClickCollapse(family)\"\n    ng-class=\"{'hide': (!family.collapse && family.children.length > 0) || !family.children}\"></i>\n            <i class=\"fa fa-minus-square-o tree-sign\" ng-click=\"onClickCollapse(family)\"\n            ng-class=\"{'hide': (family.collapse && family.children.length > 0) || !family.children}\"></i>\n            <p class=\"tree-node-title\">\n                <input ng-model=\"family.checked\" ng-change=\"onChangeCheckbox(family)\" type=\"checkbox\" id=\"{{family.id}}\" />\n                <label for=\"{{family.id}}\">{{ family.name }}</label>\n            </p>\n            <ul ng-class=\"{'hide': family.collapse}\">\n                <li ng-repeat=\"child in family.children\">\n                    <tree-view on-click=\"onClick(role)\" family=\"child\"></tree-view>\n                </li>\n            </ul>",
        link: function (scope, element, attrs) {
            scope.onClickCollapse = function (family) {
                family.collapse = !family.collapse;
            };
            scope.onChangeCheckbox = function (family) {
                scope.onClick({
                    role: family
                });
                if (family.children && family.children.length > 0) {
                    var children = family.children;
                    children.forEach(function (child) {
                        child.checked = family.checked;
                    });
                }
            };
        },
    };
}
coreModule.directive('treeView', ['$timeout', treeView]);
//# sourceMappingURL=tree_view.js.map