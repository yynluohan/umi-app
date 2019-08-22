import React from 'react';
import { Layout,Icon,Popover } from 'antd';
import LeftNav from './LeftNav';
import Breadcrumb from './Breadcrumb';
import dynamic from 'umi/dynamic';
import router from '@/config/path.js';
// import router from '@/config/router.config.js'
import Default404 from '../../pages/404';
import { getPath } from '../utils/parameter';
import styles from './style.css';

const { Header, Content, Sider } = Layout;

export default function PrimaryLayout({ location, children }) {

  const onQuery = () => {
    window.scrollTo(0,0);
    window.onbeforeunload = function() {
      var n = window.event.screenX - window.screenLeft;
      var b = n > document.documentElement.scrollWidth - 20;
      if (b && window.event.clientY < 0 || window.event.altKey) {
        // console.log("这是一个关闭操作");
      } else {
        window.scrollTo(0,0);
      }
    }
  }

  if (children) {
    onQuery()
  }

  function checkPath(data) {
    let isTrue = false;
    function mapPath(data) {
      data.map((item,index) =>{
        if (item.path) {
          if (item.path === getPath(window.location.hash)) {
            isTrue = true
          }
        }
        if (item.items && item.items.length > 0) {
          mapPath(item.items)
        }
      })
      return isTrue
    }
    return mapPath(data)
  }


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
    window.location.href = '#' + '/login'
  }

  const toDoContent = (
    <div title='退出登录'>
      <Icon type="logout" style={{cursor:'pointer'}} onClick={onLoginOut}/>
    </div>
  )

  const token = window.localStorage.token || '';

  return <Layout>
    {
      token ?
      <Header className="header" style={{ color: '#fff',padding: '0 20px',position: 'fixed',width:'100%',zIndex:1100}}>
        <div style={{ display: 'flex',justifyContent: 'space-between'}}>
          <div>mall management</div>
          <Popover content={toDoContent}>
            <span>{window.localStorage.username || ''}</span>
          </Popover>
        </div>
      </Header>
      : ''
    }

    <Layout className="ant-layout-has-sider" style={token ? { marginTop: '84px'} : {}}>
      {
        token ?
        <div className={styles.siderStyle}>
          <Sider width={200} style={{ background: '#fff',minHeight:'calc(100vh - 108px)'}}>
            <LeftNav path={location.pathname} />
          </Sider>
        </div>
        : ''
      }
      <Layout style={token ? { padding: '0 24px 24px' } : {}}>
        {/*<Breadcrumb path={location.pathname} />*/}
        <Content
          style={{
            background: '#fff',
            margin: 0,
            // minHeight: 280,
            minHeight: `calc(100vh - 108px)`,
          }}
        >
          {
            checkPath(router) ?
            <App />
            :
            <Default404 />
          }
        </Content>
      </Layout>
    </Layout>
  </Layout>
}
