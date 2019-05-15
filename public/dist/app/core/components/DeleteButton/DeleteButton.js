import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
var DeleteButton = /** @class */ (function (_super) {
    tslib_1.__extends(DeleteButton, _super);
    function DeleteButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showConfirm: false,
        };
        _this.onClickDelete = function (event) {
            if (event) {
                event.preventDefault();
            }
            _this.setState({
                showConfirm: true,
            });
        };
        _this.onClickCancel = function (event) {
            if (event) {
                event.preventDefault();
            }
            _this.setState({
                showConfirm: false,
            });
        };
        return _this;
    }
    DeleteButton.prototype.render = function () {
        var onClickConfirm = this.props.onConfirmDelete;
        var showConfirm;
        var showDeleteButton;
        if (this.state.showConfirm) {
            showConfirm = 'show';
            showDeleteButton = 'hide';
        }
        else {
            showConfirm = 'hide';
            showDeleteButton = 'show';
        }
        return (React.createElement("span", { className: "delete-button-container" },
            React.createElement("a", { className: 'delete-button ' + showDeleteButton + ' btn btn-danger btn-small', onClick: this.onClickDelete },
                React.createElement("i", { className: "fa fa-remove" })),
            React.createElement("span", { className: "confirm-delete-container" },
                React.createElement("span", { className: 'confirm-delete ' + showConfirm },
                    React.createElement("a", { className: "btn btn-small", onClick: this.onClickCancel }, "Cancel"),
                    React.createElement("a", { className: "btn btn-danger btn-small", onClick: onClickConfirm }, "Confirm Delete")))));
    };
    return DeleteButton;
}(PureComponent));
export default DeleteButton;
//# sourceMappingURL=DeleteButton.js.map