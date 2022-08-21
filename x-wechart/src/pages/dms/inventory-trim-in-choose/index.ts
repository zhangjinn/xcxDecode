import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { DMS_ORDER_CHOOSE_ITEM_INFO, DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR } from '@/store/types/dmsorder';
import { getProductListLikeCode, getItemInvStatus, getCisPrice, getInvStatusType } from '@/store/actions/dmsorder';
import { debounce } from 'throttle-debounce';
import { ORDER_RETURN_STOCK, GOODS_CHOOSE_INFO } from '@/store/types/return-stock';
import { getBaseData } from '@/store/actions/purchaseshop';
import {RESET_INVENTORY_QUERIES_LIST_IN} from '@/store/types/inventory';
import { getInventoryQueriesListIn } from '@/store/actions/inventory';

interface Data {
  productCode: string
  key: string
  orgId: string
  store:String
  pageNo:String
  model:String
}

@connect({
  likePaging({ dmsorder }) {
    return dmsorder.likePaging
  },
  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  },
  inventoryListIn({ inventory }) {
    return inventory.inventoryListIn
  }
}, {
  getProductListLikeCode,
  getItemInvStatus,//获取库存状态
  getCisPrice,
  getInvStatusType,//补差类型
  getBaseData,
  getInventoryQueriesListIn
})
export default class OrderItemChoose extends wepy.page {
  config = {
    navigationBarTitleText: '产品信息',
    usingComponents: {
      "van-search": "/components/vant/search/index"
    },
  };

  data: Data = {
    productCode: '',
    key: '',
    orgId: '',
    store:'',
    pageNo:'1',
    model:''
  };

  methods = {
    onGetOrderListNext(){
      this.pageNo = Number(this.pageNo + 1)
      this.myGetOrderList(this.model,this.pageNo)
    },
    onChange: debounce(500, ({ detail }: wepy.Event) => {
      this.productCode = detail
      this.$apply()
      if ((detail || '').trim().length >= 3) {
        this.methods.onSearch({ detail }, this)
      }
    }),
    onSearch: ({ detail }: wepy.Event) => {
      //this.methods.getProductListLikeCode({ productCode: (detail || '').trim() })

      getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST_IN, payload: [] })
      this.model = detail
      this.myGetOrderList(detail,this.pageNo)
    },
    // 选择入库产品信息
    chooseItem: (index: number) => {
      //const chooseItem = this.likePaging[index]
      let oneItem = this.inventoryListIn[index];
      const chooseItem = {
        bigQty: oneItem.bigQty,
        colour: oneItem.colour,
        materialGroupId: '',
        model: oneItem.model,
        productCode: oneItem.productCode,
        productName: oneItem.productName,
        uom: oneItem.uom,
        volume: oneItem.volume,
      };
      
      if (this.key !== '') {
        this.methods.getItemInvStatus({
          productCode: chooseItem.productCode
        }).then((res: any) => {
          const item = {
            key: this.key,
            chooseItem,
            stock: res.payload
          }
          getStore().dispatch({
            type: ORDER_RETURN_STOCK,
            payload: item
          })
        })
      } else {
        if (this.additionOrderDetailItem.orgId || this.additionOrderDetailItem.shopCisCode) {
          const key = this.additionOrderDetailItem.chooseItemId
          // 本key选择其他商品时才更新价格之类的信息，同一个商品不用更新价格
          if (this.additionOrderDetailItem.itemInfo[key].productCode !== chooseItem.productCode) {
            this.methods.getCisPrice({
              type: this.additionOrderDetailItem.shopCisCode != '' ? '3' : '2',
              orgId: this.additionOrderDetailItem.orgId,
              cisCode: this.additionOrderDetailItem.cisCode,
              shopCisCode: this.additionOrderDetailItem.shopCisCode,
              productId: chooseItem.productCode,
              refreshPrice: true,
            })
          }
        }

        this.methods.getItemInvStatus({
          productCode: chooseItem.productCode
        });

        //获取仓库
        /*
        this.methods.getBaseData({
          type: 'cglrrkck' // 入库仓库
        }).then((res: any) => {
          const {itemInfo} = this.additionOrderDetailItem;
          let list = res.payload.data;
          let key = this.additionOrderDetailItem.chooseItemId;
          itemInfo[key].inWarehouseList = list.map((item: Object) => {
            for (const key in item) {
              return {
                key: key,
                value: item[key]
              }
            }
          });
          //添加请选择
          let nullWare = {
            key: "",
            value: "请选择"
          }
          itemInfo[key].inWarehouseList.unshift(nullWare)

          getStore().dispatch({
            type: DMS_ORDER_CHOOSE_ITEM_INFO,
            payload: chooseItem
          })

        });
        */

        //获取补差类型
        this.methods.getInvStatusType().then((res: any) => {
          const {itemInfo} = this.additionOrderDetailItem;
          let list = res.payload.data;
          let key = this.additionOrderDetailItem.chooseItemId;
          itemInfo[key].invStateTypes = list.map((item: Object) => {
            for (const key in item) {
              return {
                key: key,
                value: item[key]
              }
            }
          });
          //添加请选择
          let nullWare = {
            key: "",
            value: "请选择"
          }
          itemInfo[key].invStateTypes.unshift(nullWare)
          this.$apply()
        });

        getStore().dispatch({
          type: DMS_ORDER_CHOOSE_ITEM_INFO,
          payload: chooseItem
        })
      }

      wx.navigateBack({
        delta: 1
      })
      // {colour: "标准", productCode: "352662248", bigQty: 1, model: "LED55N3700U", productName: "Z.彩电.LED55N3700U.T.D7.中国C."}bigQty: 1colour: "标准"model: "LED55N3700U"productCode: "352662248"productName: "Z.彩电.LED55N3700U.T.D7.中国C."__proto__: Object
    },

  };

  myGetOrderList(model: any,pageNo:any) {
    //const { model, colour, warehouseId, invStatusId,invStatusType, isLock, dealerMaterialGroupFlag, materialGroupCode, materialGroupName,gicWarehouseType, pageNo, invType } = this.filterForm
    this.methods.getInventoryQueriesListIn({//产品信息查询列表
      cisCode : wepy.$instance.globalData.cisCode,
      warehouseId : "",
      productCode : model,
      page : {
        pageSize : 100,
        pageNo : pageNo
      },
      _loading: true,
      // cisCode: wepy.$instance.globalData.cisCode,
      // terms: {
      //   model: model,
      //   colour: '',
      //   warehouseId: this.store,
      //   invStatusId: '',
      //   isLock: '',
      //   dealerMaterialGroupFlag: '',
      //   materialGroupCode: '',
      //   materialGroupName: '',
      //   gicWarehouseType: '',
      //   invStatusType: '',
      //   invType: '',
      //   bigQtyMin: 0,  //最小可用库存数量,dms后台取 >0 的结果
      //   orgId: this.orgId
      // },
      // page: { pageNo: 1, pageSize: 100 }
    });
  }

  onLoad(e: { key: any }) {
    this.orgId = e.orgId
    this.store = e.store
    const { key } = e
    if (key) {
      this.key = key
    } else {
      this.key = ''
    }

   /* if(orgId){
      this.orgId = orgId
    }else{
      this.orgId = ''
    }*/
    // getStore().dispatch({
    //   type: DMS_ORDER_CHOOSE_ITEM_INFO,
    //   payload: {
    //     model: 'xxx',
    //     color: `${Math.random()}色`
    //   }
    // })

    //清除产品查询列表
    getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST_IN, payload: [] })
  }

  onUnload() {
    getStore().dispatch({
      type: DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR,
    })
  }
}
