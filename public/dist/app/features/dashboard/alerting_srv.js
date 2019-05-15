import coreModule from 'app/core/core_module';
var AlertingSrv = /** @class */ (function () {
    function AlertingSrv() {
    }
    AlertingSrv.prototype.init = function (dashboard, alerts) {
        this.dashboard = dashboard;
        this.alerts = alerts || [];
    };
    return AlertingSrv;
}());
export { AlertingSrv };
coreModule.service('alertingSrv', AlertingSrv);
//# sourceMappingURL=alerting_srv.js.map