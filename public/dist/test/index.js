// const context = require.context('./', true, /_specs\.ts/);
// context.keys().forEach(context);
// module.exports = context;
import '@babel/polyfill';
import 'jquery';
import angular from 'angular';
import 'angular-mocks';
import 'app/app';
// configure enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
angular.module('grafana', ['ngRoute']);
angular.module('grafana.services', ['ngRoute', '$strap.directives']);
angular.module('grafana.panels', []);
angular.module('grafana.controllers', []);
angular.module('grafana.directives', []);
angular.module('grafana.filters', []);
angular.module('grafana.routes', ['ngRoute']);
var context = require.context('../', true, /specs\.(tsx?|js)/);
for (var _i = 0, _a = context.keys(); _i < _a.length; _i++) {
    var key = _a[_i];
    context(key);
}
//# sourceMappingURL=index.js.map