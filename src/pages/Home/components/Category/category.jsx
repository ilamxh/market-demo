import { Popconfirm, Input, Space, Button, Divider, List, message } from "antd";
import HttpUtil from "../../../../utils/httpUtil";
import DescriptionWrapper from "../../../../common/descriptionWrapper/descriptionWrapper";
import React, { useEffect, useState } from "react";

export default function Category() {
  const [isAddCategory, setAdd] = useState(false)
  const [datas, setDatas] =useState ([]);
  const [value,setValue]=useState('')
  useEffect(() => {
    HttpUtil.getCategories({
      count: 1,
      pageSize: 10,
    }).then((res) => {
      const { data } = res.data;
      setDatas(data);
    });
  });
  const AddCategoryIsTrue = () => {
    setAdd(true);
  };
  const AddCategoryIsFalse = () => {
    setAdd(false);
  };
  const getValue = (e) => {
    const value = e.target.value;
     setValue(value)
  };
  const AddCategory = () => {
    HttpUtil.addCategory({
      categoryName:value,
      curTotal: "0",
    }).then((res) => {
      message.success("商品新增成功");
    });
  };
  const deleteCategory = (items) => {
    const curTotal = datas.length;
    HttpUtil.deleteCategory({
      _id: items,
      curTotal: curTotal,
    }).then((res) => {
      message.success("商品分类删除成功");
    });
  };
  return (
    <div>
      <DescriptionWrapper
        title="分类管理"
        details="商品分类展示，新增分类，删除分类"
      />
      <Divider style={{ margin: 0 }} />
      <Space style={{ marginTop: 20 }} size={20}>
        {isAddCategory ? (
          <>
            <div>
              分类名称:
              <Input
                onChange={getValue}
                name="category"
                className="CimInput"
             
              />
            </div>
            <Button
              type="primary"
              style={{ borderRadius: 5 }}
              onClick={AddCategory}
            >
              确定
            </Button>
            <Button
              type="primary"
              danger
              style={{ borderRadius: 5 }}
              onClick={AddCategoryIsFalse}
            >
              取消
            </Button>
          </>
        ) : (
          <Button
            type="primary"
            style={{ borderRadius: 5 }}
            onClick={AddCategoryIsTrue}
          >
            新增分类
          </Button>
        )}
      </Space>
   <div style={{marginTop:10}}>
   <List
        itemLayout="horizontal"
        dataSource={datas}
        renderItem={(items) => (
          <List.Item>
            <List.Item.Meta
              title={`${items.categoryName}类`}
              description={`共计商品${items.total}个`}
              style={{textIndent:15}}
            ></List.Item.Meta>
            <Button type="primary" danger style={{ borderRadius: 5,marginRight:50 }}>
              <Popconfirm
                title="确定删除该分类吗?"
                onConfirm={deleteCategory.bind(this, items._id)}
                okText="确认"
                cancelText="取消"
              >
                删除分类
              </Popconfirm>
            </Button>
          </List.Item>
        )}
      />
   </div>

    </div>
  );
}
