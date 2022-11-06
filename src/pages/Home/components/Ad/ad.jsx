import {
  message,
  Upload,
  Image,
  Popconfirm,
  Button,
  Space,
  Table,
  Divider,
} from "antd";
import HttpUtil from "../../../../utils/httpUtil";
import DescriptionWrapper from "../../../../common/descriptionWrapper/descriptionWrapper";
import Addad from "./components/addad";
import binaryArrToUrl from "../../../../utils/binaryArrToUrl";
import React, { useEffect, useState } from "react";
export default function Ad() {
  const [ads, setAds] = useState([]);
  const [isAddad, setAdd] = useState(false);
  const [id, setId] = useState("");
  const adNumber = ads.length;
  useEffect(() => {
    HttpUtil.getAds().then((res) => {
      const data = res.data;
      setAds(data);
    });
  });
  const property = {
    name: "file",
    showUploadList: false,
    customRequest: (data) => {
      HttpUtil.updateAd(id, data.file).then((res) => {
        message.success(res.message);
      });
    },
    maxCount: 1,
  };
  const changeTable = () => {
    HttpUtil.getAds().then((res) => {
      const data = res.data;
      setAds(data);
    });
  };
  const isAddadTrue = () => {
    setAdd(true);
  };
  const goBack = () => {
    setAdd(false);
  };
  const deleteAds = (record) => {
    HttpUtil.deleteAd({ _id: record._id }).then((res) => {
      message.success("广告删除成功");
    });
  };
  const changePic = (_id) => {
    setId(_id);
  };
  const columns = [
    {
      title: "广告公司",
      dataIndex: "adCompany",
      key: "adCompany",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "广告名称",
      dataIndex: "adName",
      key: "adName",
    },
    {
      title: "所属分类",
      dataIndex: "adCategory",
      key: "adCategory",
    },
    {
      title: "广告图片",
      key: "file",
      dataIndex: "file",
      render: (_, ad) => {
        const { picMimetype, file } = ad;
        const url = binaryArrToUrl(file, picMimetype);
        return <Image preview={false} width={150} src={url} />;
      },
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "_id",
      render: (_id, record) => (
        <Space size="middle">
          <Upload data {...property}>
            <Button onClick={() => changePic(_id)} danger type="primary">
              更改图片
            </Button>
          </Upload>
          <Button
            danger
            className="ant-btn ant-btn-primary ant-btn-dangerous"
            type="primary"
          >
            <Popconfirm
              title="确定删除该广告吗?"
              onConfirm={() => deleteAds(record)}
              okText="确认"
              cancelText="取消"
            >
              删除广告
            </Popconfirm>
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <DescriptionWrapper
        title=" 广告管理"
        details="广告信息展示，可以进行新增广告，更改广告，删除广告操作。注意：最多只允许5个广告位"
      />
      <Divider style={{ margin: 0 }} />

      <div>
        {isAddad ? (
          <Addad goBack={goBack} isAddad={isAddad} adNumber={adNumber} />
        ) : (
          <div>
            <Button type="primary" onClick={isAddadTrue} style={{ margin: 20 }}>
              新增广告
            </Button>
            <Table
              pagination={false}
              onChange={changeTable}
              columns={columns}
              dataSource={ads}
            />
          </div>
        )}
      </div>
    </div>
  );
}
