<template>
    <div>
        <a-card style="width: 800px">
            【快速充值】支付宝转账充值<br>
            一、充值失败处理方法：<br>
            1、没备注5位数字，5分钟后“充值找回”；<br>
            2、页面填写金额和支付宝转账金额要一致，才会到账；<br>
            3、找回提示“未生成/不存在”，请重新提交1个和转账金额一致的充值订单，不要付款，然后找回；<br>
            ┅┅┅┅┅┅━━━━━━━┅┅┅┅┅┅━━━━━━━┅┅┅┅┅┅━━━━━━━━━━━━<br>
            二、应急手机/微信：18820205563<br>
            ┅┅┅┅┅┅━━━━━━━┅┅┅┅┅┅━━━━━━━┅┅┅┅┅┅━━━━━━━━━━━━<br>
            三、如果10000元提示没有端口，尝试充值5000元。<br>
        </a-card>
        <div>
            <a-divider orientation="left">支付宝充值</a-divider>
        </div>
        <div>
            <a-tabs @change="callback">
                <a-tab-pane key="1" tab="充值">
                    <span>充值金额</span>
                    <a-input
                        :style="{'width':'300px','margin':'0px 20px'}"
                        v-model:value="money"
                        :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                        @change="inputChange('money')"
                        />
                        <span style="color:red">实际到账/充值金额{{counted}}</span>
                        <br>
                        <div style="margin-top:30px">
                            <a-button  style="margin-right:50px" @click="sumbit" type="primary">立即充值</a-button>
                            <a-button>重置</a-button>
                        </div>
                        <div style="margin-top:30px">
                            <img src="@/assets/img/1.jpg" alt="">

                        </div>
                </a-tab-pane>
                <a-tab-pane key="3" tab="充值找回">
                    <span>订单号</span>
                    <a-input
                        placeholder="请输入支付宝订单号"
                        :style="{'width':'300px','margin':'0px 20px'}"
                        v-model:value="tid"
                        @change="inputChange('tid')"
                        />
                        <br>
                        <div style="margin-top:30px">
                            <a-button  style="margin-right:50px" @click="sumbit" type="primary">立即充值</a-button>
                            <a-button>重置</a-button>
                        </div>
                        <div style="margin-top:30px">
                            <img width="800" src="@/assets/img/2.jpg" alt="">
                        </div>
                </a-tab-pane>
            </a-tabs>
        </div>

    </div>
</template>
<script>
import {
    handleCount,
} from '@/utils/index'
export default {
    data(){
        return {
            money:"",
            tid:"",
            counted:"",
        }
    },
    methods: {
        sumbit(){
            this.$message.info("待开发中")
        },  
        async inputChange(item){
            this[item] = this[item].replace(/[^0-9]/ig,"");
            if(this[item][0]==0 && this[item][1] && this[item][1]!='.'){
                this[item]=0
            }
            if(this[item]!=this.oldValue){
                this.oldValue = this[item]
                this.counted = await handleCount(this[item],'alipay');
            }
        }
    },
}
</script>