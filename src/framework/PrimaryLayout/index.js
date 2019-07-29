import React from 'react';
import { Layout,Icon,Popover } from 'antd';
import LeftNav from './LeftNav';
import Breadcrumb from './Breadcrumb';
import dynamic from 'umi/dynamic';

const { Header, Content, Sider } = Layout;

export default function PrimaryLayout({ location, children }) {

  const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
  const App = dynamic({
    loader: async function() {
      await delay(100);
      return () => <div>{children}</div>;
    },
    loading: () => <div>loading...</div>
  });

  function onLoginOut() {
    window.localStorage.token = '';
    window.location.href = window.MC.HASH + '/login'
  }

  const toDoContent = (
    <Icon type="logout" style={{cursor:'pointer'}} onClick={onLoginOut}/>
  )

  const token = window.localStorage.token || '';

  return <Layout>
    {
      token ?
      <Header className="header" style={{ color: '#fff',padding: '0 20px'}}>
        <div style={{ display: 'flex',justifyContent: 'space-between'}}>
          <div>product management</div>
          <Popover content={toDoContent} placement='left'>
            <span>admin</span>
          </Popover>
        </div>
      </Header>
      : ''
    }

    <Layout className="ant-layout-has-sider" style={token ? { marginTop: '20px'} : {}}>
      {
        token ?
        <Sider width={200} style={{ background: '#fff',minHeight:'calc(100vh - 108px)' }}>
          <LeftNav path={location.pathname} />
        </Sider>
        : ''
      }
      <Layout style={token ? { padding: '0 24px 24px' } : {}}>
        {/*<Breadcrumb path={location.pathname} />*/}
        <Content
          style={{
            background: '#fff',
            margin: 0,
            // marginTop:'1em' ,
            minHeight: 280,
          }}
        >
          <App />
        </Content>
      </Layout>
    </Layout>
  </Layout>
}
