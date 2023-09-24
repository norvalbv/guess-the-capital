import React, { ReactElement } from 'react';

type ScoreboardProps = {
  score: { win: number; lose: number };
};

const Scoreboard = ({ score }: ScoreboardProps): ReactElement => {
  return (
    <section className="text-sm text-white">
      Win: <span className="text-green-300">{score.win}</span> | Lose:{' '}
      <span className="text-red-300">{score.lose}</span>
    </section>
  );
};

export default Scoreboard;
