import enumObj from '@/utils/enum.js'
const XLSX = require("xlsx");
const FileSaver = require("file-saver")
let XLSXs;
// XLSXs = require('XLSX-Style');
/**
    如果需要使用xlsx-style修改excel样式的话，需要修改xlsx-style的源码，否则项目无法启动
    步骤如下：
    1.打开/node_moudule/_xlsx-style@0.8.13@xlsx-style/dist/cpexcel.js，
    2.在807行的把var cpt = require('./cpt' + 'able'); 换成var cpt;或者var cpt = cptable;都可以
    这样就可以使用XLSX-Style了

    注意：XLSX-Style并不支持设置高度，需要设置高度可以参考这篇文章
    https://blog.csdn.net/qq_39738977/article/details/102948222
 **/

export function exportExcel({excelTitle,titleField,exportData,fileName,auxData}){
    var arry = [
        excelTitle,
    ];
    if(!titleField){
        titleField = [];
        for(let key in exportData[0]){
            titleField.push(key);
        }
    }
    let tempAux = [];
    for(let e=0;e<exportData.length;e++){
        const a = exportData[e];
        var _arry = [];
        for (let _i in a) {
            let arrIndex = titleField.indexOf(_i)
            if (arrIndex != -1) {
                if (a[_i] != null) {
                    let cur = {};
                    if(tempAux[arrIndex]){
                        cur = tempAux[arrIndex]
                    }else{
                        cur = auxData && auxData.find(x=>x.dataIndex===_i);
                        tempAux[arrIndex] = cur;
                    }
                    if (cur && cur.config) {
                        if ((cur.config.type == "button" || cur.config.type == "select") && !cur.config.requestKey) {
                            try {
                                _arry[arrIndex] = enumObj.Enum.enumType[cur.config.enumType][a[_i]];
                            } catch (e) {
                                _arry[arrIndex] = [a[_i]];
                                console.warn("匹配不到 " + _i + "类型的值 [" + a[_i] + "] 的枚举，已自动取消枚举转换!!!");
                            }
                        } else {
                            _arry[arrIndex] = a[_i];
                        }
                    } else {
                        _arry[arrIndex] = a[_i]                  
                    }
                } else {
                    console.warn("字段" + _arry[arrIndex] + "不存在", "索引为", arrIndex, _i)
                    _arry[arrIndex] = "";
                }
            }
        }
        arry.push(_arry);
    }
    var sheetHistory = XLSX.utils.aoa_to_sheet(arry);
    var style = {
        // 表头样式
        title: { 
          font: { sz: 14, color: { rgb: "ffffff" }, bold: true,},
          alignment: { horizontal: "center", vertical: "center", wrapText: true,},
          fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "1890ff" },},
          border :{
            top: {style: 'thin'},
            bottom: {style: 'thin'},
            left: {style: 'thin'},
            right: {style: 'thin'},
            }
        },
        // 内容样式
        bs: {
          font: { sz: 11, bold: true },
          alignment: { horizontal: "center", vertical: "center", wrapText: true },
          border :{
            top: {style: 'thin'},
            bottom: {style: 'thin'},
            left: {style: 'thin'},
            right: {style: 'thin'},
            }
        },
    };
    sheetHistory["!cols"] = [];
    sheetHistory["!rows"] = [];
    for(let t in sheetHistory){
        if(sheetHistory[t]){
            if(/^[A-Z]+1$/.test(t)){
                sheetHistory[t].s = style.title//设置样式
                sheetHistory["!cols"].push({ wch: 18})
            }else{
                if(typeof sheetHistory[t]==='object' && sheetHistory[t]!==null){
                    sheetHistory[t].s = style.bs
                }
            }
            sheetHistory["!rows"].push({ hpx: 40});
        }
    }
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheetHistory, fileName);
    try {
        XLSXs = XLSXs?XLSXs:XLSX;
        var wbOut = XLSXs.write(workbook, {
            bookType: "xlsx",
            bookSST: false,
            cellStyles: true,
            type: XLSXs.version==='0.8.11'?"buffer":"array"
        });
        FileSaver.saveAs(
            new Blob([wbOut], {
                type: "application/octet-stream"
            }),
            fileName + ".xlsx"
        );
    } catch (e) {
        console.error(e, wbOut);
    }
}