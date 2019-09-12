import React, { SFC } from 'react';
import PluginItem from './PluginItem';

interface Props {
    links: any;
}

const SideMenuPluginsDropDown: SFC<Props> = props => {
    const { links } = props;
    return (
        <div className="dropdown-menu dropdown-menu--sidemenu sidemenu-plugin-container" role="menu">
            <div className="search-box-container">
                <input type="text" className="gf-form-input search-box" placeHolder="Search Plugins" />
            </div>
            <div className="plugins-wrapper">
                {links.map((link, index) => {
                    {
                        return (link.id.indexOf("plugin-page") !== -1 &&
                            <PluginItem link={link} key={`${link.id}-${index}`} />);
                    }
                })}
            </div>
        </div>
    );
};

export default SideMenuPluginsDropDown;
