import React, { SFC } from 'react';

export interface Props {
  child: any;
  user: any;
  ayid: any;
  bid: any;
  dptid: any;
}

const DropDownChild: SFC<Props> = props => {
  const { child, user, ayid, bid, dptid } = props;
  const listItemClassName = child.divider ? 'divider' : '';

  return (
    <li className={listItemClassName}>
      <a href={child.url + '?signedInUser=' + user.login + '&ayid=' + ayid + '&bid=' + bid + '&dptid=' + dptid}>
        {child.icon && <i className={child.icon} />}
        {child.text}
      </a>
    </li>
  );
};

export default DropDownChild;
