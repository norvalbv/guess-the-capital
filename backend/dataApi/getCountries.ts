import axios from "axios";

type Country = {
  country: string;
  capital: string;
  iso2: string;
  iso3: string;
};

type CountryData = {
  data: Country[];
  error: boolean;
  msg: string;
};

let cache: CountryData | null = null;

export const handler = async (): Promise<{
  statusCode: number;
  body: string;
}> => {
  // Check if the data is cached
  // * This significantly reduced query time from 300-600ms to 3-4ms
  if (cache) {
    return {
      statusCode: 200,
      body: JSON.stringify(cache),
    };
  }

  try {
    const res = await axios.get<CountryData>(
      "https://countriesnow.space/api/v0.1/countries/capital"
    );

    // Validate and cache response
    if (!Array.isArray(res.data.data) || res.data.error) {
      throw new Error("An unknown error has occurred, contact support");
    }

    cache = res.data;

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong",
        error: e.message,
      }),
    };
  }
};
