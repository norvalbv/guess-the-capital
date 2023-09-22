import LoadingIcon from 'components/SVG/LoadingIcon';
import React, { ReactElement } from 'react';

const Loader = (): ReactElement => {
  return (
    <div className="grid h-full w-full place-content-center">
      <LoadingIcon />
    </div>
  );
};

export default Loader;
