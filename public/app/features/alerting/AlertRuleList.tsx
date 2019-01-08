import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import PageHeader from 'app/core/components/PageHeader/PageHeader';
import AlertRuleItem from './AlertRuleItem';
import appEvents from 'app/core/app_events';
import { updateLocation } from 'app/core/actions';
import { getNavModel } from 'app/core/selectors/navModel';
import { NavModel, StoreState, AlertRule } from 'app/types';
import { getAlertRulesAsync, setSearchQuery, togglePauseAlertRule } from './state/actions';
import { getAlertRuleItems, getSearchQuery } from './state/selectors';

export interface Props {
  navModel: NavModel;
  alertRules: AlertRule[];
  updateLocation: typeof updateLocation;
  getAlertRulesAsync: typeof getAlertRulesAsync;
  setSearchQuery: typeof setSearchQuery;
  togglePauseAlertRule: typeof togglePauseAlertRule;
  stateFilter: string;
  search: string;
}

export class AlertRuleList extends PureComponent<Props, any> {
  stateFilters = [
    { text: 'All', value: 'all' },
    { text: 'OK', value: 'ok' },
    { text: 'Not OK', value: 'not_ok' },
    { text: 'Alerting', value: 'alerting' },
    { text: 'No Data', value: 'no_data' },
    { text: 'Paused', value: 'paused' },
    { text: 'Pending', value: 'pending' },
    { text: 'colspan', value: 'colspan' },
  ];

  componentDidMount() {
    this.fetchRules();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.stateFilter !== this.props.stateFilter) {
      this.fetchRules();
    }
  }

  async fetchRules() {
    await this.props.getAlertRulesAsync({ state: this.getStateFilter() });
  }

  getStateFilter(): string {
    const { stateFilter } = this.props;
    if (stateFilter) {
      return stateFilter.toString();
    }
    return 'all';
  }

  onStateFilterChanged = event => {
    this.props.updateLocation({
      query: { state: event.target.value },
    });
  };

  onOpenHowTo = () => {
    appEvents.emit('show-modal', {
      src: 'public/app/features/alerting/partials/alert_howto.html',
      modalClass: 'confirm-modal',
      model: {},
    });
  };

  onSearchQueryChange = event => {
    const { value } = event.target;
    this.props.setSearchQuery(value);
  };

  onTogglePause = (rule: AlertRule) => {
    this.props.togglePauseAlertRule(rule.id, { paused: rule.state !== 'paused' });
  };

  alertStateFilterOption = ({ text, value }) => {
    return (
      <option key={value} value={value}>
        {text}
      </option>
    );
  };

  render() {
    const { navModel, alertRules, search } = this.props;

    return (
      <div>
        <PageHeader model={navModel} />
        <div className="page-container page-body">
          <div className="page-action-bar">
            <div className="gf-form gf-form--grow">
              <label className="gf-form--has-input-icon gf-form--grow">
                <input
                  type="text"
                  className="gf-form-input"
                  placeholder="Search alerts"
                  value={search}
                  onChange={this.onSearchQueryChange}
                />
                <i className="gf-form-input-icon fa fa-search" />
              </label>
            </div>
            <div className="gf-form">
              <label className="gf-form-label">States</label>

              <div className="gf-form-select-wrapper width-13">
                <select className="gf-form-input" onChange={this.onStateFilterChanged} value={this.getStateFilter()}>
                  {this.stateFilters.map(this.alertStateFilterOption)}
                </select>
              </div>
            </div>
            <div className="page-action-bar__spacer" />
            <a className="btn btn-secondary" onClick={this.onOpenHowTo}>
              <i className="fa fa-info-circle" /> How to add an alert
            </a>
          </div>
          <div className="bg-heading dflex">
            <h4>Academic Year 2018-2019</h4>
            <div>
              <a className="btn btn-primary wauto">Add New Role</a>
              <a className="btn btn-primary wauto m-x-2">Set Preferences</a>
              <a className="btn btn-primary wauto">Save</a>
            </div>
          </div>
          <table className="width-full">
            <thead>
              <th>New Role Name</th>
              <th>Set Preferences</th>
            </thead>
            <tbody>
              <tr>
                <td>Manual entry of new role</td>
                <td>
                  <a href="" className="btn btn-primary">
                    Set Preference for the Role
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="bg-heading dflex my">
            <h4>Academic Year 2018-2019</h4>
            <div>
              <a className="btn btn-primary wauto m-x-2">Add New Role</a>
              <a className="btn btn-primary wauto">Save</a>
            </div>
          </div>
          <table className="fwidth">
            <thead>
              <tr>
                <th>Preferences</th>
                <th>Roles</th>
                <th colSpan={2}>Admin</th>
                <th colSpan={2}>Teacher</th>
                <th colSpan={2}>House Keeping</th>
                <th colSpan={2}>Driver</th>
                <th colSpan={2}>HR Admin</th>
                <th colSpan={2}>Accounts Head</th>
              </tr>
              <tr>
                <th />
                <th>Read</th>
                <th>write</th>
                <th>Read</th>
                <th>write</th>
                <th>Read</th>
                <th>write</th>
                <th>Read</th>
                <th>write</th>
                <th>Read</th>
                <th>write</th>
                <th>Read</th>
                <th>write</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Attendance</td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
              <tr>
                <td>Exam</td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
              <tr>
                <td>Transport</td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
              <tr>
                <td>Fee</td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
              <tr>
                <td>Student Profile</td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
              <tr>
                <td>Inventory</td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
              <tr>
                <td>Transportation</td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
              <tr>
                <td>HR - Payroll</td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
              <tr>
                <td>Accounts</td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
            </tbody>
          </table>

          <section>
            <ol className="alert-rule-list">
              {alertRules.map(rule => (
                <AlertRuleItem
                  rule={rule}
                  key={rule.id}
                  search={search}
                  onTogglePause={() => this.onTogglePause(rule)}
                />
              ))}
            </ol>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'alert-list'),
  alertRules: getAlertRuleItems(state.alertRules),
  stateFilter: state.location.query.state,
  search: getSearchQuery(state.alertRules),
});

const mapDispatchToProps = {
  updateLocation,
  getAlertRulesAsync,
  setSearchQuery,
  togglePauseAlertRule,
};

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(AlertRuleList));
