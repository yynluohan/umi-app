import React from 'react'

class Index extends React.Component {

  componentDidMount() {
    this.getInter()
  }

  getInter = () => {
    const myVar = setInterval(function(){
      const time = document.getElementById("time") || '';
      if (time) {
        if (time.innerHTML == 0){
          clearInterval(myVar)
          window.location.href = '#/';
        } else {
          time.innerHTML = time.innerHTML-1;
        }
      }
     }, 1000);
  }

  render() {

    const time = document.getElementById("time");
    if (time) {
      this.getInter()
    }

    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height:'100%'
    }

    const contentStyle = {
      display: 'flex',
    }

    const textStyle = {
      margin: '0 2em'
    }

    const numberStyle = {
      fontSize: '100px',
      color: '#2196F3',
      textAlign: 'center'
    }

    const hrefStyle = {
      marginTop:'1em',
      textAlign: 'right',
      width:'100%',
      display: 'flex',
      justifyContent: 'flex-end'
    }

    return (
      <div style={style}>
        <div style={contentStyle}>
          <img src='https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg' alt=''/>
          <div style={textStyle}>
            <div style={numberStyle}>404</div>
            <div style={{fontSize: '20px',color: '#000'}}>抱歉，你访问的页面不存在</div>
            <div style={hrefStyle}>
              <div style={{display: 'flex',alignItems: 'center'}}>
                <span id='time' style={{fontSize: '20px',color: '#2196F3',marginRight:'0.5em'}}>5</span>
                秒自动返回首页
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}


export default Index
