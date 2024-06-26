import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  SettingOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Card, Col, Row, Flex } from "antd";
import { useOneAdminInfo } from "../../../hooks/useAdmin";
import { useGetAllNodes } from "../../../hooks/useNode";
import Node from "../../../http/nodeAPI";

const { Header, Sider, Content } = Layout;

export default function PanelBot() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { oneAdminInfoHook: adminInfo, loading, error } = useOneAdminInfo();
  const { nodes: allNodes, loading: nodesLoading } = useGetAllNodes();
  const questionsArray: Node[] = allNodes.filter(
    (item) => item.type === "question"
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
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
          className="header-panel"
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
          {adminInfo ? (
            <p className="header-info">
              {adminInfo.firstName} {adminInfo.lastName}
            </p>
          ) : (
            <p>error</p>
          )}
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
            {questionsArray.map((question, index) => (
              <Col span={8} key={index}>
                <Card title={question.id} bordered={false}>
                  <h3>{question.text}</h3>
                  <Flex align="flex-start" gap="small">
                    <Button type="primary" danger icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                    <Button type="primary" icon={<SettingOutlined />}>
                      Edit
                    </Button>
                  </Flex>
                </Card>
              </Col>
            ))}
            <Col span={8}>
              <Card title="NEW" bordered={false}>
              <Flex align="center" justify="center">
              <Button icon={<PlusOutlined />}/>
              </Flex>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
