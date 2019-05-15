import React from 'react';
import DeleteButton from './DeleteButton';
import { shallow } from 'enzyme';
describe('DeleteButton', function () {
    var wrapper;
    var deleted;
    beforeAll(function () {
        deleted = false;
        function deleteItem() {
            deleted = true;
        }
        wrapper = shallow(React.createElement(DeleteButton, { onConfirmDelete: function () { return deleteItem(); } }));
    });
    it('should show confirm delete when clicked', function () {
        expect(wrapper.state().showConfirm).toBe(false);
        wrapper.find('.delete-button').simulate('click');
        expect(wrapper.state().showConfirm).toBe(true);
    });
    it('should hide confirm delete when clicked', function () {
        wrapper.find('.delete-button').simulate('click');
        expect(wrapper.state().showConfirm).toBe(true);
        wrapper
            .find('.confirm-delete')
            .find('.btn')
            .at(0)
            .simulate('click');
        expect(wrapper.state().showConfirm).toBe(false);
    });
    it('should show confirm delete when clicked', function () {
        expect(deleted).toBe(false);
        wrapper
            .find('.confirm-delete')
            .find('.btn')
            .at(1)
            .simulate('click');
        expect(deleted).toBe(true);
    });
});
//# sourceMappingURL=DeleteButton.test.js.map