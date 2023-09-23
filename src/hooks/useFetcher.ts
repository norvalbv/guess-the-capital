import axios, { AxiosError, RawAxiosRequestHeaders } from 'axios';
import { ApiError } from 'types';

export type FetcherOptions = {
  cache?: boolean;
};
type UseFetcherProps = {
  pathName: string;
  fetcherOptions?: FetcherOptions;
  params?: URLSearchParams;
};

const useFetcher = <T>({ pathName, fetcherOptions, params }: UseFetcherProps): Promise<T> => {
  const headers: RawAxiosRequestHeaders | undefined = fetcherOptions ? {} : undefined;

  if (headers && !fetcherOptions?.cache) {
    // The Cache-Control HTTP header field holds instructions — in both requests and responses.
    headers['Cache-Control'] = 'no-cache';
  }

  return axios
    .get<T>(pathName, { headers, params })
    .then((res) => res.data)
    .catch((error: Error | AxiosError<{ detail: string }>) => {
      const err = <ApiError>{};
      if (axios.isAxiosError(error)) {
        err.status = error.response?.status || -1;
        err.message =
          typeof error.response?.data === 'object' && 'detail' in error.response.data
            ? (error.response.data as { detail: string })
            : { detail: error.response?.statusText || 'UNKNOWN' };
      }
      /**
       * Need explicitly throw custom `err` object, in order for the return type to be `ApiError`.
       * The native `Error` has different interface.
       */
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw err;
    });
};

export default useFetcher;
