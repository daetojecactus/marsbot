import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useLoginAdmin } from "../hooks/useAuth";

export default function LoginPage() {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const router = useRouter();
  const { loginAdminHook, loading, error } = useLoginAdmin();

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values: any) => {
    try {
      const { login, password } = values;
      console.log("Данные формы:", { login, password });
      const response = await loginAdminHook({ login, password });

      // Сохранение токена в localStorage
      localStorage.setItem("token", response.token);

      //вывод сообщения после успешного входа
      message.success("You have successfully logged in!");
      router.push("/panel");

      //очистка формы после успешного входа
      form.resetFields();
    } catch (error: any) {
      console.error("Ошибка входа:", error);
      //вывод сообщения об ошибке входа
      message.error(`Login error: ${error.message}`);
    }
  };

  return (
    <div className="form-main">
      <div className="form-main__box">
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
          className="form-main__form"
        >
          <Form.Item
            className="form-main__item"
            name="login"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              className="form-main__input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            className="form-main__item"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="form-main__input"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
              className="form-main__btn"
                type="primary"
                htmlType="submit"
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
