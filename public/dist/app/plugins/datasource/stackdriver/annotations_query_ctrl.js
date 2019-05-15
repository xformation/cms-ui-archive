import _ from 'lodash';
import './query_filter_ctrl';
var StackdriverAnnotationsQueryCtrl = /** @class */ (function () {
    /** @ngInject */
    function StackdriverAnnotationsQueryCtrl() {
        this.defaultDropdownValue = 'Select Metric';
        this.defaultServiceValue = 'All Services';
        this.defaults = {
            project: {
                id: 'default',
                name: 'loading project...',
            },
            metricType: this.defaultDropdownValue,
            service: this.defaultServiceValue,
            metric: '',
            filters: [],
            metricKind: '',
            valueType: '',
        };
        this.annotation.target = this.annotation.target || {};
        this.annotation.target.refId = 'annotationQuery';
        _.defaultsDeep(this.annotation.target, this.defaults);
    }
    StackdriverAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return StackdriverAnnotationsQueryCtrl;
}());
export { StackdriverAnnotationsQueryCtrl };
//# sourceMappingURL=annotations_query_ctrl.js.map