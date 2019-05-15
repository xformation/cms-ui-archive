import $ from 'jquery';
import _ from 'lodash';
import coreModule from '../core_module';
/** @ngInject */
function dashClass($timeout) {
    return {
        link: function ($scope, elem) {
            var body = $('body');
            $scope.ctrl.dashboard.events.on('view-mode-changed', function (panel) {
                console.log('view-mode-changed', panel.fullscreen);
                if (panel.fullscreen) {
                    body.addClass('panel-in-fullscreen');
                }
                else {
                    $timeout(function () {
                        body.removeClass('panel-in-fullscreen');
                    });
                }
            });
            body.toggleClass('panel-in-fullscreen', $scope.ctrl.dashboard.meta.fullscreen === true);
            $scope.$watch('ctrl.dashboardViewState.state.editview', function (newValue) {
                if (newValue) {
                    elem.toggleClass('dashboard-page--settings-opening', _.isString(newValue));
                    setTimeout(function () {
                        elem.toggleClass('dashboard-page--settings-open', _.isString(newValue));
                    }, 10);
                }
                else {
                    elem.removeClass('dashboard-page--settings-opening');
                    elem.removeClass('dashboard-page--settings-open');
                }
            });
        },
    };
}
coreModule.directive('dashClass', dashClass);
//# sourceMappingURL=dash_class.js.map