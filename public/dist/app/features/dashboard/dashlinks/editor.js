import angular from 'angular';
import _ from 'lodash';
export var iconMap = {
    'external link': 'fa-external-link',
    dashboard: 'fa-th-large',
    question: 'fa-question',
    info: 'fa-info',
    bolt: 'fa-bolt',
    doc: 'fa-file-text-o',
    cloud: 'fa-cloud',
};
var DashLinkEditorCtrl = /** @class */ (function () {
    /** @ngInject */
    function DashLinkEditorCtrl($scope, $rootScope) {
        this.iconMap = iconMap;
        this.dashboard.links = this.dashboard.links || [];
        this.mode = 'list';
        $scope.$on('$destroy', function () {
            $rootScope.appEvent('dash-links-updated');
        });
    }
    DashLinkEditorCtrl.prototype.backToList = function () {
        this.mode = 'list';
    };
    DashLinkEditorCtrl.prototype.setupNew = function () {
        this.mode = 'new';
        this.link = { type: 'dashboards', icon: 'external link' };
    };
    DashLinkEditorCtrl.prototype.addLink = function () {
        this.dashboard.links.push(this.link);
        this.mode = 'list';
    };
    DashLinkEditorCtrl.prototype.editLink = function (link) {
        this.link = link;
        this.mode = 'edit';
        console.log(this.link);
    };
    DashLinkEditorCtrl.prototype.saveLink = function () {
        this.backToList();
    };
    DashLinkEditorCtrl.prototype.moveLink = function (index, dir) {
        _.move(this.dashboard.links, index, index + dir);
    };
    DashLinkEditorCtrl.prototype.deleteLink = function (index) {
        this.dashboard.links.splice(index, 1);
        this.dashboard.updateSubmenuVisibility();
    };
    return DashLinkEditorCtrl;
}());
export { DashLinkEditorCtrl };
function dashLinksEditor() {
    return {
        restrict: 'E',
        controller: DashLinkEditorCtrl,
        templateUrl: 'public/app/features/dashboard/dashlinks/editor.html',
        bindToController: true,
        controllerAs: 'ctrl',
        scope: {
            dashboard: '=',
        },
    };
}
angular.module('grafana.directives').directive('dashLinksEditor', dashLinksEditor);
//# sourceMappingURL=editor.js.map