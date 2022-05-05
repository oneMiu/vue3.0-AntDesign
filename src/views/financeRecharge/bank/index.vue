<template>
    <div>
        <a-card style="width: 800px">
            【大额充值】银行转账充值：<br>
            一、注意事项：<br>
            1、当天充值当天提交审核，隔天提交不审核；<br>
            2、充值请备注您的系统会员手机号；<br>
            3、充值截图请提供电子回单（包含双方信息、金额、时间）；<br>
            4、审核时间为9～22点的每个整点；<br>
        </a-card>
        <div>
            <a-divider orientation="left">银行充值</a-divider>
        </div>
        <div>
            <a-form style="position: relative;" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="收款账户">
                    <a-select v-model:value="form.receipt_account" placeholder="选择收款账户">
                        <a-select-option :value="item.bank_name+'-'+item.card_number+'-'+item.account_name" v-for="(item,index) in receipt_accountList" :key="index">
                        {{item.bank_name+'-'+item.card_number+'-'+item.account_name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="付款金额">
                    <a-input
                        :style="{'width':'230px','margin-right':'20px'}"
                        v-model:value="form.pay_money"
                        placeholder="请输入付款金额"
                        @change="inputChange('pay_money')"
                    />
                    <span style="color:red">实际到账  {{form.account_money}}</span>
                </a-form-item>
                <a-form-item label="请确认付款金额">
                    <a-input @blur='confirmMoney(form.pay_money,money2)' v-model:value="money2" />
                </a-form-item>
                
                <a-form-item label="付款时间">
                    <a-date-picker
                        v-model:value="recharge_time"
                        show-time
                        type="date"
                        placeholder="请选择付款时间"
                        style="width: 100%;"
                        @change="dateChange"
                    />
                </a-form-item>
                <a-form-item label="付款账号">
                    <a-input v-model:value="form.pay_account" />
                </a-form-item>
                <a-form-item label="付款户名">
                    <a-input v-model:value="form.pay_username" />
                </a-form-item>
                <a-form-item label="付款截图">
                    <a-upload
                    :transform-file="transformFile" 
                    @preview="handlePreview" 
                    @change="handleChange" 
                    :remove="removefileList"
                    :withCredentials="true" 
                    :action="baseURL+'/uploadpictures'" 
                    list-type="picture-card">
                        <plus-outlined v-if="this.fileList.length<1" />
                    </a-upload>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 4, offset: 1 }">
                    <a-button :loading="submitLoading" type="primary" @click="onSubmit">
                        提交充值
                    </a-button>
                    <a-button @click='reset' style="margin-left: 10px;">
                        重置
                    </a-button>
                </a-form-item>
                <div style="position: absolute;left: 40%;top: 0px;">
                    <p>收款账户信息：</p>
                    <p>收款银行：<span class="bankMsg">{{form.receipt_account.split("-")[0]}}</span></p>
                    <p>收款账号：<span class="bankMsg">{{form.receipt_account.split("-")[1]}}</span></p>
                    <p>收款户名：<span class="bankMsg">{{form.receipt_account.split("-")[2]}}</span></p>
                </div>
            </a-form>
        </div>
        <a-modal :visible="showImagePreviewer" :footer="null" @cancel="showImagePreviewer=false">
            <img alt="付款截图" style="width: 100%" :src="form.pay_url" />
        </a-modal>
    </div>
</template>
<script>
import {
    parseTime,
    handleCount,
} from '@/utils/index'
import {
    addData,
    getList
} from '@/api/table'
import lrz from 'lrz'
import {
    PlusOutlined,
} from '@ant-design/icons-vue';
export default {
    components: {
        PlusOutlined,
    },
    data(){
        return {
            submitLoading:false,
            recharge_time:"",
            parseTime,
            showImagePreviewer:false,
            labelCol: { span: 2 },
            wrapperCol: { span: 6 },
            form: {
                receipt_account: '',
                pay_money: '',
                pay_time:'',
                pay_account: '',
                pay_username: '',
                pay_url:"",
                account_money:"",
            },
            fieldMap:{
                receipt_account: '收款账户',
                pay_money: '付款金额',
                pay_time:'付款时间',
                pay_account: '付款账号',
                pay_username: '付款户名',
                pay_url:"付款截图",
                account_money:"实际金额",
            },
            money2: '',
            baseURL:window.API_ROOT,
            fileList:[],
            receipt_accountList:[],
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            getList("getbankinfo").then(res=>{
                this.receipt_accountList = res.data;
            })
        },
        dateChange(value, dateString) {
            this.form.pay_time = dateString;
        },
        confirmMoney(m1,m2){
            this.money2 = this.money2.replace(/[^0-9]/ig,"");
            if(m1!==m2){
                this.$message.error("两次金额输入的不一致！");
                return false;
            }else{
                return true;
            }
        },
        async handlePreview(file) {
            this.showImagePreviewer=true;
        },
        async transformFile(file){
            const lrzFile = await lrz(file);
            return lrzFile.file;
        },
        removefileList(file){
            this.form.pay_url = "";
            this.fileList = []
        },
        handleChange({fileList,file}) {
            if (fileList[0]) {
                if (fileList[0].status == "done") {
                    this.$message.success("上传截图成功！")
                    this.fileList = fileList;
                    this.form.pay_url = fileList[0].response.data.img_key;
                } else if (fileList[0].status == "error") {
                    this.$message.error("上传截图失败，请移除重新上传")
                }
            }
        },
        onSubmit() {
            if(!this.checkInput()){
                return false;
            }
            if(this.confirmMoney(this.form.pay_money,this.money2)){
                this.submitLoading = true;
                addData("payment/bankpay",this.form).then(res=>{
                    this.$message.success(res.msg);
                    this.reset();
                }).finally(f=>{
                    this.submitLoading = false;
                })
            }
        },
        checkInput(){
            for(let key in this.form){
                if(!this.form[key]){
                    this.$message.error("["+this.fieldMap[key]+"] 内容不能为空！")
                    return false;
                }
            }
            return true;
        },
        reset(){
            for(let key in this.form){
                this.form[key] = ''
            }
            this.money2 = '';
            this.recharge_time = "";
            this.fileList = [];
            document.getElementsByClassName("anticon anticon-delete")[0].click();
        },
        async inputChange(item){
            this.form[item] = this.form[item].replace(/[^0-9]/ig,"");
            if(this.form[item][0]==0 && this.form[item][1] && this.form[item][1]!='.'){
                this.form[item]=0
            }
            if(this.form[item]!=this.oldValue){
                this.oldValue = this.form[item]
                this.form.account_money = await handleCount(this.form[item],'bankpay');
            }
        },
    },
}
</script>
<style scope>
.bankMsg{
    font-size:16px;font-weight:900
}
</style>