import "@testing-library/jest-dom";
import * as apiCall from "../api/apiCall";

describe("Pruebas en calculoHoras", () => {
  test("Debería retornar un objeto respuesta del post al back", async () => {
    const tecnico = 3323212;
    const servicio = 1;
    const fechaInicio = '2020-06-25 12:19';
    const fechaFin = '2020-06-25 16:19';

    const data = {
      tecnico,
      servicio,
      fechaInicio,
      fechaFin,
    };
    const objResponse = {
      body: {
        fechaInicio: "2020-06-25 12:19",
        fechaFin: "2020-06-25 16:19",
        servicio: "1",
        tecnico: "3323212",
        diaSemana: 4,
        numeroSemana: "26",
      },
      status: 200,
      ok: true,
    };

    const dataResponse = await apiCall.postServicio(data);

    expect(dataResponse).toEqual(objResponse);
  });
});
