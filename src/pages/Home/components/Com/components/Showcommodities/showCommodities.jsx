import { Input, message, Button, Popconfirm, Card, Divider, Image } from "antd";
import binaryArrToUrl from "../../../../../../utils/binaryArrToUrl";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import httpUtil from "../../../../../../utils/httpUtil";
import style from "./showCommodities.module.css";
import React, { useState } from "react";

export default function ShowCommodities(props) {
  const [data, setData] = useState(props.data);
  const [current, setCurrent] = useState(props.data.currentPrice);
  const [costprice, setCost] = useState(props.data.cost);
  const [inv, setInventory] = useState(props.data.inventory);
  const [danger, setDanger] = useState(props.data.danger_inventory);
  const [unit, setUnit] = useState(props.data.sellingUnit);
  const [isEdit, setEdit] = useState(false);
  const { file = null, picMimetype = "" } = data;
  const url = binaryArrToUrl(file, picMimetype);
  const EditCurrent = (keyword) => {
    return isEdit ? (
      <Input
        defaultValue={data[keyword]}
        onChange={(e) => {
          setCurrent(e.target.value);
        }}
      />
    ) : (
      <span>{data[keyword]}</span>
    );
  };
  const EditCost = (keyword) => {
    return isEdit ? (
      <Input
        defaultValue={data[keyword]}
        onChange={(e) => {
          setCost(e.target.value);
        }}
      />
    ) : (
      <span>{data[keyword]}</span>
    );
  };
  const EditInventory = (keyword) => {
    return isEdit ? (
      <Input
        defaultValue={data[keyword]}
        onChange={(e) => {
          setInventory(e.target.value);
        }}
      />
    ) : (
      <span>{data[keyword]}</span>
    );
  };
  const EditUnit = (keyword) => {
    return isEdit ? (
      <Input
        defaultValue={data[keyword]}
        onChange={(e) => {
          setUnit(e.target.value);
        }}
      />
    ) : (
      <span>{data[keyword]}</span>
    );
  };
  const EditDanger = (keyword) => {
    return isEdit ? (
      <Input
        defaultValue={data[keyword]}
        onChange={(e) => {
          setDanger(e.target.value);
        }}
      />
    ) : (
      <span>{data[keyword]}</span>
    );
  };

  const ToEdit = () => {
    setEdit(true);
  };
  const comfirmEdit = () => {
    const [
      _id,
      currentPrice,
      cost,
      inventory,
      sellingUnit,
      danger_inventory,
      popularity,
      category,
      commodityName,
      file,
      picMimetype,
    ] = [
      data._id,
      Number(current),
      Number(costprice),
      Number(inv),
      unit,
      Number(danger),
      data.popularity,
      data.category,
      data.commodityName,
      data.file,
      data.picMimetype,
    ];
    const newData = {
      _id,
      currentPrice,
      cost,
      inventory,
      sellingUnit,
      danger_inventory,
      popularity,
      category,
      commodityName,
      picMimetype,
      file,
    };
    const sendData = {
      _id,
      currentPrice,
      cost,
      inventory,
      sellingUnit,
      danger_inventory,
    };
    httpUtil.updateCommodity(sendData).then((res) => {
      message.success("修改成功");
      setData(newData);
      setEdit(false);
    });
  };
  const deleteCommodity = (data) => {
    props.deleteCommodity(data);
  };
  return (
    <div className={style.auto}>
      <Card
        style={{ width: 300 }}
        size="small"
        cover={<Image width="230px" preview={false} src={url}></Image>}
        actions={[
          isEdit ? (
            <Button type="primary" size="small" onClick={comfirmEdit}>
              确认
            </Button>
          ) : (
            <EditOutlined key="edit" onClick={ToEdit} />
          ),
          <Popconfirm
            title="确定删除该商品吗?"
            onConfirm={() => deleteCommodity(data)}
            okText="确认"
            cancelText="取消"
          >
            <CloseOutlined key="ellipsis" />
          </Popconfirm>,
        ]}
      >
        <p
          style={{
            margin: "10PX 0 0 0 ",
            fontWeight: 900,
            height: 29,
            paddingLeft: 15,
            paddingRight: 15,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 18,
            textAlign: "center",
          }}
          title={data.commodityName}
        >
          {data.commodityName}
        </p>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: 10 }}>
              火爆：{"😍".repeat(data.popularity)}{" "}
            </div>
            <div style={{ marginLeft: "80px" }}>
              分类：{data.category.categoryName}
              <Divider style={{ margin: 0 }}></Divider>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: 10 }}>
              现价：{EditCurrent("currentPrice")}元
            </div>
            <div style={{ marginLeft: "46px" }}>
              成本：{EditCost("cost")}元{" "}
              <Divider style={{ margin: 0 }}></Divider>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: 10 }}>
              库存：{EditInventory("inventory")}袋
            </div>
            <div style={{ marginLeft: "40px" }}>
              销量：{data.salesVolume}袋 <Divider style={{ margin: 0 }} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: 10 }}>
              警戒库存：{EditDanger("danger_inventory")}袋
            </div>
            <div style={{ marginLeft: "33px" }}>
              售卖单位：{EditUnit("sellingUnit")}
              <Divider style={{ margin: 0 }} />
              <br />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
