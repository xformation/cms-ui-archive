import React from 'react';
import renderer from 'react-test-renderer';
import CustomScrollbar from './CustomScrollbar';
describe('CustomScrollbar', function () {
    it('renders correctly', function () {
        var tree = renderer
            .create(React.createElement(CustomScrollbar, null,
            React.createElement("p", null, "Scrollable content")))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=CustomScrollbar.test.js.map