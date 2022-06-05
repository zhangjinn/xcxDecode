//toolFn.ts文件
import fs from 'file-saver'
import * as XLSX from 'xlsx/xlsx.mjs'

function downloadXlsxFile(dataArray, fields, filename) {
  /**
   * 表格数据 => dataArray=[{id:"1",name:"666",sex:"男"}]
   * 表格数据的title => fields={id:"id",name:"名字",sex:"性别"}
   * 表格名字 => filename
   */

  let data = JSON.stringify(dataArray);
  let newData = JSON.parse(data);

  newData.forEach((item) => {
    if (item) {
      for (let i in item) {
        let newVal = JSON.parse(JSON.stringify(item[i]))
        delete item[i]; //删除原先的对象属性
        if (fields.hasOwnProperty(i)) {
          item[fields[i]] = newVal;
        }
      }
    }
  })

  let sheetName = filename //excel的文件名称
  let wb = XLSX.utils.book_new()  //工作簿对象包含一SheetNames数组，以及一个表对象映射表名称到表对象。XLSX.utils.book_new实用函数创建一个新的工作簿对象。
  let ws = XLSX.utils.json_to_sheet(newData, { header: Object.values(fields) }) //将JS对象数组转换为工作表。
  wb.SheetNames.push(sheetName)
  wb.Sheets[sheetName] = ws
  const defaultCellStyle = { font: { name: "Verdana", sz: 13, color: "FF00FF88" }, fill: { fgColor: { rgb: "FFFFAA00" } } };//设置表格的样式
  let wopts = { bookType: 'xlsx', bookSST: false, type: 'binary', cellStyles: true, defaultCellStyle: defaultCellStyle, showGridLines: false }  //写入的样式
  let wbout = XLSX.write(wb, wopts)
  let blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  fs.saveAs(blob, filename + '.xlsx')
}
function s2ab(s) {
  if (typeof ArrayBuffer !== 'undefined') {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  } else {
    let buf = new Array(s.length);
    for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
}
export { downloadXlsxFile };
