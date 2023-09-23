import { Country } from 'components/Card';
import useRequest from 'hooks/useRequest';
import { ApiResponse } from 'types';

export type UseWeather = {
  lat: number | null;
  lon: number | null;
};

type CountryData = {
  data: Country[];
  error: boolean;
  msg: string;
};

export type WeatherReturnType = ApiResponse<CountryData>;

/**
 * Get full country data
 */
export const useGetCountries = (): WeatherReturnType => {
  const url = 'https://countriesnow.space/api/v0.1/countries/capital';

  return useRequest({ pathName: url });
};

export default useGetCountries;
