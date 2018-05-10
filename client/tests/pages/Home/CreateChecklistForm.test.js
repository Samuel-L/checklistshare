import React from 'react';
import renderer from 'react-test-renderer';

import CreateChecklistForm from '../../../src/pages/Home/CreateChecklistForm';

describe('pages/Home: CreateChecklistForm', () => {
  const classes = { textField: '', buttonGroup: '', buttonDiv: '', button: '' };
  const items = [{ id: 0, item: '' }];
  const tree = renderer.create(
    <CreateChecklistForm
      classes={classes}
      handleSubmit={jest.fn()}
      handleTextFieldChange={jest.fn()}
      handleAddItem={jest.fn()}
      handleDeleteItem={jest.fn()}
      title="Checklist title"
      items={items}
    />
  ).toJSON();
  
  it('should render', () => {
    expect(tree).toMatchSnapshot(); 
  });
});
