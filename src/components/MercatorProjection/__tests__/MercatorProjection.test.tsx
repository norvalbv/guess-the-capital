import React from 'react';
import renderer from 'react-test-renderer';

import MercatorProjection from '..';

describe('<MercatorProjection />', () => {
  test('Should render with mandatory props.', () => {
    const tree = renderer
      .create(<MercatorProjection data={[{ code: 'GBR', value: 10 }]} width={10} height={10} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
