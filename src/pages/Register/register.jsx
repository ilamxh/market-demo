import img from '../../bg.png'
import styles from './register.module.css'
import { Link } from 'react-router-dom';
import HttpUtil from '../../utils/httpUtil';
import {
  Button,
  Form,
  Input,
} from 'antd';
import React from 'react';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const Register = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const { nickname, account, password } = values
    HttpUtil.register({
      name: nickname,
      adminaccount: account,
      adminpwd: password
    }).then((res) => {
      if (res) {
          window.location.href = '/login'
      }
      })
  };
    return (
      <div className={styles.body}>
        <img className={styles.img} src={img} alt="" />
          <div className={styles.main} >
            <div className={styles.title}>请新建您的账号注册系统</div>
            <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
              <div className={styles.inputBox}>
                <Form.Item
                  name="nickname"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: '请输入你的姓名!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder='请输入你的姓名' className={styles.input1} />
                </Form.Item>
                <Form.Item
                  name="account"
                  rules={[
                    {
                      message: 'The input is not valid Account!',
                    },
                    {
                      required: true,
                      message: '请输入你的账号!',
                    },
                  ]}
                >
                  <Input placeholder='请输入你的账号' className={styles.input2} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入你的密码!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder='请输入你的密码' className={styles.input3} />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请确认你的密码!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('你输入的两次密码不一致!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder='请确认你的密码' className={styles.input4} />
                </Form.Item>
              </div>

              <Form.Item {...tailFormItemLayout}>
                <div className={styles.btnbox}>
                  <Button className={styles.btn1} type="primary" htmlType="submit">
                    注册
                  </Button>
                  <Link to='/login'>
                    <Button className={styles.btn2} type="primary" >返回</Button>
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
     
    );
  };


export default Register;
