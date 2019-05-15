import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SlideDown from 'app/core/components/Animations/SlideDown';
import { UserPicker } from 'app/core/components/Select/UserPicker';
import DeleteButton from 'app/core/components/DeleteButton/DeleteButton';
import { TagBadge } from 'app/core/components/TagFilter/TagBadge';
import { loadTeamMembers, addTeamMember, removeTeamMember, setSearchMemberQuery } from './state/actions';
import { getSearchMemberQuery, getTeamMembers } from './state/selectors';
var TeamMembers = /** @class */ (function (_super) {
    tslib_1.__extends(TeamMembers, _super);
    function TeamMembers(props) {
        var _this = _super.call(this, props) || this;
        _this.onSearchQueryChange = function (event) {
            _this.props.setSearchMemberQuery(event.target.value);
        };
        _this.onToggleAdding = function () {
            _this.setState({ isAdding: !_this.state.isAdding });
        };
        _this.onUserSelected = function (user) {
            _this.setState({ newTeamMember: user });
        };
        _this.onAddUserToTeam = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.props.addTeamMember(this.state.newTeamMember.id);
                this.setState({ newTeamMember: null });
                return [2 /*return*/];
            });
        }); };
        _this.state = { isAdding: false, newTeamMember: null };
        return _this;
    }
    TeamMembers.prototype.componentDidMount = function () {
        this.props.loadTeamMembers();
    };
    TeamMembers.prototype.onRemoveMember = function (member) {
        this.props.removeTeamMember(member.userId);
    };
    TeamMembers.prototype.renderLabels = function (labels) {
        if (!labels) {
            return React.createElement("td", null);
        }
        return (React.createElement("td", null, labels.map(function (label) { return React.createElement(TagBadge, { key: label, label: label, removeIcon: false, count: 0, onClick: function () { } }); })));
    };
    TeamMembers.prototype.renderMember = function (member, syncEnabled) {
        var _this = this;
        return (React.createElement("tr", { key: member.userId },
            React.createElement("td", { className: "width-4 text-center" },
                React.createElement("img", { className: "filter-table__avatar", src: member.avatarUrl })),
            React.createElement("td", null, member.login),
            React.createElement("td", null, member.email),
            syncEnabled && this.renderLabels(member.labels),
            React.createElement("td", { className: "text-right" },
                React.createElement(DeleteButton, { onConfirmDelete: function () { return _this.onRemoveMember(member); } }))));
    };
    TeamMembers.prototype.render = function () {
        var _this = this;
        var isAdding = this.state.isAdding;
        var _a = this.props, searchMemberQuery = _a.searchMemberQuery, members = _a.members, syncEnabled = _a.syncEnabled;
        return (React.createElement("div", null,
            React.createElement("div", { className: "page-action-bar" },
                React.createElement("div", { className: "gf-form gf-form--grow" },
                    React.createElement("label", { className: "gf-form--has-input-icon gf-form--grow" },
                        React.createElement("input", { type: "text", className: "gf-form-input", placeholder: "Search members", value: searchMemberQuery, onChange: this.onSearchQueryChange }),
                        React.createElement("i", { className: "gf-form-input-icon fa fa-search" }))),
                React.createElement("div", { className: "page-action-bar__spacer" }),
                React.createElement("button", { className: "btn btn-success pull-right", onClick: this.onToggleAdding, disabled: isAdding },
                    React.createElement("i", { className: "fa fa-plus" }),
                    " Add a member")),
            React.createElement(SlideDown, { in: isAdding },
                React.createElement("div", { className: "cta-form" },
                    React.createElement("button", { className: "cta-form__close btn btn-transparent", onClick: this.onToggleAdding },
                        React.createElement("i", { className: "fa fa-close" })),
                    React.createElement("h5", null, "Add Team Member"),
                    React.createElement("div", { className: "gf-form-inline" },
                        React.createElement(UserPicker, { onSelected: this.onUserSelected, className: "min-width-30" }),
                        this.state.newTeamMember && (React.createElement("button", { className: "btn btn-success gf-form-btn", type: "submit", onClick: this.onAddUserToTeam }, "Add to team"))))),
            React.createElement("div", { className: "admin-list-table" },
                React.createElement("table", { className: "filter-table filter-table--hover form-inline" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null),
                            React.createElement("th", null, "Name"),
                            React.createElement("th", null, "Email"),
                            syncEnabled && React.createElement("th", null),
                            React.createElement("th", { style: { width: '1%' } }))),
                    React.createElement("tbody", null, members && members.map(function (member) { return _this.renderMember(member, syncEnabled); }))))));
    };
    return TeamMembers;
}(PureComponent));
export { TeamMembers };
function mapStateToProps(state) {
    return {
        members: getTeamMembers(state.team),
        searchMemberQuery: getSearchMemberQuery(state.team),
    };
}
var mapDispatchToProps = {
    loadTeamMembers: loadTeamMembers,
    addTeamMember: addTeamMember,
    removeTeamMember: removeTeamMember,
    setSearchMemberQuery: setSearchMemberQuery,
};
export default connect(mapStateToProps, mapDispatchToProps)(TeamMembers);
//# sourceMappingURL=TeamMembers.js.map