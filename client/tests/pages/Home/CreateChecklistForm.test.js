import React from 'react';
import renderer from 'react-test-renderer';

import CreateChecklistForm from '../../../src/pages/Home/CreateChecklistForm';

describe('pages/Home: CreateChecklistForm', () => {
  const classes = { textField: '', buttonGroup: '', buttonDiv: '', button: '' };
  const tree = renderer.create(
    <CreateChecklistForm
      classes={classes}
      handleSubmit={jest.fn()}
      handleTextFieldChange={jest.fn()}
      title="Checklist title"
    />
  ).toJSON();
  
  it('should render', () => {
    expect(tree).toMatchSnapshot(); 
  });
});
