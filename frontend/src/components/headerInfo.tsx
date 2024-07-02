import React, { useState } from "react";
import { Button, Drawer, Flex, Descriptions, List, Avatar } from "antd";
import {
  PoweroffOutlined,
  RedoOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useOneAdminInfo } from "../hooks/useAdmin";
import { useRouter } from "next/router";

export default function HeaderInfo() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { oneAdminInfoHook: adminInfo, loading, error } = useOneAdminInfo();

  const adminRoles: { [key: string]: string } = {
    1: "Super Admin",
    2: "Admin",
    3: "Observer",
  };

  const goToReset = () => {
    router.push("/panel/reset-password");
  };


  console.log(adminInfo)
  return (
    <div className="header__box">
      {adminInfo ? (
        <>
          <Button
            onClick={showDrawer}
            icon={<UserOutlined />}
            className="header__btn"
          >
            <p className="header__info">
              {adminInfo.firstName} {adminInfo.lastName}
            </p>
          </Button>
          <Drawer
            className="side__title"
            title={`${adminInfo.firstName} ${adminInfo.lastName}`}
            onClose={onClose}
            open={open}
          >
            <List className="side__list">
              <List.Item className="side__item">#{adminInfo.id}</List.Item>
              <List.Item className="side__item">
                {adminRoles[adminInfo.role]}
              </List.Item>
              <List.Item className="side__item">{adminInfo.login}</List.Item>
              <List.Item className="side__item">{adminInfo.mail}</List.Item>
            </List>
            <Flex vertical>
              <Button icon={<PoweroffOutlined />} className="side__btn">
                Logout
              </Button>
              <Button
                icon={<RedoOutlined />}
                className="side__btn"
                onClick={goToReset}
              >
                Reset password
              </Button>
            </Flex>
          </Drawer>
        </>
      ) : (
        <p>No admin info available</p>
      )}
    </div>
  );
}
