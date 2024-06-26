import React from "react";
import { Form, Input, Button, message } from "antd";
import { useResetPasswordAdmin } from "../../hooks/useAuth";

export default function ResetPassword() {
  const { resetPassword, loading, error } = useResetPasswordAdmin();
  const [form] = Form.useForm();

  const onFinish = async (values: { password: string }) => {
    try {
      await resetPassword(values.password);
      message.success("success");
      form.resetFields();
    } catch (err: any) {
      console.error("Failed to reset password:", err);
      message.error(err);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Reset Password
        </Button>
      </Form.Item>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </Form>
  );
}
