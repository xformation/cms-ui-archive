import React, { SFC } from 'react';
import _ from 'lodash';
import TopSectionItem from './TopSectionItem';
// import TopMenuPlugins from './TopMenuPlugins';
import config from '../../config';
import { contextSrv } from 'app/core/services/context_srv';
import store from 'app/core/store';

const TopSection: SFC<any> = () => {
  const navTree = _.cloneDeep(config.bootData.navTree);
  const mainLinks = _.filter(navTree, item => !item.hideFromMenu);
  const user = contextSrv.user;
  const bid = store.get('bId');
  const ayid = store.get('ayId');
  const dptid = store.get('deptId');
  return (
    <div className="sidemenu__top">
      {mainLinks.map((link, index) => {
        {
          // return (link.id.indexOf("plugin-page") === -1 &&
          //   <TopSectionItem link={link} key={`${link.id}-${index}`} />);

          return (
            <TopSectionItem user={user} ayid={ayid} bid={bid} dptid={dptid} link={link} key={`${link.id}-${index}`} />
          );
        }
      })}
      {/* <TopMenuPlugins links= {mainLinks} /> */}
    </div>
  );
};

export default TopSection;
