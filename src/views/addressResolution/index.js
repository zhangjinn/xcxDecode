import Parse, { AREA, Utils } from './parse/index.js'
import * as XLSX from 'xlsx/xlsx.mjs'
import { mulNum } from '@/utils/index'
import {downloadXlsxFile } from "@/utils/toolFn"

export default {
  name: 'addressResolution',
  data () {
    return {
      fileList: [], // 上传文件列表
      readData: [], // 需解析数据列表
      stream: [], // 解析完成的数据列表
      gaodeMapKey: '', // 高德地图key
      hitCount: 0, // 解析成功数量
      resolvedCount: 0, // 已解析数量
      percentage: 0, // 地址解析进度
      isCanClick: true, // 页面是否可点击，地址解析是页面不允许编辑
    }
  },
  watch: {
    //监听内容
    resolvedCount(newData, oldData) {
      if(this.readData.length>0){
        let rate = (newData/this.readData.length).toFixed(2)
        this.percentage = mulNum(rate,100)

        if(newData>=this.readData.length){ // 解析完成去下载
          this.resolutionEnd()
        }

      }
    }
  },
  methods: {
    // 下载文档
    downloadDocumentation(){
      let a = document.createElement("a");
      a.href = `/static/manual.docx`;
      a.download = "地址解析工具使用手册.docx";
      a.target = "_blank";
      a.click();
      a.remove();
    },
    async getGeocodeData (obj) {
      try {
        await this.axios({
          url: 'https://restapi.amap.com/v3/place/text',
          params: {
            keywords: obj.address,
            key: this.gaodeMapKey,
            city: obj.city,
            extensions: 'all',
          }
        }).then((res) => {
          if(res && res.data && res.data.pois && res.data.pois.length){
            let poisItem = res.data.pois[0]
            if(poisItem.adname){
              obj = {
                ...obj,
                code: poisItem.adcode + '000000',
                province: poisItem.pname,
                city: poisItem.cityname,
                area: poisItem.adname,
                details: poisItem.address,
                result: '成功',
              }
            }
          }
        }).catch((err) => {
          console.log("err:", err);
        });
      }
      catch(err) {
        console.log(err)
      }
      return obj
    },

    // 删除上传文件列表
    handleRemove(index){
      this.fileList.splice(index, 1)
      this.readData = []
      this.stream = []
      this.hitCount = 0
      this.resolvedCount = 0
      this.percentage = 0
    },

    // 校验上传文件个数
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    // 导入excel文件并解析数据成json格式
    httpRequest (e) {
      const file = e.file // 文件信息
      if (!file) {
        return false
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const loading = this.$loading({
        lock: true,
        text: '文件读取中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            // 以字符编码的方式解析
            type: 'binary'
          })
          // 取第一张表
          const exlname = workbook.SheetNames[0]
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
          // console.log('解析的Excel数据', exl)

          if(exl && exl.length>0 && !exl[0].hasOwnProperty('地址')){
            this.$message.error('解析表格中需包含《地址》标题一栏')
            loading.close();
            this.handleRemove(0)
            return false
          }

          this.fileList.push(file)

          this.readData = exl || []
          this.$message.success('已成功读取上传文件，可进行解析')
          loading.close();
        } catch (e) {
          console.log('error')
          loading.close();
          return false
        }
      }
      fileReader.readAsBinaryString(file)
    },

    /**
     * 地址列表解析验证
     * @param list {Array} [address, [address, resultCode]]
     * @returns {boolean}
     */
     async addressParseTest (list = []) {
      let index = 0
      for (const item of list) {
        await setTimeout(async ()=>{
          index += 1
          const address = Array.isArray(item) ? item[0] : item['地址']
          const [result = {}, ...results] = Parse.parse(address, true) // 取数组第一位

          let streamItem = {}
          if (result.area) {
            this.hitCount++
            streamItem = {
              ...item,
              index: index,
              code: result.code,
              province: result.province,
              city: result.city,
              area: result.area,
              details: result.details,
              address: address,
              result: '成功',
            }
          } else {
            streamItem = {
              ...item,
              index: index,
              code: '',
              province: '',
              city: '',
              area: '',
              details: '',
              address: address,
              result: '失败',
            }
            if (this.gaodeMapKey) { // 有key值，进行高德地图二次解析
              let param = streamItem
              param.city = result.city
              let gResult = await this.getGeocodeData(param)
              if (gResult.code && gResult.result === '成功') {
                this.hitCount++
                streamItem = gResult
              }
            }
          }
          if (streamItem.code && streamItem.result === '成功') {
            if(!streamItem.province){
              let provinceCode = `${streamItem.code.slice(0, 2)}0000000000`
              streamItem.province = AREA.province_list[provinceCode]
            }
            if(!streamItem.city){
              let cityCode = `${streamItem.code.slice(0, 4)}00000000`
              streamItem.city = AREA.city_list[cityCode]
            }
          }

          this.stream.push(streamItem)
          this.resolvedCount += 1
        },0)
        this.$forceUpdate();
      }

    },

    // 防止数据中出现特殊字符和英文字符(会造成单元格分隔)的逗号所以这边过滤一下
    exportFormat(value){
      if(value){
        value = value.toString()
        value=value.replace(/[\n]/, '');
        value=value.replace(/,/, '，');
        return value;
      }
      return value
    },

    // 解析地址并下载
     toResolution () {
      if (this.readData.length <= 0) {
        this.$message.error('暂无要解析的地址信息')
        return false
      }

      this.stream = []
      this.hitCount = 0
      this.resolvedCount = 0
      this.percentage = 0
      this.isCanClick = false

       // 地址解析
       setTimeout( ()=>{
        this.addressParseTest(this.readData)
       },50)

    },

    // 解析完成去下载
    resolutionEnd(){
      let result = this.stream
      result.sort(this.sortBy('index'))

      this.isCanClick = true
      this.$message.success('解析完成')

      let initFields = {}
      for(let ele in result[0]){
        if(ele!=='index' && ele!=='address'){
          initFields[ele] = ele
        }
      }
      let currFields={
        code: '编码',
        province: '省',
        city: '市',
        area: '区/县',
        details: '详细地址',
        result: '解析结果',
      };

      let fields = Object.assign({}, initFields, currFields);
      let filename = '地址解析成功数据表'

      // 解析完成地址下载
      downloadXlsxFile(result,fields,filename)
    },

    //根据传过来的字段进行排序
    sortBy (field) {
      return (x, y) => {
        return x[field] - y[field]
      }
    }
  }
}
