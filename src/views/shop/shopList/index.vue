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
            autoWidth: false, //平均分每列宽度
            ajaxInterface: 'shop', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
            searchConfig: {
              //搜索配置
              searchDate: true, //是否显示事件
              isToday: false, //是否是今天
              inputText: [
                {
                  key: 'shop_name',
                  value: '店铺',
                  inputType: 'text',
                  inputValue: '',
                },
              ],
              select: [
                {
                  selectKey: '商家',
                  selectType: 'merchantapi',
                  requestKey:"merchant_id",
                  selectValue: '全部',
                },
              ],
            },
            operationConfig: [
              //操作栏配置
              {
                type: 'normal',
                float: 'left',
                icon: 'ri-close-line',
                clickEvent: 'addData',
              },

              {
                type: 'export',
                float: 'right',
                icon: 'ri-close-line',
                clickEvent: 'exportData',
                extData: [],
              },
            ],
          },
          tableData: [
            {
              align:'center',
              title: '日期',
              rowType: 'text',
              showEditPage: false,
              sliceNum:0, //显示多长，0为显示所有，没有这个属性则按照默认数值截断
              dataIndex: 'create_date',
              config: {
                type: 'datetime',
                value: '',
              },
              slots: {
                customRender: 'create_date',
              },
            },
            {
              align:'center',
              title: '商家',
              rowType: 'number',
              showEditPage: true,
              width:100,
              required: true,
              ruleType:"number",
              dataIndex: 'merchant_name',
              config: {
                //displayItem: ["item_name"], //选择完之后显示谁！以这个属性判断某个属性是否需要与其联动！
                //changeRequestAPI: ['itemapi'], //下拉改变时，数据也以这个名字存放在store、enum的地方
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
              title: '店铺名',
              rowType: 'text',
              showEditPage: true,
              width:100,
              required: true,
              dataIndex: 'shop_name',
              config: {
                type: 'text',
                clickEvent:"openPage",
                openPageName:"shop_url",
              },
              slots: {
                customRender: 'shop_name',
              },
            },
            {
              align:'center',
              title: '授权',
              ruleType: 'number',
              rowType: 'button',
              required: true,
              showEditPage: true,
              dataIndex: 'is_authorization',
              config: {
                isEdit: false,
                displayItem: ["sessionkey","exp_date","auto_review"], //选择完之后显示谁！以这个属性判断某个属性是否需要与其联动！
                type: 'button',
                width: '150',
                size: 'default',
                noStyle:true,
                buttonBg: 'green',
                enumType: 'is_authorization',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_authorization',
              },
            },
             {
              align:'center',
              title: '自动审单',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              required: true,
              dataIndex: 'auto_review',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'auto_review',
                defaultValue: 1,
                value: '',
              },
              slots: {
                customRender: 'auto_review',
              },
            },
            {
              align:'center',
              title: '插旗',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              dataIndex: 'is_flag',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_flag',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_flag',
              },
            },
            {
              align:'center',
              title: '插旗颜色',
              ruleType: 'number',
              rowType: 'select',
              showEditPage: true,
              dataIndex: 'flag',
              config: {
                isEdit: true,
                type: 'select',
                autoColor:true,
                size: 'default',
                enumType: 'flag',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'flag',
              },
            },
            {
              align:'center',
              title: '插旗备注',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'memo',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'memo',
              },
            },
            {
              align:'center',
              title: '提现类型',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              required: true,
              dataIndex: 'refund_type',
              config: {
                isEdit: false,
                displayItem: ["refund_days","refund_minute","refund_minute","refund_minute"], //选择完之后显示谁！以这个属性判断某个属性是否需要与其联动！
                displayItemShow:[{refund_days:[3]},{refund_minute:[4,5,6]}],//如果有多个单选框要显示同一个东西，应该使用数组套json模式，不过性能堪忧，好几层循环，代码有待优化......
                type: 'button',
                width: '150',
                noStyle:true,
                size: 'default',
                enumType: 'refund_type',
                defaultValue: 0,
                value: '',
                orderBy:"deduct_hb_money",
              },
              slots: {
                customRender: 'refund_type',
              },
            },
            {
              align:'center',
              title: '提现分钟',
              rowType: 'text',
              ruleType:"number",
              required: true,
              showEditPage: true,
              dataIndex: 'refund_minute',
              config: {
                hidden:true,
                type: 'number',
                defaultValue: 0,
                orderBy:"refund_type",
              },
              slots: {
                customRender: 'refund_minute',
              },
            },
            {
              align:'center',
              title: '提现天数',
              rowType: 'text',
              ruleType:"number",
              required: true,
              showEditPage: true,
              dataIndex: 'refund_days',
              config: {
                hidden:true,
                type: 'number',
                defaultValue: 0,
                orderBy:"refund_type",
              },
              slots: {
                customRender: 'refund_days',
              },
            },
            {
              align:'center',
              title: '店铺代号',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'shop_code',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'shop_code',
              },
            },
            {
              align:'center',
              title: '店铺地址',
              rowType: 'text',
              showEditPage: false,
              required: true,
              dataIndex: 'customData',
              customData:"跳转",
              config: {
                type: 'text',
                clickEvent:"openPage",
                openPageName:"shopArea",
                paramName:["shop_id"],
                paramValue:["id"],
                value: '',
              },
              slots: {
                customRender: 'customData',
              },
            },
            {
              align:'center',
              title: '店铺备注',
              align:"center",
              dataIndex: 'shop_note',
              required: false,
              rowType: 'editColumns',
              showEditPage: true,
              config: {
                isEdit: true,
                type: 'text',
                size: 'default',
                value: '',
              },
              slots: {
                customRender: 'shop_note',
              },
            },
            {
              align:'center',
              title: '激活',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              required: true,
              dataIndex: 'is_activate',
              config: {
                isEdit: true,
                type: 'button',
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
            {
              align:'center',
              key: 'operation',
              // fixed: 'right',
              title: '操作',
              rowType: 'operation',
              dataIndex: 'operation',
              operation: true,
              operationList: [
                //操作列表（按钮啥的）
                {
                  text: '编辑',
                  clickType: 'edit',
                  clickEvent: 'editRow',
                },
                // {
                //   text: '删除',
                //   clickType: 'delete',
                //   clickEvent: 'onDelete',
                //   title: '确定要删除此条信息吗？？',
                // },
              ],
              slots: {
                customRender: 'operation',
              },
            },
          ],
          description: [
            {
              //额外拓展数据
              title: 'sessionkey',
              rowType: 'text',
              showEditPage: true,
              required: true,
              dataIndex: 'sessionkey',
              config: {
                type: 'text',
                value: '',
                hidden:true,
                orderBy:"is_authorization",//在编辑界面的排序，排在哪个字段的后面
              },
            },
            {
              title: '过期日期',
              rowType: 'text',
              showEditPage: true,
              required: true,
              dataIndex: 'exp_date',
              config: {
                type: 'date',
                value: '',
                hidden:true,
                orderBy:"sessionkey",//在编辑界面的排序，排在哪个字段的后面
              },
            },
             {
              align:'center',
              title: '验证账号',
              ruleType: 'number',
              rowType: 'button',
              required: true,
              showEditPage: true,
              dataIndex: 'is_check',
              config: {
                orderBy:"shop_url",
                displayItem:  ["buyer_level","buyer_age","sex","buyer_avg","down_num","quy_near_week","quy_last_week","is_quality","platform_type"],
                type: 'button',
                enumType: 'is_check',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_check',
              },
            },
            {
              align:'center',
              title: '买家等级',
              rowType: 'select',
              showEditPage: true,
              required: true,
              dataIndex: 'buyer_level',
              config: {
                type: 'select',
                enumType:"buyer_level",
                orderBy:"is_check",
                defaultValue:3,
              },
              slots: {
                customRender: 'buyer_level',
              },
            },
            {
              align:'center',
              title: '买家年限',
              rowType: 'select',
              showEditPage: true,
              required: true,
              dataIndex: 'buyer_age',
              config: {
                type: 'select',
                enumType:"buyer_age",
                orderBy:"buyer_level",
                defaultValue:2,
              },
              slots: {
                customRender: 'buyer_age',
              },
            },
            {
              align:'center',
              title: '账号性别',
              rowType: 'button',
              showEditPage: true,
              required: true,
              dataIndex: 'sex',
              config: {
                type: 'button',
                enumType:"sex__1",
                defaultValue: 0,
                orderBy:"buyer_age",
              },
              slots: {
                customRender: 'sex',
              },
            },
            {
              align:'center',
              title: '账号周单',
              rowType: 'number',
              showEditPage: true,
              required: true,
              dataIndex: 'buyer_avg',
              config: {
                type: 'number',
                defaultValue:3,
                orderBy:"sex",
              },
              slots: {
                customRender: 'buyer_avg',
              },
            },
            {
              align:'center',
              title: '账号降权',
              rowType: 'number',
              required: true,
              showEditPage: true,
              dataIndex: 'down_num',
              config: {
                type: 'number',
                defaultValue:0,
                orderBy:"buyer_avg",
              },
              slots: {
                customRender: 'down_num',
              },
            },
            {
              align:'center',
              title: '本周查询',
              rowType: 'number',
              required: true,
              showEditPage: true,
              dataIndex: 'quy_near_week',
              config: {
                type: 'number',
                defaultValue:15,
                orderBy:"down_num",
              },
              slots: {
                customRender: 'quy_near_week',
              },
            },
            {
              align:'center',
              title: '上周查询',
              rowType: 'number',
              required: true,
              showEditPage: true,
              dataIndex: 'quy_last_week',
              config: {
                type: 'number',
                defaultValue:15,
                orderBy:"quy_near_week",
              },
              slots: {
                customRender: 'quy_last_week',
              },
            },
            // {
            //   align:'center',
            //   title: '优质账号',
            //   rowType: 'button',
            //   required: true,
            //   showEditPage: true,
            //   dataIndex: 'is_quality',
            //   config: {
            //     type: 'button',
            //     enumType:"is_quality__1",
            //     defaultValue: 0,
            //     orderBy:"quy_last_week",
            //   },
            //   slots: {
            //     customRender: 'is_quality',
            //   },
            // },
            // {
            //   align:'center',
            //   title: '平台类型',
            //   rowType: 'text',
            //   required: true,
            //   showEditPage: true,
            //   dataIndex: 'platform_type',
            //   config: {
            //     type: 'text',
            //     orderBy:"is_quality",
            //   },
            //   slots: {
            //     customRender: 'platform_type',
            //   },
            // },
            {
              title: '店铺链接',
              rowType: 'text',
              showEditPage: true,
              required: true,
              dataIndex: 'shop_url',
              tablePageHidden:true,
              config: {
                type: 'text',
                orderBy:"shop_name",
              },
              slots: {
                customRender: 'shop_url',
              },
            },
            {
              align:'center',
              title: '店铺红包',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              required: true,
              dataIndex: 'deduct_hb_money',
              config: {
                isEdit: true,
                type: 'button',
                size: 'default',
                buttonBg: 'green',
                enumType: 'deduct_hb_money',
                orderBy:"shop_url",
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'deduct_hb_money',
              },
            }, 
            {
              align:'center',
              title: '店铺账号',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'account_name',
              config: {
                type: 'text',
                orderBy:"memo"
              },
              slots: {
                customRender: 'account_name',
              },
            },
            {
              align:'center',
              title: '店铺密码',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'account_password',
              config: {
                type: 'text',
                orderBy:"account_name"
              },
              slots: {
                customRender: 'account_password',
              },
            },
          ],
        },
      }
    },
  }
</script>
