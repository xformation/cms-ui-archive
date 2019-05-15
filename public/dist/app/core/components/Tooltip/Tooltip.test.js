import React from 'react';
import renderer from 'react-test-renderer';
import Tooltip from './Tooltip';
describe('Tooltip', function () {
    it('renders correctly', function () {
        var tree = renderer
            .create(React.createElement(Tooltip, { className: "test-class", placement: "auto", content: "Tooltip text" },
            React.createElement("a", { href: "http://www.grafana.com" }, "Link with tooltip")))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=Tooltip.test.js.map