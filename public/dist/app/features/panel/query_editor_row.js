import angular from 'angular';
var module = angular.module('grafana.directives');
var QueryRowCtrl = /** @class */ (function () {
    function QueryRowCtrl() {
        this.panelCtrl = this.queryCtrl.panelCtrl;
        this.target = this.queryCtrl.target;
        this.panel = this.panelCtrl.panel;
        this.hideEditorRowActions = this.panelCtrl.hideEditorRowActions;
        if (!this.target.refId) {
            this.target.refId = this.panel.getNextQueryLetter();
        }
        this.toggleCollapse(true);
        if (this.target.isNew) {
            delete this.target.isNew;
            this.toggleCollapse(false);
        }
        if (this.panel.targets.length < 4) {
            this.collapsed = false;
        }
    }
    QueryRowCtrl.prototype.toggleHideQuery = function () {
        this.target.hide = !this.target.hide;
        this.panelCtrl.refresh();
    };
    QueryRowCtrl.prototype.toggleCollapse = function (init) {
        if (!this.canCollapse) {
            return;
        }
        if (!this.panelCtrl.__collapsedQueryCache) {
            this.panelCtrl.__collapsedQueryCache = {};
        }
        if (init) {
            this.collapsed = this.panelCtrl.__collapsedQueryCache[this.target.refId] !== false;
        }
        else {
            this.collapsed = !this.collapsed;
            this.panelCtrl.__collapsedQueryCache[this.target.refId] = this.collapsed;
        }
        try {
            this.collapsedText = this.queryCtrl.getCollapsedText();
        }
        catch (e) {
            var err = e.message || e.toString();
            this.collapsedText = 'Error: ' + err;
        }
    };
    QueryRowCtrl.prototype.toggleEditorMode = function () {
        if (this.canCollapse && this.collapsed) {
            this.collapsed = false;
        }
        this.queryCtrl.toggleEditorMode();
    };
    QueryRowCtrl.prototype.removeQuery = function () {
        if (this.panelCtrl.__collapsedQueryCache) {
            delete this.panelCtrl.__collapsedQueryCache[this.target.refId];
        }
        this.panelCtrl.removeQuery(this.target);
    };
    QueryRowCtrl.prototype.duplicateQuery = function () {
        var clone = angular.copy(this.target);
        this.panelCtrl.addQuery(clone);
    };
    QueryRowCtrl.prototype.moveQuery = function (direction) {
        this.panelCtrl.moveQuery(this.target, direction);
    };
    return QueryRowCtrl;
}());
export { QueryRowCtrl };
/** @ngInject */
function queryEditorRowDirective() {
    return {
        restrict: 'E',
        controller: QueryRowCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        templateUrl: 'public/app/features/panel/partials/query_editor_row.html',
        transclude: true,
        scope: {
            queryCtrl: '=',
            canCollapse: '=',
            hasTextEditMode: '=',
        },
    };
}
module.directive('queryEditorRow', queryEditorRowDirective);
//# sourceMappingURL=query_editor_row.js.map