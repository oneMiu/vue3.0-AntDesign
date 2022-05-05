<template>
<a-modal :title="modalTitle" v-model:visible="visible" :confirm-loading="confirmLoading" @cancel="cancelModal" @ok="handleOk" :width="modalWidth" :destroyOnClose="true" :maskClosable="false">
    <a-form ref="ruleForm" :rules="rules" autocomplete="off" :model="columnsValue" :label-col="labelCol" :wrapper-col="wrapperCol">
        <div v-for="(col,colIndex) in columns" :key="colIndex">
            <div v-if="col.showEditPage && col.config  &&  !col.config.hidden">
                <!-- 普通输入框 -->
                <a-form-item v-if="col.config.type=='text'|| col.config.type=='password' || !col.config.type" :required="col.required" :ref="col.dataIndex" :label="col.title" :name="col.dataIndex">
                    <a-input :placeholder="col.config.placeholder" v-model:value="columnsValue[col.dataIndex]" :type="col.config.type?col.config.type:'text'" :style="{'width':computedWidth(col)}" :name="col.config.type=='password'?'new-password':''" :disabled="col.config.disabled?true:false" @blur="inputchange({item:col})" />
                    <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                        <QuestionCircleOutlined class="questionIcon" />
                    </a-tooltip>
                </a-form-item>

                <!-- 多行输入框 -->
                <a-form-item v-if="col.config.type=='textarea'"  :required="col.required" :ref="col.dataIndex" :label="col.title" :name="col.dataIndex">
                    <div style="display:flex;align-items:center">
                        <a-textarea
                            class="textarea"
                            v-model:value="columnsValue[col.dataIndex]"
                            @blur="inputchange({item:col})"
                            :placeholder="col.config.placeholder"
                            :auto-size="col.config.textareaConfig?col.config.textareaConfig:{ minRows: 3, maxRows: 5 }"
                            :style="{'width':computedWidth(col)}"
                        />
                        <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                            <QuestionCircleOutlined class="questionIcon" />
                        </a-tooltip>
                    </div>
                </a-form-item>
                
                <!-- 数字输入框 -->
                <a-form-item v-if="col.config.type=='number'" :required="col.required?true:undefined" :ref="col.dataIndex" :label="col.title" :name="col.dataIndex">
                    <a-input-number :min="col.config.min" :step="col.config.double?0.1:1"  :style="{'width':computedWidth(col)}" :max="col.config.max" v-model:value="columnsValue[col.dataIndex]" @blur="inputchange({item:col})" />

                    <a-button v-if="col.config.showGetItem" @click="getiteminfo(col.dataIndex,columnsValue[col.dataIndex])" style="margin-left: 15px;" type="primary" :loading="getiteminfoLoading">
                        获取数据
                    </a-button>
                    <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                        <QuestionCircleOutlined class="questionIcon" />
                    </a-tooltip>
                </a-form-item>

                <!-- 下拉选择框 -->
                <a-form-item v-else-if="col.config.type=='select'" :required="col.required?true:undefined" :label="col.title" :name="col.config.requestKey || col.dataIndex">
                    <a-select v-model:value="col.config.value" v-if="$store.getters['customData/publicDataOver'] || !col.config.requestKey" :mode="col.config.multiple?'multiple':null" showSearch allowClear placeholder="全部" 
                    :style="{'width':computedWidth(col)}" 
                    @change="(c,option)=>inputchange({changeData:c,selectOption:option,item:col,itemIndex:colIndex})">
                        <a-select-option :value="selectItem+selectIndex" v-for="(selectItem,selectIndex) in enumObj.Enum.enumType[col.config.enumType]" :key="selectIndex">
                            {{selectItem}}
                        </a-select-option>
                    </a-select>
                    <span v-else ><LoadingOutlined />{{col.title}}列表加载中...</span>
                    <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                        <QuestionCircleOutlined class="questionIcon" />
                    </a-tooltip>
                </a-form-item>

                <!-- 多选框 -->
                <a-form-item v-else-if="col.config.type=='switch'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <a-checkbox-group v-model:value="col.config.value" @change="inputchange({item:col})">
                        <a-checkbox :value="i" v-for="(k,i) in enumObj.Enum.enumType[col.config.enumType]" :key="i">
                            {{k}}
                        </a-checkbox>
                    </a-checkbox-group>
                     <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                        <QuestionCircleOutlined class="questionIcon" />
                    </a-tooltip>
                </a-form-item>

                <!-- 单选框 -->
                <a-form-item v-else-if="col.config.type=='button'" style="display: flex;align-items: center;" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <div style="display: flex;align-items: center;">
                        <a-radio-group style="width: 400px;" v-model:value="col.config.value" @change="inputchange({item:col})">
                            <a-radio :value="selectItem" v-for="(selectItem,selectIndex) in enumObj.Enum.enumType[col.config.enumType]" :key="selectIndex">
                                {{selectItem}}
                            </a-radio>
                        </a-radio-group>
                        <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                            <QuestionCircleOutlined class="questionIcon" />
                        </a-tooltip>
                    </div>
                </a-form-item>

                <!-- 日期选择 -->
                <a-form-item v-else-if="col.config.type=='date'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <a-date-picker v-model:value="columnsValue[col.dataIndex]" type="date" placeholder="选择日期" @change="dateOK(col)" :style="{'width':computedWidth(col)}" />
                     <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                        <QuestionCircleOutlined class="questionIcon" />
                    </a-tooltip>
                </a-form-item>

                <!-- 时间选择 -->
                <a-form-item v-else-if="col.config.type=='datetime' || col.config.type=='datetimeAdd'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <a-date-picker show-time v-model:value="columnsValue[col.dataIndex]" type="datetime" placeholder="选择时间" @change="dateOK(col)" :style="{'width':computedWidth(col)}" />
                     <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                        <QuestionCircleOutlined class="questionIcon" />
                    </a-tooltip>
                </a-form-item>


                <!-- 时间范围选择 -->
                <a-form-item v-else-if="col.config.type=='dateRange'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <a-range-picker v-model:value="col.config.value" placeholder="选择日期"  @change="(date, dateString)=>inputchange({item:col,date, dateStr:dateString})" :style="{'width':computedWidth(col)}" />
                         <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                        <QuestionCircleOutlined class="questionIcon" />
                    </a-tooltip>
                </a-form-item>


                
                <!-- 图片上传 -->
                <a-form-item v-else-if="col.config.type=='img'" :required="col.required" :ref="col.dataIndex"  :label="col.title" :name="col.dataIndex">
                    <div class="clearfix" @click.stop="selectCurrentPic(col)">
                        <a-upload :withCredentials="true" :action="baseURL+col.config.uploadUrl" :name="col.dataIndex" list-type="picture-card" :file-list="col.config.fileList" :transform-file="transformFile" @preview="handlePreview" @change="({fileList})=>{handleChange({fileList},col)}" :remove="removefileList" :accept="col.config.accept || '*'">
                            <div v-if="col.config.fileList.length<1">
                                <plus-outlined />
                                <div class="ant-upload-text">上传图片</div>
                            </div>
                        </a-upload>
                        <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                            <QuestionCircleOutlined class="questionIcon" />
                        </a-tooltip>
                        <a-modal :visible="col.config.previewVisible" :footer="null" @cancel="handleCancel(col)">
                            <img alt="example" style="width: 100%" :src="col.config.previewImage" />
                        </a-modal>
                    </div>
                </a-form-item>

                 <!-- 图片批量上传 -->
                <a-form-item v-else-if="col.config.type=='imgList'" :required="col.required" :label="col.title" :name="col.dataIndex">
                    <div class="clearfix">
                        <UploadForBatch @fileChange="uploadFileForBatch" @fileRemove="removeFileForBatch" :ref="col.dataIndex" :fileList="col.config.imgList" :count="col.config.imgList.length" :col="col" />
                    </div>
                </a-form-item>

                <!-- 文件上传 -->
                <a-form-item v-else-if="col.config.type=='uploadFile'" :required="col.required" :name="col.dataIndex">
                    <template #label>
                        <span>{{col.title}}</span>
                        <span>
                            <a-tooltip v-if="!col.config.dontShowQuestion" placement="right" :title="col.config.question?col.config.question:col.title">
                            <QuestionCircleOutlined style="margin-left:10px" class="questionIcon" />
                        </a-tooltip>
                        </span>
                    </template>
                    <a-upload-dragger style="width:400px" :file-list="col.config.fileList" :name="col.dataIndex" :multiple="false" @change="(info)=>{uploadFileChange(info,col)}"  :beforeUpload="()=>false" :accept="col.config.accept" @reject="uploadError(col)">
                        <p class="ant-upload-drag-icon">
                            <inbox-outlined />
                        </p>
                        <p class="ant-upload-hint">
                            点击上传或者将文件拖到此处上传
                        </p>
                    </a-upload-dragger>
                    <div style="width: 400px;color: #40a9ff;text-decoration: underline;cursor: pointer;display: flex;align-items: center;justify-content: flex-end;" @click="downloadTemplate">
                        <CloudDownloadOutlined :style="{'font-size':'20px','margin-right': '10px'}" />
                        模板下载
                    </div>
                </a-form-item>
            </div>
        </div>
    </a-form>
    <a-modal :visible="imageUploading" title="图片上传进度" :footer="null" style="text-align:center">
        <a-progress
            type="circle"
            :stroke-color="{
                '0%': '#108ee9',
                '100%': '#87d068',
            }"
            :percent="Math.ceil(percent.curr/percent.count*100)"
        />
        <div style="margin-top:20px">正在上传图片......</div>
    </a-modal>
</a-modal>
</template>

<script>
import lrz from 'lrz'
import {deepCopy} from '@/utils/validate'
import {
    setCache,
    getCache,
    getBase64,
    parseTime,
    setPublicData
} from '@/utils/index'
import {
    getList,
    addData,
    doEdit,
    doDelete,
} from '@/api/table'
import {
    PlusOutlined,
    CloudDownloadOutlined,
    InboxOutlined,
    QuestionCircleOutlined,
    LoadingOutlined
} from '@ant-design/icons-vue';
import UploadForBatch from './uploadForBatch.vue';
import moment from 'moment';
export default {
    name: 'modal',
    components: {
        CloudDownloadOutlined,
        PlusOutlined,
        InboxOutlined,
        UploadForBatch,
        QuestionCircleOutlined,
        LoadingOutlined
    },
    data() {
        return {
            getiteminfoLoading:false,
            form: {},
            rules: {},
            visible: false,
            confirmLoading: false,
            isNewData: false,
            currentPic: {},
            enumObj: {},
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            },
            columns: [],
            value: {},
            columnsValue: {},
            modalTitle: "",
            modalWidth: 850,
            ajaxInterface: "",
            ajaxMethod: "PUT",
            isChangePassword:false,
            keyupEvent:function(){},
            imageUploading:false,
            percent:{
                count:6,
                curr:0,
            },
            baseURL:"",
        }
    },
    created() {
    },
    methods: {
        async downloadTemplate(){
            window.open(this.baseURL+"/getfiles/?file_name="+this.$route.meta.title+"上传","_blank");
        },
        computedWidth(col){
            if(col.config.width){
                if(!col.config.dontShowQuestion){
                    if(col.config.width<400){
                        return col.config.width+"px";
                    }else{
                        return '400px';
                    }
                }else{
                    return col.config.width+"px";
                }
            }else{
                if(!col.config.dontShowQuestion){
                    return '400px';
                }else{
                    if(col.config.type==='number'){
                        return '400px';
                    }else if(col.config.type==='date' || col.config.type==='datetime' || col.config.type==='dateRange'){
                        return '100%'
                    }else{
                        return null;
                    }
                }
            }
        },
        getiteminfo(key,value){
            if(!value){
                this.$message.error("请填写商品ID!!!")
                return;
            }
            this.getiteminfoLoading = true
            getList("getiteminfo",{[key]:value}).then(res=>{
                this.columnsValue["item_title"] = res.data.title;
                this.columnsValue["pic_url"] = res.data.pic_url;
                this.columnsValue["item_name"] = this.columnsValue["item_name"]?this.columnsValue["item_name"]:res.data.title.slice(0,10);
                let imgCol = this.columns.filter(x=>x.dataIndex=="pic_url")[0];
                imgCol.config.fileList[0] = {
                    thumbUrl:res.data.pic_url,
                    uid:"vc-upload-"+Date.now()+"-9"
                };
                this.$refs["item_name"].onFieldChange();
                this.$refs["pic_url"].onFieldChange();
                this.$refs["item_title"].onFieldChange();
                this.$message.success("获取成功！！")
                this.getiteminfoLoading = false
            }).catch(e=>{
                console.log("获取主图和标题失败，"+e+"！！！")
                this.getiteminfoLoading = false
            })
        },
        uploadFileChange(info,col) {
            if(info.file.status==="removed"){
                col.config.fileList=[];
            }else{
                col.config.fileList = []
                col.config.fileList.push(info.file)
                this.columnsValue[col.dataIndex] = info.file
            }
        },
        uploadError(col) {
            this.$message.error("只能上传  " + col.config.acceptType + "  类型的文件哦")
        },
        showModal({isAddData, modalTitle="", modalWidth, ajaxInterface, ajaxMethod = "POST",isChangePassword=false,paramsType="json",extParams}) {
            this.baseURL = window.API_ROOT;
            if(modalTitle.length>=4){
                this.modalTitle = modalTitle
            }else{
                this.modalTitle = modalTitle+ this.$route.meta.title;
            }
            // this.modalWidth = modalWidth;
            this.isAddData = isAddData;
            this.ajaxInterface = ajaxInterface;
            this.ajaxMethod = ajaxMethod || "POST"
            this.isChangePassword = isChangePassword?true:false
            this.paramsType =paramsType;
            this.extParams = extParams;
            this.init();
            this.visible = true
            if(window.onkeyup){
                this.keyupEvent = window.onkeyup;
                window.onkeyup = null;
            }
        },
        handleCancel(col) {
            col.config.previewVisible = false
        },
        async handlePreview(file) {
            let currentFile = this.columns.filter(x => x.dataIndex == file.name)[0];
            currentFile = currentFile ? currentFile : this.currentPic;
            if (!file.url && !file.preview && !file.thumbUrl) {
                file.preview = await getBase64(file.originFileObj);
            }
            currentFile.config.previewImage = file.url || file.preview || file.thumbUrl;
            currentFile.config.previewVisible = true;
        },
        selectCurrentPic(col) {
            this.currentPic = col
        },
        async transformFile(file){
            const lrzFile = await lrz(file);
            return lrzFile.file;
        },
        handleChange({fileList},col) {
            console.log(this.currentPic, fileList, "change事件")
            if (this.currentPic.config && fileList.length > 0) {
                this.currentPic.config.fileList = fileList;
            }
            if (fileList[0]) {
                if (fileList[0].status == "done") {
                    this.inputchange({item:this.currentPic});
                } else if (fileList[0].status == "error") {
                    this.$message.error("上传图片失败，请移除重新上传")
                    setTimeout(()=>{
                        this.currentPic.config.fileList = [];
                    },500)
                }
            }
            this.$refs[col.dataIndex].onFieldChange();
        },
        uploadFunc(resolve,reject,imgList,fd,index=0){
            const _this = this;
            let formData = new FormData();
            let fileNameKey = Object.keys(fd[index])[0];
            formData.append(fileNameKey,fd[index][fileNameKey])
            addData(window.API_ROOT+imgList[0].config.uploadUrl,formData).then(res=>{
                if(res.code!=1){
                    _this.$message.error(`第${index+1}张上传出错，请重新上传`);
                    _this.columnsValue[fileNameKey] = "";
                    imgList.forEach(x=>{
                        x.config.imgList.forEach(s=>{
                            if(s[fileNameKey]){
                                delete x.src
                                delete x.uid
                                delete x.file
                            }
                        })
                    })
                    reject(err);
                    this.confirmLoading = false;
                    return;
                }
                this.percent.count = fd.length;
                this.percent.curr = index+1;
                this.columnsValue[fileNameKey] = res.data.img_key
                index++;

                if(index>fd.length-1){
                    this.percent.curr = fd.length;
                    resolve(res);
                }else{
                    this.uploadFunc(resolve,reject,imgList,fd,index)
                }
            }).catch(err=>{
                this.imageUploading = false;
                _this.columnsValue[fileNameKey] = "";
                imgList.forEach(x=>{
                    x.config.imgList.forEach((s,si)=>{
                        if(s[fileNameKey]){
                            _this.$message.error(`${x.title}的第${si+1}张上传出错，请重新上传`)
                            delete x.src
                            delete x.uid
                            delete x.file
                        }
                    })
                })
                this.confirmLoading = false;
                reject(err)
            })
        },
        uploadImageForBatch(imgList,fd,index=0){
            return new Promise((resolve,reject)=>{
                this.uploadFunc(resolve,reject,imgList,fd,index=0)
            })
        },
        removeFileForBatch({file,fileList}){
            this.columnsValue[file.key] ="";
        },
        uploadFileForBatch({file,fileList}){
            this.columnsValue[file.key] = file.uid;
        },
        async handleImg(){
            let colList = this.columns.filter(x=>x.config && x.config.type==='imgList');
            let fd = [];
            let formDataHasData = false;
            for(let i=0;i<colList.length;i++){
                for(let j=0;j<colList[i].config.imgList.length;j++){
                    if(colList[i].config.imgList[j].file){
                        this.imageUploading = true;
                        if((this.columnsValue[colList[i].config.imgList[j].key] && this.columnsValue[colList[i].config.imgList[j].key].indexOf('http')==-1) || !this.columnsValue[colList[i].config.imgList[j].key]){
                            const lrzFile = await lrz(colList[i].config.imgList[j].file);
                            fd.push({[colList[i].config.imgList[j].key]:lrzFile.file})
                            if(!formDataHasData)formDataHasData=true;
                        }
                    }
                }
            }
            if(formDataHasData){
                return await this.uploadImageForBatch(colList,fd)
            }
        },
        removefileList(col) {
            this.selectCurrentPic(col);
            let a = this.columns.filter(x => x.dataIndex == col.name);
            if (a.length > 0) {
                a[0].config.fileList = [];
                this.columnsValue[col.name] = undefined;
            } else {
                for (let i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].config && this.columns[i].config.fileList && this.columns[i].config.fileList[0]) {
                        if (this.columns[i].config.fileList[0].uid == this.currentPic.uid) {
                            this.columns[i].config.fileList = [];
                            this.columnsValue[this.columns[i].dataIndex] = undefined
                            break;
                        }
                    }
                }
            }
            this.$refs[col.name || col.dataIndex].onFieldChange();
        },
        dateOK(item) {
            if (this.columnsValue[item.dataIndex]) {
                if(this.columnsValue[item.dataIndex]._isUTC){
                    //选择了此刻，减掉8个小时
                    this.columnsValue[item.dataIndex]._d = new Date(new Date(this.columnsValue[item.dataIndex]._d)-28800000);
                }
                let parseDateTime;
                if (item.config.type == "datetime" || item.config.type == "datetimeAdd") {
                    parseDateTime = parseTime(new Date(this.columnsValue[item.dataIndex]._d))
                } else if(item.config.type=='date'){
                    parseDateTime = parseTime(new Date(this.columnsValue[item.dataIndex]._d), '{y}-{m}-{d}')
                }
                this.columnsValue[item.dataIndex] = parseDateTime;
            } else {
                this.columnsValue[item.dataIndex] = "";
            }
        },
        inputchange({item, itemIndex,dateStr,changeData,selectOption}) {
            if (item.config.type == "button" || item.config.type == "select") {
                if(item.config.multiple){
                    if(selectOption){
                        var enumStr = selectOption.map(x=>{return x.key})
                        enumStr = enumStr.join(",")
                        this.columnsValue[item.config.requestKey || item.dataIndex] = enumStr
                    }
                }else{
                    if(item.config.type === "select"){
                        this.columnsValue[item.config.requestKey || item.dataIndex] = item.config.value ? parseInt(selectOption.key) : "";
                    }else{
                        this.columnsValue[item.config.requestKey || item.dataIndex] = item.config.value ?this.enumObj.Enum.parseEnum(item.config.enumType, item.config.value) : "";
                    }
                }
                
                if (item.config.displayItem && item.config.value) {
                    this.addPublicData({item,isChange:true});
                }
                //清空的时候
                if(!item.config.value && item.config.displayItem){
                    for (let i = 0; i < this.columns.length; i++) {
                        let displayItemIndex = item.config.displayItem.indexOf(this.columns[i].dataIndex);
                        if(displayItemIndex !=-1){
                            this.columns[i].config.hidden = true;
                            break;
                        }
                    }
                }
            }
            if (item.config.type == "img") {
                if(item.config.fileList[0].response.code==1){
                    this.columnsValue[item.dataIndex] = item.config.fileList[0].response.data.img_key;
                }else{
                    item.config.fileList = [];
                }
            }
            if (item.config.type == "date" || item.config.type == "datetime") {
                if (!this.columnsValue[item.dataIndex]) {
                    this.columnsValue[item.dataIndex] = ""
                }
            }
            if (item.config.type == "dateRange") {
                let tempData;
                if (dateStr[0] && dateStr[1]) {
                    this.columnsValue[item.dataIndex] = dateStr.join(",")
                } else {
                    this.columnsValue[item.dataIndex] = ""
                }
            }
            if (item.config.type == 'switch') {
                this.columnsValue[item.dataIndex] = item.config.value
            }
            console.log("输入框变动，此时的提交表单", this.columnsValue)
        },
        addPublicData({item,callback,isChange}){
            if (item.config.displayItem) {
                for (let i = 0; i < item.config.displayItem.length; i++) {
                    if(item.config.changeRequestAPI){ //需要请求的一列
                        let changeRequestAPI = item.config.changeRequestAPI[item.config.displayItem[i]]
                        let keyValue = this.columnsValue[item.config.requestKey || item.dataIndex];
                        if(isChange){
                            getList(changeRequestAPI, {
                            [item.config.requestKey]: keyValue
                            }).then(res => {
                                this.$store.commit("customData/setPublicData", {
                                    publicDataType: changeRequestAPI,
                                    publicData: res.data
                                })
                                this.enumObj.Enum.enumType[changeRequestAPI] = require('@/utils/enum.js').default.Enum.enumType[changeRequestAPI];
                                for(let s=0;s<this.columns.length;s++){
                                    if (this.columns[s].config && this.columns[s].dataIndex == item.config.displayItem[i]) {
                                        this.columns[s].config.value = undefined;
                                        this.columns[s].config.hidden = false;
                                        this.columns[s].title += " "
                                        if(callback){
                                            callback(this.columns[s],item.config.displayItem[i]);
                                        }
                                        break;
                                    }
                                }
                            })
                        }
                    }else{
                        let isBreak = false;
                        let ItemValue = this.enumObj.Enum.parseEnum(item.config.enumType, item.config.value);
                        for(let z=0;z<this.columns.length;z++){
                            let x = this.columns[z];
                            if (x.config && x.dataIndex == item.config.displayItem[i]) {
                                // if(this.isAddData){
                                //     if(x.config.defaultValue || x.config.defaultValue ==0){
                                //         x.config.value =  this.enumObj.Enum.enumType[x.config.enumType][x.config.defaultValue]
                                //     }
                                // }else{
                                //     x.config.value = this.columnsValue[x.config.requestKey || x.dataIndex];;
                                // }
                                if(item.config.displayItemShow && typeof item.config.displayItemShow[0] !== 'object' &&  item.config.displayItemShow.length>0){
                                    if(ItemValue==item.config.displayItemShow[i]){
                                        x.config.hidden = false;
                                    }else{
                                        x.config.hidden = true;
                                        delete this.columnsValue[x.dataIndex]
                                    }
                                }else if(item.config.displayItemShow && typeof item.config.displayItemShow[0] === 'object' && item.config.displayItemShow.length>0){
                                    item.config.displayItemShow.forEach(p=>{
                                        let xxx = this.columns.find(q=>q.dataIndex===Object.keys(p)[0]);
                                        if(p[xxx.dataIndex] && p[xxx.dataIndex].includes(ItemValue)){
                                            xxx.config.hidden = false;
                                        }else if(p[xxx.dataIndex]){
                                            xxx.config.hidden = true;
                                            delete this.columnsValue[xxx.dataIndex]
                                        }
                                    })
                                    isBreak = true;
                                }else{
                                    if(ItemValue==1){
                                        x.config.hidden = false;
                                        if(this.value){
                                            this.columnsValue[x.dataIndex] = this.value[x.dataIndex];
                                        }
                                    }else if(ItemValue == 0){
                                        x.config.hidden = true;
                                        delete this.columnsValue[x.dataIndex]
                                    }
                                }
                                if(callback){
                                    callback(x,item.config.displayItem[i]);
                                }
                                break;
                            }
                        }
                        if(isBreak){
                            break;
                        }
                    }
                }
            }
        },
        cancelModal(){
            this.rules = [];
            window.onkeyup = this.keyupEvent;
            this.columnsValue = {};
        },
        async handleOk() {
            this.confirmLoading = true;
            this.$refs.ruleForm
                .validate().then(async (validata) => {
                    await this.handleImg();
                    this.imageUploading = false;
                    this.percent.count=6
                    this.percent.curr=0
                    if(!this.confirmLoading){
                        return;
                    }
                    for(let k in this.columnsValue){
                        if(this.columnsValue[k] || this.columnsValue[k]==="" || this.columnsValue[k]===0){
                            validata[k] = this.columnsValue[k];
                        }
                    }
                    for(let keys in validata){
                        if(!validata[keys] && validata[keys]!=="" && keys.indexOf('_url')===-1 && validata[keys]!==0 ){
                            delete validata[keys];
                        }
                    }
                    //特殊参数
                    if(this.extParams){
                        for(let paramsKey in this.extParams){
                            validata[paramsKey] = this.extParams[paramsKey]
                        }
                    }
                    if(this.isChangePassword){
                        validata.id =  getCache("userInfo",localStorage).service_id;
                        delete validata.service_name;
                        doEdit(this.ajaxInterface, validata).then(res => {
                            this.confirmLoading = false;
                            this.visible = false
                            this.$message.success(res.msg);
                        }).catch(err => {
                            this.confirmLoading = false;
                        })
                    }else if (this.isAddData) {
                        let requestParams = validata//this.columnsValue;  
                        if(this.paramsType==='file'){
                            let fd = new FormData()
                            fd.append("isFile",1)
                            for(let key in this.columnsValue){
                                if(this.columnsValue[key]!=undefined){
                                    fd.append(key,this.columnsValue[key])
                                }
                            }
                            requestParams = fd;
                        }
                        addData(this.ajaxInterface,requestParams).then(res => {
                            this.confirmLoading = false;
                            this.$message.success(res.msg)
                            this.visible = false
                            this.$parent.fetch();
                            let clearList = this.$store.getters["customData/publicInterface"];
                            if(clearList[this.ajaxInterface]){
                                this.$store.commit("customData/setPublicData",{publicDataType:clearList[this.ajaxInterface],publicData:[]})
                                setPublicData()
                            }
                            this.columnsValue = {};
                        }).catch(err => {
                            this.confirmLoading = false;
                        })
                    } else {
                        validata.id = this.value.uuid || this.value.id;
                        doEdit(this.ajaxInterface, validata,this.ajaxMethod).then(res => {
                            this.confirmLoading = false;
                            this.visible = false
                            this.$parent.fetch();
                            this.columnsValue = {};
                            if(res.msg){
                                this.$message.info(res.msg);
                            }
                        }).catch(err => {
                            this.confirmLoading = false;
                        })
                    }
                }).catch(e => {
                    this.confirmLoading = false;
                    if (e.errorFields) {
                        for (let i = 0; i < e.errorFields.length; i++) {
                            this.$message.error(e.errorFields[i].errors.join(","));
                        }
                    } else {
                        this.$message.error(e.toString());
                    }
                    console.error(e)
                })
        },
        init() {            
            this.enumObj = require('@/utils/enum.js').default
            let tempCol = this.$store.getters['customData/currentEditItem'];
            let col;
            col = tempCol ? Object.keys(tempCol) : null;
            if (col && col.length > 0) {
                col = tempCol
            } else {
                col = getCache("currentEditItem");
                this.$store.commit('customData/setCurrentEditItem', col)
            }
            this.columns = deepCopy(col.columns);
            this.value = col.value;
            this.handleData(col);
        },
        //编辑和添加数据时对数据的处理
        handleData(col) {
            let needToOrder=[];//记录需要排序的索引
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].showEditPage) {
                    let item = this.columns[i];
                    if(item.isDeleted===true){
                        delete item.isDeleted
                    }
                    if (this.isAddData) { //添加数据操作处理数据
                        this.columnsValue[item.dataIndex] = item.config.defaultValue || item.config.defaultValue == 0 ? item.config.
                        defaultValue: undefined;
                        if (item.config.requestKey != undefined) {
                            this.columnsValue[item.config.requestKey] = "";
                            delete this.columnsValue[item.dataIndex]
                        }
                        if(item.config.hidden == false){
                            // item.config.hidden = true;
                        }
                        try {
                            if(this.columns[i].config.enumType){
                                this.columns[i].config.value = item.config.defaultValue || item.config.defaultValue == 0 ? this.enumObj.Enum.enumType[item.config.enumType][item.config.defaultValue] : undefined;
                            }
                        } catch (e) {
                            console.error("枚举值匹配错误！！请检查这个值是否存在枚举类当中！       ", item.config.enumType);
                            this.$message.error("枚举值匹配错误！！请检查这个值是否存在枚举类当中！       ", item.config.enumType);
                        }
                        this.addPublicData({item})
                    } else{ //编辑数据操作处理图片.
                        if(item.config.type==='number'){
                            if(col.value[item.dataIndex] || col.value[item.dataIndex]===0){
                                this.columnsValue[item.dataIndex] = parseInt(col.value[item.dataIndex]);
                            }else{
                                console.log("返回的"+item.dataIndex+"字段返回异常，值===>"+col.value[item.dataIndex])
                            }
                        }else if(item.config.type=='imgList'){
                            item.config.hasImage = 0
                            for(let j=0;j<item.config.imgList.length;j++){
                                if(col.value[item.config.imgList[j].key]){
                                    item.config.imgList[j].uid=i+"_"+j+"_"+Date.now()
                                    item.config.imgList[j].src=col.value[item.config.imgList[j].key]
                                    this.columnsValue[item.config.imgList[j].key] = col.value[item.config.imgList[j].key]
                                    item.config.hasImage++
                                }
                            }
                        }else{
                            this.columnsValue[item.dataIndex] = col.value[item.dataIndex];
                        }
                        if (item.config.type == "img" && this.columnsValue[item.dataIndex]) {
                            let tempObj = {
                                uid: i,
                                name: item.dataIndex,
                                status: 'done',
                                url: col.value[item.dataIndex],
                            }
                            this.columns[i].config.fileList[0] = tempObj;
                        }
                        setTimeout(()=>{
                            if (item.config.requestKey != undefined) {
                                let tempEnum = this.enumObj.Enum.parseEnum(item.config.enumType, col.value[item.dataIndex]);
                                if(tempEnum){
                                    this.columnsValue[item.config.requestKey] = parseInt(tempEnum);
                                    delete this.columnsValue[item.dataIndex]
                                }
                                if(col.value[item.config.requestKey]){
                                    this.columnsValue[item.config.requestKey] = col.value[item.config.requestKey]
                                    item.config.hidden = false;
                                    delete this.columnsValue[item.dataIndex]
                                }
                            }
                        })
                        
                        // if(item.config.hidden){
                        //     item.config.hidden = false;
                        // }
                        
                        if(item.config.displayItem){
                            this.addPublicData({item,callback:(x,currItemName)=>{
                                try {
                                    if(x.config.enumType){
                                        setTimeout(()=>{
                                            x.config.value = this.enumObj.Enum.enumType[currItemName][this.columnsValue[currItemName]]
                                        })
                                    }
                                } catch (e) {
                                    console.error("bbbbbb错       ", x);
                                }
                            }})
                        }
                    }
                    //增加输入规则
                    if (item.required) {
                        this.rules[item.config.requestKey || item.dataIndex] = [];
                        let tempObj = {};
                        //文件自定义校验方式,文件过滤
                        if(item.ruleType==='file'){
                            tempObj.validator = async (rule, value, callback) => {
                                if (!value) {
                                    item.ruleText = "请上传文件"
                                    return Promise.reject('请上传文件');
                                }
                                return Promise.resolve();
                            }
                        }
                        //时间范围
                        else if(item.ruleType==='dateRange'){
                            tempObj.validator = async (rule, value, callback) => {
                                if (!value) {
                                    item.ruleText = "请选择日期"
                                    return Promise.reject('请选择日期');
                                }
                                return Promise.resolve();
                            }
                        }
                        //图片校验
                        else if(item.config.type==='img'){
                            tempObj.validator = async (rule, value, callback) => {
                                if (!value) {
                                    item.ruleText = "请选择图片"
                                    return Promise.reject('请选择图片');
                                }
                                return Promise.resolve();
                            }
                        }
                        //订单号类型
                        else if(item.ruleType==='orderType'){
                            tempObj.validator = async (rule, value, callback) => {
                                if (value && /^[0-9]{18,20}$/.test(value)) {
                                    return Promise.resolve();
                                }
                                tempObj.message = "订单号格式错误"
                                return Promise.reject('订单号格式错误');
                            }
                        }else{
                            item.ruleText = "的内容不能为空";
                            if(item.config.type === "number"){
                                item.ruleType = 'number'
                                item.ruleText = "的内容只能填数字"
                            }
                            if(item.ruleType ==='text'){
                                item.ruleType = 'string'
                            }else if(item.config.type === "button" || item.config.type === "select"){
                                item.ruleType = 'number'
                            }
                            tempObj.type = item.ruleType || "string";
                        }
                        if(!item.ruleText){
                            item.ruleText = "的内容不能为空";
                        }
                        var requireText = item.title+item.ruleText
                        tempObj.required = item.required;
                        tempObj.message = requireText;
                        tempObj.trigger = "change"
                        if (item.min) {
                            let tempmin = {
                                min: item.min,
                                message: '最小为' + item.min,
                                trigger: tempObj.trigger
                            }
                            if(tempObj.type){
                               tempmin.type=tempObj.type;
                            }
                            this.rules[item.dataIndex].push(tempmin)
                        }
                        if (item.max) {
                            let tempmax = {
                                max: item.max,
                                message: '最小为' + item.max,
                                trigger: tempObj.trigger
                            }
                            if(tempObj.type){
                               tempmax.type=tempObj.type;
                            }
                            this.rules[item.dataIndex].push(tempmax)
                        }
                        this.rules[item.config.requestKey || item.dataIndex].push(tempObj)
                    }
                    //记录排序的元素
                    if(item.config && item.config.orderBy){
                        let tempItem = deepCopy(item);
                        tempItem.colIndex = i;
                        needToOrder.push(tempItem)
                        item.isDeleted = true;
                    }
                }
            }
            //特殊参数处理
            if(col.item && col.item.specialKeys){
                for(let k in col.item.specialKeys){
                    if(col.item.specialKeys[k] === "searchKey"){
                        let a = getCache("searchForm",sessionStorage)
                        if(a.searchData[k]){
                            this.columnsValue[k] = a.searchData[k]
                        }
                    }
                }
            }
            this.customSort(needToOrder);
            console.log("needToOrder",needToOrder)
        },
        //自定义元素的排序规则
        customSort(needToOrder){
            for(let z=0;z<needToOrder.length;z++){
                let needToOrderElement =needToOrder[z];
                if(needToOrderElement.config.orderBy==="first"){
                    //排在第一位
                }else{
                    for(let j=0;j<this.columns.length;j++){
                        if(this.columns[j].dataIndex == needToOrderElement.config.orderBy){
                            this.columns.splice(j+1,0,needToOrderElement);
                            for(let i=0;i<this.columns.length;i++){
                                if(this.columns[i].isDeleted && this.columns[i].dataIndex == needToOrderElement.dataIndex){
                                    this.columns.splice(i,1);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            }
            this.checkSort();          
        },
        //检查排序是否正确
        checkSort(){
            for(let i=0;i<this.columns.length;i++){
                if(this.columns[i].config && this.columns[i].config.orderBy && this.columns[i].config.orderBy!=this.columns[i-1].dataIndex && this.columns[i].config.orderBy!=="first"){
                    for(let j=0;j<this.columns.length;j++){
                        if(this.columns[j].config && this.columns[j].dataIndex==this.columns[i].config.orderBy){
                            let a = this.columns.splice(i,1)[0];
                            this.columns.splice(j+1,0,a);
                            break;
                        }
                    }
                }
            }
        }
    },
}
</script>
<style>
.clearfix{
    display: flex;
    align-items: center;
}
.ant-upload-picture-card-wrapper{
    width:400px!important
}
.ant-modal-body {
    max-height: 600px;
    overflow: scroll;
}
.questionIcon{
    margin-left:20px;font-size:16px
}
</style>
