import React from 'react';
import renderer from 'react-test-renderer';

import ChecklistItem from '../../../src/shared/ChecklistCreator/ChecklistItem';

describe('pages/Home/ChecklistCreator: ChecklistItem', () => {
  const item = { id: 0, name: 'Item' };
  const classes = { root: '', textField: '', icon: '' };
  const tree = renderer.create(
    <ChecklistItem
      idx={0}
      item={item}
      handleItemTextChange={jest.fn()}
      handleItemDelete={jest.fn()}
      classes={classes}
    />
).toJSON();

  it('should render', () => {
    expect(tree).toMatchSnapshot();
  });
});
