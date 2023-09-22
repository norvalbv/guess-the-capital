import classNames from 'components/utils/classNames';
import React, { ReactElement } from 'react';

type ButtonProps = {
  text: string;
  className?: string;
  onclick: () => void;
  colour?: string;
};

const Button = ({
  className,
  colour = 'from-purple-500 to-pink-500 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:focus:ring-purple-800',
  text,
  onclick,
}: ButtonProps): ReactElement => {
  return (
    <button
      className={classNames(
        colour,
        className,
        'group mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring dark:text-white '
      )}
      type="button"
      onClick={onclick}
    >
      <span
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className="rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900"
      >
        {text}
      </span>
    </button>
  );
};

export default Button;
