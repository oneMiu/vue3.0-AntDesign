import axios from 'axios'
import {
  contentType,
  debounce,
  requestTimeout,
  successCode,
  tokenName,
  mockURL,
} from '@/config'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import { message } from 'ant-design-vue'
let $alert = message
/**
 * @author chuzhixin 1204505056@qq.com
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg,response) => {
  switch (code) {
    case 401:
      $alert.error('登录身份过期，请重新登录')
      localStorage.clear();
      store.dispatch('routes/resetRoutesfilter')
      setTimeout(()=>{
        router.push({path:"/login"})
      },2000)
      break
    case 403:
      router.push({ path: '/401' }).catch(() => {})
      break
    case 404:
      $alert.error(response.config.url+'接口404！！！！！')
      break
    case 500:
      $alert.error("服务端错误！")
    
  }
}

let api = '//192.168.0.160:2222/api';
if(process.env.NODE_ENV !== 'development' && window.location.href.indexOf('localhost')===-1){
  api = "//back.1230v.com/api";    
}
axios.defaults.baseURL = window.location.protocol+api;
if(mockURL){
  axios.defaults.baseURL = "/api"  
}
window.API_ROOT = axios.defaults.baseURL;
const instance = axios.create({
  withCredentials: true,
  timeout: requestTimeout,
})
/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    if(config.url.indexOf("uploadpictures")==-1){
      if(config.url.indexOf("?")!=-1){
        let urlArr = config.url.split("?");
        urlArr[0] = urlArr[0]+"/"
        config.url = urlArr.join("?");
      }else{
        config.url = config.url+"/"
      }
    }
    config.url+=config.url.indexOf('?')==-1?`?v=${process.env.VUE_APP_VERSION}`:`&v=${process.env.VUE_APP_VERSION}`
    // console.log("请求配置：",config);
    if (store.getters['user/accessToken'])
      config.headers[tokenName] = store.getters['user/accessToken']
    if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8')
      config.data = qs.stringify(config.data)
    // if (debounce.some((item) => config.url.includes(item))) {
    //   //这里写加载动画
    // }
      if(config.Loading){
        store.commit('customData/closeLoading', true)
      }
    return config
  },
  (error) => {
    store.commit('customData/closeLoading', false)
    console.log("请求出错拦截",store.getters["customData/loadingInstance"])
    return Promise.reject(error)
  }
)

/**
 * @author chuzhixin 1204505056@qq.com
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    if (store.getters["customData/loadingInstance"]) {
      store.commit('customData/closeLoading', false)
    }
    console.log("返回，接口：",response.config.url,response.data)
    const { data, config } = response
    const { code, msg } = data
    // 操作正常Code数组
    // const codeVerificationArray = isArray(successCode)
    //   ? [...successCode]
    //   : [...[successCode]]
    // // 是否操作正常
    // if (codeVerificationArray.includes(code)) {
    // } else {
    // }
    handleCode(code, msg)
    if(code!=1){
      if(code!=401 && code!=403 && code!=404 && code!=500){
        $alert.error(msg)
      }
      return Promise.reject(
          JSON.stringify({ url: config.url, code, msg }) || 'Error'
      )
    }else{
      return data
    }
  },
  (error) => {
    if (store.getters["customData/loadingInstance"]) {
      store.commit('customData/closeLoading', false)
    }
    console.log("返回出错拦截",store.getters["customData/loadingInstance"])
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data.msg || message,response)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '连接远程服务失败，请稍后再试！'
      }else if (message.includes('timeout') || message.includes("TIMED_OUT")) {
        message = '连接超时，请稍后再试！'
      }else if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '服务端接口' + code + '异常'
      }
      $alert.error(message || `后端接口未知异常`)
      return Promise.reject(error)
    }
  }
)

export default instance
