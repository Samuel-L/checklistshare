import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Checklist } from '../../../src/pages/Checklist';

describe('pages: Checklist', () => {
  const checklist = {
    id: 0,
    title: '',
    url: '',
    items: [
      { id: 0, List: 0, name: '' },
    ],
  };

  describe('rendering', () => {
    const tree = renderer.create(<Checklist fetchChecklist={jest.fn()} checklist={checklist} />).toJSON();

    it('matches snapshot', () => {
      expect(tree).toMatchSnapshot(); 
    });
  });

  describe('functionality', () => {
    let wrapper;
    const mockedFetchChecklist = jest.fn();

    beforeEach(() => {
      wrapper = mount(<Checklist fetchChecklist={mockedFetchChecklist} checklist={checklist} />);
    });

    it('calls fetchChecklist once', () => {
      expect(mockedFetchChecklist.mock.calls.length).toBe(1); 
    });
  });
});
