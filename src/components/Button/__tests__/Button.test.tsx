import React, { FC } from 'react';
import renderer from 'react-test-renderer';

import Button, { ButtonProps } from '..';

const ButtonWithAllProps: FC<Required<ButtonProps>> = Button;

describe('<Button />', () => {
  test('Should render with mandatory props.', () => {
    const tree = renderer.create(<Button text="Test text" onclick={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render with all props.', () => {
    const tree = renderer
      .create(
        <ButtonWithAllProps
          text="Test text"
          className="text-xs"
          onclick={jest.fn()}
          colour="bg-red-500"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
