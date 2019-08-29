import React from 'react';
import { connect } from 'dva';
import { Form,Col,Row,Button } from 'antd';
import FormIemView from '../../common/FormIemView'

const FormItem = Form.Item;

const formItemLayout = (a,b) => {
  return {
    labelCol: {
      span: a || 6,
    },
    wrapperCol: {
      span: b || 18,
    },
  }
};

const ProductView = ({ product }) => {

  const { item } = product;

  const showPartnerLevelZone = {
    '1':'零元区',
    '2':'精品区',
    '3':'特价区',
  }

  const showPromoted = {
    '1': '是',
    '2': '否',
    undefined: ''
  }

  const showRequiredParticipateExam = {
    '1': '是',
    '0': '否',
    undefined: ''
  }

  const showAllowCoupon = {
    '1': '允许使用',
    '0': '不允许使用',
    undefined: ''
  }

  const showStatus = {
    'DRAFT':'草稿',
    'PENDING_APPROVAL': '待审核',
    'APPROVED': '已审核',
    'ONSELL':'上架',
    'OFFSELL': '下架',
    undefined: ''
  }

  const formItemProps = {
    isHiddenBackBut: true,
    title: '产品详情',
    list: [
      {label:'产品名称',data: item.name},
      {label:'缩略名称',data:item.shortName},
      {label:'品牌',data:item.brandName},
      {label:'品牌logo',data:(<a href={item.logo} target="_blank">{item.logo}</a>)},
      {label:'排序号',data:item.sortOrder},
      {label:'推荐',data:showPromoted[item.promoted]},
      {label:'分区',data:item.partnerLevelZone ? showPartnerLevelZone[item.partnerLevelZone] : ''},
      {label:'价格',data:item.price},
      {label:'积分',data:item.point},
      {label:'成本价',data:item.costPrice},
      {label:'建议售价',data:item.suggestedPrice},
      {label:'重量(克)',data:item.weight},
      {label:'体积(立方厘米)',data:item.bulk},
      {label:'状态',data:showStatus[item.status],},
      {label:'类别',data:item.categoryId},
      {label:'产品单位',data:item.unit},
      {label:'条形码',data:item.barCode},
      {label:'运费模板',data:(<a onClick={() => window.location.href=`#/product/freightView?id=${item.fareId}`}>{item.fareName}</a>),},
      {label:'参与检查才可购买',data:showRequiredParticipateExam[item.requiredParticipateExam]},
      {label:'优惠活动-积分',data:item.credit},
      {label:'优惠活动-优惠券',data:showAllowCoupon[item.allowCoupon]},
    ]
  }

  const createHtml = (text) => {
    return {
      __html: text
    }
  }


  return (
    <div>
      <FormIemView {...formItemProps}/>
        <Form>
          <Row>
            <Col span={24}>
              <FormItem label='封面' hasFeedback {...formItemLayout(3,20)}>
                {
                  item.productImageList && item.productImageList.length > 0 && item.productImageList.map((item,index) => (
                    <div key={index}>
                      <a href={item.url} target='_black'>{item.url}</a>
                    </div>
                  ))
                }
              </FormItem>
           </Col>
           <Col span={24}>
             <FormItem label='描述' hasFeedback {...formItemLayout(3,20)}>
              {
                item.productDescription && item.productDescription.description ?
                <div dangerouslySetInnerHTML={createHtml(item.productDescription.description)}></div>
                : ''
              }
             </FormItem>
          </Col>
          </Row>
          <div style={{textAlign:'right',margin:'2em'}}>
            <Button type='primary' onClick={() => window.history.go(-1)}>返回</Button>
          </div>
        </Form>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(ProductView);
