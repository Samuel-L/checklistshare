import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Home from '../../../src/pages/Home';

describe('pages: Home', () => {
  describe('rendering', () => {
    const tree = renderer.create(<Home />).toJSON();

    it('should render', () => {
      expect(tree).toMatchSnapshot(); 
    });
  });

  describe('functionality', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Home />);
    });

    it('should handle adding new items', () => {
      expect(wrapper.state('items').length).toEqual(1); 
      wrapper.find('#add-item-button').at(0).simulate('click');
      expect(wrapper.state('items').length).toEqual(2);
    });
  });
});
