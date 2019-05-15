import React from 'react';
import renderer from 'react-test-renderer';
import Popover from './Popover';
describe('Popover', function () {
    it('renders correctly', function () {
        var tree = renderer
            .create(React.createElement(Popover, { className: "test-class", placement: "auto", content: "Popover text" },
            React.createElement("button", null, "Button with Popover")))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=Popover.test.js.map