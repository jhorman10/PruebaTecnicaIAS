import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import TablaCalculo from "./tablaCalculo";
import * as apiCall from "../../../api/apiCall";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

const validateMessages = {
  required: "${label} es requerido!",
};

export function CalcularHoras(props) {
  const [tecnico, setTecnico] = useState("");
  const [semana, setSemana] = useState("");
  const [dataF, setData] = useState([]);

  const handleChangeTecnico = (e) => {
    setTecnico(e.target.value);
  };

  const handleChangeSemena = (e) => {
    setSemana(e.target.value);
  };

  const onFinish = () => {
    if (tecnico !== "" && semana !== "") {
      let data = {
        cc_tecnico: tecnico,
        semana,
      };
      let dataResponse = apiCall.getCalculo(data);
      dataResponse.then((data) => {
        data !== undefined ? setData(data) : setData([]);
      });
    }
  };

  return (
    <>
      <div>
        <h3 style={{ marginTop: 50, marginLeft: 60 }}>
          Cálculo de horas de trabajo
        </h3>
        <Form
          style={{ marginTop: 50 }}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["calcularHoras", "identificacion"]}
            label="Identificacion del tecnico"
            rules={[
              {
                required: true,
              },
            ]}
            onChange={handleChangeTecnico}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["calcularHoras", "numeroSemana"]}
            label="Número de semana"
            rules={[
              {
                required: true,
              },
            ]}
            onChange={handleChangeSemena}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Calcular!
            </Button>
          </Form.Item>
        </Form>
      </div>
      {dataF !== undefined ? <TablaCalculo data={dataF} /> : null}
    </>
  );
}
