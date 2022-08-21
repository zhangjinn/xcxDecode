import { combineReducers } from 'redux';
import user from './user';
import design from './design';
import classification from './classification';
import goods from './goods';
import search from './search';
import notice from './notice';
import cart from './cart';
import home from './home';
import order from './order';
import account from './account'
import orderdetail from './order-detail'
import address from './address';
import balance from './balance';
import applyreturn from './applyreturn';
import collection from './collection';
import loading from './loading';
import purchaseshop from './purchaseshop'
import dmsorder from './dmsorder';
import dmsoutwarehouse from './dmsoutwarehouse';
import purchasedetail from './purchasedetail';
import returnstock from './return-stock'
import salesorder from './salesorder'
import salesorderdetail from './salesorderdetail'
import activityare from './activityare'
import inventory from './inventory'
import distributorsorder from './distributorsorder'
import financepolicy from './financepolicy'
import consultation from './consultation'
import financefund from './financefund'
import financecheck from './financecheck'
import salesdistributors from './salesdistributors'
import salesreport from './salesreport'
import purchasereport from './purchasereport'
import returnbefore from './returnbefore'
import todo from './todo';
import returnentry from './returnentry'
import auditorder from './audit-order'
import financialtodo from './financialtodo'
import consultTodo from './consultTodo';
import consultTodoDetail from './consultTodoDetail';
import inventoryTrim from './inventoryTrim';
import record from './record';
import store from './store';
import addAccount from './addAccount';
import threeProductsReport from './threeProductsReport';
import sanpinReceipt from './sanpinReceipt';
import serviceComment from './service-comment';

export default combineReducers({
  user,
  design,
  classification,
  goods,
  search,
  notice,
  cart,
  home,
  order,
  account,
  orderdetail,
  address,
  balance,
  applyreturn,
  collection,
  loading,
  purchaseshop,
  dmsorder,
  dmsoutwarehouse,
  purchasedetail,
  returnstock,
  salesorder,
  salesorderdetail,
  activityare,
  inventory,
  distributorsorder,
  financepolicy,
  consultation,
  financefund,
  financecheck,
  salesdistributors,
  salesreport,
  purchasereport,
  returnbefore,
  todo,
  returnentry,
  auditorder,
  financialtodo,
  consultTodo,
  consultTodoDetail,
  inventoryTrim,
  record,
  store,
  addAccount,
  threeProductsReport,
  sanpinReceipt,
  serviceComment,
});
