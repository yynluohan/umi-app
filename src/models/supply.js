import { query, create, update } from '../framework/utils/services'
import { routerRedux } from 'dva/router'
import { getArgment } from '../framework/utils/parameter'
import tips from '../framework/utils/tips'

export default {
  namespace: 'supply',
  state: {
    item: {},
    id: ''
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const query = getArgment(location.search)
        if (location.pathname === '/supply/warehouseEdit' || location.pathname === '/supply/warehouseView' ||
            location.pathname === '/supply/purchaseOrderEdit' || location.pathname === '/supply/purchaseOrderView' ||
            location.pathname === '/supply/purchaseOrderPut' || location.pathname === '/supply/wmsApprove' ||
            location.pathname === '/supply/purchaseReturnEdit' || location.pathname === '/supply/purchaseReturnView' ||
            location.pathname === '/supply/putStorageEdit' || location.pathname === '/supply/putStorageView' ||
            location.pathname === '/supply/outStorageEdit' || location.pathname === '/supply/outStorageView' ||
            location.pathname === '/supply/transferEdit' || location.pathname === '/supply/transferView' ||
            location.pathname === '/supply/inventoryEdit' || location.pathname === '/supply/inventoryView' ||
            location.pathname === '/supply/goodsEdit' || location.pathname === '/supply/goodsView' ||
            location.pathname === '/supply/distributorEdit' || location.pathname === '/supply/distributorView' ||
            location.pathname === '/supply/supplierEdit' || location.pathname === '/supply/supplierView' ||
            location.pathname === '/supply/distributorOutEdit' || location.pathname === '/supply/distributorOutView' ||
            location.pathname === '/supply/putStorageApprove' || location.pathname === '/supply/outStorageApprove' ||
            location.pathname === '/supply/transferApprove' || location.pathname === '/supply/inventoryCheck' ||
            location.pathname === '/supply/inventoryCheckAgain' || location.pathname === '/supply/distributorOutApprove'
        ) {
          const obj = {
            '/supply/warehouseEdit': `/api/wms/warehouses/${query.id}`,
            '/supply/warehouseView': `/api/wms/warehouses/${query.id}`,
            '/supply/purchaseOrderEdit': `/api/wms/procurements/${query.id}`,
            '/supply/purchaseOrderView': `/api/wms/procurements/${query.id}`,
            '/supply/purchaseReturnEdit': `/api/wms/refunds/${query.id}`,
            '/supply/purchaseOrderPut': `/api/wms/procurements/${query.id}`,
            '/supply/purchaseReturnView': `/api/wms/refunds/${query.id}`,
            '/supply/putStorageEdit': `/api/wms/storages/in/${query.id}`,
            '/supply/putStorageView': `/api/wms/storages/in/${query.id}`,
            '/supply/outStorageEdit': `/api/wms/storages/out/${query.id}`,
            '/supply/outStorageView': `/api/wms/storages/out/${query.id}`,
            '/supply/transferEdit': `/api/wms/transfers/${query.id}`,
            '/supply/transferView': `/api/wms/transfers/${query.id}`,
            '/supply/inventoryEdit': `/api/wms/checks/${query.id}`,
            '/supply/inventoryView': `/api/wms/checks/${query.id}`,
            '/supply/goodsEdit': `/api/wms/skus/${query.id}`,
            '/supply/goodsView': `/api/wms/skus/${query.id}`,
            '/supply/distributorEdit': `/api/warehouse/traders/${query.id}`,
            '/supply/distributorView': `/api/warehouse/traders/${query.id}`,
            '/supply/supplierEdit': `/api/wms/suppliers/${query.id}`,
            '/supply/supplierView': `/api/wms/suppliers/${query.id}`,
            '/supply/distributorOutEdit': `/api/warehouse/sales/${query.id}`,
            '/supply/distributorOutView': `/api/warehouse/sales/${query.id}`,
            '/supply/wmsApprove': `/api/wms/refunds/${query.id}`,
            '/supply/putStorageApprove': `/api/wms/storages/in/${query.id}`,
            '/supply/outStorageApprove': `/api/wms/storages/out/${query.id}`,
            '/supply/transferApprove': `/api/wms/transfers/${query.id}`,
            '/supply/inventoryCheck': `/api/wms/checks/${query.id}`,
            '/supply/inventoryCheckAgain': `/api/wms/checks/${query.id}`,
            '/supply/distributorOutApprove': `/api/warehouse/sales/${query.id}`
          }
          dispatch({
            type: 'save',
            payload: {
              id: query.id
            }
          })
          dispatch({
            type: 'onView',
            payload: {
              url: obj[location.pathname]
            }
          })
        }
      })
    }
  },

  effects: {

    *onView({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(query, payload.url)
      if (result.code === 200) {
        yield put({
          type: 'save',
          payload: {
            item: result.data || {}
          }
        })
      }
    },

    // 添加仓库
    * addWarehouse ({ payload }, { call, put }) {
      const result = yield call(create, '/api/wms/warehouses', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 修改仓库
    * updateWarehouse ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/warehouses/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加采购订单
    * addPurchaseOrder ({ payload }, { call, put }) {
      const result = yield call(create, '/api/wms/procurements', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 修改采购订单
    * updatePurchaseOrder ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/procurements/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 采购订单提交审核
    * submitApprovePurchaseOrder ({ payload }, { call, put }) {
      const result = yield call(update, `/api/wms/procurements/${payload.id}/audit`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 采购订单入库
    * addPurchaseOrderPut ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/procurements/${id}/execution`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加采购退货
    * addPurchaseReturn ({ payload }, { call, put }) {
      const result = yield call(create, '/api/wms/refunds', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 修改采购退货
    * updatePurchaseReturn ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/refunds/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 采购退货提交审核
    * submitApprovePurchaseReturn ({ payload }, { call, put }) {
      const result = yield call(update, `/api/wms/refunds/${payload.id}/audit`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 采购退货审核拒绝
    * purchaseReturnApproveReject ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/refunds/${id}/closed`)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 采购退货审核通过
    * purchaseReturnApprovePass ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/refunds/${id}/passed`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加入库
    * addPutStorage ({ payload }, { call, put }) {
      const result = yield call(create, '/api/wms/storages/in', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑入库
    * updatePutStorage ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/storages/in/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 入库提交审核
    * submitApprovePutStorage ({ payload }, { call, put }) {
      const result = yield call(update, `/api/wms/storages/in/${payload.id}/audit`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 入库审核拒绝
    * putStorageApproveReject ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/storages/in/${id}/closed`)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 入库审核通过
    * putStorageApprovePass ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/storages/in/${id}/pass`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加出库
    * addOutStorage ({ payload }, { call, put }) {
      const result = yield call(create, '/api/wms/storages/out', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑出库
    * updateOutStorage ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/storages/out/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 出库提交审核
    * submitApproveOutStorage ({ payload }, { call, put }) {
      const result = yield call(update, `/api/wms/storages/out/${payload.id}/audit`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 出库审核拒绝
    * outStorageApproveReject ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/storages/out/${id}/closed`)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 出库审核通过
    * outStorageApprovePass ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/storages/out/${id}/pass`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加调拨
    * addTransfer ({ payload }, { call, put }) {
      const result = yield call(create, '/api/wms/transfers', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑调拨
    * updateTransfer ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/transfers/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 调拨提交审核
    * submitApproveTransfer ({ payload }, { call, put }) {
      const result = yield call(update, `/api/wms/transfers/${payload.id}/audit`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 调拨审核拒绝
    * transferApproveReject ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/transfers/${id}/closed`)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 调拨审核通过
    * transferApprovePass ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/transfers/${id}/pass`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加盘点
    * addInventory ({ payload }, { call, put }) {
      const result = yield call(create, '/api/wms/checks', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑盘点
    * updateInventory ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/checks/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 库存盘点-盘点
    * inventoryCheck ({ payload }, { call, put }) {
      const result = yield call(update, `/api/wms/checks/${payload.id}/checking`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 库存盘点-继续盘点
    * inventoryCheckAgain ({ payload }, { call, put }) {
      const result = yield call(update, `/api/wms/checks/${payload.id}/checking`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加商品
    * addGoods ({ payload }, { call, put }) {
      const result = yield call(create, '/api/wms/skus', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑商品
    * updateGoods ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/skus/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加分销商
    * addDistributor ({ payload }, { call, put }) {
      const result = yield call(create, '/api/warehouse/traders', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑分销商
    * updateDistributor ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/warehouse/traders/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加供应商
    * addSupplier ({ payload }, { call, put }) {
      const result = yield call(create, '/api/wms/suppliers', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑供应商
    * updateSupplier ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/wms/suppliers/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 添加分销订单
    * addDistributorOut ({ payload }, { call, put }) {
      const result = yield call(create, '/api/warehouse/sales', payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 编辑分销订单
    * updateDistributorOut ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/warehouse/sales/${id}`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 分销商出库-提交审核
    * submitApproveDistributorOut ({ payload }, { call, put }) {
      const result = yield call(update, `/api/warehouse/sales/${payload.id}/audit`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 分销商出库-审核拒绝
    * distributorOutApproveReject ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/warehouse/sales/${id}/closed`)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    },

    // 分销商出库-审核通过
    * distributorOutApprovePass ({ payload }, { call, put, select }) {
      const { id } = yield select(({ supply }) => supply)
      const result = yield call(update, `/api/warehouse/sales/${id}/pass`, payload)
      tips.lookMes(result.code, result.message)
      if (result.code === 200) {
        yield put(routerRedux.goBack())
      }
    }

  },
  reducers: {
    save (state, action) {
      return { ...state, ...action.payload }
    }
  }

}
