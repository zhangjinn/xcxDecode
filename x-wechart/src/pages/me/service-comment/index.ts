import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { getExamInfo } from '@/store/actions/service-comment';
import Toast from '@/components/vant/toast/toast';
import { fillZero, getLastMonthYesterday, getDateDiff } from '@/utils/index';
import { baseUrl, request } from '@/utils/request';
import { clone, forEach } from 'ramda';
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
    visible: boolean;
    scrollTop: number;
    commentList:Array;
}

@connect()
export default class Filter extends wepy.page {
    config = {
        navigationBarTitleText: '问卷调研',
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
            'calendar': '../../../components/calendar/index',
            'img': '../../../components/img/index',
        },
    };
    components = {
      emptyDataType,
    };
    data: Data = {
        visible: false,
        scrollTop: 0,
        filterForm: {},
        commentList:[],
    };
    // 页面内交互写在methods里
    methods = {
        onScroll: (event: Weapp.Event) => {
            if (event.detail.scrollTop >= 350) {
                if (this.scrollTop === 0) {
                    this.scrollTop = event.detail.scrollTop
                }
            }
        },
        getComment: () => {
            getExamInfo(this.filterForm, (res) => {
                this.visible = true;
                if(res && res.data.data.length > 0) {
                    this.commentList = res.data.data[0].details;
                    this.commentDesc = res.data.data[0].desc;
                    // 设置顶部标题栏
                    res.data.data[0].desc.forEach(element => {
                        if(element.titleNo == 'title') {
                            wx.setNavigationBarTitle({
                                title: element.titleName,
                            })
                        }
                    });
                }
                this.$apply();
            })
        },
        openBill: (index) => {
            let commentDesc = clone(this.commentDesc);
            let comment = clone(this.commentList[index]);
            let sourceData = clone(comment.sourceData);
            let sourceDataChange = JSON.parse(sourceData);
            comment['sourceData'] = sourceDataChange;
            wx.navigateTo({
                url:'/pages/me/service-comment-detail/index?info=' + JSON.stringify(comment) + "&list=" + JSON.stringify(commentDesc);
            })
        }
    };
    onShow() {
        console.log(wepy.$instance.globalData)
        this.filterForm.account = wepy.$instance.globalData.account;
        this.commentList = [];
        this.methods.getComment();
    }
}
