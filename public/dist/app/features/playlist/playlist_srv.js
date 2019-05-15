import coreModule from '../../core/core_module';
import kbn from 'app/core/utils/kbn';
import appEvents from 'app/core/app_events';
import _ from 'lodash';
import { toUrlParams } from 'app/core/utils/url';
var PlaylistSrv = /** @class */ (function () {
    /** @ngInject */
    function PlaylistSrv($location, $timeout, backendSrv) {
        this.$location = $location;
        this.$timeout = $timeout;
        this.backendSrv = backendSrv;
    }
    PlaylistSrv.prototype.next = function () {
        var _this = this;
        this.$timeout.cancel(this.cancelPromise);
        var playedAllDashboards = this.index > this.dashboards.length - 1;
        if (playedAllDashboards) {
            window.location.href = this.startUrl;
            return;
        }
        var dash = this.dashboards[this.index];
        var queryParams = this.$location.search();
        var filteredParams = _.pickBy(queryParams, function (value) { return value !== null; });
        this.$location.url('dashboard/' + dash.uri + '?' + toUrlParams(filteredParams));
        this.index++;
        this.cancelPromise = this.$timeout(function () { return _this.next(); }, this.interval);
    };
    PlaylistSrv.prototype.prev = function () {
        this.index = Math.max(this.index - 2, 0);
        this.next();
    };
    PlaylistSrv.prototype.start = function (playlistId) {
        var _this = this;
        this.stop();
        this.startUrl = window.location.href;
        this.index = 0;
        this.isPlaying = true;
        this.backendSrv.get("/api/playlists/" + playlistId).then(function (playlist) {
            _this.backendSrv.get("/api/playlists/" + playlistId + "/dashboards").then(function (dashboards) {
                _this.dashboards = dashboards;
                _this.interval = kbn.interval_to_ms(playlist.interval);
                _this.next();
            });
        });
    };
    PlaylistSrv.prototype.stop = function () {
        if (this.isPlaying) {
            var queryParams = this.$location.search();
            if (queryParams.kiosk) {
                appEvents.emit('toggle-kiosk-mode', { exit: true });
            }
        }
        this.index = 0;
        this.isPlaying = false;
        if (this.cancelPromise) {
            this.$timeout.cancel(this.cancelPromise);
        }
    };
    return PlaylistSrv;
}());
coreModule.service('playlistSrv', PlaylistSrv);
//# sourceMappingURL=playlist_srv.js.map