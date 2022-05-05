<template>
<a-form ref="ruleForm" :model="columnsValue" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <div v-for="(col,colIndex) in columns" :key="colIndex">
        <!-- 普通输入框 -->
        <div v-if="col.showEditPage">
            <a-form-item v-if="col.config.type=='text'" :required="col.required" :ref="col.dataIndex" :label="col.title" :name="col.dataIndex">
                <a-input v-model:value="columnsValue[col.dataIndex]" @blur="inputchange(col)" />
            </a-form-item>

            <div v-else-if="col.config">
                <!-- 数字输入框 -->

                <a-form-item v-if="col.config.type=='number'" :required="col.required" :ref="col.dataIndex" :label="col.title" :name="col.dataIndex">
                    <a-input-number v-model:value="columnsValue[col.dataIndex]" @blur="inputchange(col)" />
                </a-form-item>

                <!-- 下拉选择框 -->
                <a-form-item v-else-if="col.config.type=='select'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <a-select v-model:value="col.config.value" showSearch allowClear placeholder="全部" @change="inputchange(col)">
                        <a-select-option :value="selectItem" v-for="(selectItem,selectIndex) in enumObj.Enum.enumType[col.dataIndex]" :key="selectIndex">
                            {{selectItem}}
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <!-- 多选框 -->
                <a-form-item v-else-if="col.config.type=='switch'" :required="col.required" :label="col.title" :name="col.dataIndex" @change="inputchange(col)">
                    <a-checkbox-group v-model:value="col.config.value">
                        <a-checkbox :value="i" v-for="(k,i) in enumObj.Enum.enumType[col.config.enumType]" :key="i">
                            {{k}}
                        </a-checkbox>
                    </a-checkbox-group>
                </a-form-item>

                <!-- 单选框 -->
                <a-form-item v-else-if="col.config.type=='button'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <a-radio-group v-model:value="col.config.value" @change="inputchange(col)">
                        <a-radio :value="selectItem" v-for="(selectItem,selectIndex) in enumObj.Enum.enumType[col.dataIndex]" :key="selectIndex">
                            {{selectItem}}
                        </a-radio>
                    </a-radio-group>
                </a-form-item>

                <!-- 日期选择 -->
                <a-form-item v-else-if="col.config.type=='date'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <a-date-picker v-model:value="form.date1" type="date" placeholder="选择日期" style="width: 100%;" @change="inputchange(col)" />
                </a-form-item>

                <!-- 时间选择 -->
                <a-form-item v-else-if="col.config.type=='datetime'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <a-date-picker show-time v-model:value="form.date1" type="datetime" placeholder="选择时间" style="width: 100%;" @change="inputchange(col)" />
                </a-form-item>

                <!-- 图片上传 -->
                <a-form-item v-else-if="col.config.type=='img'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <div class="clearfix" @click.stop="selectCurrentPic(col)">
                        <a-upload :action="col.config.uploadUrl" list-type="picture-card" :file-list="col.config.fileList" @preview="handlePreview" @change="handleChange" :remove="removefileList">
                            <div v-if="col.config.fileList.length < 1">
                                <plus-outlined />
                                <div class="ant-upload-text">上传图片</div>
                            </div>
                        </a-upload>
                        <a-modal :visible="col.config.previewVisible" :footer="null" @cancel="handleCancel(col)">
                            <img alt="example" style="width: 100%" :src="col.config.previewImage" />
                        </a-modal>
                    </div>
                </a-form-item>
            </div>

        </div>
    </div>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleOk">
            添加
        </a-button>
        <a-button style="margin-left: 10px;" @click="backPage">
            取消
        </a-button>
    </a-form-item>
</a-form>
</template>

<script>
import {
    setCache,
    getCache,
    getBase64,
} from '@/utils/index'
import enumObj from '@/utils/enum.js'
import {
    PlusOutlined
} from '@ant-design/icons-vue';
export default {
    components: {
        PlusOutlined
    },
    data() {
        return {
            isAddData: true, //true:添加数据；false编辑数据
            currentPic: {},
            enumObj,
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 14
            },
            other: '',
            form: {},
            rules: {},
            columns: [],
            columnsValue: {},
        };
    },
    methods: {
        handleCancel(col) {
            col.config.previewVisible = false
        },
        async handlePreview(file) {
            let currentFile = this.columns.filter(x => x.dataIndex == file.name)[0];
            currentFile = currentFile ? currentFile : this.currentPic;
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            currentFile.config.previewImage = file.url || file.preview;
            currentFile.config.previewVisible = true;
        },
        selectCurrentPic(col) {
            console.log("点击选中当前图片", col)
            this.currentPic = col
        },
        handleChange({
            fileList
        }) {
            console.log(fileList, "change事件")
            if (this.currentPic.config && fileList.length > 0) {
                this.currentPic.config.fileList = fileList;
            }
            if (fileList[0]) {
                if (fileList[0].status == "done") {
                    this.inputchange(this.currentPic);
                } else if (fileList[0].status == "error") {
                    this.$message.error("上传图片失败，请移除重新上传")
                }
            }
        },
        inputchange(item) {
            if (item.config.type == "button" || item.config.type == "select") {
                this.columnsValue[item.dataIndex] = parseInt(enumObj.Enum.parseEnum(item.dataIndex, item.config.value));
            }
            if (item.config.type == "img") {
                this.columnsValue[item.dataIndex] = item.config.fileList[0].response.url;
            }
            console.log(this.columnsValue)
        },
        handleOk() {
            this.confirmLoading = true;
            console.log(this.columnsValue)
            this.$refs.ruleForm
                .validate().then(res => {
                    console.log(res)
                    setTimeout(() => {
                        this.confirmLoading = false;
                        this.visible = false;
                    })
                }).catch(e => {
                    this.confirmLoading = false;
                    for (let i = 0; i < e.errorFields.length; i++) {
                        this.$message.error(e.errorFields[i].errors.join(","));
                    }
                })

        },
        removefileList(col) {
            this.selectCurrentPic(col);
            let a = this.columns.filter(x => x.dataIndex == col.name);
            if (a.length > 0) {
                a[0].config.fileList = [];
            } else {
                for (let i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].config && this.columns[i].config.fileList[0]) {
                        if (this.columns[i].config.fileList[0].uid == this.currentPic.uid) {
                            this.columns[i].config.fileList = [];
                            break;
                        }
                    }
                }
            }
            this.columnsValue[col.name] = null;
        },

        init() {
            let tempCol = this.$store.getters['customData/currentEditItem'];
            let col;
            if (tempCol && tempCol.columns) {
                col = tempCol
            } else {
                col = getCache("currentEditItem");
                console.log("缓存数据：", col)
                this.$store.commit('customData/setCurrentEditItem', col)
            }
            this.columns = col.columns;
            this.handleData(col);
            console.log(this.columnsValue)
        },
        routeHandle() {
            this.isAddData = this.$route.query.addData ? true : false;
        },
        handleData(col) {
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].showEditPage) {
                    let item = this.columns[i];
                    if (this.isAddData) { //添加数据操作处理数据
                        this.columnsValue[item.dataIndex] = item.config.defaultValue || item.config.defaultValue == 0 ? item.config.defaultValue : "";
                        this.columns[i].config.value = item.config.defaultValue || item.config.defaultValue == 0 ? enumObj.Enum.enumType[item.dataIndex][item.config.defaultValue] : "";
                        console.log(this.columns[i].config.value)
                    } else { //编辑数据操作处理图片.
                        this.columnsValue[item.dataIndex] = col.value[item.dataIndex];
                        if (item.rowType == "img" && this.columnsValue[item.dataIndex]) {
                            let tempObj = {
                                uid: i,
                                name: item.dataIndex,
                                status: 'done',
                                url: col.value[item.dataIndex],
                            }
                            this.columns[i].config.fileList[0] = tempObj;
                        }
                    }
                    if (item.required) {
                        this.rules[item.dataIndex] = []
                        let tempObj = {
                            type: item.config.type == "button" ? "number" : item.ruleType || "string",
                            required: item.required,
                            message: item.title + "的值不能为空！！！",
                            trigger: 'blur'
                        };
                        this.rules[item.dataIndex].push(tempObj)
                        if (item.min) {
                            this.rules[item.dataIndex].push({
                                type: item.config.type || "string",
                                min: item.min,
                                message: '最小为' + item.min,
                                trigger: 'blur'
                            })
                        }
                        if (item.max) {
                            this.rules[item.dataIndex].push({
                                max: item.max,
                                message: '最大为' + item.max,
                                trigger: 'blur'
                            })
                        }
                    }
                }
            }
        },
        backPage() {
            window.history.back(-1)
        },
    },

    created() {
        this.init();
    },
};
</script>
