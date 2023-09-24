import { ParentSize } from '@visx/responsive';
import Button from 'components/Button';
import { ErrorBanner } from 'components/ErrorBoundary';
import GameSettings, { Settings } from 'components/GameSettings';
import Loader from 'components/Loader';
import MercatorProjection from 'components/MercatorProjection';
import { CogIcon } from 'components/SVG';
import Scoreboard from 'components/Scoreboard';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useGetCountries } from 'services';
import classNames from 'utils/classNames';

const getRandomIndex = (length: number): number => Math.floor(Math.random() * length);

const Card = (): ReactElement => {
  const { data } = useGetCountries();

  const [selected, setSelected] = useState('');

  const [score, setScore] = useState({
    win: 0,
    lose: 0,
  });
  const [settings, setSettings] = useState<Settings>({
    maxScore: 10,
    sounds: true,
  });

  const hasInfiniteGames = settings.maxScore === 0;

  const hasWon = !hasInfiniteGames && score.win >= settings.maxScore;
  const hasLost = !hasInfiniteGames && score.lose >= settings.maxScore;

  const selectedCountries = useMemo(() => {
    if (data) {
      // Get three random values (indexes) of the data array.
      const randomIndexes = Array(3)
        .fill(null)
        .map(() => getRandomIndex(data.data.length));

      // select random country from the given random index array
      const randomCountry = data.data[randomIndexes[getRandomIndex(randomIndexes.length)]];

      return { randomIndexes, randomCountry };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, score]);

  useEffect(() => {
    if (selected) {
      const timer = setTimeout(
        () => {
          setSelected('');
          if (selected === selectedCountries?.randomCountry.capital) {
            setScore((prev) => {
              return { ...prev, win: prev.win + 1 };
            });
          } else {
            setScore((prev) => {
              return { ...prev, lose: prev.lose + 1 };
            });
          }
        },
        selected === selectedCountries?.randomCountry.capital ? 750 : 1500
      );

      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const [stage, setStage] = useState<0 | 1>(0);

  if (data?.error) {
    return <ErrorBanner />;
  }

  if (!data || !selectedCountries) {
    return <Loader />;
  }

  return (
    <div className="relative flex h-auto w-80 flex-col items-center gap-8 rounded-lg border border-gray-700 bg-gray-800 p-2 shadow sm:w-[28rem]">
      {!hasWon && !hasLost ? (
        <>
          <div className="flex w-full items-center justify-between">
            <Scoreboard score={score} />
            <CogIcon
              onClick={(): void => setStage((p) => (!p ? 1 : 0))}
              className="h-7 w-7 cursor-pointer"
            />
          </div>
          {stage === 0 ? (
            <>
              <div className="relative h-40 w-full rounded-lg">
                <h2 className="absolute left-4 top-4 z-50 rounded-lg bg-white p-1 text-sm text-green-500">
                  {selectedCountries.randomCountry.name}
                </h2>
                <ParentSize className="min-w-0 overflow-hidden rounded-lg">
                  {({ width, height }): ReactElement | null => (
                    <MercatorProjection
                      width={width}
                      height={height}
                      data={{
                        code: selectedCountries.randomCountry.iso3,
                        fill: 'fill-purple-500',
                      }}
                    />
                  )}
                </ParentSize>
              </div>
              <section className="text-center text-white sm:text-left">
                <p>What&apos;s the capital city of {selectedCountries.randomCountry.name}?</p>
                <div className="my-3 flex flex-wrap items-center justify-center gap-6">
                  {selectedCountries.randomIndexes.map((d) => {
                    const country = data.data[d];
                    return (
                      <Button
                        key={d}
                        text={country.capital}
                        disabled={!!selected}
                        onclick={(): void => setSelected(country.capital)}
                        colour={
                          selected !== country.capital
                            ? ''
                            : selected === selectedCountries.randomCountry.capital
                            ? 'from-green-500 to-blue-500 group-hover:from-green-500 group-hover:to-green-500 focus:ring-green-800'
                            : 'from-red-500 to-pink-500 group-hover:from-red-500 group-hover:to-pink-500 focus:ring-red-800'
                        }
                        className={
                          selected === country.capital
                            ? 'scale-[1.15] transition-all duration-200'
                            : ''
                        }
                      />
                    );
                  })}
                </div>
                {selected && selected !== selectedCountries.randomCountry.capital && (
                  <p>The correct city was {selectedCountries.randomCountry.capital}</p>
                )}
              </section>
              <Button text="Reset Game" onclick={(): void => setScore({ win: 0, lose: 0 })} />
            </>
          ) : (
            <GameSettings
              settings={settings}
              setSettings={setSettings}
              setStage={setStage}
              setScore={setScore}
            />
          )}
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-20 text-center text-white">
          <h1 className="text-2xl underline">Game Over</h1>
          <div>
            <p
              className={classNames(
                'text-4xl font-bold uppercase underline underline-offset-4',
                hasWon ? 'text-green-500' : 'text-red-500'
              )}
            >
              You {hasWon ? 'win' : 'lost'}!
            </p>
            <p className="mt-2 text-sm">
              Final score was{' '}
              <span className="italic">
                Win: {score.win} / Lose: {score.lose}
              </span>
            </p>
          </div>
          <div>
            <Button
              text="Play again?"
              onclick={(): void => {
                setScore({ win: 0, lose: 0 });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
