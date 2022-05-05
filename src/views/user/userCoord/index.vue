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
                    key: 'openid',
                    value: 'openid',
                    inputType: 'text',
                    inputValue: '',
                  },
                ],
              },
              select:[
                {
                  selectKey: '最近',
                  selectType: 'is_default__1',
                  selectValue: '全部',
                },
              ]
            },
            operationConfig: [
              {
                type: 'export',
                float: 'right',
                icon: 'ri-close-line',
                clickEvent: 'exportData',
              },
            ],
            autoWidth: false, //平均分每列宽度
            ajaxInterface: 'usercoord', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
          },
          tableData: [
            {
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
              title: '用户',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'user_id',
              config:{
                quickVisit:[
                  {title:"用户列表",name:"userList",paramName:"user_id"},
                  {title:"用户账号",name:"userAccount",paramName:"user_id"},
                ]
              },
              slots: {
                customRender: 'user_id',
              },
            },
            {
              align:'center',
              title: '经度',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'coord_x',
              slots: {
                customRender: 'coord_x',
              },
            },
            {
              align:'center',
              title: '纬度',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'coord_y',
              slots: {
                customRender: 'coord_y',
              },
            },
            {
              align:'center',
              title: '省份',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_state',
              slots: {
                customRender: 'receiver_state',
              },
            },
            {
              align:'center',
              title: '城市',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_city',
              slots: {
                customRender: 'receiver_city',
              },
            },
            {
              align:'center',
              title: '区县',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_district',
              slots: {
                customRender: 'receiver_district',
              },
            },
            {
              align:'center',
              title: '街道',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_town',
              slots: {
                customRender: 'receiver_town',
              },
            },
            {
              align:'center',
              title: '村庄',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_village',
              slots: {
                customRender: 'receiver_village',
              },
            },
            {
              align:'center',
              title: '城市道路',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_street',
              slots: {
                customRender: 'receiver_street',
              },
            },

            {
              align:'center',
              title: '详细地址',
              rowType: 'text',
              width:200,
              showEditPage: false,
              dataIndex: 'receiver_address',
              slots: {
                customRender: 'receiver_address',
              },
            },
            {
              align:'center',
              title: '所有地址',
              rowType: 'text',
              width:200,
              showEditPage: false,
              dataIndex: 'all_address',
              slots: {
                customRender: 'all_address',
              },
            },
            // {
            //   title: '是否默认',
            //   ruleType: 'number',
            //   rowType: 'button',
            //   showEditPage: true,
            //   dataIndex: 'is_default',
            //   config: {
            //     isEdit: false,
            //     type: 'button',
            //     width: '150',
            //     size: 'default',
            //     buttonBg: 'green',
            //     enumType: 'is_default',
            //     defaultValue: 0,
            //     value: '',
            //   },
            //   slots: {
            //     customRender: 'is_default',
            //   },
            // },
            // {
            //   key: 'note',
            //   title: '备注',
            //   dataIndex: 'note',
            //   required: true,
            //   rowType: 'editColumns',
            //   showEditPage: true,
            //   config: {
            //     isEdit: true,
            //     type: 'text',
            //     width: '150',
            //     size: 'default',
            //     value: '',
            //   },
            //   slots: {
            //     customRender: 'note',
            //   },
            // },
          ],
        },
      }
    },
  }
</script>
