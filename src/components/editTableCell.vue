<template>
<div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper" style="display: flex;flex-flow: column;" :style="{'width':itemConfig.config.width?itemConfig.config.width+'px':'150px'}">
        <i class="ri-close-line handle" style="font-size: 20px;background: red;cursor: pointer;text-align: center;" @click="cancel"></i>
        <!-- 文本输入框 -->
        <a-input v-if="itemConfig.config.type=='text'" :size="itemConfig.config.size?itemConfig.size:'default'" v-model:value="value" @change="inputChange(itemConfig.config)" :placeholder='"请输入"+itemConfig.title' />
        <!-- 数字输入框 -->
        <a-input-number v-else-if="itemConfig.config.type=='number' || itemConfig.config.type=='fuShuNumber' || itemConfig.config.type==='double' || itemConfig.config.type=='dateAdd' || itemConfig.config.type=='datetimeAdd'" :placeholder='"请输入"+itemConfig.title' v-model:value="value" :size="itemConfig.config.size?itemConfig.config.size:'default'" :min="itemConfig.config.min" style="width:375px" :max="itemConfig.config.max" @change="inputChange(itemConfig.config)" />
        <!-- 下拉选择框 -->
        <a-select v-else-if="itemConfig.config.type=='select'" v-model:value="value">
            <a-select-option :value="selectIndex" v-for="(selectItem,selectIndex) in enumObj.Enum.enumType[itemConfig.config.enumType]" :key="selectIndex">
                {{selectItem}}
            </a-select-option>
        </a-select>
        <!-- 日期修改器 -->
        <a-date-picker v-else-if="itemConfig.config.type=='date'" v-model:value="value" placeholder="请选择日期" @change="onChange" />
        <!-- 时间修改器 -->
        <a-date-picker v-else-if="itemConfig.config.type=='datetime'" v-model:value="value" show-time placeholder="请选择时间" @change="onChange" />

        <check-outlined style="background: rgb(82, 196, 26);" :style="{'width':itemConfig.config.width?itemConfig.config.width+'px':'150px'}" class="editable-cell-icon-check handle" @click="check" />
    </div>
    <div v-else class="editable-cell-text-wrapper" style="width: 100%; display: flex; align-items: center">
        <span v-if="itemConfig.config.type=='select'">
            <a-tag v-if="itemConfig.config.autoColor" :color="text==0?null:enumObj.Enum.colorMap[text]">
                {{enumObj.Enum.enumType[itemConfig.config.enumType][text] || '全部'}}
            </a-tag>
            <span v-else>
                <div v-if="itemConfig.config.isEdit" style="display: inline-block;">
                   {{enumObj.Enum.enumType[itemConfig.config.enumType][text] || '全部'}}
                </div>
                <div v-else :style="{'background':enumObj.Enum.tableKewordColor[text]}" style="padding: 5px;color: white;border-radius: 5px;white-space: nowrap;">
                   {{enumObj.Enum.enumType[itemConfig.config.enumType][text] || '全部'}}
                </div>
            </span>
        </span>
        <span v-else style="height: 30px; line-height: 30px">
            <NormalRow :tableConfig="tableConfig" :item="itemConfig" :record="$attrs.record" :text="text" />
            <!-- {{text?isChina(text)?text.length>5?text.slice(0,5)+'...':text:text.length>15?text.slice(0,15)+'...':text:""}} -->
        </span>
        <edit-outlined class="editable-cell-icon" style="color:#1890ff;margin-left:10px;display:inline" 
            v-if="(itemConfig.role && itemConfig.role.includes(userInfo.role) && itemConfig.config.isEdit) || (!itemConfig.role && itemConfig.config.isEdit)" @click="edit" />
    </div>
</div>
</template>

<script>
import {CheckOutlined,EditOutlined} from '@ant-design/icons-vue';
import {isNumber,isChina} from '@/utils/validate'
import enumObj from '@/utils/enum.js'
import {parseTime,getCache} from '@/utils/index'
import NormalRow from './normalRow.vue'
export default {
    name: 'EditableCell',
    components: {
        CheckOutlined,
        EditOutlined,
        NormalRow,
    },
    props: {
        text: [String, Number, Object],
        item: {},
        tableConfig:{
            type:[Object,Array],
            default:{},
        }
    },
    data() {
        return {
            userInfo: getCache("userInfo"),
            isChina,
            teampInputValue: 0,
            value: this.text,
            editable: false,
            itemConfig: this.item,
            enumObj,
        };
    },
    mounted() {},
    methods: {
        check() {
            let timeTempValue;
            if (this.itemConfig.config.type == 'select') {
                if (!this.enumObj.Enum.enumType[this.itemConfig.config.enumType][this.value]) {
                    this.value = this.enumObj.Enum.parseEnum(this.itemConfig.config.enumType, this.value); //兼容同时两次以上修改出现的bug
                }
            }
            if(this.itemConfig.config.type==='dateAdd'){
                let timeValue = new Date(this.text).getTime();
                timeValue = timeValue+this.value*60000*60*24
                timeTempValue = parseTime(timeValue,'{y}-{m}-{d}');
            }else if(this.itemConfig.config.type==='datetimeAdd'){
                let timeValue = new Date(this.text).getTime();
                timeValue = timeValue+this.value*60000
                timeTempValue = parseTime(timeValue,'{y}-{m}-{d} {h}:{i}:{s}');
            }else{
                timeTempValue = this.value;
            }
            this.editable = false;
            if(this.value || this.value===0 || this.value===""){
                this.$emit('enter', {data: timeTempValue,clickType: "select",rollback:()=>{this.value = this.text}});
                console.log("发送value到table", timeTempValue)
            }
        },
        cancel() {
            this.value = this.teampInputValue;
            this.editable = false;
        },
        inputChange(item) {
            //number类型处理
            if (item.type === "number" || item.type==='double' || item.type==='dateAdd'|| item.type==='datetimeAdd') {
                if (this.value) {
                    if (!isNumber(this.value) && (item.type === "number")) {
                        this.$message.warning('只能输入数字哦');
                        let tempvalue = this.value +"";
                        this.value=tempvalue.replace(/[^0-9]/ig,"");
                    }
                }
                if (!this.value && this.value != 0) {
                    this.value = item.min;
                }
                if (this.value > item.max) {
                    this.$message.warning('不能超过' + item.max + '哦');
                } else if (this.value < item.min) {
                    this.$message.warning('不能小于' + item.min + '哦');
                }
            }
        },
        onChange(value, dateString) {
            this.value = dateString;
        },
        edit() {
            this.teampInputValue = this.value
            if (this.itemConfig.config.type == 'select') {
                this.value = this.enumObj.Enum.enumType[this.itemConfig.config.enumType][this.value]
            }
            if (this.itemConfig.config.type == 'dateAdd' || this.itemConfig.config.type == 'datetimeAdd') {
                this.value = null;
            }
            this.editable = true;
        },
    },
}
</script>

<style scoped>
.handle {
    height: 22px;
    line-height: 22px;
    color: white;
}
</style>
