import HttpUtil from "../../../../utils/httpUtil";
import { Form, message, Input, Row, Col, Divider, Select, Button } from "antd";
import { nanoid } from "nanoid";
import DescriptionWrapper from "../../../../common/descriptionWrapper/descriptionWrapper";
import ShowCommodities  from "./components/Showcommodities/showCommodities";
import  Addcommodities from "./components/Addcommodities/addcommodities";
import { SearchOutlined } from "@ant-design/icons";
import style from "../../auto.module.css";
import "../../home.css";
import React, { useEffect, useState } from "react";
const { Option } = Select;

export default function Commodities() {
    const[data,setData]=useState([])
    const[subCategory,setSub]=useState([])
    const[isAddcommodities,setAdd]=useState(false)
    const[count,setcount]=useState("1")
    const[pageSize,setPage]=useState("30")
    const[searchCondition,setSearch]=useState( {
        popularity: '',
        commodityName: '',
        category_id: '',
        inventoryStatus: ''
    })
    const [form] = Form.useForm();
    useEffect(()=>{
        HttpUtil.getCategories({ count:1, pageSize:6 }).then((res) => {
            setSub(res.data.data)
         })
        HttpUtil.getCommodities({
            count,
            pageSize,
            ...searchCondition
        })
            .then((res) => {
                console.log(res);
                setData(res.data.data)
            })
    },[])
  
    // 删除商品
    const deleteCommodity = (item) => {
        const curTotal = data.length + ''
        const { _id, category_id } = item
        HttpUtil.deleteCommodities({
            _id, category_id, curTotal
        }).then((res) => {
            setData(res.data.data)
            message.success(res.data.msg)

        })
    }
    const showCommodity = () => {
        return data.map((item, index) => {
            return (
                <Col span={6} style={{ marginBottom: 20 }} key={nanoid()}>
                    <ShowCommodities  data={item} deleteCommodity={deleteCommodity} />
                </Col>
            )
        })}
    const showCategoryList = () => {
        return subCategory.map((item, index) => {
            return (
                <Option value={`${item._id}`} key={nanoid()}>
                    {item.categoryName}
                </Option>
            )
        })
    }

    const searchCommodities = () => {
         const onFinish = (values) => {
             console.log(values);
            const {
                popularity = '',
                commodityName = '',
                category_id = '',
                inventoryStatus = ''
            } = values
            HttpUtil.getCommodities({ count, pageSize, popularity, commodityName, category_id, inventoryStatus }).then((res) => {
                message.success(res.data.message)
                console.log(res.data);
               setData(res.data.data)
            }
            )
        }

        return (
            <div>
                <Form
                    style={{ display: 'flex' }}
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
                    form={form}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className={style.form}
                >
                    <Form.Item name='popularity' label='火爆程度：'>

                        <Select
                            name="popularity"
                            style={{ width: 100 }}
                           
                        >
                            <Option value="4">😍X4</Option>
                            <Option value="3">😍X3</Option>
                            <Option value="2">😍X2</Option>
                            <Option value="1">😍X1</Option>
                            <Option value=''></Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='commodityName' label='商品名称'>
                        <Input
                            style={{ width: '200px' }}
                            name="commodityName"
                            className="CimInput"
                        />
                    </Form.Item>
                    <Form.Item name="category_id" label=' 商品分类' >
                        <Select
                            name="category_id"
                            value={subCategory}
                            style={{ width: 100 } }
                        >
                            {showCategoryList()}
                        </Select>
                    </Form.Item>
                    <Form.Item name="inventorystatus" label='库存状态'>

                        <Select
                            name="inventoryStatus"
                            style={{ width: 100 }}
                           
                        >
                            <Option value="1">充足</Option>
                            <Option value="0">需补货</Option>
                        </Select>
                    </Form.Item>
                    <Button
                        type="primary"
                        shape="circle"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={ToAddcommodities} type="primary" style={{ borderRadius: 5 }}>
                        添加商品
                    </Button>
                </Form>
            </div>
        )
    }
    const ToAddcommodities = () => {
       setAdd(true)
    }
    const goBack = () => {
       setAdd(false)
    }
    
        return (
            <div style={{ width: 1519 }} >
                <DescriptionWrapper
                    title='商品管理' details='仓库商品信息展示，可以进行新增商品，搜索商品，编辑商品，删除商品操作' />
                <Divider style={{ margin: 0 }} />
                {searchCommodities()}
                <div>

                    {isAddcommodities ?
                        <Addcommodities
                            goBack={goBack} 
                        />
                        :
                        <Row gutter={10} className={style.auto}>
                            {showCommodity()}
                        </Row>
                    }
                </div>
            </div>
        )
    


}
