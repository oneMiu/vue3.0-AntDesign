const { mock } = require('mockjs')
const { handleRandomImage } = require('../utils')
let List = []
const temp1 = ["小狗","小猫","小鸡","小兔","小明"];
const temp2 = ['海南政协原副主席王勇被决定逮捕','泰国王室否认诗妮娜被封皇后','肖像被擅用 易烊千玺工作室发声明','取快递女子被造谣出轨案结束侦查','文件传输助手成职场人私密树洞','预警升级!北京发布大风黄色预警','游戏驿站暴涨 美散户"血洗"华尔街','女子训练十几只狗狗同时跳绳','公交司机猝死不被认定工伤','部分高铁列车春运期间因故停运'];
const temp3 = ["艾弗森","麦迪","科比","库里","汤普森","杜兰特","詹姆斯","安东尼","加索尔","尼克杨","韦德"];
const temp4 = ["大表哥","keke","你好啊","绿先生z","呵呵","刘星宇"];
const temp5 = ["小米","华为","苹果","荣耀","OPPO Reno","vivo","三星"];
const temp6 = ["剑圣","恶魔","天使","蓝岛","鬼怪","圣徒","毒液"];
const temp7 = ["湖人","勇士","热火","骑士","快船","中国梦之队","76人","猛龙"];
const temp8 = ["醒山","天津饭","雅木茶","秃林","布玛","龟仙人","龙珠","悟饭","人造人17号"];
const count = 50
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      "arrange_service|1":temp4,
      "task_service|1":temp1,
      "is_activate|1":[0,1],
      "headimgurl": handleRandomImage(228, 228),
      "all_address":"@county(true)",
      "order_state|1":[0,1,2,3,4],
      "id": '@id',
      "mobile":'@integer(10000000000,20000000000)',
      "receiver_mobile":'@integer(10000000000,20000000000)',
      "mer_comm":"@integer(1,20)",
      "pay_time":'@datetime',
      "receiver_name|1":["哆啦","布尔","醒醒","MiuMiu","知知","Nike"],
      "is_standards|1":[0,1],
      "unit_num|1":["xx12x223x121xx","s24535s646sss464sss","aaaa45644aaaa","b56bbbbbbbb","ddd453dd4563ddd"],
      "seller_flag|1":[0,1],
      "tid":'@integer(10000000,20000000)',
      "is_affirm|1":[0,1],
      "kd|1":temp1,
      "receiver_town":"@province",
      "refund_state|1":[0,1],
      "is_taoke|1":[0,1],
      "receiver_city":"@city",
      "gift_money":'@integer(1,20)',
      "advances":'@integer(1,20)',
      "commission":'@integer(1,20)',
      "note|1": temp1,
      "refund_advances":'@integer(1,20)',
      "created":'@datetime',
      "buyer_nick|1": temp1,
      "user_id":"@id",
      "receiver_district":"@county",
      "state|1":[0,1],
      "receiver_address":"@county(true)",
      "coupon_fee|1":[0,1,2,3,4],
      "comments_money|1":[0,1,2,3,4],
      "is_logistics|1":[0,1],
      "gift_name|1": temp1,
      "wechat_qq|1": temp1,
      "gift_code|1": temp1,
      "num_iid_list|1": temp1,
      "is_source|1":[0,1],
      "preside_comm|1":[0,1,2,3,4],
      "create_time":'@datetime',
      "create_date":'@date',
      "sub_time_frame":'@integer(1,20)',
      "buyer_rate|1":[0,1],
      "sub_service|1": temp1,
      "change_service|1": temp1,
      "shop_name|1":["葫芦岛","心灵杀手","甜蜜之家","逃生","阿亚拉","罪恶都市","R星"],
      "item_name|1":temp7,
      "nick_name|1":temp3,
      "label|1":temp6,
      "wxprovince":"@province",
      "is_black|1":[0,1],
      "yester_sub_count":'@integer(1,20)',
      "today_sub_count":'@integer(1,20)',
      "week_sub_count":'@integer(1,20)',
      "month_sub_count":'@integer(1,20)',
      "sum_sub_count":'@integer(1,20)',
      "yester_count":'@integer(1,20)',
      "today_count":'@integer(1,20)',
      "week_count":'@integer(1,20)',
      "month_count":'@integer(1,20)',
      "sum_count":'@integer(1,20)',
      "ip_area_state":"@ip",
      "ip":"@ip",
      "coord_x":"@float(1,255)",
      "coord_y":"@float(1,255)",
      "receiver_state":"@province",
      "receiver_village":"@city",
      "receiver_street":"@county",
      "openid":"@uuid",
      "merchant_name|1":temp5,
      "repeat_day":'@date',
      "is_authorization|1":[0,1],
      "auto_review|1":[0,1],
      "is_flag|1":[0,1],
      "flag|1":[0,1,2,3,4,5],
      "memo|1":temp6,
      "refund_type|1":[0,1],
      "is_mark|1":[0,1],
      "is_sub|1":[0,1],
      "time_frame":"@integer(1,10)",
      "refund_minute":"@integer(1,10)",
      "refund_days":"@integer(1,10)",
      "shop_code":"@integer(1,10)",
      "pic_url":handleRandomImage(228, 228),
      "shop_note|1":temp6,
      "num_iid":"@uuid",
      "item_title|1":temp2,
      "liveness_query_date":"@date",
      "buyer_avg":"@integer(1,10)",
      "down_num":"@integer(1,10)",
      "bad_num":"@integer(1,10)",
      "buyer_level":"@integer(0,15)",
      "regist_day":"@integer(1,10)",
      "good_rate":"@integer(1,10)",
      "sex|1":[0,1],
      "quy_near_week":"@integer(1,10)",
      "quy_last_week":"@integer(1,10)",
      "seller_credit":"@integer(0,20)",
      "real_name":"@integer(0,1)",
      "liveness":"@integer(1,20)",
      "liveness_level":"@integer(1,20)",
      "is_quality":"@integer(0,1)",
      "preside_user_id|1":temp3,
      "username|1":temp3,
      "idcard_code":"@id",
      "service_name|1":temp4,
      "safe_mode|1":[0,1],
      "verif_code":"@integer(10000000,100000000)",
      "money":"@integer(1,100)",
      "type|1":[0,1,2,3,4],
      "exp_time":"@datetime",
      "sku_id":"@integer(1,100)",
      "comments|1":temp2,
      "comments1_url":handleRandomImage(228, 228),
      "comments2_url":handleRandomImage(228, 228),
      "comments3_url":handleRandomImage(228, 228),
      "comments4_url":handleRandomImage(228, 228),
      "comments5_url":handleRandomImage(228, 228),
      "comments6_url":handleRandomImage(228, 228),
      "add_comments1_url":handleRandomImage(228, 228),
      "add_comments2_url":handleRandomImage(228, 228),
      "add_comments3_url":handleRandomImage(228, 228),
      "add_comments4_url":handleRandomImage(228, 228),
      "add_comments5_url":handleRandomImage(228, 228),
      "add_comments6_url":handleRandomImage(228, 228),
      "add_comments|1":temp2,
      "receive_minute":"@integer(1,100)",
      "rate":"@integer(1,100)",
      "receive_count":"@integer(1,100)",
      "last_time":"@date",
      "add_state":"@integer(0,1)",
      "evaluate_task_id":"@integer(500,1000)",
      "task_time":"@datetime",
      "high_praise":handleRandomImage(228, 228),
      "add_high_praise":handleRandomImage(228, 228),
      "comm_type":0,
      "wxpay_name|1":temp4,
      "withd_code":"@integer(100,1000)",
      "withd_type":"@integer(0,3)",
      "salary_money":"@integer(1,100)",
      "consumer_money":"@integer(1,100)",
      "bill_surplus_money":"@integer(1,100)",
      "work_count":"@integer(1,1000)",
      "balance":"@integer(1,1000)",
      "message|1":temp2,
      "role|1":[301,302],
      "check_ip|1":[0,1],
      "last_login":"@datetime",
      "last_login_ip":"@ip",
      "real_addres_name":"@county(true)",
      "hb_max_money":"@integer(0,10)",
      "hb_count":"@integer(0,100)",
      "login_ip":"@ip",
      "exp_date":"@date",
      "is_success|1":[0,1],
      "is_mark_success|1":[0,1],
      "status_time":"@datetime",
      "is_sign|1":[0,1],
      "action|1":["商家正在揽货","已下单","已出库","已签收","到家了","被火烧了","被台风刮走了","被水淹了"],
      "status_desc|1":["被人吃了","没货了","没收了","打魔兽","打CF","没钱","被吞了","被水淹了"],
      "itemsame_name|1":temp5,
      "customer_name|1":temp4,
      "surplus_money":"@integer(0,100)",
      "bill_money":"@integer(0,100)",
      "bill_consumer_money":"@integer(0,100)",
      "surplus_mark_num":"@integer(0,100)",
      "surplus_taoke_num":"@integer(0,100)",
      "surplus_query_num":"@integer(0,100)",
      "is_autoclear|1":[0,1],
      "st_advances":"@integer(0,100)",
      "ed_advances":"@integer(0,100)",
      "code":"@integer(0,100)",
      "wxpay_mchid":"@integer(100000,1000000)",
      "yester_money":"@integer(0,100)",
      "today_money":"@integer(0,100)",
      "week_money":"@integer(0,100)",
      "month_money":"@integer(0,100)",
      "sum_money":"@integer(0,100)",
      "stroke_count":"@integer(0,100)",
      "file_path|1":["src/view","src/api","src/assets","src/components","src/config","src/router","src/store",],
      "service_type_info":"@integer(0,100)",
      "verify_type_info":"@integer(0,100)",
      "user_name":"@uuid",
      "authorizer_appid":"@uuid",
      "authorizer_refresh_token":"@uuid",
      "principal_name|1":temp4,
      "alias|1":temp7,
      "business_info|1":["未开通","已开通"],
      "qrcode_url":handleRandomImage(228, 228),
      "func_info|1":temp8,
      "email":"@email",
      "password":"@uuid",
      "is_check|1":[0,1],
      "sessionkey":"@uuid",
      "buyer_age|1":[0,1,2,3,4,5],
      "shop_url":"http://www.baidu.com",
      "deduct_hb_money|1":[0,1],
      "account_name|1":temp8,
      "account_password":"@uuid",
    })
  )
}
const pageList = ["user","order", "userMessage", "userAccount", "userCoord", "openidtounionid", "userActive", "merchant", "shop", "item", "similarCommodity", "mytask",'task', "taobaoaccount", "accountmerchantarea", "redpacket", "commission", "withdrawal", "shopFlow", "userFlow", "serviceloginrecord", "serviceloginip", "taobaomark", "taobaonote", "taoke", "taobaologisticsinfo", "customer", "userSetting", "customermoney", "gift", "wxmerchant", "officialMessage", "editComponent","praise","wxQuery","blacklist","saveCheck",'evaluatetask','userevaluatetask','wechatpub','shopArea','home'];
let result = []
for(let i=0;i<pageList.length;i++){
  for(let j=0;j<4;j++){
    let res;
    let type;
    if(j===0){
      type = "get";
      res = function (config){
        const {page = 1, each_page_num = 10 } = config.query
        const pageList = List.filter(
          (item, index) =>
            index < each_page_num * page && index >= each_page_num * (page - 1)
        )
        return {
          "code": 1,
          "data": pageList,
          "msg": "OK",
          "sum_count": List.length,
          "sum_page_num": List.length/each_page_num,
          "page":page,
          "each_page_num": each_page_num
        };
      }
    }
    else if(j===1){
      type = "put";
      res=function(config){
        return {
          code: 1,
          msg: '修改成功',
        }
      }
    }else if(j===2){
      type = "post";
      res=function(config){
        return {
          code: 1,
          msg: '添加成功',
        }
      }
    }else{
      type = "delete";
      res=function(config){
        return {
          code: 1,
          msg: '删除成功',
        }
      }
    }
    let temp = {
      url: '/'+pageList[i],
      type,
      response:function(config){
        return res(config)
      }
    };
    result.push(temp);
  }
}
result.push(
  {
    url:"/settings",
    type:"get",
    response:function(config){
      return {
        msg:"ok",
        code:1,
        data:{
          "is_autoclear|1":[0,1],
          "surplus_mark_num|1":"@integer(0,100)",
          "bill_consumer_money|1":"@integer(0,100)",
          "bill_money|1":"@integer(0,100)",
          "surplus_money|1":"@integer(0,100)",
          "surplus_taoke_num":"@integer(0,100)",
          "notice":"<p style=\"color: red; text-align: center; line-height: 2;\"><span style=\"text-decoration: underline;\"><span style=\"font-size: 36pt; font-family: terminal, monaco, monospace; background-color: #bfedd2;\"><span style=\"color: #e03e2d; text-decoration: underline;\"><strong>第一，绝对不意气用事；第二，绝对不漏判任何一件坏事；第三，绝对裁判的公正漂亮，裁判机器人蜻蜓队长前来觐见！</strong></span></span></span></p>"
        }
      }
    }
  }
)
module.exports = result
