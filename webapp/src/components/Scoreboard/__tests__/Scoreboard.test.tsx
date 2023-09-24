import React from 'react';
import renderer from 'react-test-renderer';

import Scoreboard from '..';

describe('<Scoreboard />', () => {
  test('Should render with mandatory props.', () => {
    const tree = renderer.create(<Scoreboard score={{ win: 1, lose: 1 }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
