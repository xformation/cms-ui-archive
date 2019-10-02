import React, { SFC } from 'react';
import DropDownChild from './DropDownChild';

interface Props {
  link: any;
  user: any;
  ayid: any;
  bid: any;
  dptid: any;
}

const SideMenuDropDown: SFC<Props> = props => {
  const { link, user, ayid, bid, dptid } = props;
  return (
    <ul className="dropdown-menu dropdown-menu--sidemenu" role="menu">
      <li className="side-menu-header">
        <span className="sidemenu-item-text">{link.text}</span>
      </li>
      {link.children &&
        link.children.map((child, index) => {
          if (!child.hideFromMenu) {
            return (
              <DropDownChild
                user={user}
                ayid={ayid}
                bid={bid}
                dptid={dptid}
                child={child}
                key={`${child.url}-${index}`}
              />
            );
          } else {
            return null;
          }
        })}
    </ul>
  );
};

export default SideMenuDropDown;
