import _ from 'lodash';
import coreModule from 'app/core/core_module';
import appEvents from 'app/core/app_events';
var Query = /** @class */ (function () {
    function Query() {
    }
    return Query;
}());
var ManageDashboardsCtrl = /** @class */ (function () {
    /** @ngInject */
    function ManageDashboardsCtrl(backendSrv, navModelSrv, searchSrv, contextSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.searchSrv = searchSrv;
        this.contextSrv = contextSrv;
        this.selectAllChecked = false;
        // enable/disable actions depending on the folders or dashboards selected
        this.canDelete = false;
        this.canMove = false;
        // filter variables
        this.hasFilters = false;
        this.starredFilterOptions = [{ text: 'Filter by Starred', disabled: true }, { text: 'Yes' }, { text: 'No' }];
        // if user can add new folders and/or add new dashboards
        this.canSave = false;
        this.isEditor = this.contextSrv.isEditor;
        this.hasEditPermissionInFolders = this.contextSrv.hasEditPermissionInFolders;
        this.query = {
            query: '',
            mode: 'tree',
            tag: [],
            starred: false,
            skipRecent: true,
            skipStarred: true,
            folderIds: [],
        };
        if (this.folderId) {
            this.query.folderIds = [this.folderId];
        }
        this.selectedStarredFilter = this.starredFilterOptions[0];
        this.refreshList().then(function () {
            _this.initTagFilter();
        });
    }
    ManageDashboardsCtrl.prototype.refreshList = function () {
        var _this = this;
        return this.searchSrv
            .search(this.query)
            .then(function (result) {
            return _this.initDashboardList(result);
        })
            .then(function () {
            if (!_this.folderUid) {
                return;
            }
            return _this.backendSrv.getFolderByUid(_this.folderUid).then(function (folder) {
                _this.canSave = folder.canSave;
                if (!_this.canSave) {
                    _this.hasEditPermissionInFolders = false;
                }
            });
        });
    };
    ManageDashboardsCtrl.prototype.initDashboardList = function (result) {
        this.canMove = false;
        this.canDelete = false;
        this.selectAllChecked = false;
        this.hasFilters = this.query.query.length > 0 || this.query.tag.length > 0 || this.query.starred;
        if (!result) {
            this.sections = [];
            return;
        }
        this.sections = result;
        for (var _i = 0, _a = this.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            section.checked = false;
            for (var _b = 0, _c = section.items; _b < _c.length; _b++) {
                var dashboard = _c[_b];
                dashboard.checked = false;
            }
        }
        if (this.folderId && this.sections.length > 0) {
            this.sections[0].hideHeader = true;
        }
    };
    ManageDashboardsCtrl.prototype.selectionChanged = function () {
        var selectedDashboards = 0;
        for (var _i = 0, _a = this.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            selectedDashboards += _.filter(section.items, { checked: true }).length;
        }
        var selectedFolders = _.filter(this.sections, { checked: true }).length;
        this.canMove = selectedDashboards > 0;
        this.canDelete = selectedDashboards > 0 || selectedFolders > 0;
    };
    ManageDashboardsCtrl.prototype.getFoldersAndDashboardsToDelete = function () {
        var _a;
        var selectedDashboards = {
            folders: [],
            dashboards: [],
        };
        for (var _i = 0, _b = this.sections; _i < _b.length; _i++) {
            var section = _b[_i];
            if (section.checked && section.id !== 0) {
                selectedDashboards.folders.push(section.uid);
            }
            else {
                var selected = _.filter(section.items, { checked: true });
                (_a = selectedDashboards.dashboards).push.apply(_a, _.map(selected, 'uid'));
            }
        }
        return selectedDashboards;
    };
    ManageDashboardsCtrl.prototype.getFolderIds = function (sections) {
        var ids = [];
        for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
            var s = sections_1[_i];
            if (s.checked) {
                ids.push(s.id);
            }
        }
        return ids;
    };
    ManageDashboardsCtrl.prototype.delete = function () {
        var _this = this;
        var data = this.getFoldersAndDashboardsToDelete();
        var folderCount = data.folders.length;
        var dashCount = data.dashboards.length;
        var text = 'Do you want to delete the ';
        var text2;
        if (folderCount > 0 && dashCount > 0) {
            text += "selected folder" + (folderCount === 1 ? '' : 's') + " and dashboard" + (dashCount === 1 ? '' : 's') + "?";
            text2 = "All dashboards of the selected folder" + (folderCount === 1 ? '' : 's') + " will also be deleted";
        }
        else if (folderCount > 0) {
            text += "selected folder" + (folderCount === 1 ? '' : 's') + " and all its dashboards?";
        }
        else {
            text += "selected dashboard" + (dashCount === 1 ? '' : 's') + "?";
        }
        appEvents.emit('confirm-modal', {
            title: 'Delete',
            text: text,
            text2: text2,
            icon: 'fa-trash',
            yesText: 'Delete',
            onConfirm: function () {
                _this.deleteFoldersAndDashboards(data.folders, data.dashboards);
            },
        });
    };
    ManageDashboardsCtrl.prototype.deleteFoldersAndDashboards = function (folderUids, dashboardUids) {
        var _this = this;
        this.backendSrv.deleteFoldersAndDashboards(folderUids, dashboardUids).then(function () {
            _this.refreshList();
        });
    };
    ManageDashboardsCtrl.prototype.getDashboardsToMove = function () {
        var selectedDashboards = [];
        for (var _i = 0, _a = this.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            var selected = _.filter(section.items, { checked: true });
            selectedDashboards.push.apply(selectedDashboards, _.map(selected, 'uid'));
        }
        return selectedDashboards;
    };
    ManageDashboardsCtrl.prototype.moveTo = function () {
        var selectedDashboards = this.getDashboardsToMove();
        var template = '<move-to-folder-modal dismiss="dismiss()" ' +
            'dashboards="model.dashboards" after-save="model.afterSave()">' +
            '</move-to-folder-modal>';
        appEvents.emit('show-modal', {
            templateHtml: template,
            modalClass: 'modal--narrow',
            model: {
                dashboards: selectedDashboards,
                afterSave: this.refreshList.bind(this),
            },
        });
    };
    ManageDashboardsCtrl.prototype.initTagFilter = function () {
        var _this = this;
        return this.searchSrv.getDashboardTags().then(function (results) {
            _this.tagFilterOptions = [{ term: 'Filter By Tag', disabled: true }].concat(results);
            _this.selectedTagFilter = _this.tagFilterOptions[0];
        });
    };
    ManageDashboardsCtrl.prototype.filterByTag = function (tag) {
        if (_.indexOf(this.query.tag, tag) === -1) {
            this.query.tag.push(tag);
        }
        return this.refreshList();
    };
    ManageDashboardsCtrl.prototype.onQueryChange = function () {
        return this.refreshList();
    };
    ManageDashboardsCtrl.prototype.onTagFilterChange = function () {
        var res = this.filterByTag(this.selectedTagFilter.term);
        this.selectedTagFilter = this.tagFilterOptions[0];
        return res;
    };
    ManageDashboardsCtrl.prototype.removeTag = function (tag, evt) {
        this.query.tag = _.without(this.query.tag, tag);
        this.refreshList();
        if (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        }
    };
    ManageDashboardsCtrl.prototype.removeStarred = function () {
        this.query.starred = false;
        return this.refreshList();
    };
    ManageDashboardsCtrl.prototype.onStarredFilterChange = function () {
        this.query.starred = this.selectedStarredFilter.text === 'Yes';
        this.selectedStarredFilter = this.starredFilterOptions[0];
        return this.refreshList();
    };
    ManageDashboardsCtrl.prototype.onSelectAllChanged = function () {
        var _this = this;
        for (var _i = 0, _a = this.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            if (!section.hideHeader) {
                section.checked = this.selectAllChecked;
            }
            section.items = _.map(section.items, function (item) {
                item.checked = _this.selectAllChecked;
                return item;
            });
        }
        this.selectionChanged();
    };
    ManageDashboardsCtrl.prototype.clearFilters = function () {
        this.query.query = '';
        this.query.tag = [];
        this.query.starred = false;
        this.refreshList();
    };
    ManageDashboardsCtrl.prototype.createDashboardUrl = function () {
        var url = 'dashboard/new';
        if (this.folderId) {
            url += "?folderId=" + this.folderId;
        }
        return url;
    };
    ManageDashboardsCtrl.prototype.importDashboardUrl = function () {
        var url = 'dashboard/import';
        if (this.folderId) {
            url += "?folderId=" + this.folderId;
        }
        return url;
    };
    return ManageDashboardsCtrl;
}());
export { ManageDashboardsCtrl };
export function manageDashboardsDirective() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/core/components/manage_dashboards/manage_dashboards.html',
        controller: ManageDashboardsCtrl,
        bindToController: true,
        controllerAs: 'ctrl',
        scope: {
            folderId: '=',
            folderUid: '=',
        },
    };
}
coreModule.directive('manageDashboards', manageDashboardsDirective);
//# sourceMappingURL=manage_dashboards.js.map