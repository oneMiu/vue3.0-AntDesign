<template>
<a-layout class="vab-layout-wrap">
    <div v-if="device === 'mobile' && !collapse" class="vab-mask" @click="handleFoldSideBar"></div>
    <a-layout-sider collapsible  :theme="theme.themeType" class="vab-sider" width="200" v-model:collapsed="collapse" :class="classObj" :trigger="null" style="background:#1e222d;" :style="{'overflow-y':collapse?null:'auto'}">
        <vab-logo />
        <!-- <a-menu v-model:selectedKeys="selectedKeys" style="margin-top: 64px;" class="vab-menu" :theme="theme.themeType" mode="inline">
            <vab-menu v-for="route in routes" :key="route.path" :item="route" />
        </a-menu> -->
        <custom-menu ref="customMenu" class="customMenuSytle" />
        
    </a-layout-sider>
    <a-layout class="ant-layout vab-layout" :class="'mobile' === device ? 'vab-mobile-layout' : ''" >
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }" class="vab-header" style="background:#1e222d">
            <vab-tabs @tabChange="tabChange" style="background:#23262E;height: 100%;display: flex;align-items: center;" />
        </a-layout-header>
        <vab-content />
    </a-layout>
</a-layout>
</template>

<script>
import customMenu from './custom-menu'
import VabLogo from './vab-logo'
import VabTabs from './vab-tabs'
import VabContent from './vab-content'
import theme from '@/config/index'
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    components: {
        VabLogo,
        VabTabs,
        VabContent,
        customMenu
    },
    data() {
        return {
            theme,
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
        classObj() {
            return {
                'vab-mobile': this.device === 'mobile',
                'vab-collapse': this.collapse,
            }
        },
    },
    watch: {
        $route: {
            handler({
                fullPath
            }) {
                //暂未研究清楚此处，待改进
                if (fullPath === '/index') fullPath = '/'
                if (fullPath === '/test/test') fullPath = '/test'
                this.selectedKeys = [fullPath]
            },
            immediate: true,
        },
    },
    beforeMount() {
        window.addEventListener('resize', this.handleLayouts)
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleLayouts)
    },
    mounted() {
        console.log(this.routesfilter)
        this.pathList = this.routesfilter.map(x=>{
            return x.path;
        })
        this.showCurrentMenu();
        this.handleLayouts()
    },
    methods: {
        ...mapActions({
            toggleDevice: 'settings/toggleDevice',
            handleFoldSideBar: 'settings/foldSideBar',
            toggleCollapse: 'settings/toggleCollapse',
        }),
        tabChange(tab){
            if(this.$refs.customMenu){
                this.$refs.customMenu.selectMenu({tab});
            }
        },
        showCurrentMenu(){
            let dom = document.getElementsByClassName("ant-menu-submenu-title")
            let curr = this.routes.filter((x,i)=>{
                if(this.$route.matched[0].path===x.path){
                return x;
                }
            })[0].meta.title;
            for(let i=0;i<dom.length;i++){
                if(dom[i].innerText === curr){
                    dom[i].click();
                    break;
                }
            }
        },
        handleLayouts() {
            if (document.body.getBoundingClientRect()) {
                const width = document.body.getBoundingClientRect().width
                if (this.width !== width) {
                    const isMobile = width - 1 < 992
                    this.toggleDevice(isMobile ? 'mobile' : 'desktop')
                    this.width = width
                }
            }
        },
    },
}
</script>
<style>
</style>
<style lang="less">
.vab-layout-wrap {
    .vab-sider {
        position: fixed;
        left: 0;
        z-index: 2;
        height: 100vh;
        .vab-menu {
            // height: calc(100vh - 64);
        }
    }

    .vab-layout {
        padding-left: 200px;
        transition: all 0.2s;
    }

    .vab-mobile-layout {
        padding-left: 0;
        transition: all 0.2s;
    }

    .vab-collapse {
        .vab-logo .anticon+span {
            display: inline-block;
            max-width: 0;
            opacity: 0;
            transition: all 0.2s;
        }

        &+.vab-layout {
            padding-left: 80px;
            transition: all 0.2s;
        }
    }

    .vab-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 998;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: #000;
        opacity: 0.5;
    }

    .vab-mobile {
        position: fixed !important;
        z-index: 999;

        &.vab-collapse {
            width: 0 !important;
            min-width: 0 !important;
            max-width: 0 !important;

            * {
                display: none !important;
                width: 0 !important;
                min-width: 0 !important;
                max-width: 0 !important;
            }

            .ant-menu-item,
            .ant-menu-submenu {
                display: none !important;
                width: 0 !important;
                min-width: 0 !important;
                max-width: 0 !important;
            }

            &+.vab-layout {
                padding-left: 0px !important;
                transition: all 0.2s;
            }
        }
    }

    .vab-header {
        padding: 0;
        background: #fff;

        .ant-col+.ant-col {
            display: flex;
            justify-content: flex-end;
            padding: 0 @vab-padding;
        }

        .trigger {
            height: @vab-header-height;
            padding: 0 @vab-padding;
            font-size: 18px;
            line-height: @vab-header-height;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: #1890ff;
            }
        }
    }
}
</style>
<style scoped>
.customMenuSytle{
    margin-top: 64px;
    /* background: rgb(57 61 73); */
    position: relative;
    font-size: 16px;
}
</style>