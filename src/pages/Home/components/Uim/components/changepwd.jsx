import {message, Input, Space, PageHeader, Button } from 'antd'
import React, { useState } from 'react'
import httpUtil from '../../../../../utils/httpUtil';
import styles from '../uim.module.css'


export default function Changepwd(props) {
    const{goback,record}=props
    const[value,setvalue]=useState('')
   const getValue=(e)=>{
        const value = e.target.value
        setvalue(value)
    }
   const finishChange = (id) => {
        httpUtil.updatePwd(
            {
                "_id": id,
                "modifiedpassword": value
            }
        ).then(
            (res) => {
                message.success('密码修改成功');
                window.location.href = '/home/uim'
            }
        )
    }
  return (
               <div style={{position:'relative'}}>
                   <br />
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        goback()
                    }}
                    subTitle="用户信息管理/修改用户密码"
                    style={{height:40,paddingTop:5,backgroundColor:'white'}}
                />
          <br/>
        <div className={styles.main} >
        用户姓名：{record.name}<br />
                用户账号：{record.useraccount}<br />
                原密码：{record.userpwd}<br />
                新密码：
                <Space direction="vertical">
                    <Input.Password onChange={getValue} placeholder="输入新密码" />
                    <Button onClick={() => finishChange(record._id)} type='primary'>提交修改</Button>
                </Space>
        </div>
               
            </div>
  )
}

