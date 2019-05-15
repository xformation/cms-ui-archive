import * as tslib_1 from "tslib";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import coreModule from 'app/core/core_module';
import { store } from 'app/store/store';
function WrapInProvider(store, Component, props) {
    return (React.createElement(Provider, { store: store },
        React.createElement(Component, tslib_1.__assign({}, props))));
}
/** @ngInject */
export function reactContainer($route, $location, backendSrv, datasourceSrv, contextSrv) {
    return {
        restrict: 'E',
        template: '',
        link: function (scope, elem) {
            // Check permissions for this component
            var roles = $route.current.locals.roles;
            if (roles && roles.length) {
                if (!roles.some(function (r) { return contextSrv.hasRole(r); })) {
                    $location.url('/');
                }
            }
            var component = $route.current.locals.component;
            // Dynamic imports return whole module, need to extract default export
            if (component.default) {
                component = component.default;
            }
            var props = {
                backendSrv: backendSrv,
                datasourceSrv: datasourceSrv,
                routeParams: $route.current.params,
            };
            ReactDOM.render(WrapInProvider(store, component, props), elem[0]);
            scope.$on('$destroy', function () {
                ReactDOM.unmountComponentAtNode(elem[0]);
            });
        },
    };
}
coreModule.directive('reactContainer', reactContainer);
//# sourceMappingURL=ReactContainer.js.map