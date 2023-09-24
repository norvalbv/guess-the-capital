import React, { ReactElement } from 'react';
import classNames from 'utils/classNames';

export type ButtonProps = {
  className?: string;
  colour?: string;
  disabled?: boolean;
  onclick: () => void;
  text: string;
};

const Button = ({
  className,
  colour = 'from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 focus:ring-purple-800',
  disabled = false,
  onclick,
  text,
}: ButtonProps): ReactElement => {
  return (
    <button
      className={classNames(
        colour,
        className,
        'group inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring '
      )}
      type="button"
      onClick={onclick}
      disabled={disabled}
    >
      <span className="rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-[0]">
        {text}
      </span>
    </button>
  );
};

export default Button;
