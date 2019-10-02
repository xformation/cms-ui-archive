import React, { SFC } from 'react';
import SideMenuDropDown from './SideMenuDropDown';

export interface Props {
  link: any;
  user: any;
  ayid: any;
  bid: any;
  dptid: any;
}

const TopSectionItem: SFC<Props> = props => {
  const { link, user, ayid, bid, dptid } = props;
  return (
    <div className="sidemenu-item dropdown">
      <a
        className="sidemenu-link"
        href={link.url + '?signedInUser=' + user.login + '&ayid=' + ayid + '&bid=' + bid + '&dptid=' + dptid}
        target={link.target}
      >
        <span className="icon-circle sidemenu-icon">
          <i className={link.icon} />
          {link.img && <img src={link.img} />}
        </span>
      </a>
      <SideMenuDropDown user={user} ayid={ayid} bid={bid} dptid={dptid} link={link} />
    </div>
  );
};

export default TopSectionItem;
