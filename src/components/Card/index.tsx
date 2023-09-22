import axios from 'axios';
import Button from 'components/Button';
import MercatorProjection from 'components/MercatorProjection';
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
      const randomCountry = data.data[Math.floor(Math.random() * randomIndexes.length)];

      return { randomIndexes, randomCountry };
    }
  }, [data]);

  if (data?.error) {
    return <div>Error</div>;
  }

  if (!data || !selectedCountries) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex max-w-sm flex-col items-center justify-center gap-8 rounded-lg border border-gray-200 bg-white px-2 py-4 shadow dark:border-gray-700 dark:bg-gray-800">
      <MercatorProjection country={selectedCountries.randomCountry} />
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
    </div>
  );
};

export default Card;
