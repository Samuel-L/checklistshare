import React from 'react';
import renderer from 'react-test-renderer';

import List from '../../../src/pages/Checklist/List';

describe('pages/Checklist: List', () => {
  const classes = { listGridRoot: '', checkbox: '' };
  const checklist = {
    id: 0,
    title: '',
    url: '',
    items: [
      { id: 0, List: 0, name: '' },
    ],
  };
  const toggleList = jest.fn();
  const checked = [0];

  const tree = renderer.create(
    <List
      classes={classes}
      checklist={checklist}
      toggleList={toggleList}
      checked={checked}
      toggleEditMode={jest.fn()}
    />
  ).toJSON();

  it('matches snapshot', () => {
    expect(tree).toMatchSnapshot(); 
  });
});
