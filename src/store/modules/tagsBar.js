/**
 * @author chuzhixin 1204505056@qq.com
 * @description tagsBar多标签页逻辑，前期借鉴了很多开源项目发现都有个共同的特点很繁琐并不符合框架设计的初衷，后来在github用户cyea的启发下完成了重构，请勿修改
 */

const state = {
  visitedRoutes: [],
}
const getters = {
  visitedRoutes: (state) => state.visitedRoutes,
}
const mutations = {
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 添加标签页
   * @param {*} state
   * @param {*} route
   * @returns
   */
  addVisitedRoute(state, route) {
    let target = state.visitedRoutes.find((item) => item.path === route.path)
    if (target) {
      if (route.fullPath !== target.fullPath) Object.assign(target, route)
      return
    }
    state.visitedRoutes.push(Object.assign({}, route))
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除当前标签页
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delVisitedRoute(state, route) {
    state.visitedRoutes.forEach((item, index) => {
      if (item.path === route.path) state.visitedRoutes.splice(index, 1)
    })
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除当前标签页以外其它全部多标签页
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delOthersVisitedRoutes(state, route) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (item) => item.meta.affix || item.path === route.path
    )
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除当前标签页左边全部多标签页
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delLeftVisitedRoutes(state, {route,pageCache,setCache}) {
    let indexOF = state.visitedRoutes.indexOf(route)
    let left = state.visitedRoutes.slice(0,indexOF);
    const home = state.visitedRoutes[0];
    state.visitedRoutes = state.visitedRoutes.slice(indexOF)
    if(indexOF!=0){
      state.visitedRoutes.unshift(home);
    }
    //删除输入缓存
    if(pageCache){
      left.forEach(x=>{
        if(pageCache[x.name]){
          delete pageCache[x.name]
        }
      })
      setCache("searchForm",pageCache,sessionStorage);
    }

    // state.visitedRoutes = state.visitedRoutes.filter((item) => {
    //   if (item.name === route.name) len = state.visitedRoutes.indexOf(item)
    //   return item.meta.affix || len <= state.visitedRoutes.indexOf(item)
    // })
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除当前标签页右边全部多标签页
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delRightVisitedRoutes(state, {route,pageCache,setCache}) {
    let indexOF = state.visitedRoutes.indexOf(route)
    let right = state.visitedRoutes.slice(indexOF+1)
    state.visitedRoutes = state.visitedRoutes.slice(0,indexOF+1);
    //删除输入缓存
    if(pageCache){
      right.forEach(x=>{
        if(pageCache[x.name]){
          delete pageCache[x.name]
        }
      })
      setCache("searchForm",pageCache,sessionStorage);
    }
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除全部多标签页
   * @param {*} state
   * @param {*} route
   * @returns
   */
  delAllVisitedRoutes(state) {
    state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix)
  },
}
const actions = {
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 添加标签页
   * @param {*} { commit }
   * @param {*} route
   */
  addVisitedRoute({ commit }, route) {
    commit('addVisitedRoute', route)
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除当前标签页
   * @param {*} { commit }
   * @param {*} route
   */
  delVisitedRoute({ commit }, route) {
    commit('delVisitedRoute', route)
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除当前标签页以外其它全部多标签页
   * @param {*} { commit }
   * @param {*} route
   */
  delOthersVisitedRoutes({ commit }, route) {
    commit('delOthersVisitedRoutes', route)
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除当前标签页左边全部多标签页
   * @param {*} { commit }
   * @param {*} route
   */
  delLeftVisitedRoutes({ commit }, route) {
    commit('delLeftVisitedRoutes', route)
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除当前标签页右边全部多标签页
   * @param {*} { commit }
   * @param {*} route
   */
  delRightVisitedRoutes({ commit }, route) {
    commit('delRightVisitedRoutes', route)
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 删除全部多标签页
   * @param {*} { commit }
   */
  delAllVisitedRoutes({ commit }) {
    commit('delAllVisitedRoutes')
  },
}
export default { state, getters, mutations, actions }
