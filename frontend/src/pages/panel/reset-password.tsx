import React from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { useResetPasswordAdmin } from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const { resetPassword, loading, error } = useResetPasswordAdmin();
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const router = useRouter();

  const onFinish = async (values: { password: string }) => {
    try {
      await resetPassword(values.password);
      form.resetFields();
      showModal();
    } catch (err: any) {
      console.error("Failed to reset password:", err);
      Modal.error({
        title: "Error",
        content: err.message,
      });
    }
  };

  const showModal = () => {
    let secondsToGo = 5;

    const instance = modal.success({
      title: "Password Reset Successfully",
      content: `You will be redirected to the panel page in ${secondsToGo} seconds`,
      onOk: () => goToPanel(),
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `You will be redirected to the panel page in ${secondsToGo} seconds`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
      goToPanel();
    }, secondsToGo * 1000);
  };

  const goToPanel = () => {
    router.push("/panel");
  };

  return (
    <div className="reset">
      <div className="reset__box">
        <Form
          form={form}
          onFinish={onFinish}
          className="reset__form"
          layout="vertical"
        >
          <Form.Item
            className="reset__item"
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
            <Input.Password className="reset__input" />
          </Form.Item>

          <Form.Item
            className="reset__item"
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
            <Input.Password className="reset__input" />
          </Form.Item>

          <Form.Item className="reset__item">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="reset__btn"
            >
              Reset Password
            </Button>
          </Form.Item>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form>
      </div>
      {contextHolder}
    </div>
  );
}
