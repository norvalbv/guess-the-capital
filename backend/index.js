import axios from "axios";

export const getCapital = async () => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/capital"
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong" }),
    };
  }
};
