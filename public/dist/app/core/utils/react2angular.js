import coreModule from 'app/core/core_module';
export function react2AngularDirective(name, component, options) {
    coreModule.directive(name, [
        'reactDirective',
        function (reactDirective) {
            return reactDirective(component, options);
        },
    ]);
}
//# sourceMappingURL=react2angular.js.map