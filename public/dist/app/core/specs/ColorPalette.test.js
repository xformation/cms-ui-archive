import React from 'react';
import renderer from 'react-test-renderer';
import { ColorPalette } from '../components/colorpicker/ColorPalette';
describe('CollorPalette', function () {
    it('renders correctly', function () {
        var tree = renderer.create(React.createElement(ColorPalette, { color: "#EAB839", onColorSelect: jest.fn() })).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=ColorPalette.test.js.map