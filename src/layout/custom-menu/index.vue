<template>
    <div>
        <div v-for="(r,i) in routesfilter" :key="i" class="menu">
            <div @dblclick.stop="dbclick" style="padding: 10px;white-space: nowrap;" :style="{color:r.select?'white':'#c1c6c8','text-align':collapse?'center':'left',background:r.bg && collapse?'#006eff':null}" @click="selectMenu({menu:r,index:i})">
                <vab-icon style="margin-left:10px;margin-right:10px" :icon="r.meta.icon"></vab-icon>
                <span style="margin-left:10px" v-show="!collapse">{{r.meta.title}}</span>
                <span :style="{'transform': `rotate(${r.arrowRotate}deg)`,opacity:arrowOpacity}" class="ri-arrow-down-s-line arrow" style="position: absolute;right: 10px;"></span>
            </div>
            <div class="sub" @mouseout="closePageSelect($event,r,i)" style="background: #151822;z-index: 9999;" :style="{'height':r.height?r.height*45+'px':0+'px','position':collapse?'absolute':'','width':!collapse?'100%':r.width?r.width+'px':'0px','left':'85px','transform': collapse?`translate(0px,${r.t?r.t+'px':'-30px'})`:null}">
                <router-link :style="{'background':c.click?'#006eff':null,position: collapse?'':'relative'}" style="display: inherit;padding: 10px;text-align:center" :to="{name:c.name}" v-for="(c,j) in r.hasChildrenShow" :key="j" class="menu outmouse routerLink" v-slot="{ href, route, navigate, isActive, isExactActive }">
                     <span v-if="!collapse" style="position: absolute;left:28px;font-weight:900;color:white">·</span>
                     <span class="outmouse" :active="isActive">{{c.meta.title}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import VabIcon from '@/layout/vab-icon'
export default {
    name:"custom-menu",
    components: { VabIcon },
    data(){
        return {
            selectMenuIndex:0,
            arrowOpacity:"opacity:1"
        }
    },
    computed: {
        ...mapGetters({
            collapse: 'settings/collapse',
            routes: 'routes/routes',
            routesfilter: 'routes/routesfilter',
            device: 'settings/device',
            userInfo:"user/userInfo",
        }),
    },
    created() {
        
    },
    mounted() {
        this.init();
    },
     watch: {
        collapse(old,n){
            if(n){
                this.arrowOpacity =1;
            }else{
                this.arrowOpacity =0;
            }
        }
    },
    methods: {
        init(){
            if(this.collapse){
                this.arrowOpacity = 0
            }else{
                this.arrowOpacity = 1
            }
            let isBreak = false;
            for(let i=0;i<this.routesfilter.length;i++){
                if(this.routesfilter[i].hasChildrenShow){
                    for(let j=0;j<this.routesfilter[i].hasChildrenShow.length;j++){
                        if(this.routesfilter[i].hasChildrenShow[j].name === this.$route.name){
                            this.routesfilter[i].select = true;
                            this.routesfilter[i].bg = true
                            this.routesfilter[i].height = this.routesfilter[i].hasChildrenShow.length;
                            this.routesfilter[i].width = 120
                            this.selectMenuIndex = i;
                            isBreak = true;
                            break;
                        }
                    }
                }
                if(isBreak){
                    break;
                }
            }
        },
        dbclick(ev){
            ev.preventDefault();
            return false;
        },
        closePageSelect(ev,menu,index){
            if(this.collapse){
                if(ev.relatedTarget && ev.relatedTarget.className.indexOf('outmouse')==-1){
                    console.log(ev.relatedTarget.className,'离开')
                    if(ev.relatedTarget.className.indexOf('ant-spin-spinning')==-1){
                        this.selectMenu({menu,index});
                    }
                }
            }
        },
        selectMenu({menu,index,tab}){
            if(!index && tab){
                tab[1] = "/"+tab[1]
                let curTab;
                for(let i=0;i<this.routesfilter.length;i++){
                    let x = this.routesfilter[i];
                    if(x.path==tab[1] || x.redirect == tab[1] ){
                        curTab={'menu':x,'index':i}
                        break;
                    }
                }
                if(curTab){
                    index = curTab.index;
                    menu = curTab.menu;
                }else{
                    return;
                }
            }
            if(this.selectMenuIndex === index){
                menu.bg = true;
                if(tab){
                    if(this.collapse){
                        menu.select = false
                    }else{
                        menu.select = true;
                        menu.height = menu.select?menu.hasChildrenShow.length:0;
                        menu.width = menu.select?120:0;
                    }
                }else{
                    menu.select = !menu.select
                    menu.height = menu.select?menu.hasChildrenShow.length:0;
                    menu.width = menu.select?120:0;
                }
            }else{
                menu.bg = true;
                if(tab){
                    menu.select = false;
                }else{
                    menu.select = true;
                }
                if(tab && this.collapse){
                }else{
                    menu.height = menu.hasChildrenShow.length;
                    menu.width = 120;
                }
                if(this.selectMenuIndex || this.selectMenuIndex===0){
                    this.routesfilter[this.selectMenuIndex].height = 0;
                    this.routesfilter[this.selectMenuIndex].width = 0;
                    this.routesfilter[this.selectMenuIndex].select = false;
                    this.routesfilter[this.selectMenuIndex].arrowRotate = 0;
                    this.routesfilter[this.selectMenuIndex].bg = false;
                }
            }
            menu.arrowRotate = menu.select?180:0;
            this.selectMenuIndex=index;
            if(this.collapse){                
                setTimeout(()=>{
                    const dom =  document.getElementsByClassName('sub')[index];
                    const offsetPosition = dom.offsetTop+dom.offsetHeight+30;
                    const overflow = document.body.clientHeight-offsetPosition
                    if(overflow<0){
                        menu.t = -30+overflow-10
                    }
                },500)             
            }
        }
    },
}
</script>
<style scoped>
.router-link-active{
    background:#006eff;
    color: white !important;
}
.routerLink:hover {
  background:rgb(109,114,128);
  color: white;
}
.routerLink:focus{
    background:#006eff;
    color: white;
}
.menu{
    text-align:left;
    color: #c1c6c8;
    cursor: pointer;
}
.sub,.arrow
{
    overflow: hidden;
    transition: width 0.2s,height 0.2s,transform 0.2s,opacity 0.2s;
    -moz-transition: width 0.2s,height 0.2s,transform 0.2s,opacity 0.2s;	/* Firefox 4 */
    -webkit-transition: width 0.2s,height 0.2s,transform 0.2s,opacity 0.2s;	/* Safari 和 Chrome */
    -o-transition: width 0.2s,height 0.2s,transform 0.2s,opacity 0.2s;	/* Opera */
}
</style>