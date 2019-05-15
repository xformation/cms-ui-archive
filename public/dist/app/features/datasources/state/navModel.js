import config from 'app/core/config';
export function buildNavModel(dataSource, pluginMeta) {
    var navModel = {
        img: pluginMeta.info.logos.large,
        id: 'datasource-' + dataSource.id,
        subTitle: "Type: " + pluginMeta.name,
        url: '',
        text: dataSource.name,
        breadcrumbs: [{ title: 'Data Sources', url: 'datasources' }],
        children: [
            {
                active: false,
                icon: 'fa fa-fw fa-sliders',
                id: "datasource-settings-" + dataSource.id,
                text: 'Settings',
                url: "datasources/edit/" + dataSource.id,
            },
        ],
    };
    if (pluginMeta.includes && hasDashboards(pluginMeta.includes)) {
        navModel.children.push({
            active: false,
            icon: 'fa fa-fw fa-th-large',
            id: "datasource-dashboards-" + dataSource.id,
            text: 'Dashboards',
            url: "datasources/edit/" + dataSource.id + "/dashboards",
        });
    }
    if (config.buildInfo.isEnterprise) {
        navModel.children.push({
            active: false,
            icon: 'fa fa-fw fa-lock',
            id: "datasource-permissions-" + dataSource.id,
            text: 'Permissions',
            url: "datasources/edit/" + dataSource.id + "/permissions",
        });
    }
    return navModel;
}
export function getDataSourceLoadingNav(pageName) {
    var main = buildNavModel({
        access: '',
        basicAuth: false,
        basicAuthUser: '',
        basicAuthPassword: '',
        withCredentials: false,
        database: '',
        id: 1,
        isDefault: false,
        jsonData: { authType: 'credentials', defaultRegion: 'eu-west-2' },
        name: 'Loading',
        orgId: 1,
        password: '',
        readOnly: false,
        type: 'Loading',
        typeLogoUrl: 'public/img/icn-datasource.svg',
        url: '',
        user: '',
    }, {
        id: '1',
        name: '',
        info: {
            author: {
                name: '',
                url: '',
            },
            description: '',
            links: [''],
            logos: {
                large: '',
                small: '',
            },
            screenshots: [],
            updated: '',
            version: '',
        },
        includes: [{ type: '', name: '', path: '' }],
    });
    var node;
    // find active page
    for (var _i = 0, _a = main.children; _i < _a.length; _i++) {
        var child = _a[_i];
        if (child.id.indexOf(pageName) > 0) {
            child.active = true;
            node = child;
            break;
        }
    }
    return {
        main: main,
        node: node,
    };
}
function hasDashboards(includes) {
    return (includes.filter(function (include) {
        return include.type === 'dashboard';
    }).length > 0);
}
//# sourceMappingURL=navModel.js.map