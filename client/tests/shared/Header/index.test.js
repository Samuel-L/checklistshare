import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../../../src/shared/Header';

describe('shared: Header', () => {
  const tree = renderer.create(<Header />).toJSON();

  it('should render', () => {
    expect(tree).toMatchSnapshot(); 
  });
});
