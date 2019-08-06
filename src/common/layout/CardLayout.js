
export default (props) => {

  const titleStyle = {
    backgroundColor: 'rgb(96, 111, 132)',
    padding: '1em',
    color: '#fff',
  }

  const childStyle = {
    padding: '1em 0.5em',
    border: '1px solid rgb(96, 111, 132)'
  }

  return (
    <div>
      <div style={titleStyle}>{ props.title || ''}</div>
      <div style={childStyle}>
        {props.children}
      </div>
    </div>
  )

}
