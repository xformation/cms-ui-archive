import coreModule from '../core_module';
export function fileSelect() {
    return {
        link: function ($scope, el) {
            el.bind('change', function (e) {
                var file = (e.srcElement || e.target).files[0];
                $scope.getFile(file);
            });
        },
    };
}
coreModule.directive('fileSelect', fileSelect);
//# sourceMappingURL=file_select.js.map