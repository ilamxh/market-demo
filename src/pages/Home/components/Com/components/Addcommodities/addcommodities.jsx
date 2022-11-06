import HttpUtil from "../../../../../../utils/httpUtil";
import { nanoid } from "nanoid";
import {
  InputNumber,
  Input,
  Form,
  Select,
  Button,
  message,
  PageHeader,
  Upload,
} from "antd";
import style from "./addcommodities.module.css";
import React, {useState } from "react";
const { Option } = Select;
export default function Addcommodities(props) {
  const [subCategory, setSub] = useState([]);

  const showCategoryList = () => {
    HttpUtil.getCategories({ count: 1, pageSize: 6 }).then((res) => {
      setSub(res.data.data);
    });
    return subCategory.map((item, index) => {
      return (
        <Option value={`${item._id}`} key={nanoid()}>
          {item.categoryName}
        </Option>
      );
    });
  };
  const onFinish = (values) => {
    const [
      file,
      cost,
      currentPrice,
      inventory,
      danger_inventory,
      commodityName,
      sellingUnit,
      category_id,
    ] = [
      values.file.file,
      Number(values.cost),
      Number(values.currentPrice),
      Number(values.inventory),
      Number(values.danger_inventory),
      values.commodityName,
      values.sellingUnit,
      values.category_id,
    ];
    console.log(typeof(cost));
    let formData = new FormData();
    formData.append("file", file);
    formData.append("commodityName", commodityName);
    formData.append("sellingUnit", sellingUnit);
    formData.append("category_id", category_id);
    HttpUtil.addCommodities(formData,cost,currentPrice,inventory,danger_inventory).then((res) => {
      message.success(res.data.message);
      window.location.href = "/home/commodities";
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          props.goBack();
        }}
        subTitle="商品信息管理/新增商品"
        style={{ paddingLeft: 10, backgroundColor: "white" }}
      />
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
        className={style.form}
      >
        <Form.Item
          label="商品名称"
          name="commodityName"
          required={false}
          rules={[
            {
              required: true,
              message: "请输入商品名称",
            },
          ]}
        >
          <Input className={style.input} />
        </Form.Item>

        <Form.Item
          label="商品分类"
          name="category_id"
          required={false}
          rules={[
            {
              required: true,
              message: "请输入商品分类名称",
            },
          ]}
        >
          <Select
            className={style.input}
            name="category_id"
            style={{ width: 300 }}
          >
            {showCategoryList()}
          </Select>
        </Form.Item>

        <Form.Item
          label="商品成本"
          name="cost"
          required={false}
          rules={[
            {
              required: true,
              message: "请输入商品成本",
            },
          ]}
        >
          <InputNumber className={style.input} min={0} />
        </Form.Item>
        <Form.Item
          label="商品现价"
          name="currentPrice"
          required={false}
          rules={[{ required: true, message: "请输入商品现价！" }]}
        >
          <InputNumber className={style.input} min={0} />
        </Form.Item>
        <Form.Item
          label="商品库存"
          name="inventory"
          required={false}
          rules={[{ required: true, message: "请输入商品库存量！" }]}
        >
          <InputNumber className={style.input} min={0} />
        </Form.Item>

        <Form.Item
          label="商品警戒库存"
          name="danger_inventory"
          required={false}
          rules={[{ required: true, message: "请输入商品警戒库存量！" }]}
        >
          <InputNumber className={style.input} min={0} />
        </Form.Item>

        <Form.Item
          label="售卖单位"
          name="sellingUnit"
          required={false}
          rules={[{ required: true, message: "请输入商品产地！" }]}
        >
          <Input className={style.input} />
        </Form.Item>

        <Form.Item
          style={{ marginLeft: -90 }}
          label="图片地址:"
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
              style={{ borderRadius: 5, marginLeft: "10px" }}
            >
              上传图片
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ borderRadius: 5, width: 80, height: 40 }}
          >
            添加
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
