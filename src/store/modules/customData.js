import enumObj from '@/utils/enum.js'

const state = {
  currentEditItem: {},
  loadingInstance:false,
  publicAPI:["customerapi","merchantapi","shopapi","wechatpubapi","serviceapi","areaapi","wxmerchantapi"],//每加一个都要往setPublicData方法里面加多一个接口返回的除id字段外的另一个字段名如{id:1,name:哈哈}中的name
  publicInterface:{merchant:"merchantapi",shop:"shopapi",item:"itemapi",wxmerchant:"wxmerchantapi"},//添加完需要清空的数据
  customerapi:[],//客户数据（公共请求）
  shopapi:[],//店铺数据（公共请求）
  serviceapi:[],//客服数据（公共请求）
  itemapi:[],//商品数据（公共请求）
  merchantapi:[],//商家（公共请求）
  wxmerchantapi:[],//商户号（公共请求）
  wechatpubapi:[],//公众号（公共请求）
  areaapi:[],//地区（公共请求）
  menuShow:{},//左边菜单列表的右击自定义菜单显示
  publicDataOver:false,//是否获取完所有公共数据
  tableCustomWidth:0,
  loadingSp:false,
}
const getters = {
  currentEditItem: (state) => state.currentEditItem,
  loadingInstance:(state)=>state.loadingInstance,
  publicAPI:(state)=>state.publicAPI,
  publicInterface:(state)=>state.publicInterface,
  customerapi:(state)=>state.customerapi,
  shopapi:(state)=>state.shopapi,
  serviceapi:(state)=>state.serviceapi,
  itemapi:(state)=>state.itemapi,
  merchantapi:(state)=>state.merchantapi,
  wxmerchantapi:(state)=>state.wxmerchantapi,
  wechatpubapi:(state)=>state.wechatpubapi,
  areaapi:(state)=>state.areaapi,
  publicDataOver:(state)=>state.publicDataOver,
  tableCustomWidth:(state)=>state.tableCustomWidth,
  loadingSp:(state)=>state.loadingSp,
  menuShow:(state)=>{
    return function(routerName){
      if(routerName){
        return state.menuShow[routerName]
      }else{
        return state.menuShow
      }
    }
  }
}
const mutations = {
  setLoadingSp(state,item){
    state.loadingSp = item;
  },
  setCurrentEditItem(state, item) {
    state.currentEditItem = item;
  },
  closeLoading(state, item) {
    state.loadingInstance = item;
  },
  tableCustomWidth(state,item){
    state.tableCustomWidth = item;
  },
  setMenuShow(state,item){
    for(let key in state.menuShow){
      delete state.menuShow[key]
    }
    if(item){
      state.menuShow[item.name]=true
    }
  },
  setPublicData(state, item){
    state[item.publicDataType] = item.publicData;
    enumObj.Enum.enumType[item.publicDataType] = {};
    for(let i=0;i<item.publicData.length;i++){
      enumObj.Enum.enumType[item.publicDataType][item.publicData[i].id] = item.publicData[i].val_name || item.publicData[i].shop_name || item.publicData[i].service_name || item.publicData[i].item_name || item.publicData[i].merchant_name || item.publicData[i].wechat_pub_name || item.publicData[i].nick_name || item.publicData[i].customer_name || item.publicData[i].area_state || item.publicData[i].wxpay_name
    }
  },
  setPublicDataOver(state, item){
    state.publicDataOver = item;
  }
}
const actions = {
  setPublicData({ commit }, item) {
    commit('setPublicData', item)
  },
}
export default { state, getters, mutations,actions }
