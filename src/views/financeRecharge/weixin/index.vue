<template>
    <div>
        <a-card style="width: 800px">
                    微信官方直充：<br>
                    1、24小时即时到账，建议1000元以内使用；<br>
                    2、友情提醒，大额请使用转账充值。<br>
                </a-card>
        <div>
            <a-divider orientation="left">微信充值</a-divider>
        </div>
        <div>
            <span>付款金额</span>
            <a-input
                :style="{'width':'300px','margin':'0px 20px'}"
                v-model:value="money"
                placeholder="请输入付款金额"
                :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                @change="inputChange('money')"
                />
                <span style="color:red">实际到账/充值金额  {{counted}}</span>
                <br>
                充值类型&nbsp;&nbsp;&nbsp;&nbsp;  <a-radio-group style="margin-top:20px" @change="radioChange" v-model:value="recharge_type.str">
                    <a-radio :value="selectItem" v-for="(selectItem,selectIndex) in enumObj.Enum.enumType['recharge_type']" :key="selectIndex">
                        {{selectItem}}
                    </a-radio>
                </a-radio-group>
                <br />
                <div style="margin-top:30px">
                    <a-button :loading="recharging" style="margin-right:50px" @click="recharge" type="primary">立即充值</a-button>
                    <a-button @click="reset">重置</a-button>
                </div>
              
        </div>
        <a-modal
            :maskClosable="false"
            v-model:visible="showCore"
            @ok="recharged"
            @cancel="cancel"
            :width="600"
            >
            <template #okText>
                <span>我已充值</span>
            </template>
            <template #cancelText>
                <span>放弃充值</span>
            </template>
            <template #title>
                <div style="text-align:center">
                    扫码支付
                </div>
            </template>
            <div style="text-align:center">
                <span style="color: darkcyan;font-weight: bolder;">付款金额：<span style="color: red;font-size: 20px;">{{money}}</span> 元</span>
                <div style="width: 100%;text-align:center;line-height:300px">
                    <div class="zhe" style="color: #ff4d4f;" v-if="!invalid">二维码已失效</div>
                    <div v-if="rechargeSuccess"  class="zhe">
                        <CheckCircleOutlined :style="{color:'#09bb07',fontSize:'60px'}"/>
                    </div>
                    <div v-if="rechargeSuccess" class="rechargeSuccessText">
                        付款成功
                    </div>
                    <div v-if="rechargeSuccess" style="top: 55%;" class="rechargeSuccessText">
                        <span style="color: #ff4d4f;">{{rechargeSec}}</span> s后将跳转到充值记录查看
                    </div>
                    <img width="300" :src="result.core" alt="">
                </div>
                
                <p style="color: darkcyan;font-size: 16px;font-weight: bolder;">打开手机微信扫描二维码支付</p>
                <p v-if="result.showTimer">
                    <span v-for="(item,index) in result.showTimer.split(':')" :key="index" style="background: #09bb07;padding: 5px 10px;margin: 5px;color: white;border-radius: 5px;">{{item}} {{index===0?'时':index===1?"分":"秒"}}</span>
                </p>
                <p>
                    <img width="30" src="@/assets/img/wxpay.png" alt="">
                    <span> 微信支付</span>
                </p>
                <p style="color:darkgray">支付安全由中国人民财产保险股份有限公司承担</p>
            </div>
        </a-modal>
    </div>
</template>
<script>
import {
    handleCount,
} from '@/utils/index'
import enumObj from '@/utils/enum.js'
import {getList} from '@/api/table'
import {CheckCircleOutlined} from '@ant-design/icons-vue'
export default {
    components:{
        CheckCircleOutlined
    },
    data(){
        return {
            rechargeSuccess:false,
            recharging:false,
            enumObj,
            money:"",
            recharge_type:{
                str:"消费充值",
                enum:2,
            },
            tid:"",
            showCore:false,
            result:{
                timer:"",
                showTimer:"",
                core:'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259430548,1517019785&fm=111&gp=0.jpg',
            },
            invalid:true,
            countDownInterval:"",
            random_mark:"",
            resultInterval:"",
            rechargeSec:5,
            counted:"",
        }
    },
    methods: {
        reset(){
            this.money='';
            this.recharge_type={
                str:"消费充值",
                enum:2,
            }
            this.showCore = false;
            this.rechargeSuccess = false;
            clearInterval(this.countDownInterval)
            this.countDownInterval = "";
            this.rechargeSec = 5;
            this.cancel();
        },
        cancel(){
            clearInterval(this.resultInterval)
            this.resultInterval = "";
        },
        radioChange(){
            if(this.countDownInterval){
                clearInterval(this.countDownInterval)
                this.countDownInterval = "";
            }
            this.recharge_type.enum = this.enumObj.Enum.parseEnum('recharge_type',this.recharge_type.str);
        },
        wxpay(){
            return new Promise((resolve,rej)=>{
                getList("payment/wxpay",{money:this.money,recharge_type:this.recharge_type.enum}).then(res=>{
                    this.result.core = res.data.wxpay_url;
                    this.result.timer = res.data.today_time;
                    this.random_mark = res.data.random_mark;
                    // this.result.timer = Date.now()+7000
                    resolve(res);
                }).catch(err=>{
                    rej(err)
                }).finally(()=>{
                    this.recharging = false;
                })
            })
        },
        recharged(){
            this.showCore=false;
            this.reset();
        },
        handleCount(num){
            if(num){
                num = num*0.99
                num = num.toString();
                let numArr = num.split('.');
                if(numArr.length>1){
                    numArr[1] = numArr[1].slice(0,2)
                    num =numArr.join('.'); 
                }
                return num
            }
        },
        async recharge(){
            if(!this.money){
                this.$message.error("请填写付款金额")
                return;
            }
            if(!this.invalid){//结束之后再次点击 立即充值，重新计时
                this.result.showTimer = "";
                this.invalid = true
            }
            if(!this.countDownInterval){
                this.recharging = true;
                await this.wxpay();
                this.countDown();
                this.countDownInterval= setInterval(()=>{
                    this.countDown(this.countDownInterval);
                },1000)
            }
            this.showCore=true;
            this.resultInterval = setInterval(()=>{
                this.rechargeResult();
            },2000)
        },
        async rechargeResult(){
            let res =await getList('payment/wxpayquery',{random_mark:this.random_mark}).catch(err=>{
                clearInterval(this.resultInterval); 
            });
            if(res && res.data.result==1){
                clearInterval(this.resultInterval);
                this.rechargeSuccess = true;
                if(this.rechargeSec>0){
                    this.rechargeSec--
                    let countDownOpenPage = setInterval(()=>{
                        this.rechargeSec--
                        if(this.rechargeSec<=0){
                            clearInterval(countDownOpenPage);
                            countDownOpenPage = "";
                            this.$router.push({name:"customerRechargeRecord"});
                            this.reset();
                        }
                    },1000)
                }
            }
        },
        countDown(countDownInterval){
            const leaveTime = (new Date(this.result.timer)-Date.now())/1000;
            const hours = (leaveTime/60/60).toString().split(".")[0]
            const min = (leaveTime/60).toString().split(".")[0]
            const sec = (Math.ceil(leaveTime%60)).toString().split(".")[0]
            if(hours<=0 && min<=0 && sec<=0){
                //倒计时结束
                clearInterval(countDownInterval)
                this.countDownInterval = "";
                this.invalid = false;
                this.result.showTimer ="0:0:0"
                return;
            }
            this.result.showTimer =hours+":"+min+":"+sec
        },
        async inputChange(item){
            if(this.countDownInterval){
                clearInterval(this.countDownInterval)
                this.countDownInterval = "";
            }
            this[item] = this[item].replace(/[^0-9]/ig,"");
            if(this[item][0]==0 && this[item][1] && this[item][1]!='.'){
                this[item]=0
            }
            if(this[item]!=this.oldValue){
                this.oldValue = this[item]
                this.counted = await handleCount(this[item],'wxpay');
            }
        }
    },
}
</script>
<style scope>
.zhe{
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 400px;
    background: #fffffffa;
    font-size: 22px;
    font-weight: bolder;    
}
.rechargeSuccessText{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #09bb07;
    font-size: 16px;
}
</style>