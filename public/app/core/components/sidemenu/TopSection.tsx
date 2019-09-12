import React, { SFC } from 'react';
import _ from 'lodash';
import TopSectionItem from './TopSectionItem';
import TopMenuPlugins from './TopMenuPlugins';
import config from '../../config';

const TopSection: SFC<any> = () => {
  const navTree = _.cloneDeep(config.bootData.navTree);
  const mainLinks = _.filter(navTree, item => !item.hideFromMenu);

  return (
    <div className="sidemenu__top">
      {mainLinks.map((link, index) => {
        {
          return (link.id.indexOf("plugin-page") === -1 &&
            <TopSectionItem link={link} key={`${link.id}-${index}`} />);
        }
      })}
      <TopMenuPlugins links= {mainLinks} />
    </div>
  );
};

export default TopSection;
