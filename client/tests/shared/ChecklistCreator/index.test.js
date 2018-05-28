import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { ChecklistCreator } from '../../../src/shared/ChecklistCreator';

describe('pages/Home: ChecklistCreator', () => {
  describe('rendering', () => {
    const tree = renderer.create(<ChecklistCreator addChecklist={jest.fn()} />).toJSON();

    it('matches snapshot', () => {
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<ChecklistCreator addChecklist={jest.fn()} />);
    });

    it('handles changing the checklist title', () => {
      wrapper.find('[id="title"]').at(3).simulate('change',
        { target: { name: 'title', value: 'Checklist title' } }
      );

      expect(wrapper.state('title')).toBe('Checklist title');
    });

    it('handles changing item text', () => {
      expect(wrapper.state('items')[0].name).toBe('');
      wrapper.find('[id="item-1"]').at(3).simulate('change',
        { target: { name: 'item-1', value: 'Item text' } }
      );
      expect(wrapper.state('items')[0].name).toBe('Item text');
    });

    it('handles adding new items', () => {
      expect(wrapper.state('items').length).toEqual(1);
      wrapper.find('#add-item-button').at(0).simulate('click');
      expect(wrapper.state('items').length).toEqual(2);
    });

    it('handles deleting items', () => {
      expect(wrapper.state('items').length).toEqual(1);
      wrapper.find('#delete-item-button').at(0).simulate('click');
      expect(wrapper.state('items').length).toEqual(0);
    });

    it('handles creating an entire checklist', () => {
      const finishedChecklistState = {
        id: 0,
        title: 'Checklist title',
        items: [
          { seq: 1, name: 'Item name 1', newlyAdded: true },
          { seq: 2, name: 'Item name 2', newlyAdded: true },
          { seq: 3, name: 'Item name 3', newlyAdded: true },
        ],
        submitConfirmationModalOpen: true,
        snackError: false,
      };

      wrapper.find('[id="title"]').at(3).simulate('change',
        { target: { name: 'title', value: 'Checklist title' } }
      );

      wrapper.find('#delete-item-button').at(0).simulate('click');

      wrapper.find('#add-item-button').at(0).simulate('click');
      wrapper.find('[id="item-1"]').at(3).simulate('change',
        { target: { name: 'item-1', value: 'Item name 1' } }
      );

      wrapper.find('#add-item-button').at(0).simulate('click');
      wrapper.find('[id="item-2"]').at(3).simulate('change',
        { target: { name: 'item-2', value: 'Item name 2' } }
      );

      wrapper.find('#add-item-button').at(0).simulate('click');
      wrapper.find('[id="item-3"]').at(3).simulate('change',
        { target: { name: 'item-3', value: 'Item name 3' } }
      );

      wrapper.find('#create-list-button').at(0).simulate('click');

      expect(wrapper.state()).toEqual(finishedChecklistState);
    });
  });
});
