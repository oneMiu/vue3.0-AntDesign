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
            ajaxInterface: 'shoparea', //接口
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
            },
            operationConfig: [
              //操作栏配置
              {
                type: 'normal',
                float: 'left',
                icon: 'ri-close-line',
                clickEvent: 'addData',
                role:[301,201],
                specialKeys:{shop_id:"searchKey"},
              },
            ],
          },
          tableData: [
            {
              align:'center',
              title: '创建时间',
              rowType: 'text',
              required: true,
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
              title: '店铺名',
              rowType: 'number',
              ruleType:"number",
              showEditPage: false,
              required: true,
              dataIndex: 'shop_name',
              config: {
                type: 'select',
                enumType: 'shopapi',
                requestKey: 'shop_id',
                value: '',
              },
              slots: {
                customRender: 'shop_name',
              },
            },
            {
              align:'center',
              title: '省份',
              rowType: 'number',
              ruleType:"number",
              showEditPage: true,
              required: true,
              dataIndex: 'area_state',
              config: {
                type: 'select',
                enumType: 'areaapi',
                requestKey: 'area_id',
                value: '',
              },
              slots: {
                customRender: 'area_state',
              },
            },
            {
              align:'center',
              key: 'operation',
              title: '操作',
              rowType: 'operation',
              dataIndex: 'operation',
              operation: true,
              operationList: [
                {
                  text: '删除',
                  clickType: 'delete',
                  clickEvent: 'onDelete',
                  title: '确定要删除此条信息吗？？',
                },
              ],
              slots: {
                customRender: 'operation',
              },
            },
          ],
        },
      }
    },
  }
</script>
