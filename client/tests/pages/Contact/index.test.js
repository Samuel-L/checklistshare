import React from 'react';
import renderer from 'react-test-renderer';

import Contact from '../../../src/pages/Contact';

describe('pages: Contact', () => {
  const classes = { title: '', text: '', link: '' };
  const tree = renderer.create(<Contact classes={classes} />).toJSON();

  it('matches snapshot', () => {
    expect(tree).toMatchSnapshot(); 
  });
});
