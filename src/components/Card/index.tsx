import Button from 'components/Button';
import MercatorProjection from 'components/MercatorProjection';
import React, { ReactElement } from 'react';

const Card = (): ReactElement => {
  return (
    <div className="flex max-w-sm flex-col items-center justify-center gap-8 rounded-lg border border-gray-200 bg-white px-2 py-4 shadow dark:border-gray-700 dark:bg-gray-800">
      <MercatorProjection />
      <div className="flex flex-wrap items-center justify-center">
        <Button />
        <Button />
        <Button />
      </div>
    </div>
  );
};

export default Card;
