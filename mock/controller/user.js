module.exports = [
  {
    url: '/service/login',
    type: 'post',
    response(config) {
      return {"code": 1, "redirect_url": "indexData", "service_id": 1, "service_name": "绿先生z", 
        "role_authority": [
          'indexData',
          'index',
          'userList',
          'userAccount',
          'userCoord',
          'userActive',
          'shopList',
          'commodityMessage',
          'similarCommodity',
          'myTask',
          'orderRegister',
          'tbAccount',
          'redPacket',
          'capitalRecord',
          'refundRecord',
          'shopFlow',
          'userFlow',
          'userSetting',
          'businessGift',
          'merchantMessage',
          'editComponent',
          '/',
          'icon',
          'praise',
          'saveCheck',
          'evaluatetask',
          'shopArea',
          'home',
          'taskRoom',
          "weixin",
          "alibaba",
          "bank",
        ],
        "role": 201
      }
    },
  },
  {
    url: '/service/logout',
    type: 'get',
    response() {
      return {
        code: 1,
        msg: 'ok',
      }
    },
  },
]
