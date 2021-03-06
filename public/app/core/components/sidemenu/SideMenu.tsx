import React, { PureComponent } from 'react';
import appEvents from '../../app_events';
import { contextSrv } from 'app/core/services/context_srv';
import TopSection from './TopSection';
import BottomSection from './BottomSection';

export class SideMenu extends PureComponent {
  toggleSideMenu = () => {
    contextSrv.toggleSideMenu();
    appEvents.emit('toggle-sidemenu');
  };

  toggleSideMenuSmallBreakpoint = () => {
    appEvents.emit('toggle-sidemenu-mobile');
  };

  render() {
    return [
      // <div className="sidemenu__logo" onClick={this.toggleSideMenu} key="logo">
      <div className="sidemenu__logo" key="logo">
        {/* <i className="fa fa-university s-univ" aria-hidden="true" /> */}
        <img
          src="public/img/synectiks-white-logo.png"
          alt=""
          style={{ height: '50px', background: '#1486C7', padding: '5px' }}
        />
      </div>,
      <div className="sidemenu__logo_small_breakpoint" onClick={this.toggleSideMenuSmallBreakpoint} key="hamburger">
        <i className="fa fa-bars" />
        <span className="sidemenu__close">
          <i className="fa fa-times" />&nbsp;Close
        </span>
      </div>,
      <TopSection key="topsection" />,
      <BottomSection key="bottomsection" />,
    ];
  }
}
