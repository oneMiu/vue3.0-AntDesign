import { devDependencies } from '../../package.json'
import aes from './aes.js'
import store from '@/store'
import request from '@/utils/request'
if (!devDependencies['vab-config']) document.body.innerHTML = ''
/**
 * @author chuzhixin 1204505056@qq.com
 * @description 格式化时间
 * @param time
 * @param cFormat
 * @returns {string|null}
 */
export function handleCount(price,pay_type){
  if(price){
    return request({url:"payment/payrateprice",params:{price,pay_type}}).then(res=>{
      return res.data.price;
    })
  }else{
    return "00.00"
  }
}
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 格式化时间
 * @param time
 * @param option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {{}|any}
 */
export function paramObj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 父子关系的数组转换成树形结构数据
 * @param data
 * @returns {*}
 */
export function translateDataToTree(data) {
  const parent = data.filter(
    (value) => value.parentId === 'undefined' || value.parentId == null
  )
  const children = data.filter(
    (value) => value.parentId !== 'undefined' && value.parentId != null
  )
  const translator = (parent, children) => {
    parent.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.parentId === parent.id) {
          const temp = JSON.parse(JSON.stringify(children))
          temp.splice(index, 1)
          translator([current], temp)
          typeof parent.children !== 'undefined'
            ? parent.children.push(current)
            : (parent.children = [current])
        }
      })
    })
  }
  translator(parent, children)
  return parent
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 树形结构数据转换成父子关系的数组
 * @param data
 * @returns {[]}
 */
export function translateTreeToData(data) {
  const result = []
  data.forEach((item) => {
    const loop = (data) => {
      result.push({
        id: data.id,
        name: data.name,
        parentId: data.parentId,
      })
      const child = data.children
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i])
        }
      }
    }
    loop(item)
  })
  return result
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 10位时间戳转换
 * @param time
 * @returns {string}
 */
export function tenBitTimestamp(time) {
  const date = new Date(time * 1000)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '' + m : m
  let d = date.getDate()
  d = d < 10 ? '' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second //组合
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 13位时间戳转换
 * @param time
 * @returns {string}
 */
export function thirteenBitTimestamp(time) {
  const date = new Date(time / 1)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '' + m : m
  let d = date.getDate()
  d = d < 10 ? '' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second //组合
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 获取随机id
 * @param length
 * @returns {string}
 */
export function uuid(length = 32) {
  const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let str = ''
  for (let i = 0; i < length; i++) {
    str += num.charAt(Math.floor(Math.random() * num.length))
  }
  return str
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description m到n的随机数
 * @param m
 * @param n
 * @returns {number}
 */
export function random(m, n) {
  return Math.floor(Math.random() * (m - n) + n)
}
/**
 * @author 767441322@qq.com
 * @description 设置缓存
 */
export function setCache(m, n,cacheType=localStorage) {
  if(typeof n !='string'){
    try{
      n = JSON.stringify(n);
    }catch(e){
      console.error("setCache()设置缓存方法中缓存对象转化失败",n,"不是json可序列化对象！");
      n="";
    }
  }
  if(cacheType===localStorage){
    let expTime = new Date().getTime() + 1440 * 60 * 1000; //设置1440分钟的请求数据缓存，超过这个时间将重新请求
    cacheType.setItem("expTime",expTime);
  }
  cacheType.setItem(aes.Encrypt(m),aes.Encrypt(n));
}
/**
 * @author 767441322@qq.com
 * @description 获取缓存
 */
export function removeCache(m,cacheType=localStorage){
  m=aes.Encrypt(m);
  cacheType.removeItem(m);
}
export function getCache(m,cacheType=localStorage) {
  if(!m){
    alert("缓存名字为必传参数！")
    return null;
  }
  let data=null;
  m=aes.Encrypt(m);
  if(cacheType===localStorage){
    let expTime = cacheType.getItem("expTime");
    if(expTime){
      if (new Date().getTime() > expTime) {
        cacheType.removeItem(m);
      }else{
        data = cacheType.getItem(m)
        if(data){
          data = aes.Decrypt(data);
          try{
            let json = JSON.parse(data);
            data = json;
          }catch(e){}
        }
      }
    }
  }else{
    data = cacheType.getItem(m)
    if(data){
      data = aes.Decrypt(data);
    }
    try{
      let json = JSON.parse(data);
      data = json;
    }catch(e){}
  }
  return data;
}
export function filterRouter(userInfo,asyncRoutes){
  if(userInfo.role_authority.length>0){
    for(let i=0,len=asyncRoutes.length;i<len;i++){
        asyncRoutes[i].hasChildrenShow = [];
        if(asyncRoutes[i].children){
            for(let j=0,clen=asyncRoutes[i].children.length;j<clen;j++){
                if(!userInfo.role_authority.includes(asyncRoutes[i].children[j].name)){
                  asyncRoutes[i].children[j].hidden = true;
                    if(asyncRoutes[i].hasChildrenShow.length===0 && j===clen-1){
                        asyncRoutes[i].hidden = true;
                    }else{
                      asyncRoutes[i].hidden = false;
                    }
                  }else{
                    if(!asyncRoutes[i].children[j].meta.tagHidden){
                      asyncRoutes[i].children[j].hidden = false;
                      // if(asyncRoutes[i].alwaysShow){
                        asyncRoutes[i].hidden = false;
                        asyncRoutes[i].hasChildrenShow.push(asyncRoutes[i].children[j])
                      // }
                    }
                  }
              }
          }
      }
  }
}
export function setPublicData(){
  let pubApi = store.getters["customData/publicAPI"];
  function handlePublicAPI(pubApiIndex=0){
    let isCatch = false;
    if(pubApi.length>0){
      let hasData = Object.keys(store.getters["customData/"+pubApi[pubApiIndex]]);
      if(hasData.length<1 && pubApi[pubApiIndex]){
        request({
          url:pubApi[pubApiIndex],method:"GET"
        }).then(res=>{
          store.commit("customData/setPublicData",{publicDataType:pubApi[pubApiIndex],publicData:res.data})
          if((pubApiIndex+1)<pubApi.length){
            handlePublicAPI(pubApiIndex+1);
          }else{
            store.commit("customData/setPublicDataOver",true)
          }
        }).catch(err=>{
          isCatch = true;
        })
      }else{
        console.log("pubApiIndex",pubApiIndex,"isCatch",isCatch)
        if((pubApiIndex+1)<pubApi.length && !isCatch){
          handlePublicAPI(pubApiIndex+1);
        }else{
          store.commit("customData/setPublicDataOver",true)
        }
      }
    }
  }
  handlePublicAPI();
}
export function getBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
}
/**
 * @author chuzhixin 1204505056@qq.com
 * @description addEventListener
 * @type {function(...[*]=)}
 */
export const on = (function () {
  return function (element, event, handler, useCapture = false) {
    if (element && event && handler) {
      element.addEventListener(event, handler, useCapture)
    }
  }
})()

/**
 * @author chuzhixin 1204505056@qq.com
 * @description removeEventListener
 * @type {function(...[*]=)}
 */
export const off = (function () {
  return function (element, event, handler, useCapture = false) {
    if (element && event) {
      element.removeEventListener(event, handler, useCapture)
    }
  }
})()
