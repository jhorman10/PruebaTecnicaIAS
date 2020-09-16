import "@testing-library/jest-dom";
import * as apiCall from "../api/apiCall";

describe("Pruebas en calculoHoras", () => {
  test("Debería retornar un objeto respuesta del get al back", async () => {
    const cc_tecnico = 1223212;
    const semana = 20;
    const data = {
      cc_tecnico,
      semana,
    };
    const objResponse = [
      {
        TOTAL_HORAS: 1,
        HORA_INICIO: "2020-09-14T16:00:00.000Z",
        HORA_FIN: "2020-09-14T17:00:00.000Z",
        DIA_SEMANA: 1,
        NUMERO_SEMANA: 20,
        ID_TECNICO: 1223212,
      },
    ];

    const dataResponse = await apiCall.getCalculo(data);

    expect(dataResponse).toEqual(objResponse);
  });
});
