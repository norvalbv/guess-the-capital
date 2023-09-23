import React, { ReactElement, useEffect, useState } from 'react';

type ScoreboardProps = {
  didWin: boolean;
};

const Scoreboard = ({ didWin }: ScoreboardProps): ReactElement => {
  const [score, setScore] = useState({
    win: 0,
    lose: 0,
  });

  useEffect(() => {
    if (typeof didWin === 'boolean') {
      return didWin
        ? setScore((prev) => {
            return { ...prev, win: prev.win + 1 };
          })
        : setScore((prev) => {
            return { ...prev, win: prev.lose + 1 };
          });
    }
  }, [didWin]);
  return (
    <section className="text-sm text-white">
      Win: <span className="text-green-300">{score.win}</span> | Lose:{' '}
      <span className="text-red-300">{score.lose}</span>
    </section>
  );
};

export default Scoreboard;
