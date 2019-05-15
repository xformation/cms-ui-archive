import coreModule from '../core_module';
export function bgfileSelect() {
    return {
        link: function ($scope, e2) {
            e2.bind('change', function (e) {
                var file = (e.srcElement || e.target).files[0];
                $scope.getbgFile(file);
            });
        },
    };
}
coreModule.directive('bgfileSelect', bgfileSelect);
//# sourceMappingURL=bgfile_select.js.map