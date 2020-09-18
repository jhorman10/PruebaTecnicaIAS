import { baseURL } from "../api";
import { makeUrl } from "./makeUrl";

export const getCalculo = async (data) => {
  let dataResponse = await fetch(makeUrl(`${baseURL}/servicio`, data), {
    method: "GET",
  })
    .then((resp) =>
      resp.json().then((res) => {
        return res;
      })
    )
    .catch((err) => console.log(err));
  return dataResponse;
};

export const postServicio = async (data) => {
  let dataResponse = await fetch(makeUrl(`${baseURL}/reporte-servicio`, data), {
    method: "POST",
  })
    .then((resp) =>
      resp.json().then((res) => {
        console.log(res);
        return res;
      })
    )
    .catch((err) => console.log(err));
  console.log(dataResponse);
  return dataResponse;
};
