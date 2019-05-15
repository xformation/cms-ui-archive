import { coreModule } from 'app/core/core';
var template = "\n<span class=\"panel-title\">\n  <span class=\"icon-gf panel-alert-icon\"></span>\n  <span class=\"panel-title-text\">{{ctrl.panel.title | interpolateTemplateVars:this}}</span>\n  <span class=\"panel-menu-container dropdown\">\n    <span class=\"fa fa-caret-down panel-menu-toggle\" data-toggle=\"dropdown\"></span>\n    <ul class=\"dropdown-menu dropdown-menu--menu panel-menu\" role=\"menu\">\n    </ul>\n  </span>\n  <span class=\"panel-time-info\" ng-if=\"ctrl.timeInfo\"><i class=\"fa fa-clock-o\"></i> {{ctrl.timeInfo}}</span>\n</span>";
function renderMenuItem(item, ctrl) {
    var html = '';
    var listItemClass = '';
    if (item.divider) {
        return '<li class="divider"></li>';
    }
    if (item.submenu) {
        listItemClass = 'dropdown-submenu';
    }
    html += "<li class=\"" + listItemClass + "\"><a ";
    if (item.click) {
        html += " ng-click=\"" + item.click + "\"";
    }
    if (item.href) {
        html += " href=\"" + item.href + "\"";
    }
    html += "><i class=\"" + item.icon + "\"></i>";
    html += "<span class=\"dropdown-item-text\">" + item.text + "</span>";
    if (item.shortcut) {
        html += "<span class=\"dropdown-menu-item-shortcut\">" + item.shortcut + "</span>";
    }
    html += "</a>";
    if (item.submenu) {
        html += '<ul class="dropdown-menu dropdown-menu--menu panel-menu">';
        for (var _i = 0, _a = item.submenu; _i < _a.length; _i++) {
            var subitem = _a[_i];
            html += renderMenuItem(subitem, ctrl);
        }
        html += '</ul>';
    }
    html += "</li>";
    return html;
}
function createMenuTemplate(ctrl) {
    var html = '';
    for (var _i = 0, _a = ctrl.getMenu(); _i < _a.length; _i++) {
        var item = _a[_i];
        html += renderMenuItem(item, ctrl);
    }
    return html;
}
/** @ngInject */
function panelHeader($compile) {
    return {
        restrict: 'E',
        template: template,
        link: function (scope, elem, attrs) {
            var menuElem = elem.find('.panel-menu');
            var menuScope;
            var isDragged;
            elem.click(function (evt) {
                var targetClass = evt.target.className;
                // remove existing scope
                if (menuScope) {
                    menuScope.$destroy();
                }
                menuScope = scope.$new();
                var menuHtml = createMenuTemplate(scope.ctrl);
                menuElem.html(menuHtml);
                $compile(menuElem)(menuScope);
                if (targetClass.indexOf('panel-title-text') >= 0 || targetClass.indexOf('panel-title') >= 0) {
                    togglePanelMenu(evt);
                }
            });
            function togglePanelMenu(e) {
                if (!isDragged) {
                    e.stopPropagation();
                    elem.find('[data-toggle=dropdown]').dropdown('toggle');
                }
            }
            var mouseX, mouseY;
            elem.mousedown(function (e) {
                mouseX = e.pageX;
                mouseY = e.pageY;
            });
            elem.mouseup(function (e) {
                if (mouseX === e.pageX && mouseY === e.pageY) {
                    isDragged = false;
                }
                else {
                    isDragged = true;
                }
            });
        },
    };
}
coreModule.directive('panelHeader', panelHeader);
//# sourceMappingURL=panel_header.js.map