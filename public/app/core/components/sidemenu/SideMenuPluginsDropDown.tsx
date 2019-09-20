import React from 'react';
import PluginItem from './PluginItem';

class SideMenuPluginsDropDown extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchItem: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any) {
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
                    <input type="text" placeholder="Search Plugin" className="gf-form-input search-box" name="searchItem"
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
