import coreModule from '../core_module';
export function bgfileSelect() {
  return {
    link: ($scope, e2) => {
      e2.bind('change', e => {
        const file = (e.srcElement || e.target).files[0];
        $scope.getbgFile(file);
      });
    },
  };
}
coreModule.directive('bgfileSelect', bgfileSelect);
