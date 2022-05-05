let lineData = [
  {
    "date": "2021-01-07",
    "type": "安静",
    "value": 1
  },
  {
    "date": "2021-01-07",
    "type": "搁浅",
    "value": 1
  },
  {
    "date": "2021-01-07",
    "type": "本草纲目",
    "value": 1
  },
  {
    "date": "2021-01-07",
    "type": "后退",
    "value": 1
  },
  {
    "date": "2021-01-07",
    "type": "黑色幽默",
    "value": 1
  },
  {
    "date": "2021-01-07",
    "type": "一路向北",
    "value": 1
  },
  {
    "date": "2021-01-07",
    "type": "双节棍",
    "value": 1
  },
  {
    "date": "2021-01-09",
    "type": "安静",
    "value": 1
  },
  {
    "date": "2021-01-09",
    "type": "搁浅",
    "value": 1
  },
  {
    "date": "2021-01-09",
    "type": "本草纲目",
    "value": 1
  },
  {
    "date": "2021-01-09",
    "type": "后退",
    "value": 1
  },
  {
    "date": "2021-01-09",
    "type": "黑色幽默",
    "value": 1
  },
  {
    "date": "2021-01-09",
    "type": "一路向北",
    "value": 1
  },
  {
    "date": "2021-01-09",
    "type": "双节棍",
    "value": 1
  },
  {
    "date": "2021-01-11",
    "type": "安静",
    "value": 1
  },
  {
    "date": "2021-01-11",
    "type": "搁浅",
    "value": 1
  },
  {
    "date": "2021-01-11",
    "type": "本草纲目",
    "value": 1
  },
  {
    "date": "2021-01-11",
    "type": "后退",
    "value": 1
  },
  {
    "date": "2021-01-11",
    "type": "黑色幽默",
    "value": 1
  },
  {
    "date": "2021-01-11",
    "type": "一路向北",
    "value": 1
  },
  {
    "date": "2021-01-11",
    "type": "双节棍",
    "value": 1
  },
  {
    "date": "2021-01-13",
    "type": "安静",
    "value": 1
  },
  {
    "date": "2021-01-13",
    "type": "搁浅",
    "value": 1
  },
  {
    "date": "2021-01-13",
    "type": "本草纲目",
    "value": 1
  },
  {
    "date": "2021-01-13",
    "type": "后退",
    "value": 1
  },
  {
    "date": "2021-01-13",
    "type": "黑色幽默",
    "value": 1
  },
  {
    "date": "2021-01-13",
    "type": "一路向北",
    "value": 1
  },
  {
    "date": "2021-01-13",
    "type": "双节棍",
    "value": 1
  },
  {
    "date": "2021-01-16",
    "type": "安静",
    "value": 1
  },
  {
    "date": "2021-01-16",
    "type": "搁浅",
    "value": 1
  },
  {
    "date": "2021-01-16",
    "type": "本草纲目",
    "value": 1
  },
  {
    "date": "2021-01-16",
    "type": "后退",
    "value": 1
  },
  {
    "date": "2021-01-16",
    "type": "黑色幽默",
    "value": 1
  },
  {
    "date": "2021-01-16",
    "type": "一路向北",
    "value": 1
  },
  {
    "date": "2021-01-16",
    "type": "双节棍",
    "value": 1
  },
  {
    "date": "2021-01-18",
    "type": "安静",
    "value": 1
  },
  {
    "date": "2021-01-18",
    "type": "搁浅",
    "value": 1
  },
  {
    "date": "2021-01-18",
    "type": "本草纲目",
    "value": 1
  },
  {
    "date": "2021-01-18",
    "type": "后退",
    "value": 1
  },
  {
    "date": "2021-01-18",
    "type": "黑色幽默",
    "value": 1
  },
  {
    "date": "2021-01-18",
    "type": "一路向北",
    "value": 1
  },
  {
    "date": "2021-01-18",
    "type": "双节棍",
    "value": 1
  },
  {
    "date": "2021-01-22",
    "type": "安静",
    "value": 1
  },
  {
    "date": "2021-01-22",
    "type": "搁浅",
    "value": 1
  },
  {
    "date": "2021-01-22",
    "type": "本草纲目",
    "value": 1
  },
  {
    "date": "2021-01-22",
    "type": "后退",
    "value": 1
  },
  {
    "date": "2021-01-22",
    "type": "黑色幽默",
    "value": 1
  },
  {
    "date": "2021-01-22",
    "type": "一路向北",
    "value": 1
  },
  {
    "date": "2021-01-22",
    "type": "双节棍",
    "value": 1
  }
]
let pieData = [
  {
    "type": "美利坚",
    "value": 1
  },
  {
    "type": "意大利",
    "value": 1
  },
  {
    "type": "墨西哥",
    "value": 1
  },
  {
    "type": "墨尔本",
    "value": 1
  },
  {
    "type": "德意志",
    "value": 1
  },
  {
    "type": "俄罗斯",
    "value": 1
  },
  {
    "type": "格陵兰",
    "value": 1
  }
]
var indexData = [
  {
    interface:"getremindermessage",
    data:[]
  },
  {
    interface:"getmyinfo",
    data: {
      "surplus_money": "12.1",
      "money": "989",
      "week_money": "520",
      "bill_surplus_money": "688",
      "max_money": "20.98",
      "today_money": "0.1",
      "yester_money": "808",
      "today_count": 888.8,
      "yester_count": 999,
      "surplus_taoke_num": 2012,
      "surplus_query_num": 2021,
      "surplus_mark_num": 996
    },
  },
  {
    interface:"gethomemessage",
    data: [
      {
        "order_by": 1,
        "show": 1,
        "update_date": "2021-03-15",
        "title": "【梦比优斯】",
        "content": "梦比优斯是宇宙警备队的新秀，运用奥特之父赠予的“梦比优斯气息”，变化出梦比姆光剑和梦比姆射线等必杀技作战。在地球上化身为名叫日比野未来的青年，加入“CREW GUYS”的队伍，与伙伴们为保卫地球的和平共同努力。在最终话打败了安培拉星人后，梦比优斯告别了地球的同伴们后回归光之国，成为了奥特兄弟的一员。"
      },
      {
        "order_by": 2,
        "show": 1,
        "update_date": "2021-03-15",
        "title": "【迪迦】",
        "content": "第一位平成系奥特曼，也是首位拥有形态转化能力的奥特曼。不同于其他奥特曼的是，迪迦·奥特曼是超古代时期就出现在地球的巨人，但并非是地球出生的奥特曼。他原本是黑暗巨人，也是其中的领袖，后在超古代时期的地球警备队队长幽怜的劝说下弃暗投明， 他吸收了三个同伴的力量再封印了他们，最终成为光之巨人迪迦·奥特曼"
      },
      {
        "order_by": 3,
        "show": 1,
        "update_date": "2021-03-15",
        "title": "【麦克斯】",
        "content": "麦克斯是来自M78星云的红色光之巨人，肩负着星球文明监视员的身份来到地球。在目睹了青年东马快斗即使牺牲自己也要为保护他人而战的壮举后，产生了强烈的个性共鸣而被其感动，遂与之合二为一，为保卫地球而战。"
      },
    ],
  },
  {
      interface:"userinfosum",
      data:{
        user_add_count:123,
        today_user_activate_count:123,
        user_sum_count:123,
        week_count:123,
        yester_count:123,
        month_count:123,
        today_count:155,
        sum_count:113,
      }
  },
  {
    interface:"dayuserdatastatistics",
    data:{
      user_add_count:123,
      today_user_activate_count:123,
      user_sum_count:123,
      week_count:123,
      yester_count:123,
      month_count:123,
      today_count:155,
      sum_count:112,
    }
  },
  {
      interface:"daymoneydatastatistics",
      data:{
        count:100,
        commission:150,
        preside_comm:141,
        advances:122,
        gift_money:220,
      }
  },
  {
      interface:"daywithdrawaldatastatistics",
      data:{
        count:1920,
        commission:1210,
        comments_money:2020,
        salary_money:2021,
        advances:2920,
        consumer_money:1220,
        money:3952,
      }
  },
  {
      interface:"dayordertaskstatistics",
      data:{
        order_count:100,
        user_task_count:100,
      }
  },
  {
    interface:"userdatastatistics",
    data:lineData.map(x=>{
      return {
        "date": x.date,
        "type": x.type,
        "value": Math.ceil(Math.random()*100)
      }
    })

  },
  {
      interface:"orderdatastatistics",
      data:lineData.map(x=>{
        return {
          "date": x.date,
          "type": x.type,
          "value": Math.ceil(Math.random()*100)
        }
      })
  },
  {
      interface:"withdrawaldatastatistics",
      data:lineData.map(x=>{
        return {
          "date": x.date,
          "type": x.type,
          "value": Math.ceil(Math.random()*100)
        }
      })
  },
  {
      interface:"moneydatastatistics",
      data:lineData.map(x=>{
        return {
          "date": x.date,
          "type": x.type,
          "value": Math.ceil(Math.random()*100)
        }
      })
  },
  {
      interface:"userwxareastatistics",
      data:pieData.map(x=>{
        return {
          type:x.type,
          value: Math.ceil(Math.random()*100)
      }})
  },
  {
    interface:"userareastatistics",
    data:pieData.map(x=>{
      return {
        type:x.type,
        value: Math.ceil(Math.random()*150)
    }})
  },  
  {
      interface:"areastatistics",
      data:pieData.map(x=>{
        return {
          type:x.type,
          value: Math.ceil(Math.random()*150)
      }})
  },
  
]
let apiList = [];
for(let i=0;i<indexData.length;i++){
  let apiResponse = {
    url:indexData[i].interface,
    type:"get",
    response(config){
      return {"code": 1,"data":indexData[i].data,"msg":"OK"}
    }
  }
  apiList.push(apiResponse);
}
module.exports=apiList;
