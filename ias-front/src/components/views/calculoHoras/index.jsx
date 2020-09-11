import React from "react";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
function CalcularHoras(props) {
  const onFinish = (values) => {
    console.log(values);
  };
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  return (
    <>
      <h3 style={{ marginTop: 50, marginLeft: 60 }}>
        Cálculo de horas de trabajo
      </h3>
      <Form
        style={{ marginTop: 50, marginRight: 60, marginLeft: -150 }}
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
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Calcular!
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CalcularHoras;
