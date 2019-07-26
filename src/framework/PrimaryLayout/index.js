import React from 'react';
import { Layout } from 'antd';
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

  return <Layout>
    <Header className="header" style={{ color: '#fff',padding: '0 20px'}}>
      <div>
        <div>product management</div>
      </div>
    </Header>
    <Layout className="ant-layout-has-sider" style={{ marginTop: '20px'}}>
      <Sider width={200} style={{ background: '#fff',minHeight:'calc(100vh - 108px)' }}>
        <LeftNav path={location.pathname} />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
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
