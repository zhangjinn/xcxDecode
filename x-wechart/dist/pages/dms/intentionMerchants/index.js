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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var IntentionMerchants_1 = require('./../../../store/actions/IntentionMerchants.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var QRCode = require('./../../../utils/weapp-qrcode.js');
// import QRCode from "../../../utils/weapp-qrcode.js"
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var base64_js_1 = require('./../../../utils/base64.js');
var baseUrl = wepy_1.default.$appConfig.baseUrl;
var Business = /** @class */ (function (_super) {
    __extends(Business, _super);
    function Business() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '意向商家登记表',
            usingComponents: {
                "van-dialog": "../../../components/vant/dialog/index",
                "van-overlay": "../../../components/vant/overlay/index",
                'van-card': '../../../components/vant/card/index',
                'van-button': '../../../components/vant/button/index',
                "van-toast": "../../../components/vant/toast/index",
                'van-popup': '../../../components/vant/popup/index',
                'van-rate': '../../../components/vant/rate/index',
                'van-field': '../../../components/vant/field/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
                'van-steps': '../../../components/vant/steps/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-radio': '../../../components/vant/radio/index',
                'van-radio-group': '../../../components/vant/radio-group/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                "item": "../../../components/dms-order-addition-detail-item/index",
                "van-icon": "../../../components/vant/icon/index",
                "van-submit-bar": "../../../components/vant/submit-bar/index",
                "van-transition": "../../../components/vant/transition/index",
                "stores": "../../../components/stores-return/index",
                'van-area': '../../../components/vant/area/index',
                'van-tab': '../../../components/vant/tab/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'van-tree-select': '../../../components/vant/tree-select/index'
            }
        };
        _this.data = {
            myQrcode: 'myQrcode',
            newconctat: '',
            showshow: true,
            companyName: '',
            taxNumber: '',
            companyType: '',
            workAdress: '',
            detailAdress: '',
            workerNumber: '',
            container: '',
            phoneNumber: '',
            show: false,
            jigouShow: false,
            usableMoney: '',
            radio: 1,
            radio1: 2,
            active: 0,
            saleNum: '',
            currentSelectTripType: '17452',
            currentSelectTripTypeName: '直营',
            selectBuzhou: 1,
            selectTitle: 1,
            selectBuzhou1: 1,
            custId: null,
            showNext: true,
            selectTitle1: 1,
            list: [],
            production: '',
            productionName: '',
            merchandiseIndex: null,
            merchandiseList: [],
            qrcodePath: '',
            // 省市区镇
            multiIndex: [0, 0, 0, 0],
            showChooseAdressWindow: false,
            tabActive: 0,
            showAdressInput: false,
            conctatBefor: '',
            companyList: [],
            tableShow: false,
            viewShowed: false,
            inputVal: "",
            catList: [],
            provinces: [],
            provinceId: '',
            cities: [],
            cityId: '',
            districts: [],
            districtId: '',
            towns: [],
            townId: '',
            areaText: '',
            areaItems: [
                {
                    values: [],
                    className: 'provinceColumn',
                    defaultIndex: 0
                },
                {
                    values: [],
                    className: 'cityColumn',
                    defaultIndex: 2
                },
                {
                    values: [],
                    className: 'districtColumn',
                    defaultIndex: 0
                },
                {
                    values: [],
                    className: 'townColumn',
                    defaultIndex: 0
                }
            ],
            showCompanyName: '',
            companyInputFlag: true,
            sendTime: '发送验证码',
            // sendColor: '#363636',
            phoneCodeButton: 'vertificate',
            secend: 60,
            isSend: false,
            text: '获取验证码',
            currentTime: 60,
            disabled: false,
            phone: '' //获取到的手机栏中的值
            ,
            phoneCode: '',
        };
        _this.methods = {
            // bindButtonTap:()=> {
            //   var that = this;
            //   var phoneNumber = that.phoneNumber;
            //   var currentTime = that.currentTime
            //   if (phoneNumber == '') {
            //     wx.showModal({
            //       title: '提示',
            //       content: "号码不能为空"
            //     })
            //   } else if (phoneNumber.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phoneNumber)) {
            //     wx.showModal({
            //       title: '提示',
            //       content: "手机号格式不正确"
            //     })
            //   } else {
            //     //当手机号正确的时候提示用户短信验证码已经发送 并禁止按钮点击导致定时器多次触发的bug
            //     that.setData({
            //       disabled: true, 
            //       phoneCodeButton: 'inactiveClass'
            //     })
            //     that.disabled = true
            //     that.phoneCodeButton = 'inactiveClass'
            //     that.$apply();
            //     let data = {
            //       contactPhone: that.phoneNumber
            //     }
            //     sendSecurityCode(data，res=>{
            //       console.log('验证码',res)
            //       if(res.statusCode === 200){
            //         Toast.success('短信验证码已发送');
            //       }else {
            //         Toast.fail('发送失败，请重新发送')
            //         that.text = '重新发送'
            //         that.currentTime = 60
            //         that.disabled = false
            //         that.phoneCodeButton = 'vertificate'
            //         that.$apply()
            //       }
            //     })
            //     //设置一分钟的倒计时
            //     var interval = setInterval(function () {
            //       currentTime--; //每执行一次让倒计时秒数减一
            //       // that.setData({
            //       //   text: currentTime + 's'+'后重新发送', //按钮文字变成倒计时对应秒数
            //       //   phoneCodeButton: 'inactiveClass',
            //       // })
            //       that.text = currentTime + 's'+'后重新发送'
            //       that.phoneCodeButton = 'inactiveClass'
            //       that.$apply()
            //       //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获         取验证码的按钮恢复到初始化状态只改变按钮文字
            //       if (currentTime <= 0) {
            //         clearInterval(interval)
            //         // that.setData({
            //         //   text: '重新发送',
            //         //   currentTime: 60,
            //         //   disabled: false,
            //         //   phoneCodeButton: 'vertificate'
            //         // })
            //         that.text = '重新发送'
            //         that.currentTime = 60
            //         that.disabled = false
            //         that.phoneCodeButton = 'vertificate'
            //         that.$apply()
            //       }
            //     }, 1000);
            //   };
            // },
            // 发送验证码
            sendCode: function () {
                var that = this;
                var secend = that.secend;
                var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
                ;
                var phoneNumber = that.phoneNumber;
                //验证手机号码
                if (!myreg.test(phoneNumber)) {
                    wx.showToast({
                        title: '手机号输入错误',
                        icon: 'none'
                    });
                    // that.setData({
                    //   phoneNumber: ""
                    // })
                    that.phoneNumber = '',
                        that.$apply();
                    return;
                }
                var data = {
                    contactPhone: that.phoneNumber
                };
                IntentionMerchants_1.sendSecurityCode(data, function (res) {
                    console.log('验证码', res);
                    if (res.statusCode === 200) {
                        toast_1.default.success('短信验证码已发送');
                    }
                    else {
                        toast_1.default.fail('发送失败，请重新发送');
                        that.secend = 60;
                        that.isSend = false;
                        that.$apply();
                    }
                });
                this.isSend = true;
                that.$apply();
                // that.setData({
                //   phoneNumber: "",
                //   isSend:true
                // })
                var interVal = setInterval(function () {
                    secend--;
                    // that.setData({
                    //   secend: secend
                    // })
                    that.secend = secend;
                    that.$apply();
                    if (secend == 0) {
                        clearInterval(interVal);
                        // that.setData({
                        //   secend: 60,
                        //   isSend: false
                        // })
                        that.secend = 60;
                        that.isSend = false;
                        that.$apply();
                    }
                }, 1000);
                that.setData({
                    isSend: true
                });
            },
            // 键盘抬起
            inputTyping: function (e) {
                var _this = this;
                var that = this;
                that.inputVal = e.detail.value;
                that.data.inputVal = e.detail;
                this.setData({
                    inputVal: that.inputVal
                });
                if (that.inputVal == '') {
                    this.companyList = [];
                    this.viewShowed = false;
                    that.setData({
                        viewShowed: false,
                        companyList: this.companyList
                    });
                }
                else {
                    //“这里需要特别注意，不然在选中下拉框值的时候，下拉框又出现”
                    if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
                        var that_1 = this;
                        var data = { word: that_1.inputVal };
                        IntentionMerchants_1.getFuzzySearch(data, function (res) {
                            var _a;
                            if (res.data.result && res.data.result.items && res.data.result.items.length > 0) {
                                _this.companyList = [];
                                (_a = that_1.companyList).push.apply(_a, res.data.result.items);
                                that_1.viewShowed = true;
                                that_1.setData({ companyList: that_1.companyList, viewShowed: that_1.viewShowed });
                            }
                            else {
                                _this.companyList = [];
                                that_1.viewShowed = false;
                                that_1.setData({ companyList: that_1.companyList, viewShowed: that_1.viewShowed });
                            }
                        });
                    }
                }
            },
            // 获取选中推荐列表中的值
            name: function (res) {
                this.companyInputFlag = false;
                this.setData({ companyInputFlag: false });
                this.inputVal = res.currentTarget.dataset.index;
                this.showCompanyName = this.inputVal;
                this.viewShowed = false;
                this.setData({ inputVal: this.inputVal, showCompanyName: this.showCompanyName, viewShowed: false });
            },
            inputCompanyName: function () {
                _this.companyInputFlag = true;
                _this.setData({ companyInputFlag: true });
            },
            // 输入公司名称修改data中数据
            onChangeCompany: function (event) {
                this.companyName = ramda_1.trim(event.detail);
            },
            showChooseAdress: function () {
                var this_ = _this;
                if (this_.data.areaItems[0].values && this_.data.areaItems[0].values.length > 0
                    && this_.data.areaItems[1].values && this_.data.areaItems[1].values.length > 0
                    && this_.data.areaItems[2].values && this_.data.areaItems[2].values.length > 0
                    && this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0) {
                    this_.showChooseAdressWindow = true;
                    return;
                }
                this_.data.areaItems[0].values = [];
                this_.data.areaItems[1].values = [];
                this_.data.areaItems[2].values = [];
                this_.data.areaItems[3].values = [];
                IntentionMerchants_1.getMateriel({}, function (res) {
                    res.data.provicesList.forEach(function (province) {
                        this_.data.areaItems[0].values.push({ id: province.id, name: province.provinceName });
                    });
                    if (this_.data.areaItems[0].values && this_.data.areaItems[0].values.length > 0) {
                        this_.data.provinceId = this_.data.areaItems[0].values[0].id;
                        this_.data.provinceName = this_.data.areaItems[0].values[0].name;
                        this_.setData({ areaItems: this_.data.areaItems });
                        IntentionMerchants_1.getCityList({ proviceId: this_.data.areaItems[0].values[0].id }, function (res) {
                            res.data.forEach(function (city) {
                                this_.data.areaItems[1].values.push({ id: city.id, name: city.cityName });
                            });
                            if (this_.data.areaItems[1].values && this_.data.areaItems[1].values.length > 0) {
                                this_.setData({ areaItems: this_.data.areaItems });
                                this_.data.cityId = this_.data.areaItems[1].values[0].id;
                                this_.data.cityName = this_.data.areaItems[1].values[0].name;
                                IntentionMerchants_1.getAreaList({ cityId: this_.data.areaItems[1].values[0].id }, function (res) {
                                    res.data.forEach(function (district) {
                                        this_.data.areaItems[2].values.push({ id: district.id, name: district.districtName });
                                    });
                                    if (this_.data.areaItems[2].values && this_.data.areaItems[2].values.length > 0) {
                                        this_.setData({ areaItems: this_.data.areaItems });
                                        this_.data.districtId = this_.data.areaItems[2].values[0].id;
                                        this_.data.districtName = this_.data.areaItems[2].values[0].name;
                                        IntentionMerchants_1.getTownList({ districtId: this_.data.areaItems[2].values[0].id }, function (res) {
                                            res.data.forEach(function (town) {
                                                this_.data.areaItems[3].values.push({ id: town.id, name: town.townName });
                                            });
                                            if (this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0) {
                                                this_.setData({ areaItems: this_.data.areaItems });
                                                this_.data.townId = this_.data.areaItems[3].values[0].id;
                                                this_.data.townName = this_.data.areaItems[3].values[0].name;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
                _this.showChooseAdressWindow = true;
            },
            areaPickerCancel: function (event) {
                var this_ = _this;
                this_.data.areaItems[0].values = [];
                this_.data.areaItems[1].values = [];
                this_.data.areaItems[2].values = [];
                this_.data.areaItems[3].values = [];
                this_.provinceId = '';
                this_.cityId = '';
                this_.districtId = '';
                this_.townId = '';
                this_.showChooseAdressWindow = false;
                this_.setData({ showChooseAdressWindow: false });
            },
            areaPickerConfirm: function (event) {
                var value = event.detail.value;
                var this_ = _this;
                this_.areaText = value[0].name + value[1].name + value[2].name + value[3].name;
                this_.provinceId = value[0].id;
                this_.cityId = value[1].id;
                this_.districtId = value[2].id;
                this_.townId = value[3].id;
                this_.showChooseAdressWindow = false;
                this_.showAdressInput = true;
                this_.setData({ showChooseAdressWindow: false, showAdressInput: true, areaText: this_.areaText });
            },
            areaPopuopClose: function (event) {
                var this_ = _this;
                this_.showChooseAdressWindow = false;
                this_.setData({ showChooseAdressWindow: false });
            },
            areaPickerChange: function (event) {
                var this_ = _this;
                var _a = event.detail, picker = _a.picker, value = _a.value, index = _a.index;
                switch (index) {
                    // 省列发生变化
                    case 0:
                        this_.methods.provinceChange(value, picker);
                        break;
                    // 市列发生变化
                    case 1:
                        this_.methods.cityChange(value, picker);
                        break;
                    // 县/区列发生变化
                    case 2:
                        this_.methods.districtChange(value, picker);
                        break;
                    // 镇列发生变化
                    case 3:
                        this_.methods.townChange(value);
                        break;
                }
            },
            provinceChange: function (value, picker) {
                var this_ = _this;
                this_.data.provinceId = value[0].id;
                this_.data.provinceName = value[0].name;
                IntentionMerchants_1.getCityList({ proviceId: this_.data.provinceId }, function (res) {
                    this_.data.areaItems[1].values = [];
                    this_.data.areaItems[1].defaultIndex = 0;
                    res.data.forEach(function (city) {
                        this_.data.areaItems[1].values.push({ id: city.id, name: city.cityName });
                    });
                    picker.setColumnValues(1, this_.data.areaItems[1].values);
                    if (this_.data.areaItems[1].values && this_.data.areaItems[1].values.length > 0) {
                        this_.data.cityId = this_.data.areaItems[1].values[0].id;
                        this_.data.cityName = this_.data.areaItems[1].values[0].name;
                        IntentionMerchants_1.getAreaList({ cityId: this_.data.cityId }, function (res) {
                            this_.data.areaItems[2].values = [];
                            this_.data.areaItems[2].defaultIndex = 0;
                            res.data.forEach(function (district) {
                                this_.data.areaItems[2].values.push({ id: district.id, name: district.districtName });
                            });
                            picker.setColumnValues(2, this_.data.areaItems[2].values);
                            if (this_.data.areaItems[2].values && this_.data.areaItems[2].values.length > 0) {
                                this_.data.districtId = this_.data.areaItems[2].values[0].id;
                                this_.data.districtName = this_.data.areaItems[2].values[0].name;
                                IntentionMerchants_1.getTownList({ districtId: this_.data.districtId }, function (res) {
                                    this_.data.areaItems[3].values = [];
                                    this_.data.areaItems[3].defaultIndex = 0;
                                    res.data.forEach(function (town) {
                                        this_.data.areaItems[3].values.push({ id: town.id, name: town.townName });
                                    });
                                    picker.setColumnValues(3, this_.data.areaItems[3].values);
                                    if (this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0) {
                                        this_.data.townId = this_.data.areaItems[3].values[0].id;
                                        this_.data.townName = this_.data.areaItems[3].values[0].name;
                                    }
                                });
                            }
                        });
                    }
                });
            },
            cityChange: function (value, picker) {
                var this_ = _this;
                this_.data.cityId = value[1].id;
                this_.data.cityName = value[1].name;
                IntentionMerchants_1.getAreaList({ cityId: this_.data.cityId }, function (res) {
                    this_.data.areaItems[2].values = [];
                    this_.data.areaItems[2].defaultIndex = 0;
                    res.data.forEach(function (district) {
                        this_.data.areaItems[2].values.push({ id: district.id, name: district.districtName });
                    });
                    picker.setColumnValues(2, this_.data.areaItems[2].values);
                    if (this_.data.areaItems[2].values && this_.data.areaItems[2].values.length > 0) {
                        this_.data.districtId = this_.data.areaItems[2].values[0].id;
                        this_.data.districtName = this_.data.areaItems[2].values[0].name;
                        IntentionMerchants_1.getTownList({ districtId: this_.data.districtId }, function (res) {
                            this_.data.areaItems[3].values = [];
                            this_.data.areaItems[3].defaultIndex = 0;
                            res.data.forEach(function (town) {
                                this_.data.areaItems[3].values.push({ id: town.id, name: town.townName });
                            });
                            picker.setColumnValues(3, this_.data.areaItems[3].values);
                            if (this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0) {
                                this_.data.townId = this_.data.areaItems[3].values[0].id;
                                this_.data.townName = this_.data.areaItems[3].values[0].name;
                            }
                        });
                    }
                });
            },
            districtChange: function (value, picker) {
                var this_ = _this;
                this_.data.districtId = value[2].id;
                this_.data.districtName = value[2].name;
                IntentionMerchants_1.getTownList({ districtId: this_.data.districtId }, function (res) {
                    this_.data.areaItems[3].values = [];
                    this_.data.areaItems[3].defaultIndex = 0;
                    res.data.forEach(function (town) {
                        this_.data.areaItems[3].values.push({ id: town.id, name: town.townName });
                    });
                    picker.setColumnValues(3, this_.data.areaItems[3].values);
                    if (this_.data.areaItems[3].values && this_.data.areaItems[3].values.length > 0) {
                        this_.data.townId = this_.data.areaItems[3].values[0].id;
                        this_.data.townName = this_.data.areaItems[3].values[0].name;
                    }
                });
            },
            townChange: function (value) {
                var this_ = _this;
                this_.data.townId = value[3].id;
                this_.data.townName = value[3].name;
            },
            //选择合作商按钮进行激活状态改变
            selectedPinche: function (e) {
                this.currentSelectTripType = e.target.dataset.id;
                this.currentSelectTripTypeName = e.target.dataset.name;
            },
            // 选择合作商按钮进行激活状态改变
            selectedBaoche: function (e) {
                this.currentSelectTripType = e.target.dataset.id,
                    this.currentSelectTripTypeName = e.target.dataset.name;
            },
            // 修改公司输入框内容
            onChange: function (event) {
                // event.detail 为当前输入的值
                this.companyName = event.detail;
            },
            // 点击类型弹出
            openType: function () {
                this.show = true;
            },
            closeType: function () {
                this.show = false;
            },
            //点击机构弹出
            openjigouType: function (e) {
                this.merchandiseIndex = e.currentTarget.dataset.index;
                this.merchandiseList[this.merchandiseIndex].buttonStatus = 1;
                var flag = false;
                if (this.data.list && this.data.list.length > 0) {
                    for (var i = 0; i < this.data.list.length; i++) {
                        if (this.data.list[i].merchandiseIndex === this.merchandiseIndex) {
                            this.production = this.data.list[i].production;
                            this.productionName = this.data.list[i].productionName;
                            this.currentSelectTripType = this.data.list[i].currentSelectTripTypeId;
                            this.currentSelectTripTypeName = this.data.list[i].currentSelectTripTypeName;
                            this.saleNum = this.data.list[i].saleNum;
                            flag = true;
                            break;
                        }
                    }
                }
                if (!flag) {
                    this.production = e.currentTarget.dataset.id;
                    this.productionName = e.currentTarget.dataset.name;
                }
                this.jigouShow = true;
            },
            // 机构弹窗点击确定往数组里添加数据
            addHezuo: function () {
                if (!this.currentSelectTripTypeName) {
                    toast_1.default.fail('请先选择经销商类型！');
                    return;
                }
                if (!this.saleNum) {
                    toast_1.default.fail('请先填写销售额！');
                    return;
                }
                var obj = {
                    production: this.production,
                    productionName: this.productionName,
                    currentSelectTripTypeId: this.currentSelectTripType,
                    currentSelectTripTypeName: this.currentSelectTripTypeName,
                    saleNum: this.saleNum,
                    merchandiseIndex: this.merchandiseIndex
                };
                // 先判断数组中是否已经存在
                var listIndex = null;
                for (var index = 0; index < this.data.list.length; index++) {
                    if (this.data.list[index].merchandiseIndex === this.merchandiseIndex) {
                        listIndex = index;
                        break;
                    }
                }
                if (listIndex || listIndex === 0) {
                    this.data.list[listIndex] = obj;
                }
                else {
                    this.data.list.push(obj);
                    this.setData({
                        list: this.data.list
                    });
                }
                this.merchandiseList[this.merchandiseIndex].buttonStatus = 2;
                this.jigouShow = false;
                this.production = '';
                this.productionName = '';
                this.currentSelectTripType = '';
                this.currentSelectTripTypeName = '';
                this.saleNum = '';
                this.tableShow = true;
            },
            // 关闭机构弹窗关闭
            closejigouType: function () {
                this.production = '';
                this.productionName = '';
                this.currentSelectTripType = '';
                this.currentSelectTripTypeName = '';
                this.saleNum = '';
                this.jigouShow = false;
            },
            // 选中公司类型
            confirm: function (event) {
                this.show = false;
            },
            // 点击公司类型
            onClick: function (event) {
                this.radio = event.target.dataset.id;
                this.companyType = event.target.dataset.name;
            },
            //是否有网络销售
            onClick2: function (event) {
                this.radio1 = event.detail;
            },
            onChange1: function (event) {
                this.radio1 = event.target.dataset.id;
            },
            // 清除公司信息
            clearComapnyName: function () {
                this.companyName = '';
            },
            // 输入税号修改data中数据
            onChangeTFN: function (event) {
                var that = this;
                that.taxNumber = ramda_1.trim(event.detail.value);
                that.setData({
                    taxNumber: event.detail.value
                });
            },
            // 修改详细地址出发
            onChangeDetailAdress: function (event) {
                var that = this;
                that.detailAdress = ramda_1.trim(event.detail.value);
                that.setData({
                    detailAdress: event.detail.value
                });
            },
            // 修改员工个数
            onChangeWorkerNumber: function (event) {
                var that = this;
                that.workerNumber = ramda_1.trim(event.detail.value);
                that.setData({
                    workerNumber: event.detail.value
                });
            },
            // 修改联系人姓名
            onChangeContainer: function (event) {
                var that = this;
                that.container = ramda_1.trim(event.detail.value);
                that.setData({
                    container: event.detail.value
                });
            },
            // 修改联系人电话触发
            onChangePhoneNumber: function (event) {
                var that = this;
                that.phoneNumber = ramda_1.trim(event.detail.value);
                that.setData({
                    phoneNumber: event.detail.value
                });
            },
            changeCode: function (event) {
                var that = this;
                that.phoneCode = ramda_1.trim(event.detail.value);
                that.setData({
                    phoneCode: event.detail.value
                });
            },
            // 修改可用金额触发
            onChangeUsableMoney: function (event) {
                var that = this;
                that.usableMoney = ramda_1.trim(event.detail.value);
                that.setData({
                    usableMoney: event.detail.value
                });
            },
            // 修改营销金额
            onChangeSaleNum: function (event) {
                var that = this;
                that.saleNum = ramda_1.trim(event.detail.value);
                that.setData({
                    saleNum: event.detail.value
                });
            },
            // 删除动态添加的合作商数据
            del: function (e) {
                var index = e.target.dataset.index;
                var list = this.data.list;
                var nowInfo = list[index];
                list.splice(index, 1);
                this.setData({
                    list: list,
                });
                this.merchandiseList[nowInfo.merchandiseIndex].buttonStatus = 0;
            },
            next: function () {
                var activeValue = _this.active + 1;
                if (activeValue == 1) {
                    var data = {};
                    if (!_this.inputVal) {
                        toast_1.default.fail('请输入公司名称');
                        return;
                    }
                    if (!_this.phoneCode) {
                        toast_1.default.fail('请输入手机验证码');
                        return;
                    }
                    if (!_this.taxNumber) {
                        toast_1.default.fail('请输入税号');
                        return;
                    }
                    if (!_this.radio) {
                        toast_1.default.fail('请选择公司类型');
                        return;
                    }
                    if (!_this.workerNumber) {
                        toast_1.default.fail('请填写员工数量');
                        return;
                    }
                    if (!(/^[0-9]*[1-9][0-9]*$/.test(_this.workerNumber))) {
                        toast_1.default.fail('员工数量,请填写数字格式');
                        return;
                    }
                    if (!_this.container) {
                        toast_1.default.fail('请填写联系人');
                        return;
                    }
                    if (!_this.phoneNumber) {
                        toast_1.default.fail('请填写联系电话');
                        return;
                    }
                    if (!(/^1[34578]\d{9}$/.test(_this.phoneNumber))) {
                        toast_1.default.fail('请填写正确格式联系电话');
                        return;
                    }
                    var requestData = {
                        companyFullName: _this.inputVal,
                        taxCode: _this.taxNumber,
                        contactPhone: _this.phoneNumber,
                        securityCode: _this.phoneCode
                    };
                    IntentionMerchants_1.RepeatCompany(requestData, function (res) {
                        if (res.data == 1) {
                            dialog_1.default.confirm({
                                title: '提示',
                                message: '该联系方式已经发起过请求，确认再次发起请求?',
                            })
                                .then(function () {
                                _this.active = activeValue;
                                _this.setData({
                                    active: activeValue
                                });
                                _this.selectBuzhou = _this.active + 1;
                                _this.selectTitle = _this.selectBuzhou;
                                var data = {};
                                IntentionMerchants_1.getMateriel(data, function (res) {
                                    var that = _this;
                                    if (res.statusCode === 200) {
                                        that.merchandiseList = res.data.baseMatklList;
                                        that.merchandiseList.forEach(function (item) { item.buttonStatus = 0; });
                                        _this.setData({
                                            merchandiseList: _this.merchandiseList
                                        });
                                    }
                                });
                            })
                                .catch(function () {
                                // on cancel
                            });
                        }
                        else if (res.data == -1) {
                            dialog_1.default.alert({
                                title: '提示',
                                message: '该商家已有申请被受理，不能发起此次申请',
                            }).then(function () {
                                // on close
                            });
                        }
                        else if (res.data == 'errorSecurityCode') {
                            dialog_1.default.alert({
                                title: '提示',
                                message: '验证码错误',
                            }).then(function () {
                                // on close
                            });
                        }
                        else {
                            var data_1 = {};
                            IntentionMerchants_1.getMateriel(data_1, function (res) {
                                var that = _this;
                                if (res.statusCode === 200) {
                                    that.merchandiseList = res.data.baseMatklList;
                                    that.merchandiseList.forEach(function (item) { item.buttonStatus = 0; });
                                    _this.setData({
                                        merchandiseList: _this.merchandiseList
                                    });
                                }
                            });
                            _this.active = activeValue;
                            _this.selectBuzhou = _this.active + 1;
                            _this.selectTitle = _this.selectBuzhou;
                            _this.setData({
                                active: _this.active,
                                selectBuzhou: _this.selectBuzhou,
                                selectTitle: _this.selectTitle
                            });
                        }
                    });
                }
                else if (activeValue == 2) {
                    if (_this.list.length === 0) {
                        toast_1.default.fail('请添加合作机构');
                        return;
                    }
                    if (!_this.usableMoney) {
                        toast_1.default.fail('请输入可用资金');
                        return;
                    }
                    if (!_this.radio1) {
                        toast_1.default.fail('请选择是否有网络');
                        return;
                    }
                    var filterList_1 = '';
                    _this.list.forEach(function (item) {
                        filterList_1 += (item.productionName + '-' + item.production + '-' + item.currentSelectTripTypeId + '-' + item.saleNum + ',');
                    });
                    var data = {
                        r_companyFullName: _this.inputVal,
                        r_taxCode: _this.taxNumber,
                        r_companyType: _this.radio,
                        r_staffNumber: _this.workerNumber,
                        r_contactName: _this.container,
                        r_province: _this.provinceId,
                        r_city: _this.cityId,
                        r_county: _this.districtId,
                        r_towns: _this.townId,
                        r_detailedAddress: _this.detailAdress,
                        r_availableCapital: _this.usableMoney,
                        r_haveSellingNetwork: _this.radio1,
                        r_custinfoDetails: filterList_1,
                        r_contactPhone: _this.phoneNumber //联系人电话
                    };
                    IntentionMerchants_1.submitApplications(data, function (res) {
                        if (res.data.code == 'success') {
                            var conctatBefor = res.data.data.contact;
                            // Toast.success(res.data.msg)
                            _this.active = activeValue;
                            _this.selectBuzhou1 = _this.active + 1;
                            _this.selectTitle1 = _this.selectBuzhou;
                            _this.conctatBefor = conctatBefor;
                            _this.setData({
                                active: activeValue,
                                conctatBefor: conctatBefor
                            });
                            _this.$apply();
                            var custId = res.data.data.custId;
                            _this.custId = res.data.data.custId;
                            _this.methods.getCode(custId);
                        }
                        else {
                            toast_1.default.fail(res.data.msg);
                            setTimeout(function () {
                                wx.navigateTo({
                                    url: '/pages/dms/intentionMerchants/index' // 页面 A
                                });
                            }, 2000);
                        }
                    });
                }
                else {
                    _this.active = activeValue;
                    _this.selectBuzhou1 = _this.active + 1;
                    _this.selectTitle1 = _this.selectBuzhou;
                }
            },
            closeNow: function () {
                var _this = this;
                this.showNext = false;
                this.showshow = false;
                this.active = 1;
                this.selectBuzhou = this.active + 1;
                this.selectTitle = this.selectBuzhou;
                var data = {};
                IntentionMerchants_1.getMateriel(data, function (res) {
                    var that = _this;
                    if (res.statusCode === 200) {
                        that.merchandiseList = res.data.baseMatklList;
                        that.merchandiseList.forEach(function (item) { item.buttonStatus = 0; });
                        _this.setData({
                            merchandiseList: _this.merchandiseList
                        });
                    }
                });
                this.setData({
                    showshow: false
                });
            },
            // 绘制图片
            drawCanvasImg: function () {
                var that = this;
                var myCanvasWidth = 200; //为了让图片满铺页面
                var myCanvasHeight = 200;
                var context = wx.createCanvasContext('myQrcode');
                wx.getSystemInfo({
                    success: function (res) {
                        base64_js_1.base64src(that.qrcodePath, function (res) {
                            context.drawImage(res, 0, 0, 200, 200); //画布绘制图片
                            context.draw();
                        });
                    },
                });
            },
            save: function () {
                wx.showLoading({
                    title: '保存中...',
                });
                wx.canvasToTempFilePath({
                    canvasId: 'myQrcode',
                    fileType: 'png',
                    success: function (res) {
                        wx.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: function (res) {
                                wx.hideLoading();
                                wx.showToast({
                                    title: '保存成功',
                                });
                            },
                            fail: function (err) {
                                if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied"
                                    || err.errMsg === "saveImageToPhotosAlbum:fail auth deny"
                                    || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                                    wx.showModal({
                                        title: '提示',
                                        content: '需要您授权保存相册',
                                        showCancel: false,
                                        success: function (res) {
                                            wx.openSetting({
                                                success: function (settingdata) {
                                                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                                        // console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                                    }
                                                    else {
                                                        // console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                                    }
                                                },
                                                fail: function (res) {
                                                    // console.log('openSetting_res', res);
                                                }
                                            });
                                        }
                                    });
                                }
                                wx.hideLoading();
                            },
                        });
                    }
                });
            },
            // 二维码
            getCode: function (Qcode) {
                var qrcode = new QRCode('myQrcode', {
                    text: baseUrl + "/IntentionCust/interestedMerchants.nd?id=" + Qcode + " ",
                    width: this.createRpx2px(200),
                    height: this.createRpx2px(200),
                    padding: 12,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                });
                this.qrcodePath = qrcode._htOption.tetx;
                this.drawCanvasImg();
            },
            createRpx2px: function (rpx) {
                return wx.getSystemInfoSync().windowWidth / 750 * rpx;
            },
            gotoH5: function () {
                var id = this.custId;
                var conctatBefor = this.conctatBefor;
                wx.navigateTo({
                    url: './../intentionh5/index?id=' + id,
                });
            }
        };
        return _this;
    }
    return Business;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Business , 'pages/dms/intentionMerchants/index'));

