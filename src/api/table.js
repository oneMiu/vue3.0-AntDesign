import request from '@/utils/request'
import {getCache} from '@/utils/index'

function specialPageAddParams(data){
  let routerName = location.href.split("/")[location.href.split("/").length-1]
  if(routerName=="similarCommodity"){
    let a = getCache("searchForm",sessionStorage);
    if(a.pageName=="similarCommodity"){
      if(a.searchData.item_id!=undefined){
        data.item_id = a.searchData.item_id
      }
    }
  }
}
export function getList(url,params,method="GET") {
  return request({
    url,
    method,
    params,
  })
}
export function getTableList(url,params,method="GET") {
  console.log("getTableList",params)
  return request({
    url,
    method,
    params,
    Loading:true,
  })
}
export function addData(url,data,method="POST") {
  // let routerName = location.href.split("/")[location.href.split("/").length-1];
  specialPageAddParams(data);
  return request({
    url,
    method,
    data,
  })
}
export function doEdit(url,data,method="PUT") {
  console.log(data)
  if(method=='PUT'){
    if(data.id){
      url = url+"/"+data.id;
      delete data.id
    }else{
      alert("提示：put请求需要加上id！")
      return;
    }
  }
  specialPageAddParams(data);
  return request({
    url,
    method,
    data,
  })
}

export function doDelete(url,data,method="DELETE") {
  if(data.id){
    url = url+"/"+data.id
  }else{
    alert("提示：delete请求需要加上id！")
    return;
  }
  return request({
    url,
    method,
  })
}
export function exportTable(url,params={},method="GET") {
  params.export=1;
  return request({
    url,
    method,
    params,
  })
}
