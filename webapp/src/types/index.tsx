export type ApiError = {
  status: number;
  message: { detail: string };
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
  /**
   * If there's a request or revalidation loading.
   */
  isValidating: boolean;
  /**
   * If there's a request loading.
   */
  isLoading: boolean;
};

export type Country = {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
};
