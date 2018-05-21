import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Checklist } from '../../../src/pages/Checklist';

describe('pages: Checklist', () => {
  describe('rendering', () => {
    const tree = renderer.create(<Checklist fetchChecklist={jest.fn()} />).toJSON();

    it('matches snapshot', () => {
      expect(tree).toMatchSnapshot(); 
    });
  });

  describe('functionality', () => {
    let wrapper;
    const mockedFetchChecklist = jest.fn();

    beforeEach(() => {
      wrapper = mount(<Checklist fetchChecklist={mockedFetchChecklist} />);
    });

    it('calls fetchChecklist once', () => {
      expect(mockedFetchChecklist.mock.calls.length).toBe(1); 
    });
  });
});
