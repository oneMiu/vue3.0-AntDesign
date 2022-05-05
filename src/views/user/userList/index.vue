<template>
  <ATable :tableMessage="tableMessage"></ATable>
</template>

<script>
  import ATable from '@/components/tableComponent.vue'
  export default {
    components: {
      ATable,
    },
    data() {
      return {
        tableMessage: {
          config: {
            //总配置
            searchConfig: {
              //搜索配置
              searchDate: true, //是否显示事件
              isToday: false, //是否是今天
              selectInput: {
                //带输入框的下拉框配置
                width: 200,
                options: [
                  {
                    key: 'buyer_nick',
                    value: '买家昵称',
                    inputType: 'text',
                    inputValue: '',
                  },
                  {
                    key: 'tid',
                    value: '订单号',
                    inputType: 'number',
                    inputValue: '',
                  },
                  {
                    key: 'user_id',
                    value: '用户',
                    inputType: 'number',
                    inputValue: '',
                  },
                  {
                    key: 'mobile',
                    value: '手机号',
                    inputType: 'number',
                    inputValue: '',
                  },
                  {
                    key: 'nick_name',
                    value: '微信昵称',
                    inputType: 'text',
                    inputValue: '',
                  },
                  {
                    key: 'inviter_id',
                    value: '上级',
                    inputType: 'number',
                    inputValue: '',
                  },
                  {
                    key: 'openid',
                    value: 'openid',
                    inputType: 'text',
                    inputValue: '',
                  },                  
                  {
                    key: 'note',
                    value: '备注',
                    inputValue: '',
                    inputType: 'text',
                  },
                ],
              },
              doubleSelect: {
                width: 200,
                options: [
                  {
                    selectKey: '角色',
                    selectType: 'role',
                    selectValue: '全部',
                    selectenum:"",
                  },
                  {
                    selectKey: '黑名单',
                    selectType: 'is_black',
                    selectValue: '全部',
                    selectenum:"",
                  },
                ],
              },
            },
            operationConfig: [
              {
                type: 'normal',
                text: '用户群发',
                role:[201,301],
                icon: 'ri-close-line',
                ajaxInterface: 'wechatusertags',
                clickEvent: 'blacklist',
                ajaxMethod: 'POST',
                extData: [
                  {
                    title: '日期',
                    showEditPage: true,
                    ruleType: 'dateRange',
                    required: true,
                    rowType: 'text',
                    dataIndex: 'create_date',
                    config: {
                      isEdit: false, //是否可以修改
                      type: 'dateRange',
                      value:[],
                    },
                  },
                  {
                    align:'center',
                    title: '公众号',
                    rowType: 'number',
                    ruleType:"number",
                    showEditPage: true,
                    required: true,
                    dataIndex: 'wechatpub_name',
                    config: {  
                      type: 'select',
                      enumType: 'wechatpubapi',
                      requestKey: 'wechatpub_id',
                      value: '',
                    },
                    slots: {
                      customRender: 'wechatpub_name',
                    },
                  },
                  {
                    align:'center',
                    title: '需求商家',
                    rowType: 'number',
                    ruleType:"number",
                    showEditPage: true,
                    required: false,
                    dataIndex: 'merchant_name',
                    config: {  
                      multiple:true,//是否多选
                      type: 'select',
                      enumType: 'merchantapi',
                      requestKey: 'merchant_id',
                      value: '',
                    },
                    slots: {
                      customRender: 'merchant_name',
                    },
                  },
                  {
                    align:'center',
                    title: '地区',
                    rowType: 'number',
                    ruleType:"number",
                    showEditPage: true,
                    required: false,
                    dataIndex: 'area_name',
                    config: {  
                      multiple:true,//是否多选
                      type: 'select',
                      enumType: 'areaapi',
                      requestKey: 'area_id',
                      value: '',
                    },
                    slots: {
                      customRender: 'area_name',
                    },
                  },
                  {
                    title: '最大人数',
                    showEditPage: true,
                    ruleType: 'number', //编辑时的类型
                    required: true,
                    rowType: 'editColumns',
                    dataIndex: 'sum_num',
                    config: {
                      isEdit: false, //是否可以修改
                      type: 'number',
                      width: '100',
                      size: 'default',
                      min: 0,
                      max: 1000,
                    },
                  },
                ],
              },
              {
                type: 'export',
                float: 'right',
                icon: 'ri-close-line',
                clickEvent: 'exportData',
              },
            ],
            autoWidth: false, //平均分每列宽度
            ajaxInterface: 'user', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
          },
          tableData: [
            {
              //表格数据
              align:'center',
              title: '时间',
              rowType: 'text',
              sliceNum:0, //显示多长，0为显示所有，没有这个属性则按照默认数值截断
              showEditPage: false,
              dataIndex: 'create_time',
              config: {
                type: 'datetime',
                value: '',
              },
              slots: {
                customRender: 'create_time',
              },
            },
            {
              align:'center',
              title: '头像',
              dataIndex: 'headimgurl',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: true,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'headimgurl',
              },
            },
             {
               align:'center',
              title: '微信昵称',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'nick_name',
              slots: {
                customRender: 'nick_name',
              },
            },
            {
              align:'center',
              title: '用户',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'user_id',
              config:{
                quickVisit:[
                  {title:"用户账号",name:"userAccount",paramName:"user_id"},
                  {title:"用户坐标",name:"userCoord",paramName:"user_id"},
                ]
              },
              slots: {
                customRender: 'user_id',
              },
            },
            {
              align:'center',
              title: '手机号',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'mobile',
              slots: {
                customRender: 'mobile',
              },
            },
            {
              align:'center',
              title: '佣金',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'commission',
              slots: {
                customRender: 'commission',
              },
            },
            {
              align:'center',
              title: '额外佣金',
              rowType: 'editColumns',
              showEditPage: false,
              dataIndex: 'extra_comm',
              config:{
                isEdit:true,
                type:"fuShuNumber"
              },
              slots: {
                customRender: 'extra_comm',
              },
            },
            {
              align:'center',
              title: '角色',
              showEditPage: true,
              ruleType: 'number',
              required: true,
              rowType: 'editColumns',
              dataIndex: 'role',
              config: {
                isEdit: true,
                type: 'select',
                width: '150',
                size: 'default',
                enumType: 'role',
                value: '',
              },
              slots: {
                customRender: 'role',
              },
            },
            {
              align:'center',
              title: '标签',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'label',
              slots: {
                customRender: 'label',
              },
            },
             {
              align:'center',
              title: '微信省份',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'wxprovince',
              config: {
                type: 'text',
                value: '',
              },
               slots: {
                customRender: 'wxprovince',
              },
            },
            {
              align:'center',
              title: '黑名单',
              ruleType: 'number',
              required: true,
              dataIndex: 'is_black',
              rowType: 'button',
              showEditPage: true,
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_black',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_black',
              },
            },
            {
              align:'center',
              key: 'note',
              title: '备注',
              dataIndex: 'note',
              required: true,
              rowType: 'editColumns',
              showEditPage: true,
              config: {
                isEdit: true,
                type: 'text',
                width: '150',
                size: 'default',
                value: '',
              },
              slots: {
                customRender: 'note',
              },
            },
          ],
          description:[
              {
              title: 'unionid',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'unionid',
              config: {
                type: 'text',
                value: '',
              },
            },
            {
              title: 'openid',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'openid',
              config: {
                type: 'text',
                value: '',
              },
            },
            {
              title: '公众号',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'wechat_pub_name',
              config: {
                type: 'text',
                value: '',
              },
            },
            {
              align:'center',
              title: 'IP省份',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'area_state',
            },
            {
              title: '用户IP',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'ip',
              config: {
                type: 'text',
                value: '',
              },
            },
            {
              align:'center',
              title: '微信性别',
              showEditPage: true,
              ruleType: 'number',
              required: true,
              rowType: 'editColumns',
              dataIndex: 'wxsex',
              config: {
                isEdit: false,
                type: 'select',
                width: '150',
                size: 'default',
                enumType: 'wxsex',
                value: '',
              },
            },
            
            {
              title: '微信城市',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'wxcity',
              config: {
                type: 'text',
                value: '',
              },
            },
            {
              align:'center',
              title: '用户上级',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'inviter_id',
              slots: {
                customRender: 'inviter_id',
              },
            },
            {
              align:'center',
              title: '状态激活',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              required: true,
              dataIndex: 'is_activate',
              config: {
                clickEvent:"openPage",
                openPageName:"userActive",
                paramName:["user_id"],
                paramValue:["user_id"],
                isEdit: false,
                noStyle:true,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_activate',
                defaultValue: 1,
                value: '',
              },
              slots: {
                customRender: 'is_activate',
              },
            },
          ]
        },
      }
    },
  }
</script>
