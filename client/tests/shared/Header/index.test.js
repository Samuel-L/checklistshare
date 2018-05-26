import React from 'react';
import renderer from 'react-test-renderer';
import { HashRouter } from 'react-router-dom';

import Header from '../../../src/shared/Header';

describe('shared: Header', () => {
  const classes = { root: '', flex: '' };
  const tree = renderer.create(<HashRouter><Header classes={classes} /></HashRouter>).toJSON();

  it('should render', () => {
    expect(tree).toMatchSnapshot(); 
  });
});
