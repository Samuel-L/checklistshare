import React from 'react';
import renderer from 'react-test-renderer';
import { HashRouter } from 'react-router-dom';

import Footer from '../../../src/shared/Footer';

describe('shared: Footer', () => {
  const classes = { base: '', link: '' };
  const tree = renderer.create(<HashRouter><Footer classes={classes} /></HashRouter>).toJSON();

  it('matches snapshot', () => {
    expect(tree).toMatchSnapshot(); 
  });
});
