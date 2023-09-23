import { ParentSize } from '@visx/responsive';
import axios from 'axios';
import Button from 'components/Button';
import GameSettings from 'components/GameSettings';
import Loader from 'components/Loader';
import MercatorProjection from 'components/MercatorProjection';
import { CogIcon } from 'components/SVG';
import Scoreboard from 'components/Scoreboard';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

export type Country = {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
};

type CountryData = {
  data: Country[];
  error: boolean;
  msg: string;
};

const getRandomIndex = (length: number): number => Math.floor(Math.random() * length);

const Card = (): ReactElement => {
  const [data, setData] = useState<CountryData | null>(null);
  useEffect(() => {
    axios('https://countriesnow.space/api/v0.1/countries/capital')
      // TODO fix assertion
      .then((res) => setData(res.data as CountryData))
      .catch(() => {});
  }, []);
  const [selected, setSelected] = useState('');

  const [score, setScore] = useState({
    win: 0,
    lose: 0,
  });

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

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => setLoaded(true), 1250);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [data]);

  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => {
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
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const [stage, setStage] = useState<0 | 1>(0);

  const [totalRounds, setTotalRounds] = useState(10);

  if (data?.error) {
    return <div>Error</div>;
  }

  if (!data || !selectedCountries) {
    return <Loader />;
  }

  //   const mercatorProjectionData = data.data.map(({ iso3 }) => {
  //     return {
  //       code: iso3,
  //       value: 0,
  //       fill: 'fill-red-500',
  //     };
  //   });

  const totalScore = Object.values(score).reduce((a, b) => a + b);

  return (
    <div className="relative flex h-auto w-80 flex-col items-center gap-8 rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800 sm:h-96 sm:w-[28rem]">
      {totalScore < totalRounds ? (
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
                      data={[selectedCountries.randomCountry].map((d) => {
                        return {
                          code: d.iso3,
                          value: 0,
                          fill: 'fill-purple-300',
                        };
                      })}
                    />
                  )}
                </ParentSize>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {selectedCountries.randomIndexes.map((d) => {
                  const country = data.data[d];
                  return (
                    <Button
                      key={d}
                      text={country.capital}
                      onclick={(): void => setSelected(country.capital)}
                      colour={
                        selected !== country.capital
                          ? ''
                          : selected === selectedCountries.randomCountry.capital
                          ? 'from-green-500 to-blue-500 focus:ring-green-200 group-hover:from-green-500 group-hover:to-green-500 dark:focus:ring-green-800'
                          : 'from-red-500 to-pink-500 focus:ring-red-200 group-hover:from-red-500 group-hover:to-pink-500 dark:focus:ring-red-800'
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
              <Button text="Reset Game" onclick={(): void => setScore({ win: 0, lose: 0 })} />
            </>
          ) : (
            <GameSettings
              settings={{
                'total rounds': (
                  <input
                    className="rounded-lg px-2 text-gray-500"
                    value={totalRounds}
                    onChange={(e): void => setTotalRounds(Number(e.target.value))}
                  />
                ),
              }}
            />
          )}
        </>
      ) : (
        <div className="grid h-full w-full place-items-center">
          <div>
            <h1 className="mb-10 text-2xl text-white underline">Round Over</h1>
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
