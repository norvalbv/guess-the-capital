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
  const url = 'http://localhost:3000/dev/get-countries';

  return useRequest<CountryData>({ pathName: url });
};

export default useGetCountries;
