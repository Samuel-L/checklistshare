import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../../../src/pages/Home';

describe('pages: Home', () => {
  const tree = renderer.create(<Home />).toJSON();

  it('should render', () => {
    expect(tree).toMatchSnapshot(); 
  });
});
