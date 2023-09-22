import Card from 'components/Card';
import React, { ReactElement } from 'react';

const App = (): ReactElement => {
  return (
    <div className="grid h-screen w-screen place-items-center bg-gradient-to-br from-purple-500 to-pink-500 text-3xl font-bold underline">
      <Card />
    </div>
  );
};

export default App;
