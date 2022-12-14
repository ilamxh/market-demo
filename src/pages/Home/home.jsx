import { NavLink, Outlet } from "react-router-dom";
import "./home.css";
import "antd/dist/antd.less";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Divider } from "antd";
import React, { useState } from "react";
const { Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h3 style={{ color: "white" ,height:50,lineHeight:3.5,textAlign:"center"}}>云超市管理系统</h3>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UploadOutlined />,
              label: <NavLink to="">数据概况</NavLink>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <NavLink to="uim">用户信息管理</NavLink>,
            },
            {
              key: "3",
              icon: <UserOutlined />,
              label: <NavLink to="commodities">商品信息管理</NavLink>,
            },
            {
              key: "4",
              icon: <MenuOutlined />,
              label: <NavLink to="category">商品分类管理</NavLink>,
            },
            {
              key: "5",
              icon: <MenuFoldOutlined />,
              label: <NavLink to="">订单信息管理</NavLink>,
            },
            {
              key: "6",
              icon: <UploadOutlined />,
              label: <NavLink to="ad">广告投放管理</NavLink>,
            },
          ]}
        />
      </Sider>
      <Content
        className="site-layout-background"
        style={{
          margin: "0px 16px",
          padding: 0,
          minHeight: 0,
        }}
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          }
        )}
        <Divider style={{ margin: 0 }} />
        <Outlet />
      </Content>
    </Layout>
  );
}
