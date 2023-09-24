import useSWR, { SWRConfiguration } from 'swr';
import { ApiError, ApiResponse } from 'types';
import fetcher from './useFetcher';

type UseRequestParameters<T> = {
  pathName: string;
  options?: SWRConfiguration<T>;
};

/**
 * `useSWR` default options
 */
const defaultOptions: SWRConfiguration = {
  onErrorRetry: (error: ApiError, key, config, revalidate, { retryCount }) => {
    // Only retry on 404s up to 5 times
    // eslint-disable-next-line no-useless-return
    if (error.status === 404 && retryCount > 5) return;
  },
};

/**
 * Custom hook for HTTP GET Requests using the SWR data cache.
 */
const useRequest = <T>({ pathName, options }: UseRequestParameters<T>): ApiResponse<T> => {
  // Fetch data only if the `uri` is not an empty string.
  // https://swr.vercel.app/docs/conditional-fetching
  const { data, error, isValidating, isLoading } = useSWR<T, ApiError>(
    pathName,
    pathName ? (): Promise<T> => fetcher<T>({ pathName }) : null,
    {
      ...defaultOptions,
      ...options,
    }
  );

  return { data, error, isValidating, isLoading };
};

export default useRequest;
