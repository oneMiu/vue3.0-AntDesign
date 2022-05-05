<template>
  <div>
    <a-tabs @tab-click="handleTabClick">
      <a-tab-pane v-for="(Pitem, index) in panel" :key="index">
        <template #tab>
          <span>
            {{ Pitem.panelName }}
          </span>
        </template>
        <a-form
          ref="ruleForm"
          :rules="rules"
          autocomplete="off"
          :model="columnsValue"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <div v-for="(col, colIndex) in Pitem.panelContain" :key="colIndex">
            <div v-if="col.config && !col.config.hidden">
              <!-- 普通输入框 -->
              <a-form-item
                v-if="
                  col.config.type == 'text' ||
                  col.config.type == 'password' ||
                  !col.config.type
                "
                :required="col.required"
                :ref="col.dataIndex"
                :label="col.title"
                :name="col.dataIndex"
              >
                <a-input
                  v-model:value="columnsValue[col.dataIndex]"
                  :type="col.config.type ? col.config.type : 'text'"
                  :style="{ width: col.config.width ? col.config.width + 'px' : null }"
                  :name="col.config.type == 'password' ? 'new-password' : ''"
                  :disabled="col.config.disabled ? true : false"
                  @blur="inputchange(col)"
                />
              </a-form-item>

              <!-- 多行输入框 -->
              <a-form-item
                v-if="col.config.type == 'textarea'"
                :required="col.required"
                :ref="col.dataIndex"
                :label="col.title"
                :name="col.dataIndex"
              >
             
              <div v-show="!showSkeleton">
                <textarea  id="mytextarea" style="opacity:0"></textarea>
              </div>
                <a-skeleton v-show="showSkeleton" active />
              </a-form-item>
              <!-- 数字输入框 -->
              <a-form-item
                v-if="col.config.type == 'number'"
                :required="col.required ? true : undefined"
                :ref="col.dataIndex"
                :label="col.title"
                :name="col.dataIndex"
              >
                <a-input-number
                  :min="col.config.min"
                  :step="col.config.double ? 0.1 : 1"
                  :style="{ width: '200px' }"
                  :max="col.config.max"
                  v-model:value="columnsValue[col.dataIndex]"
                  @blur="inputchange(col)"
                />

                <a-button
                  v-if="col.config.showGetItem"
                  @click="getiteminfo(col.dataIndex, columnsValue[col.dataIndex])"
                  style="margin-left: 15px"
                  type="primary"
                  :loading="getiteminfoLoading"
                >
                  获取数据
                </a-button>

                <a-tooltip
                  v-if="!col.config.dontShowQuestion"
                  placement="right"
                  :title="col.config.question ? col.config.question : col.title"
                >
                  <QuestionCircleOutlined class="questionIcon" />
                </a-tooltip>
              </a-form-item>

              <!-- 下拉选择框 -->
              <a-form-item
                v-else-if="col.config.type == 'select'"
                :required="col.required ? true : undefined"
                :label="col.title"
                :name="col.config.requestKey || col.dataIndex"
              >
                <a-select
                  v-model:value="col.config.value"
                  showSearch
                  allowClear
                  placeholder="全部"
                  @change="inputchange(col, colIndex)"
                >
                  <a-select-option
                    :value="selectItem"
                    v-for="(selectItem, selectIndex) in enumObj.Enum.enumType[
                      col.config.enumType
                    ]"
                    :key="selectIndex"
                  >
                    {{ selectItem }}
                  </a-select-option>
                </a-select>
              </a-form-item>

              <!-- 多选框 -->
              <a-form-item
                v-else-if="col.config.type == 'switch'"
                :required="col.required"
                :label="col.title"
                :name="col.dataIndex"
                @change="inputchange(col)"
              >
                <a-checkbox-group v-model:value="col.config.value">
                  <a-checkbox
                    :value="i"
                    v-for="(k, i) in enumObj.Enum.enumType[col.config.enumType]"
                    :key="i"
                  >
                    {{ k }}
                  </a-checkbox>
                </a-checkbox-group>
              </a-form-item>

              <!-- 单选框 -->
              <a-form-item
                v-else-if="col.config.type == 'button'"
                :required="col.required"
                :label="col.title"
                :name="col.dataIndex"
              >
                <a-radio-group
                  v-model:value="col.config.value"
                  @change="inputchange(col)"
                >
                  <a-radio
                    :value="selectItem"
                    v-for="(selectItem, selectIndex) in enumObj.Enum.enumType[
                      col.config.enumType
                    ]"
                    :key="selectIndex"
                  >
                    {{ selectItem }}
                  </a-radio>
                </a-radio-group>
                <a-tooltip
                  v-if="!col.config.dontShowQuestion"
                  placement="right"
                  :title="col.config.question ? col.config.question : col.title"
                >
                  <QuestionCircleOutlined class="questionIcon" />
                </a-tooltip>
              </a-form-item>

              <!-- 日期选择 -->
              <a-form-item
                v-else-if="col.config.type == 'date'"
                :required="col.required"
                :label="col.title"
                :name="col.dataIndex"
              >
                <a-date-picker
                  v-model:value="columnsValue[col.dataIndex]"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                  @change="dateOK(col)"
                />
              </a-form-item>

              <!-- 时间选择 -->
              <a-form-item
                v-else-if="col.config.type == 'datetime'"
                :required="col.required"
                :label="col.title"
                :name="col.dataIndex"
              >
                <a-date-picker
                  show-time
                  v-model:value="columnsValue[col.dataIndex]"
                  type="datetime"
                  placeholder="选择时间"
                  style="width: 100%"
                  @change="inputchange(col)"
                  @ok="dateOK(col)"
                />
              </a-form-item>
            </div>
          </div>
        </a-form>
      </a-tab-pane>
      <template #tabBarExtraContent>
        <a-button
          style="width: 200px; margin-bottom: 50px"
          @click="submitChange"
          type="primary"
          >提交修改</a-button
        >
      </template>
    </a-tabs>
  </div>
</template>

<script>
import {
  AppleOutlined,
  AndroidOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";
import { getList, addData } from "@/api/table";
export default {
  data() {
    return {
      showSkeleton:true,
      enumObj: require("@/utils/enum.js").default,
      rules: {},
      columnsValue: {},
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 17,
      },
      panel: [
        {
          panelName: "账号配置",
          panelContain: [
            {
              title: "淘宝注册时间",
              showEditPage: true,
              ruleType: "number", //编辑时的类型
              required: true,
              dataIndex: "surplus_money",
              config: {
                type: "number",
                width: "100",
                size: "default",
              },
            },
            {
              title: "淘宝查询次数",
              showEditPage: true,
              ruleType: "number", //编辑时的类型
              required: true,
              dataIndex: "bill_money",
              config: {
                type: "number",
                width: "100",
                size: "default",
              },
            },
            {
              title: "淘宝账号过期",
              showEditPage: true,
              ruleType: "number", //编辑时的类型
              required: true,
              dataIndex: "bill_consumer_money",
              config: {
                type: "number",
                width: "100",
                size: "default",
              },
            },
          ],
        },
        {
          panelName: "任务配置",
          panelContain: [
            {
              title: "关键字复制长度",
              showEditPage: true,
              ruleType: "number", //编辑时的类型
              required: true,
              dataIndex: "surplus_mark_num",
              config: {
                type: "number",
                width: "100",
                size: "default",
              },
            },
          ],
        },
        {
          panelName: "用户配置",
          panelContain: [
            {
              title: "首单任务奖励",
              showEditPage: false,
              required: true,
              dataIndex: "is_autoclear",
              ruleType: "number",
              config: {
                type: "button",
                enumType: "is_check",
                value: "",
              },
            },
            {
              title: "返款最大金额",
              showEditPage: true,
              ruleType: "number", //编辑时的类型
              required: true,
              dataIndex: "surplus_taoke_num",
              config: {
                type: "number",
                width: "100",
                size: "default",
              },
            },
          ],
        },
        {
          panelName: "公告信息",
          panelContain: [
            {
              title: "公告",
              dataIndex: "notice",
              ruleType: "text",
              config: {
                type: "textarea",
                value: "",
              },
            },
          ],
        },
      ],
      keyupEvent: function () {},
    };
  },
  mounted() {
    this.destroyTiny();
    this.getSetting();
  },
  methods: {
    getSetting(){
      getList("settings").then((res) => {
        if (res.data) {
          for (var key in res.data) {
            if (res.data[key] !== undefined) {
              this.columnsValue[key] = res.data[key];
            } else {
              this.columnsValue[key] = "";
            }
          }
          this.init();
        }
      });
    },
    handleTabClick(tab){
        if(tab===3){
          Promise.resolve().then(()=>{
            this.$nextTick(()=>{
              this.initTiny();
            })
          })
        }else{
          this.destroyTiny();
        }
    },
    initTiny(){
        //用的是tinyMCE的富文本编辑器，需要自行去注册哦，然后替换掉在index.html引入的script的key，不然会一直报警告
        tinyMCE.init({
            selector: '#mytextarea',
            language:'zh_CN',
            plugins: "save",
            toolbar: "save | undo redo | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | indent outdent | fontsizeselect fontselect",
            save_enablewhendirty: true,
            save_onsavecallback:()=>{ 
              this.columnsValue.notice = tinyMCE.activeEditor.getContent()
              this.$message.success("保存成功")
            },
            init_instance_callback : (editor)=> {
                if(this.columnsValue.notice){
                  tinyMCE.activeEditor.setContent(this.columnsValue.notice)
                }
                this.showSkeleton = false;
            },
            height:600,
        });
    },
    destroyTiny(){
      if(tinyMCE.editors["mytextarea"]){
        this.showSkeleton = true;
        tinyMCE.editors["mytextarea"].destroy();
      }
    },
    init() {
      this.enumObj = require("@/utils/enum.js").default;
      this.columns = this.panel[0].panelContain;
      this.columns = this.columns.concat(this.panel[1].panelContain);
      this.columns = this.columns.concat(this.panel[2].panelContain);
      this.columns = this.columns.concat(this.panel[3].panelContain);
      this.handleData();
      if (window.onkeyup) {
        this.keyupEvent = window.onkeyup;
        window.onkeyup = null;
      }
    },
    //以下内容待整合！！！
    handleData() {
      for (let i = 0; i < this.columns.length; i++) {
        let item = this.columns[i];
        try {
          if (this.columns[i].config.enumType) {
            this.columns[i].config.value = this.enumObj.Enum.enumType[
              item.config.enumType
            ][this.columnsValue[item.dataIndex]];
          }
        } catch (e) {
          console.error(
            "枚举值匹配错误！！请检查这个值是否存在枚举类当中！       ",
            item.config.enumType
          );
          this.$message.error(
            "枚举值匹配错误！！请检查这个值是否存在枚举类当中！       ",
            item.config.enumType
          );
        }
        //增加输入规则
        if (item.required) {
          this.rules[item.config.requestKey || item.dataIndex] = [];
          if (item.config.type === "number") {
            item.ruleType = "number";
          }
          if (item.ruleType === "text") {
            item.ruleType = "string";
          } else if (item.config.type === "button" || item.config.type === "select") {
            item.ruleType = "number";
          }
          let tempObj = {
            type: item.ruleType || "string",
            required: item.required,
            message: item.title + "的值不合法",
            trigger: "blur",
          };
          //文件自定义校验方式
          if (item.ruleType === "file") {
            delete tempObj.type;
            tempObj.validator = async (rule, value, callback) => {
              if (!value) {
                return Promise.reject("请上传文件");
              }
              return Promise.resolve();
            };
          }
          this.rules[item.config.requestKey || item.dataIndex].push(tempObj);
          if (item.min) {
            this.rules[item.dataIndex].push({
              type: item.config.type || "string",
              min: item.min,
              message: "最小为" + item.min,
              trigger: "change",
            });
          }
          if (item.max) {
            this.rules[item.dataIndex].push({
              max: item.max,
              message: "最大为" + item.max,
              trigger: "change",
            });
          }
        }
      }
    },
    inputchange(item, itemIndex) {
      if (item.config.type == "button" || item.config.type == "select") {
        this.columnsValue[item.config.requestKey || item.dataIndex] = item.config.value
          ? parseInt(this.enumObj.Enum.parseEnum(item.config.enumType, item.config.value))
          : "";
        if (item.config.displayItem && item.config.value) {
          this.addPublicData(item);
        }
        //清空的时候
        if (!item.config.value && item.config.displayItem) {
          for (let i = 0; i < this.columns.length; i++) {
            let displayItemIndex = item.config.displayItem.indexOf(
              this.columns[i].dataIndex
            );
            if (displayItemIndex != -1) {
              this.columns[i].config.hidden = true;
              break;
            }
          }
        }
      }
      if (item.config.type == "img") {
        this.columnsValue[item.dataIndex] = item.config.fileList[0].response.data.img_key;
      }
      if (item.config.type == "date" || item.config.type == "datetime") {
        if (!this.columnsValue[item.dataIndex]) {
          this.columnsValue[item.dataIndex] = "";
        }
      }
      if (item.config.type == "switch") {
        this.columnsValue[item.dataIndex] = item.config.value;
      }
      console.log("输入框变动，此时的提交表单", this.columnsValue);
    },
    async submitChange() {
      let tox =  document.getElementsByClassName("tox-tbtn");
      if(tox.length>0){
        tox = Array.from(tox).find(x=>x.ariaLabel==="保存");
        if(tox && tox.ariaDisabled == "false"){
          this.$confirm({
            title: "提示",
            content: "检测到公告已做了修改，是否直接保存？",
            okText: "确认",
            cancelText: "取消",
            maskClosable: true,
            onOk: () => {
              this.columnsValue.notice = tinyMCE.activeEditor.getContent()
              addData("settings", this.columnsValue).then((res) => {
                this.$message.success("修改成功！");
              });
            },
          });
          return;
        }
      }
      addData("settings", this.columnsValue).then((res) => {
        this.$message.success("修改成功！");
      });
    },
    beforeRouteLeave(to, from, next) {
      window.onkeyup = this.keyupEvent;
      next();
    },
  },
  components: {
    AppleOutlined,
    AndroidOutlined,
    QuestionCircleOutlined,
  },
};
</script>
<style>
.questionIcon {
  margin-left: 20px;
  font-size: 16px;
}
</style>
