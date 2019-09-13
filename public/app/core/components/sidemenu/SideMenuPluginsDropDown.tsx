import React, { SFC } from 'react';
import PluginItem from './PluginItem';

interface Props {
    links: any;
}

class SideMenuPluginsDropDown extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            searchItem: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { links } = this.props;
        const { searchItem } = this.state;
        return (
            <div className="dropdown-menu dropdown-menu--sidemenu sidemenu-plugin-container" role="menu">
                <div className="search-box-container">
                    <input type="text" className="gf-form-input search-box" placeHolder="Search Plugins" name="searchItem"
                     value={searchItem} onChange={this.handleChange} />
                </div>
                <div className="plugins-wrapper">
                    {links.map((link, index) => {
                        {
                            return (link.id.indexOf("plugin-page") !== -1 && link.text.indexOf(searchItem) !== -1 &&
                                <PluginItem link={link} key={`${link.id}-${index}`} />);
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default SideMenuPluginsDropDown;
