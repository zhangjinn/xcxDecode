import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { getNoticeDetail } from '@/store/actions/notice'
const { baseUrl, imgUrl } = wepy.$appConfig;
interface Data {
  id: number
}

@connect({
  billboardMessage({ notice }) {
    return notice.detail.billboardMessage
  }
}, {
  getNoticeDetail
})
export default class NoticeDetail extends wepy.page {

  config = {
    navigationBarTitleText: '公告详情',
    usingComponents: {
      'parser': '../../../../lib/parser/index',
    }
  }
  data: Data = {
    id: 0
  }

  onLoad({ id } : Data) {
    this.id = id
    this.methods.getNoticeDetail(id)
  }
  methods={
    // 判断是否有下载文件路径
    accessSync() {
      var rootPath = wx.env.USER_DATA_PATH
      var cachePath = rootPath+"/cache"
      return new Promise(function(resolve, reject) {
        let fm = wx.getFileSystemManager();
        try {
          fm.accessSync(cachePath);
          resolve();
        } catch (err) {
          resolve(err);
        }
      });
    },
    // 下载文件
    upload:(item)=> {
      var rootPath = wx.env.USER_DATA_PATH
      var cachePath = rootPath+"/cache"
      // 同步函数流程
      this.methods.accessSync().then(function (err) {
        if (err) {
          return new Promise(function(resolve, reject) {
            let fm = wx.getFileSystemManager();
            try {
              fm.mkdirSync(cachePath, true);
              resolve();
            } catch (err) {
              resolve(err);
            }
          });
        }
      }).then(function (err) {
        if (!err) {
          let fileUrl = imgUrl+'/notice/'+item.filePath[0]
          wx.showLoading({
            title: '加载中...',
          })
          wx.downloadFile({
            url: fileUrl,
            // filePath: cachePath,
            success: function(res) {
              const tempFilePath = res.tempFilePath;
              const savedFilePath = res.savedFilePath
              wx.hideLoading();
              wx.showToast({  
                title: '下载成功',
                icon: 'success',
                duration: 2000
              })
              wx.saveFile({
                tempFilePath,
                success: function (res) {
                  const savedFilePath = res.savedFilePath;
                  // 打开文件
                  wx.showLoading({
                    title: '加载中...',
                  })
                  wx.openDocument({
                    filePath: savedFilePath,
                    success: function (res) {
                      wx.hideLoading();
                      console.log('打开文档成功')
                    },
                  });
                },
                fail: function (err) {
                  console.log('保存失败：', err)
                }
              });
            },
            fail: function(err) {
              wx.showToast({  
                title: '下载失败',
                icon: 'none',
                duration: 2000
              })
            }
          });
        }
      });
    }
  }
}
