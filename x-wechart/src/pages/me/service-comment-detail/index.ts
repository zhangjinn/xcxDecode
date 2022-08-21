import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { getExamInfo,getExamSubmit } from '@/store/actions/service-comment';
import Toast from '@/components/vant/toast/toast';
import { fillZero, getLastMonthYesterday, getDateDiff, formatDate } from '@/utils/index';
import { baseUrl, request } from '@/utils/request';
import { forEach } from 'ramda';
import utilsWxs from '../../../wxs/utils.wxs';
interface Data {
    visible: boolean;
    scrollTop: number;
    currentValue: number;
    currentStep: Array;
    isEdit:boolean;
    serviceInfo:object;
    questionList:Array;
    scoreList:Array;
}

@connect()
export default class Filter extends wepy.page {
    config = {
        navigationBarTitleText: '',
        usingComponents: {
            'van-rate': '../../../components/vant/rate/index',
            'van-icon': '../../../components/vant/icon/index',
            'van-toast': '../../../components/vant/toast/index',
            'van-popup': '../../../components/vant/popup/index',
            'van-picker': '../../../components/vant/picker/index',
            'van-search': '../../../components/vant/search/index',
            'van-tab': '../../../components/vant/tab/index',
            'van-row': '../../../components/vant/row/index',
            'van-col': '../../../components/vant/col/index',
            'van-tabs': '../../../components/vant/tabs/index',
            'van-radio': '../../../components/vant/radio/index',
            'van-radio-group': '../../../components/vant/radio-group/index',
            'van-cell': '../../../components/vant/cell/index',
            'van-field': '../../../components/vant/field/index',
            'van-loading': '../../../components/vant/loading/index',
            'van-stepper': '../../../components/vant/stepper/index',
            'van-cell-group': '../../../components/vant/cell-group/index',
            'van-button': '../../../components/vant/button/index',
            'van-slider': '../../../components/vant/slider/index',
            'calendar': '../../../components/calendar/index',
            'img': '../../../components/img/index',
        },
    };
    data: Data = {
        visible: false,
        scrollTop: 0,
        account:wepy.$instance.globalData.account,
        filterForm: {
            q1: 0,
            q2: 0,
            q3: 0,
            q4: 0,
            q5: 0,
            q6: 0,
        },
        currentStep: [0, 5, 10, 15, 20],
        currentStep2: [0, 5, 10],
        questionIndex: ['一','二','三','四','五','六']
        isEdit:true,
        serviceInfo:{},
        questionList:[], 
        scoreList:[]
    };
    wxs = {
      utils: utilsWxs,
    };
    // 页面内交互写在methods里
    methods = {
        onDrag: (index,event) => {
            this.currentValue = event.detail;
            this.filterForm['q' + (index + 1)] = event.detail/ (100/this.scoreList[index].maxScore);
        },
        textChange:({ detail }) => {    
            this.filterForm.q7 = detail.value;
        },
        submitInfo:() => {
            wx.showLoading({
                title:'提交中',
            })
            const time = formatDate(Date.parse(new Date());
            this.filterForm.submittime = time;
            let data = { jsonParam:JSON.stringify(this.filterForm )};
            getExamSubmit(data,(res) => {
                wx.hideLoading();
                if(res.data == 'success') {
                    wx.showToast({
                        title:'提交成功',
                        icon:'none',
                        duration:2000,
                    })
                    this.isEdit = true;
                    setTimeout(function () {
                        wx.navigateBack();
                    }, 3000)
                } else {
                    wx.showToast({
                        title:'提交失败',
                        icon:'none',
                        duration:2000,
                    })
                }
            })
        }
    };
    getParenthesesStr(text) {
        var abb = text.match(/\((.+)\)/g);
        // 运行结果如下:
        return RegExp.$1
    };
    onShow() {};
    onLoad(options) {
        let { info, list } = options;
        const serviceInfo = JSON.parse(info);
        const questionList = JSON.parse(list);
        this.serviceInfo = serviceInfo;
        this.questionList = questionList;
        wx.setNavigationBarTitle({
            title: serviceInfo.serverName
        })
        let resquest = questionList.map((item,index) => {
            const indexInt = index + 1 
            if(item.titleType == 'score') {
                return {
                    name:item.titleName,
                    maxScore:this.getParenthesesStr(item.titleName),
                    score:serviceInfo.sourceData?serviceInfo.sourceData['q' + indexInt] * (100 / this.getParenthesesStr(item.titleName)):0,
                    step:100 / this.getParenthesesStr(item.titleName)
                }
            }
        })
        questionList.forEach((item,index) => {
            const indexInt = index + 1 
            if(item.titleType == 'score') {
                this.filterForm['q' + (index + 1)] = serviceInfo.sourceData?serviceInfo.sourceData['q' + indexInt]:0; 
            }
        });
        this.filterForm = { ...this.filterForm,activity:questionList[0].qid, sojumpparm: serviceInfo.enterpriseCis,q7:serviceInfo.sourceData?serviceInfo.sourceData.q7:''};
        this.scoreList = resquest;
        this.isEdit = serviceInfo.scoreArray ? true : false;
    }
}
