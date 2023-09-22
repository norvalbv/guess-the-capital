import Button from 'components/Button';
import MercatorProjection from 'components/MercatorProjection';
import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';

type CountryData = {
  data: {
    name: string;
    capital: string;
    iso2: string;
    iso3: string;
  }[];
  error: boolean;
  msg: string;
};

const Card = (): ReactElement => {
  const [data, setData] = useState<CountryData | null>(null);
  useEffect(() => {
    axios('https://countriesnow.space/api/v0.1/countries/capital')
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="flex max-w-sm flex-col items-center justify-center gap-8 rounded-lg border border-gray-200 bg-white px-2 py-4 shadow dark:border-gray-700 dark:bg-gray-800">
      <MercatorProjection />
      <div className="flex flex-wrap items-center justify-center">
        <Button />
        <Button />
        <Button />
      </div>
    </div>
  );
};

export default Card;
