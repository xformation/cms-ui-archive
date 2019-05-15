import coreModule from 'app/core/core_module';
var template = "\n<div class=\"scroll-canvas\">\n  <navbar model=\"model\"></navbar>\n   <div class=\"page-container\">\n\t\t<div class=\"page-header\">\n      <h1>\n         <i class=\"{{::model.node.icon}}\" ng-if=\"::model.node.icon\"></i>\n         <img ng-src=\"{{::model.node.img}}\" ng-if=\"::model.node.img\"></i>\n         {{::model.node.text}}\n       </h1>\n\n      <div class=\"page-header__actions\" ng-transclude=\"header\"></div>\n\t\t</div>\n\n    <div class=\"page-body\" ng-transclude=\"body\">\n    </div>\n  </div>\n</div>\n";
export function gfPageDirective() {
    return {
        restrict: 'E',
        template: template,
        scope: {
            model: '=',
        },
        transclude: {
            header: '?gfPageHeader',
            body: 'gfPageBody',
        },
        link: function (scope, elem, attrs) {
            console.log(scope);
        },
    };
}
coreModule.directive('gfPage', gfPageDirective);
//# sourceMappingURL=gf_page.js.map