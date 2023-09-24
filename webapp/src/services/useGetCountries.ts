import useRequest from 'hooks/useRequest';
import { ApiResponse, Country } from 'types';

export type CountryData = {
  data: Country[];
  error: boolean;
  msg: string;
};

export type UseGetCountriesReturnType = ApiResponse<CountryData>;

/**
 * Get full country data
 */
export const useGetCountries = (): UseGetCountriesReturnType => {
  const url = 'https://countriesnow.space/api/v0.1/countries/capital';

  return useRequest({ pathName: url });
};

export default useGetCountries;
