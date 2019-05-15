import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { updateLocation } from 'app/core/actions';
import { serializeStateToUrlParam, parseUrlState } from 'app/core/utils/explore';
import ErrorBoundary from './ErrorBoundary';
import Explore from './Explore';
var STATE_KEY_LEFT = 'state';
var STATE_KEY_RIGHT = 'stateRight';
var Wrapper = /** @class */ (function (_super) {
    tslib_1.__extends(Wrapper, _super);
    function Wrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeSplit = function (split, splitState) {
            _this.setState({ split: split, splitState: splitState });
            // When closing split, remove URL state for split part
            if (!split) {
                delete _this.urlStates[STATE_KEY_RIGHT];
                _this.props.updateLocation({
                    query: _this.urlStates,
                });
            }
        };
        _this.onSaveState = function (key, state) {
            var urlState = serializeStateToUrlParam(state, true);
            _this.urlStates[key] = urlState;
            _this.props.updateLocation({
                query: _this.urlStates,
            });
        };
        _this.urlStates = props.urlStates;
        _this.state = {
            split: Boolean(props.urlStates[STATE_KEY_RIGHT]),
            splitState: undefined,
        };
        return _this;
    }
    Wrapper.prototype.render = function () {
        var datasourceSrv = this.props.datasourceSrv;
        // State overrides for props from first Explore
        var _a = this.state, split = _a.split, splitState = _a.splitState;
        var urlStateLeft = parseUrlState(this.urlStates[STATE_KEY_LEFT]);
        var urlStateRight = parseUrlState(this.urlStates[STATE_KEY_RIGHT]);
        return (React.createElement("div", { className: "explore-wrapper" },
            React.createElement(ErrorBoundary, null,
                React.createElement(Explore, { datasourceSrv: datasourceSrv, onChangeSplit: this.onChangeSplit, onSaveState: this.onSaveState, position: "left", split: split, stateKey: STATE_KEY_LEFT, urlState: urlStateLeft })),
            split && (React.createElement(ErrorBoundary, null,
                React.createElement(Explore, { datasourceSrv: datasourceSrv, onChangeSplit: this.onChangeSplit, onSaveState: this.onSaveState, position: "right", split: split, splitState: splitState, stateKey: STATE_KEY_RIGHT, urlState: urlStateRight })))));
    };
    return Wrapper;
}(Component));
export { Wrapper };
var mapStateToProps = function (state) { return ({
    urlStates: state.location.query,
}); };
var mapDispatchToProps = {
    updateLocation: updateLocation,
};
export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(Wrapper));
//# sourceMappingURL=Wrapper.js.map