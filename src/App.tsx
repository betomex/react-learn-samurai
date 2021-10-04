import React, {ComponentType} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import {appStateType} from "./redux/reduxStore";
import {UsersPage} from "./components/Users/UsersPage";
import {LoginPage} from './components/Login/LoginPage';

import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Header} from './components/Header/Header';
import {NotFound} from "./components/common/NotFound";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));

type mapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
  initializeApp: () => void
}

class App extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return <Layout>
      <Header/>
      <Content style={{padding: '0 50px'}}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%'}}
            >
              <SubMenu key="sub1" icon={<UserOutlined/>} title="Profile">
                <Menu.Item key="1">
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/dialogs">Messages</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                <Menu.Item key="3">
                  <Link to="/developers">Users</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Chat">
                <Menu.Item key="4">
                  <Link to="/chat">Chat</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{padding: '0 24px', minHeight: 280}}>
            <React.Suspense fallback={<Preloader/>}>
              <Switch>
                <Route exact path="/" render={() =>
                  <Redirect from="/" to="/profile"/>
                }/>
                <Route exact path="/dialogs" render={() =>
                  <DialogsContainer/>
                }/>
                <Route path="/profile/:userID?" render={() =>
                  <ProfileContainer/>
                }/>
                <Route path="/developers" render={() =>
                  <UsersPage pageTitle={"Пользователи"}/>
                }/>
                <Route path="/login" render={() =>
                  <LoginPage/>
                }/>
                <Route path="/chat" render={() =>
                  <ChatPage/>
                }/>
                <Route render={() =>
                  <NotFound/>
                }/>
              </Switch>
            </React.Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{textAlign: 'center'}}>betomex learn-react-samurai 2021</Footer>
    </Layout>
  }
}

const mapStateToProps = (state: appStateType) => {
  return {
    initialized: state.app.initialized
  }
}

const mapDispatchToProps = {
  initializeApp
}

export default compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);