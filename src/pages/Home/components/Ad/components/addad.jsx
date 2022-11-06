import { Form, Input, Button, message, PageHeader, Upload } from "antd";
import httpUtil from "../../../../../utils/httpUtil";
import React from "react";
import styles from "./addad.module.css";
export default function addad(props) {
  const onFinish = (data) => {
    httpUtil
      .addAd(data.file.file, data.adCompany, data.adName, data.adCategory)
      .then((res) => {
        message.success(res.message);
        window.location.href = "/home/ad";
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <PageHeader
        className="site-page-header"
        onBack={() => {
          props.goBack();
        }}
        subTitle="广告投放管理/新增广告"
        style={{ paddingLeft: 10, backgroundColor: "white" }}
      />
      <div className={styles.main}>
        <div className={styles.inputMessage}>
          {" "}
          <Form.Item
            label="广告公司"
            name="adCompany"
            required={false}
            rules={[
              {
                required: true,
                message: "请输入广告公司名称",
              },
            ]}
          >
            <Input style={{ width: 300, marginLeft: 20 }} />
          </Form.Item>
        </div>
        <div className={styles.inputMessage}>
          <Form.Item
            label="广告名称"
            name="adName"
            required={false}
            rules={[
              {
                required: true,
                message: "请输入广告名称",
              },
            ]}
          >
            <Input style={{ width: 300, marginLeft: 20 }} />
          </Form.Item>
        </div>
        <div className={styles.inputMessage}>
          {" "}
          <Form.Item
            label="所属分类"
            name="adCategory"
            required={false}
            rules={[
              {
                required: true,
                message: "请输入所属分类",
              },
            ]}
          >
            <Input style={{ width: 300, marginLeft: 20 }} />
          </Form.Item>
        </div>

        <div>
          {" "}
          <Form.Item
            label="图片地址"
            name="file"
            required={false}
            rules={[
              {
                required: true,
                message: "请上传图片",
              },
            ]}
          >
            <Upload
              name="file"
              headers={{ authorization: "authorization-text" }}
              beforeUpload={() => {
                return false;
              }}
              maxCount={1}
            >
              <Button
                type="primary"
                size="middle"
                style={{ borderRadius: 5, marginLeft: 80, marginTop: 5 }}
              >
                上传图片
              </Button>
            </Upload>
          </Form.Item>
        </div>
        <div>
          {" "}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}
