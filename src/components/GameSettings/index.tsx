import React, { ReactElement } from 'react';

type GameSettingsProps = {
  settings: { [setting: string]: string | boolean | number | JSX.Element };
};

const GameSettings = ({ settings }: GameSettingsProps): ReactElement => {
  return (
    <section className="text-white">
      {Object.entries(settings).map(([key, value]) => (
        <div key={key}>
          <span className="capitalize">{key}</span>&nbsp;=&nbsp;<span>{value}</span>
        </div>
      ))}
    </section>
  );
};

export default GameSettings;
