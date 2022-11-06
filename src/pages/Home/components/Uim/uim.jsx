import { Space, Table, Button, Divider } from "antd";
import HttpUtil from "../../../../utils/httpUtil";
import DescriptionWrapper from "../../../../common/descriptionWrapper/descriptionWrapper";
import Changepwd from "./components/changepwd";
import React, { useEffect, useState } from "react";

export default function Uim() {
  const [isChangepwd, setchangepwd] = useState(false);
  const [users, setusers] = useState([]);
  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(7);
  const [total, settotal] = useState("");
  const [record, setrecord] = useState("");
  const columns = [
    {
      title: "账号",
      dataIndex: "useraccount",
      key: "useraccount",
    },
    {
      title: "密码",
      dataIndex: "userpwd",
      key: "userpwd",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => isChangepwdTrue(record)} type="primary">
            更改密码
          </Button>
          <Button
            onClick={() => {
              deleteUsers(record);
            }}
            danger
            type="primary"
          >
            删除用户
          </Button>
        </Space>
      ),
    },
  ];

  const deleteUsers = (record) => {
    console.log("------" + record._id);
    if (window.confirm("确定删除吗")) {
      HttpUtil.deleteUser({ _id: record._id }).then((res) => {
        HttpUtil.getUsers({ current, pageSize }).then((res) => {
          const { users } = res;
          setcurrent(current);
          setpageSize(pageSize);
          setusers(users);
        });
      });
    }
  };
  const isChangepwdTrue = (record) => {
    setchangepwd(true);
    setrecord(record);
  };
  const goback = () => {
    setchangepwd(false);
  };
  
  useEffect(() => {
    HttpUtil.getUsers({
      current: current,
      pageSize: pageSize,
    }).then((res) => {
      const { total, users } = res.data;
      setusers(users);
      settotal(total);
    });
  }, []);

  const changeTable = (pagination) => {
    const { current, pageSize } = pagination;
    setcurrent(current);
    setpageSize(pageSize);
    HttpUtil.getUsers({
      current: current,
      pageSize: pageSize,
    }).then((res) => {
      const { users } = res.data;
      console.log(res);
      setusers(users);
    });
  };
  return (
    <div>
      <DescriptionWrapper
        title="用户列表"
        details="用户信息展示，可进行用户密码修改和删除用户操作"
      />
      <Divider style={{ margin: 0 }} />
      <div>
        {isChangepwd ? (
          <Changepwd goback={goback} record={record} />
        ) : (
          <Table
            style={{ marginTop: 60 }}
            key={users._id}
            pagination={{ current: current, pageSize: pageSize, total: total }}
            onChange={changeTable}
            columns={columns}
            dataSource={users}
          />
        )}
      </div>
    </div>
  );
}
