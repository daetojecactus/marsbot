import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Card,
  Col,
  Row,
  Skeleton,
  Avatar,
} from "antd";

import { useAllAdminsInfo } from "../../../hooks/useAdmin";
import HeaderInfo from "@/components/headerInfo";
import Admin from "../../../http/adminAPI";

const { Header, Sider, Content } = Layout;
const { Meta } = Card;

export default function AdminPanel() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {
    allAdminsInfoHook: allAdminsInfo,
    loading,
    error,
  } = useAllAdminsInfo();

  const adminsArray: Admin[] = [...allAdminsInfo];

  const adminRoles: { [key: string]: string } = {
    1: "Super Admin",
    2: "Admin",
    3: "Observer",
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Admins",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="header"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <HeaderInfo />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Row gutter={[16, 16]}>
            {adminsArray.map((admin) => (
              <Col span={8} key={admin.id}>
                <Card
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Skeleton loading={loading} avatar active>
                    <Meta
                      avatar={
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                      }
                      title={adminRoles[admin.role]}
                      description={`${admin.firstName} ${admin.lastName}`}
                    />
                  </Skeleton>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
