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
                    key: 'item_name',
                    value: '商品名',
                    inputType: 'text',
                    inputValue: '',
                  },
                  {
                    key: 'num_iid',
                    value: '商品id',
                    inputType: 'number',
                    inputValue: '',
                  },
                ],
              },
              select: [
                {
                  selectKey: '激活',
                  selectType: 'is_activate',
                  selectValue: '全部',
                },
              ],
            },
            operationConfig: [
              //操作栏配置
              {
                type: 'normal',
                icon: 'ri-close-line',
                clickEvent: 'addData',
              },
            ],
            autoWidth: false, //平均分每列宽度
            ajaxInterface: 'itemsame', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
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
              title: '店铺',
              rowType: 'text',
              ruleType:"text",
              showEditPage: true,
              required: true,
              dataIndex: 'shop_name',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'shop_name',
              },
            },
            {
              align:'center',
              title: '主图',
              dataIndex: 'pic_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: true,
              required: true,
              config: {
                orderBy:"num_iid",
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
                customRender: 'pic_url',
              },
            },
            {
              align:'center',
              title: '商品名',
              rowType: 'text',
              showEditPage: true,
              required:true,
              dataIndex: 'item_name',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'item_name',
              },
            },
            {
              align:'center',
              title: '商品ID',
              rowType: 'text',
              ruleType:"number",
              required: true,
              dataIndex: 'num_iid',
              showEditPage:true,
              config: {
                type: 'number',
                width:"200",
                showGetItem:true,
              },
              slots: {
                customRender: 'num_iid',
              },
            },
            {
              align:'center',
              title: '标题内容',
              rowType: 'text',
              required: true,
              showEditPage:true,
              dataIndex: 'item_title',
              width:180,
              config: {
                type: 'textarea',
                textareaConfig:{ minRows: 5, maxRows: 5 }
              },
              slots: {
                customRender: 'item_title',
              },
            },
            {
              align:'center',
              title: '打标',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              required: true,
              dataIndex: 'is_mark',
              config: {
                isEdit: false,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_mark',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_mark',
              },
            },
            // {
            //   align:'center',
            //   key: 'note',
            //   title: '备注',
            //   dataIndex: 'note',
            //   required: false,
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
          description: [
            //额外拓展数据
          ],
        },
      }
    },
  }
</script>
