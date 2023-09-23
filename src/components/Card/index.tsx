import { ParentSize } from '@visx/responsive';
import axios from 'axios';
import Button from 'components/Button';
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

const Card = (): ReactElement => {
  const [data, setData] = useState<CountryData | null>(null);
  useEffect(() => {
    axios('https://countriesnow.space/api/v0.1/countries/capital')
      // TODO fix assertion
      .then((res) => setData(res.data as CountryData))
      .catch((e) => console.log(e));
  }, []);
  const [selected, setSelected] = useState('');

  const selectedCountries = useMemo(() => {
    if (data) {
      // Get three random values (indexes) of the data array.
      const randomIndexes = Array(3)
        .fill(null)
        .map(() => Math.floor(Math.random() * data.data.length));

      // select random country from the given random index array
      const randomCountry = data.data[Math.ceil(Math.random() * randomIndexes.length)];

      return { randomIndexes, randomCountry };
    }
  }, [data]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => setLoaded(true), 1250);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [data]);

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

  return (
    <div className="relative flex max-w-sm flex-col items-center justify-center gap-8 rounded-lg border border-gray-200 bg-white px-2 py-4 shadow dark:border-gray-700 dark:bg-gray-800">
      {loaded ? (
        <>
          <div className="flex w-full items-center justify-between">
            <Scoreboard didWin={false} />
            <CogIcon />
          </div>
          <div className="relative h-40 w-full rounded-lg">
            <h2 className="absolute left-4 top-4 z-50 text-sm text-green-500">
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
                    selected === country.capital ? 'scale-[1.15] transition-all duration-200' : ''
                  }
                />
              );
            })}
          </div>
        </>
      ) : (
        <h1>Can you guess the capital?</h1>
      )}
    </div>
  );
};

export default Card;
