import React from 'react';
import renderer from 'react-test-renderer';

import ChecklistCreated from '../../../../src/pages/Home/ChecklistCreated';

describe('pages/Home: ChecklistCreated', () => {
  const tree = renderer.create(<ChecklistCreated />).toJSON();

  it('matches snapshot', () => {
     expect(tree).toMatchSnapshot();
  });
});
