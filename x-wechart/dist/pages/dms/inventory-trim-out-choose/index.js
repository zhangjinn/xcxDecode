"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var dmsorder_1 = require('./../../../store/types/dmsorder.js');
var dmsorder_2 = require('./../../../store/actions/dmsorder.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var return_stock_1 = require('./../../../store/types/return-stock.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var inventory_1 = require('./../../../store/types/inventory.js');
var inventory_2 = require('./../../../store/actions/inventory.js');
var OrderItemChoose = /** @class */ (function (_super) {
    __extends(OrderItemChoose, _super);
    function OrderItemChoose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '产品信息',
            usingComponents: {
                "van-search": "/components/vant/search/index"
            },
        };
        _this.data = {
            productCode: '',
            key: '',
            orgId: '',
            store: '',
        };
        _this.methods = {
            onChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.productCode = detail;
                _this.$apply();
                if ((detail || '').trim().length >= 3) {
                    _this.methods.onSearch({ detail: detail }, _this);
                }
            }),
            onSearch: function (_a) {
                //this.methods.getProductListLikeCode({ productCode: (detail || '').trim() })
                var detail = _a.detail;
                wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
                _this.myGetOrderList(detail);
            },
            chooseItem: function (index) {
                //const chooseItem = this.likePaging[index]
                var oneItem = _this.inventoryList[index];
                var chooseItem = {
                    bigQty: oneItem.bigQty,
                    colour: oneItem.colour,
                    materialGroupId: '',
                    model: oneItem.model,
                    productCode: oneItem.productCode,
                    productName: oneItem.productName,
                    uom: oneItem.uom,
                    volume: oneItem.volume,
                    invStatusId: oneItem.invStatusId,
                    invStatusName: oneItem.invStatusName,
                    invStatusType: oneItem.invStatusType,
                    invStatusTypeName: oneItem.invStatusTypeName,
                };
                if (_this.key !== '') {
                    _this.methods.getItemInvStatus({
                        productCode: chooseItem.productCode
                    }).then(function (res) {
                        var item = {
                            key: _this.key,
                            chooseItem: chooseItem,
                            stock: res.payload
                        };
                        wepy_redux_1.getStore().dispatch({
                            type: return_stock_1.ORDER_RETURN_STOCK,
                            payload: item
                        });
                    });
                }
                else {
                    if (_this.additionOrderDetailItem.orgId || _this.additionOrderDetailItem.shopCisCode) {
                        var key = _this.additionOrderDetailItem.chooseItemId;
                        // 本key选择其他商品时才更新价格之类的信息，同一个商品不用更新价格
                        if (_this.additionOrderDetailItem.itemInfo[key].productCode !== chooseItem.productCode) {
                            _this.methods.getCisPrice({
                                type: _this.additionOrderDetailItem.shopCisCode != '' ? '3' : '2',
                                orgId: _this.additionOrderDetailItem.orgId,
                                cisCode: _this.additionOrderDetailItem.cisCode,
                                shopCisCode: _this.additionOrderDetailItem.shopCisCode,
                                productId: chooseItem.productCode,
                                refreshPrice: true,
                            });
                        }
                    }
                    _this.methods.getItemInvStatus({
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
                    _this.methods.getInvStatusType().then(function (res) {
                        var itemInfo = _this.additionOrderDetailItem.itemInfo;
                        var list = res.payload.data;
                        var key = _this.additionOrderDetailItem.chooseItemId;
                        itemInfo[key].invStateTypes = list.map(function (item) {
                            for (var key_1 in item) {
                                return {
                                    key: key_1,
                                    value: item[key_1]
                                };
                            }
                        });
                        //添加请选择
                        var nullWare = {
                            key: "",
                            value: "请选择"
                        };
                        itemInfo[key].invStateTypes.unshift(nullWare);
                        _this.$apply();
                    });
                    wepy_redux_1.getStore().dispatch({
                        type: dmsorder_1.DMS_ORDER_CHOOSE_ITEM_INFO,
                        payload: chooseItem
                    });
                }
                wx.navigateBack({
                    delta: 1
                });
                // {colour: "标准", productCode: "352662248", bigQty: 1, model: "LED55N3700U", productName: "Z.彩电.LED55N3700U.T.D7.中国C."}bigQty: 1colour: "标准"model: "LED55N3700U"productCode: "352662248"productName: "Z.彩电.LED55N3700U.T.D7.中国C."__proto__: Object
            },
        };
        return _this;
    }
    OrderItemChoose.prototype.myGetOrderList = function (model) {
        //const { model, colour, warehouseId, invStatusId,invStatusType, isLock, dealerMaterialGroupFlag, materialGroupCode, materialGroupName,gicWarehouseType, pageNo, invType } = this.filterForm
        this.methods.getInventoryQueriesList({
            _loading: true,
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            terms: {
                model: model,
                colour: '',
                warehouseId: this.store,
                invStatusId: '',
                isLock: '',
                dealerMaterialGroupFlag: '',
                materialGroupCode: '',
                materialGroupName: '',
                gicWarehouseType: '',
                invStatusType: '',
                invType: '',
                bigQtyMin: 0,
                orgId: this.orgId
            },
            page: { pageNo: 1, pageSize: 100 }
        });
    };
    OrderItemChoose.prototype.onLoad = function (e) {
        this.orgId = e.orgId;
        this.store = e.store;
        var key = e.key;
        if (key) {
            this.key = key;
        }
        else {
            this.key = '';
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
        wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
    };
    OrderItemChoose.prototype.onUnload = function () {
        wepy_redux_1.getStore().dispatch({
            type: dmsorder_1.DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR,
        });
    };
    OrderItemChoose = __decorate([
        wepy_redux_1.connect({
            likePaging: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.likePaging;
            },
            additionOrderDetailItem: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseItemInfo;
            },
            inventoryList: function (_a) {
                var inventory = _a.inventory;
                return inventory.inventoryList;
            }
        }, {
            getProductListLikeCode: dmsorder_2.getProductListLikeCode,
            getItemInvStatus: dmsorder_2.getItemInvStatus,
            getCisPrice: dmsorder_2.getCisPrice,
            getInvStatusType: dmsorder_2.getInvStatusType,
            getBaseData: purchaseshop_1.getBaseData,
            getInventoryQueriesList: inventory_2.getInventoryQueriesList
        })
    ], OrderItemChoose);
    return OrderItemChoose;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderItemChoose , 'pages/dms/inventory-trim-out-choose/index'));

