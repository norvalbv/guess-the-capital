import React, { ReactElement } from 'react';

const Button = (): ReactElement => {
  return (
    <button
      className="group mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white dark:focus:ring-purple-800"
      type="button"
    >
      <span
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className="rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900"
      >
        Purple to pink
      </span>
    </button>
  );
};

export default Button;
