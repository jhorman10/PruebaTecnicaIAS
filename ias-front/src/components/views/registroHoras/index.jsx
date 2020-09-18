import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Space } from "antd";
import * as apiCall from "../../../api/apiCall";
import Swal from "sweetalert2";

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

export function RegistroHoras(props) {
  const [tecnico, setTecnico] = useState("");
  const [servicio, setServicio] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [res, setRes] = useState([]);

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

  const onFinish = () => {
    if (
      tecnico !== "" &&
      servicio !== "" &&
      fechaInicio !== "" &&
      fechaFin !== ""
    ) {
      let data = {
        tecnico,
        servicio,
        fechaInicio,
        fechaFin,
      };
      let dataResponse = apiCall.postServicio(data);
      dataResponse.then((data) => {
        if (data !== undefined) {
          setRes(data);
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Se ha guardado correctamente la información",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setRes([]);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error, no se pudo guardar la información!",
          });
        }
      });
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
            label="Identificacion del tipo de servicio"
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
