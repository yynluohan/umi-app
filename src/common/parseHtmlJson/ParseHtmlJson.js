import styles from './ParseHtmlJson.css';

const ParseHtmlJson = ({
  htmlJson='',
}) => {

  const createMarkup =(text)=> {
    return { __html: text };
  };

  return(
    <div className={styles.particulars}>
      {htmlJson ? (
        <div dangerouslySetInnerHTML={createMarkup(htmlJson)}></div>
      ):'未能获取信息'}
    </div>
  )
}


export default ParseHtmlJson;
