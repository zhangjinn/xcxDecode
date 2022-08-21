"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require('./../../npm/redux/lib/index.js');
var user_1 = require('./user.js');
var design_1 = require('./design.js');
var classification_1 = require('./classification.js');
var goods_1 = require('./goods.js');
var search_1 = require('./search.js');
var notice_1 = require('./notice.js');
var cart_1 = require('./cart.js');
var home_1 = require('./home.js');
var order_1 = require('./order.js');
var account_1 = require('./account.js');
var order_detail_1 = require('./order-detail.js');
var address_1 = require('./address.js');
var balance_1 = require('./balance.js');
var applyreturn_1 = require('./applyreturn.js');
var collection_1 = require('./collection.js');
var loading_1 = require('./loading.js');
var purchaseshop_1 = require('./purchaseshop.js');
var dmsorder_1 = require('./dmsorder.js');
var dmsoutwarehouse_1 = require('./dmsoutwarehouse.js');
var purchasedetail_1 = require('./purchasedetail.js');
var return_stock_1 = require('./return-stock.js');
var salesorder_1 = require('./salesorder.js');
var salesorderdetail_1 = require('./salesorderdetail.js');
var activityare_1 = require('./activityare.js');
var inventory_1 = require('./inventory.js');
var distributorsorder_1 = require('./distributorsorder.js');
var financepolicy_1 = require('./financepolicy.js');
var consultation_1 = require('./consultation.js');
var financefund_1 = require('./financefund.js');
var financecheck_1 = require('./financecheck.js');
var salesdistributors_1 = require('./salesdistributors.js');
var salesreport_1 = require('./salesreport.js');
var purchasereport_1 = require('./purchasereport.js');
var returnbefore_1 = require('./returnbefore.js');
var todo_1 = require('./todo.js');
var returnentry_1 = require('./returnentry.js');
var audit_order_1 = require('./audit-order.js');
var financialtodo_1 = require('./financialtodo.js');
var consultTodo_1 = require('./consultTodo.js');
var consultTodoDetail_1 = require('./consultTodoDetail.js');
var inventoryTrim_1 = require('./inventoryTrim.js');
var record_1 = require('./record.js');
var store_1 = require('./store.js');
var addAccount_1 = require('./addAccount.js');
var threeProductsReport_1 = require('./threeProductsReport.js');
var sanpinReceipt_1 = require('./sanpinReceipt.js');
var service_comment_1 = require('./service-comment.js');
exports.default = redux_1.combineReducers({
    user: user_1.default,
    design: design_1.default,
    classification: classification_1.default,
    goods: goods_1.default,
    search: search_1.default,
    notice: notice_1.default,
    cart: cart_1.default,
    home: home_1.default,
    order: order_1.default,
    account: account_1.default,
    orderdetail: order_detail_1.default,
    address: address_1.default,
    balance: balance_1.default,
    applyreturn: applyreturn_1.default,
    collection: collection_1.default,
    loading: loading_1.default,
    purchaseshop: purchaseshop_1.default,
    dmsorder: dmsorder_1.default,
    dmsoutwarehouse: dmsoutwarehouse_1.default,
    purchasedetail: purchasedetail_1.default,
    returnstock: return_stock_1.default,
    salesorder: salesorder_1.default,
    salesorderdetail: salesorderdetail_1.default,
    activityare: activityare_1.default,
    inventory: inventory_1.default,
    distributorsorder: distributorsorder_1.default,
    financepolicy: financepolicy_1.default,
    consultation: consultation_1.default,
    financefund: financefund_1.default,
    financecheck: financecheck_1.default,
    salesdistributors: salesdistributors_1.default,
    salesreport: salesreport_1.default,
    purchasereport: purchasereport_1.default,
    returnbefore: returnbefore_1.default,
    todo: todo_1.default,
    returnentry: returnentry_1.default,
    auditorder: audit_order_1.default,
    financialtodo: financialtodo_1.default,
    consultTodo: consultTodo_1.default,
    consultTodoDetail: consultTodoDetail_1.default,
    inventoryTrim: inventoryTrim_1.default,
    record: record_1.default,
    store: store_1.default,
    addAccount: addAccount_1.default,
    threeProductsReport: threeProductsReport_1.default,
    sanpinReceipt: sanpinReceipt_1.default,
    serviceComment: service_comment_1.default,
});
