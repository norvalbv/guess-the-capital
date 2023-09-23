import Card from 'components/Card';
import { GuessTheCapitalIcon } from 'components/SVG';
import React, { ReactElement } from 'react';

const App = (): ReactElement => {
  return (
    <div className="relative grid h-screen w-screen place-items-center bg-gradient-to-br from-purple-500 to-pink-500">
      <h1 className="absolute top-40 flex w-full items-center justify-center">
        <GuessTheCapitalIcon />
      </h1>
      <Card />
    </div>
  );
};

export default App;
