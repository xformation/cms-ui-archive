import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import PageHeader from 'app/core/components/PageHeader/PageHeader';
import Tooltip from 'app/core/components/Tooltip/Tooltip';
import SlideDown from 'app/core/components/Animations/SlideDown';
import { getNavModel } from 'app/core/selectors/navModel';
import { getFolderByUid, getFolderPermissions, updateFolderPermission, removeFolderPermission, addFolderPermission, } from './state/actions';
import { getLoadingNav } from './state/navModel';
import PermissionList from 'app/core/components/PermissionList/PermissionList';
import AddPermission from 'app/core/components/PermissionList/AddPermission';
import PermissionsInfo from 'app/core/components/PermissionList/PermissionsInfo';
var FolderPermissions = /** @class */ (function (_super) {
    tslib_1.__extends(FolderPermissions, _super);
    function FolderPermissions(props) {
        var _this = _super.call(this, props) || this;
        _this.onOpenAddPermissions = function () {
            _this.setState({ isAdding: true });
        };
        _this.onRemoveItem = function (item) {
            _this.props.removeFolderPermission(item);
        };
        _this.onPermissionChanged = function (item, level) {
            _this.props.updateFolderPermission(item, level);
        };
        _this.onAddPermission = function (newItem) {
            return _this.props.addFolderPermission(newItem);
        };
        _this.onCancelAddPermission = function () {
            _this.setState({ isAdding: false });
        };
        _this.state = {
            isAdding: false,
        };
        return _this;
    }
    FolderPermissions.prototype.componentDidMount = function () {
        this.props.getFolderByUid(this.props.folderUid);
        this.props.getFolderPermissions(this.props.folderUid);
    };
    FolderPermissions.prototype.render = function () {
        var _a = this.props, navModel = _a.navModel, folder = _a.folder;
        var isAdding = this.state.isAdding;
        if (folder.id === 0) {
            return React.createElement(PageHeader, { model: navModel });
        }
        var folderInfo = { title: folder.title, url: folder.url, id: folder.id };
        return (React.createElement("div", null,
            React.createElement(PageHeader, { model: navModel }),
            React.createElement("div", { className: "page-container page-body" },
                React.createElement("div", { className: "page-action-bar" },
                    React.createElement("h3", { className: "page-sub-heading" }, "Folder Permissions"),
                    React.createElement(Tooltip, { className: "page-sub-heading-icon", placement: "auto", content: PermissionsInfo },
                        React.createElement("i", { className: "gicon gicon-question gicon--has-hover" })),
                    React.createElement("div", { className: "page-action-bar__spacer" }),
                    React.createElement("button", { className: "btn btn-success pull-right", onClick: this.onOpenAddPermissions, disabled: isAdding },
                        React.createElement("i", { className: "fa fa-plus" }),
                        " Add Permission")),
                React.createElement(SlideDown, { in: isAdding },
                    React.createElement(AddPermission, { onAddPermission: this.onAddPermission, onCancel: this.onCancelAddPermission })),
                React.createElement(PermissionList, { items: folder.permissions, onRemoveItem: this.onRemoveItem, onPermissionChanged: this.onPermissionChanged, isFetching: false, folderInfo: folderInfo }))));
    };
    return FolderPermissions;
}(PureComponent));
export { FolderPermissions };
var mapStateToProps = function (state) {
    var uid = state.location.routeParams.uid;
    return {
        navModel: getNavModel(state.navIndex, "folder-permissions-" + uid, getLoadingNav(1)),
        folderUid: uid,
        folder: state.folder,
    };
};
var mapDispatchToProps = {
    getFolderByUid: getFolderByUid,
    getFolderPermissions: getFolderPermissions,
    updateFolderPermission: updateFolderPermission,
    removeFolderPermission: removeFolderPermission,
    addFolderPermission: addFolderPermission,
};
export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(FolderPermissions));
//# sourceMappingURL=FolderPermissions.js.map