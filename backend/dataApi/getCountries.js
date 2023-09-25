"use strict";

import axios from "axios";

export const handler = () => {
  return axios("https://countriesnow.space/api/v0.1/countries/capital")
    .then((res) => {
      return {
        statusCode: 200,
        body: JSON.stringify(res.data),
      };
    })
    .catch(() => {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Something went wrong" }),
      };
    });
};
