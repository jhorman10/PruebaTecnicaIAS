import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Space } from "antd";
import { makeUrl } from "../../../api/makeUrl";
import { baseURL } from "../../../api";

const { RangePicker } = DatePicker;

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

function RegistroHoras(props) {
  const [tecnico, setTecnico] = useState("");
  const [servicio, setServicio] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleChangeTecnico = (e) => {
    setTecnico(e.target.value);
  };

  const handleChangeServicio = (e) => {
    setServicio(e.target.value);
  };

  const handleChangeDateTime = (value, dataString) => {
    setFechaInicio(dataString[0]);
    setFechaFin(dataString[1]);
  };

  const onFinish = (values) => {
    if (
      tecnico !== "" &&
      servicio !== "" &&
      fechaInicio !== "" &&
      fechaFin !== ""
    ) {
      let data = {
        cc_tecnico: tecnico,
        servicio,
        fechaInicio,
        fechaFin,
      };

      fetch(makeUrl(`${baseURL}/reporte-servicio`, data), {
        method: "POST",
      })
        .then((resp) => resp.json().then((res) => console.log(res)))
        .catch((err) => console.log(err));
    }
  };
  
  return (
    <>
      <div>
        <h3 style={{ marginTop: 50, marginLeft: 60 }}>
          Reporte de Servicio Tecnico
        </h3>
        <Form
          style={{ marginTop: 50 }}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["registroServicio", "tecnico"]}
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
            name={["registroServicio", "servicio"]}
            label="Identificacion del servicio"
            rules={[
              {
                required: true,
              },
            ]}
            onChange={handleChangeServicio}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["registroServicio", "servicio"]}
            label="Fecha, hora de inicio y fecha, hora de fin"
            rules={[
              {
                required: true,
              },
            ]}
            onChange={handleChangeServicio}
          >
            <Space
              style={{ marginBottom: 10, marginTop: 10, marginLeft: 30 }}
              direction="vertical"
              size={12}
            >
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={handleChangeDateTime}
              />
            </Space>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Registrar!
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default RegistroHoras;
