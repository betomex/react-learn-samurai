import React from 'react';

import './Header.css';
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin} from "../../redux/selectors/authSelectors";
import {deleteLogin} from "../../redux/authReducer";

export const Header: React.FC = () => {
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectLogin)

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(deleteLogin())
  }

  return <Layout.Header>
    <Row>
      <Col span={20}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
        </Menu>
      </Col>
      <Col span={4}>
        {isAuth
          ? <Space>
            <Avatar style={{backgroundColor: 'yellowgreen'}} icon={<UserOutlined/>} alt={login || ''}/>
            <Button onClick={logout}>Logout</Button>
          </Space>
          : <Link to={'/login'}>Login</Link>
        }
      </Col>
    </Row>
  </Layout.Header>
}