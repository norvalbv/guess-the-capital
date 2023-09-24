import React from 'react';
import renderer from 'react-test-renderer';

import GameSettings from '..';

describe('<GameSettings />', () => {
  test('Should render with mandatory props.', () => {
    const tree = renderer.create(<GameSettings settings={{ scoreLimit: 10 }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
