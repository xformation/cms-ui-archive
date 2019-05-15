import coreModule from 'app/core/core_module';
var hitTypes = {
    FOLDER: 'dash-folder',
    DASHBOARD: 'dash-db',
};
var ValidationSrv = /** @class */ (function () {
    /** @ngInject */
    function ValidationSrv($q, backendSrv) {
        this.$q = $q;
        this.backendSrv = backendSrv;
        this.rootName = 'general';
    }
    ValidationSrv.prototype.validateNewDashboardName = function (folderId, name) {
        return this.validate(folderId, name, 'A dashboard in this folder with the same name already exists');
    };
    ValidationSrv.prototype.validateNewFolderName = function (name) {
        return this.validate(0, name, 'A folder or dashboard in the general folder with the same name already exists');
    };
    ValidationSrv.prototype.validate = function (folderId, name, existingErrorMessage) {
        name = (name || '').trim();
        var nameLowerCased = name.toLowerCase();
        if (name.length === 0) {
            return this.$q.reject({
                type: 'REQUIRED',
                message: 'Name is required',
            });
        }
        if (folderId === 0 && nameLowerCased === this.rootName) {
            return this.$q.reject({
                type: 'EXISTING',
                message: 'This is a reserved name and cannot be used for a folder.',
            });
        }
        var deferred = this.$q.defer();
        var promises = [];
        promises.push(this.backendSrv.search({ type: hitTypes.FOLDER, folderIds: [folderId], query: name }));
        promises.push(this.backendSrv.search({ type: hitTypes.DASHBOARD, folderIds: [folderId], query: name }));
        this.$q.all(promises).then(function (res) {
            var hits = [];
            if (res.length > 0 && res[0].length > 0) {
                hits = res[0];
            }
            if (res.length > 1 && res[1].length > 0) {
                hits = hits.concat(res[1]);
            }
            for (var _i = 0, hits_1 = hits; _i < hits_1.length; _i++) {
                var hit = hits_1[_i];
                if (nameLowerCased === hit.title.toLowerCase()) {
                    deferred.reject({
                        type: 'EXISTING',
                        message: existingErrorMessage,
                    });
                    break;
                }
            }
            deferred.resolve();
        });
        return deferred.promise;
    };
    return ValidationSrv;
}());
export { ValidationSrv };
coreModule.service('validationSrv', ValidationSrv);
//# sourceMappingURL=validation_srv.js.map