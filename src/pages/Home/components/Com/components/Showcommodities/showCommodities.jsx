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
      message.success("????????????");
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
              ??????
            </Button>
          ) : (
            <EditOutlined key="edit" onClick={ToEdit} />
          ),
          <Popconfirm
            title="?????????????????????????"
            onConfirm={() => deleteCommodity(data)}
            okText="??????"
            cancelText="??????"
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
              ?????????{"????".repeat(data.popularity)}{" "}
            </div>
            <div style={{ marginLeft: "80px" }}>
              ?????????{data.category.categoryName}
              <Divider style={{ margin: 0 }}></Divider>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: 10 }}>
              ?????????{EditCurrent("currentPrice")}???
            </div>
            <div style={{ marginLeft: "46px" }}>
              ?????????{EditCost("cost")}???{" "}
              <Divider style={{ margin: 0 }}></Divider>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: 10 }}>
              ?????????{EditInventory("inventory")}???
            </div>
            <div style={{ marginLeft: "40px" }}>
              ?????????{data.salesVolume}??? <Divider style={{ margin: 0 }} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: 10 }}>
              ???????????????{EditDanger("danger_inventory")}???
            </div>
            <div style={{ marginLeft: "33px" }}>
              ???????????????{EditUnit("sellingUnit")}
              <Divider style={{ margin: 0 }} />
              <br />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
