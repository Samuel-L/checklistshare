import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Home from '../../../src/pages/Home';

describe('pages: Home', () => {
  describe('rendering', () => {
    const tree = renderer.create(<Home />).toJSON();

    it('matches snapshot', () => {
      expect(tree).toMatchSnapshot(); 
    });
  });

  describe('functionality', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Home />);
    });

    it('handles changing the checklist title', () => {
      wrapper.find('[id="title"]').at(3).simulate('change',
        { target: { name: 'title', value: 'Checklist title' } }
      );

      expect(wrapper.state('title')).toBe('Checklist title');
    });

    it('handles changing item text', () => {
      expect(wrapper.state('items')[0].name).toBe('');
      wrapper.find('[id="item-0"]').at(3).simulate('change',
        { target: { name: 'item-0', value: 'Item text' } }
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
  });
});
