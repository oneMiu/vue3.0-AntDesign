/**
 * @author chuzhixin 1204505056@qq.com
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'


import {
  authentication,
  loginInterception,
  recordRoute,
  routesWhiteList,
} from '@/config'
import {
  setCache,
  getCache,
  setPublicData,
} from '@/utils/index'

router.beforeEach(async (to, from, next) => {
  let userInfo = getCache("userInfo");
  if(userInfo){
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if(!userInfo.role_authority.includes(to.name) && !routesWhiteList.includes(to.path)){
        router.push({ path: '/403', query: { redirect: to.path }, replace: true })
      }
      next();
      if(!["index","userSetting"].includes(to.name)){
        if(store.getters["customData/publicDataOver"]!==true){
          setPublicData();
        }
      }
        try {
            accessRoutes = await store.dispatch('routes/setRoutes')
        } catch {
          await store.dispatch('user/resetAll')
          if (recordRoute){
          }else{
            next({ path: '/login', replace: true })
          }
        }
    }
  }else{
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (recordRoute){
        router.push({ path: '/login', query: { redirect: to.path }, replace: true })
      }else{
        router.push({ path: '/login', replace: true })
      } 
    }
  }
})
router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title)
})
