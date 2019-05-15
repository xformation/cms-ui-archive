import _ from 'lodash';
import { appEvents, coreModule } from 'app/core/core';
var AlertNotificationEditCtrl = /** @class */ (function () {
    /** @ngInject */
    function AlertNotificationEditCtrl($routeParams, backendSrv, $location, $templateCache, navModelSrv) {
        var _this = this;
        this.$routeParams = $routeParams;
        this.backendSrv = backendSrv;
        this.$location = $location;
        this.$templateCache = $templateCache;
        this.testSeverity = 'critical';
        this.defaults = {
            type: 'email',
            sendReminder: false,
            disableResolveMessage: false,
            frequency: '15m',
            settings: {
                httpMethod: 'POST',
                autoResolve: true,
                uploadImage: true,
            },
            isDefault: false,
        };
        this.navModel = navModelSrv.getNav('alerting', 'channels', 0);
        this.isNew = !this.$routeParams.id;
        this.getFrequencySuggestion = function () {
            return ['1m', '5m', '10m', '15m', '30m', '1h'];
        };
        this.backendSrv
            .get("/api/alert-notifiers")
            .then(function (notifiers) {
            _this.notifiers = notifiers;
            // add option templates
            for (var _i = 0, _a = _this.notifiers; _i < _a.length; _i++) {
                var notifier = _a[_i];
                _this.$templateCache.put(_this.getNotifierTemplateId(notifier.type), notifier.optionsTemplate);
            }
            if (!_this.$routeParams.id) {
                _this.navModel.breadcrumbs.push({ text: 'New channel' });
                _this.navModel.node = { text: 'New channel' };
                return _.defaults(_this.model, _this.defaults);
            }
            return _this.backendSrv.get("/api/alert-notifications/" + _this.$routeParams.id).then(function (result) {
                _this.navModel.breadcrumbs.push({ text: result.name });
                _this.navModel.node = { text: result.name };
                result.settings = _.defaults(result.settings, _this.defaults.settings);
                return result;
            });
        })
            .then(function (model) {
            _this.model = model;
            _this.notifierTemplateId = _this.getNotifierTemplateId(_this.model.type);
        });
    }
    AlertNotificationEditCtrl.prototype.save = function () {
        var _this = this;
        if (!this.theForm.$valid) {
            return;
        }
        if (this.model.id) {
            this.backendSrv
                .put("/api/alert-notifications/" + this.model.id, this.model)
                .then(function (res) {
                _this.model = res;
                appEvents.emit('alert-success', ['Notification updated', '']);
            })
                .catch(function (err) {
                if (err.data && err.data.error) {
                    appEvents.emit('alert-error', [err.data.error]);
                }
            });
        }
        else {
            this.backendSrv
                .post("/api/alert-notifications", this.model)
                .then(function (res) {
                appEvents.emit('alert-success', ['Notification created', '']);
                _this.$location.path('alerting/notifications');
            })
                .catch(function (err) {
                if (err.data && err.data.error) {
                    appEvents.emit('alert-error', [err.data.error]);
                }
            });
        }
    };
    AlertNotificationEditCtrl.prototype.getNotifierTemplateId = function (type) {
        return "notifier-options-" + type;
    };
    AlertNotificationEditCtrl.prototype.typeChanged = function () {
        this.model.settings = _.defaults({}, this.defaults.settings);
        this.notifierTemplateId = this.getNotifierTemplateId(this.model.type);
    };
    AlertNotificationEditCtrl.prototype.testNotification = function () {
        if (!this.theForm.$valid) {
            return;
        }
        var payload = {
            name: this.model.name,
            type: this.model.type,
            frequency: this.model.frequency,
            settings: this.model.settings,
        };
        this.backendSrv.post("/api/alert-notifications/test", payload).then(function (res) {
            appEvents.emit('alert-success', ['Test notification sent', '']);
        });
    };
    return AlertNotificationEditCtrl;
}());
export { AlertNotificationEditCtrl };
coreModule.controller('AlertNotificationEditCtrl', AlertNotificationEditCtrl);
//# sourceMappingURL=NotificationsEditCtrl.js.map