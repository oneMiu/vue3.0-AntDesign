import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import Layout from '@/layout'
import config from '@/config'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    name:"login",
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    name:"notfound",
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
      {
        path: 'indexData',
        name: 'indexData',
        component: () => import('@/views/index/indexData'),
        meta: {
          title: '数据',
          icon: 'home-4-line',
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userList',
    alwaysShow: true,
    meta: {
      title: '用户',
      icon: 'user-3-line',
    },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/user/userList'),
        meta: {
          title: '用户列表',
          // icon: 'table-2',
        },
      },
      {
        path: 'userAccount',
        name: 'userAccount',
        component: () => import('@/views/user/userAccount'),
        meta: {
          title: '用户账号',
          // icon: 'remixicon-line',
        },
      },
      {
        path: 'userCoord',
        name: 'userCoord',
        component: () => import('@/views/user/userCoord'),
        meta: {
          title: '用户坐标',
          // icon: 'remixicon-line',
        },
      },
    ],
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shopList',
    alwaysShow: true,
    meta: {
      title: '店铺',
      icon: 'hotel-line',
    },
    children: [
      {
        path: 'shopArea',
        name: 'shopArea',
        hidden: true,
        component: () => import('@/views/shop/shopArea'),
        meta: {
          tagHidden:true,
          title: '店铺地址',
          // icon: 'table-2',
        },
      },
      {
        path: 'shopList',
        name: 'shopList',
        component: () => import('@/views/shop/shopList'),
        meta: {
          title: '店铺列表',
          // icon: 'table-2',
        },
      },
    ],
  },
  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity/commodityMessage',
    alwaysShow: true,
    meta: {
      title: '商品',
      icon: 'gift-line',
    },
    children: [
      {
        path: 'commodityMessage',
        name: 'commodityMessage',
        component: () => import('@/views/commodity/commodityMessage'),
        meta: {
          title: '商品列表',
          // icon: 'table-2',
        },
      },
      {
        path: 'similarCommodity',
        name: 'similarCommodity',
        hidden: true,
        component: () => import('@/views/commodity/similarCommodity'),
        meta: {
          title: '同类商品',
          tagHidden:true,
          // icon: 'remixicon-line',
        },
      },
    ],
  },
  {
    path: '/task',
    component: Layout,
    redirect: '/task/taskRoom',
    alwaysShow: true,
    meta: {
      title: '任务',
      icon: 'task-line',
    },
    children: [
      {
        path: 'taskRoom',
        name: 'taskRoom',
        component: () => import('@/views/task/taskRoom'),
        meta: {
          title: '任务大厅',
          // icon: 'table-2',
        },
      },
      {
        path: 'myTask',
        name: 'myTask',
        component: () => import('@/views/task/myTask'),
        meta: {
          title: '我的任务',
          // icon: 'remixicon-line',
        },
      },
    ],
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderRegister',
    alwaysShow: true,
    meta: {
      title: '订单',
      icon: 'list-unordered',
    },
    children: [
      {
        path: 'orderRegister',
        name: 'orderRegister',
        component: () => import('@/views/order/orderRegister'),
        meta: {
          title: '订单登记',
          // icon: 'table-2',
        },
      },
    ],
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/tbAccount',
    alwaysShow: true,
    meta: {
      title: '账号',
      icon: 'account-box-line',
    },
    children: [
      {
        path: 'tbAccount',
        name: 'tbAccount',
        component: () => import('@/views/account/tbAccount'),
        meta: {
          title: '淘宝账号',
          // icon: 'table-2',
        },
      },
    ],
  },
  {
    path: '/redPacket',
    component: Layout,
    redirect: '/redPacket/redPacket',
    alwaysShow: true,
    meta: {
      title: '红包',
      icon: 'red-packet-fill',
    },
    children: [
      {
        path: 'redPacket',
        name: 'redPacket',
        component: () => import('@/views/redPacket/redPacket'),
        meta: {
          title: '独立红包',
          // icon: 'remixicon-line',
        },
      },
    ],
  },
  {
    path: '/praise',
    component: Layout,
    redirect: '/praise/evaluatetask',
    alwaysShow: true,
    meta: {
      title: '评价',
      icon: 'chat-voice-line',
    },
    children: [
      {
        path: 'evaluatetask',
        name: 'evaluatetask',
        component: () => import('@/views/praise/evaluatetask'),
        meta: {
          title: '五星好评',
        },
      },
    ],
  },
  {
    path: '/save',
    component: Layout,
    redirect: '/save/saveCheck',
    alwaysShow: true,
    meta: {
      title: '安全',
      icon: 'angularjs-fill',
    },
    children: [
      {
        path: 'saveCheck',
        name: 'saveCheck',
        component: () => import('@/views/405'),
        meta: {
          title: '安全监测',
        },
      },
    ],
  },
  {
    path: '/financeRecharge',
    component: Layout,
    redirect: '/financeRecharge/alibaba',
    alwaysShow: true,
    meta: {
      title: '充值',
      icon: 'exchange-cny-line',
    },
    children: [
      {
        path: 'bank',
        name: 'bank',
        component: () => import('@/views/financeRecharge/bank'),
        meta: {
          title: '银行充值',
        },
      },
      {
        path: 'alibaba',
        name: 'alibaba',
        component: () => import('@/views/financeRecharge/alibaba'),
        // component: () => import('@/views/405'),
        meta: {
          title: '支付宝充值',
        },
      },
      {
        path: 'weixin',
        name: 'weixin',
        component: () => import('@/views/financeRecharge/weixin'),
        meta: {
          title: '微信充值',
        },
      },
    ],
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/userSetting',
    alwaysShow: true,
    meta: {
      title: '我的',
      icon: 'settings-3-line',
    },
    children: [
      {
        path: 'userSetting',
        name: 'userSetting',
        component: () => import('@/views/setting/userSetting'),
        meta: {
          title: '我的配置',
          // icon: 'table-2',
        },
      },
    ],
  },
  {
    path: '/vab',
    component: Layout,
    redirect: '/vab/icon',
    alwaysShow: false,
    meta: {
      title: '图标大全',
      icon: 'apps-line',
    },
    children: [
      {
        path: 'icon',
        name: 'icon',
        component: () => import('@/views/vab/icon'),
        meta: {
          title: '图标',
          icon: 'apps-line',
        },
      },
    ],
  },
  {
    path: '/error',
    hidden: true,
    name: 'Error',
    component: Layout,
    redirect: '/error/403',
    alwaysShow:false,
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/403'),
        meta: {
          title: '403',
          tagHidden:true,
          icon: 'error-warning-line',
        },
      },
      {
        
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: {
          title: '404',
          tagHidden:true,
          icon: 'error-warning-line',
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: config.routerMode==='history'?createWebHistory():createWebHashHistory(),
  routes: asyncRoutes,
})

export default router
