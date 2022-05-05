<template>
<div class="imagePreViewer">
    <div style="position: relative;">
        <span v-if="!$attrs.src" :style="{'line-height':$attrs.style?$attrs.style.height:60+'px'}">
            无
        </span>
        <img @error="imgError($attrs.src)" style="cursor: pointer;" v-else :src="isImageError?currentImage:$attrs.src" class="imagePreview-imgSize" :style="$attrs.style?$attrs.style:null" @click="showImageModal">
        <span v-if="config.showAuth" :style="{background:$attrs.recordData[config.showAuth]?'rgb(82 196 26 / 75%)':'#aaa'}"
            style="position: absolute;left: 0;margin: 0;right: 0;bottom: 0px;color: white;">
            {{$attrs.recordData[config.showAuth]?"已实名":"未实名"}}
        </span>
    </div>
    <div ref="imgModal" v-if="showImage" class="imgModal">
        <div @click="closeModal" style="position: fixed;z-index: 1101;top: 5%;right: 5%;font-size:30px;color:white;cursor: pointer;">
            <img class="imagePreview-icon" src="@/assets/img/close.png">
        </div>
        <img v-if="isMosaic" :src="currMosaic" style="position:fixed;transform: translate(-50%, -50%) rotate(0deg) scale(1);top: 50%;left: 50%;;z-index: 1111;" alt="" :style="{'opacity':masaicOpacity,'width':masaicWidth+'vw','height':masaicHeight+'vw'}">
        <img @mousedown.prevent="imageMouseDown" @mouseup="cancelMove" @mouseout="cancelMove" :style="{'transform': `translate(-50%,-50%) rotate(${rotatedeg}deg) scale(${scaledeg})`,'top':imageTop,'left':imageLeft,'cursor': grab}" class="imagePreview-img" ref="imagePreview" id="imagePreview" :src="isImageError?currentImage:$attrs.src" />

        <img class="imagePreview-icon" v-if="imageLists.length>0" style="font-size:30px;transform: rotate(180deg);" src="@/assets/img/next.png" @click.stop="nextImage('prev')">
        <img class="imagePreview-icon" v-if="imageLists.length>0" src="@/assets/img/next.png" @click.prevent="nextImage('next')">

        <div class="imagePreview-bottomButton">
            <div @click="rotate('right')">
                <img class="imagePreview-icon" style="transform: rotateY(180deg)" src="@/assets/img/turn.png" alt="">
            </div>
            <div @click="rotate('left')">
                <img class="imagePreview-icon" src="@/assets/img/turn.png" alt="">
            </div>
        </div>
        <div v-show="showLastPic" style="opacity: 0.8;text-align: center;
    line-height: 50px;width:20vw;height:50px;color:white;position: fixed;z-index:1102;background:black;top: 50%;left: 50%;transform: translate(-50%,-50%);">
            这是最后一张哦
        </div>
        <div style="width:100vw;height:100vh;background:black;opacity:0.7;position: fixed;z-index:1100;top: 0;left: 0px;">
            <div v-if="showMosaic"  style="width:20%;display: flex;flex-direction: column;padding-left: 15%;justify-content: space-evenly;height: 100%;">
                <div style="color: white;width: 100px;">点击选择马赛克</div>
                <img @click="selectMosaic(i)" :src="i" v-for="i in mosaic" :key="i" width="100" alt="">
                <div style="color: white;width: 150px;">
                    <span>马赛克透明度设置：</span>
                    <a-slider v-model:value="masaicOpacity" :min="0" :max="1" :step="0.01" />
                    <span>马赛克宽度设置：</span>
                    <a-slider v-model:value="masaicWidth" :min="5" :max="100" :step="1" />
                    <span>马赛克高度设置：</span>
                    <a-slider v-model:value="masaicHeight" :min="5" :max="100" :step="1" />
                </div>
                
                <a-button  type="danger" style="color: white;width: 100px;" @click="()=>isMosaic=false">关闭马赛克</a-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
let imgModal;
export default {
    name:"ImagePreViewer",
    props: {
        imageList: {
            type: [Array, Object],
            default: ()=>{
                []
            }
        },
        showMosaic:{
            type:[Boolean],
            default:false,
        },
        config:{
            type:[Object],
            default:{},
        },
    },
    data() {
        return {
            mosaic:[
                require(`./../assets/img/grid_3.png`),
                require(`./../assets/img/grid_1.png`),
                require(`./../assets/img/grid_2.png`),
            ],
            isImageError:false,
            masaicWidth:40,
            masaicHeight:40,
            masaicOpacity:0.5,
            currMosaic:require(`./../assets/img/grid_3.png`),
            isMosaic:false,
            currentImage: this.$attrs.src,
            showImage: false,
            rotatedeg: 0,
            scaledeg: 1,
            tempY: 0,
            tempX: 0,
            imageTop: "50%",
            imageLeft: "50%",
            grab: 'grab',
            middleIndex: 0, //中间的索引 
            showLastPic: false,
            imageListOriginal: [],
            imageLists: [],
        }
    },
    mounted() {
    },
    methods: {
        imgError(src){
            console.log("哈哈【",src,"】图片地址错误！！！自动修改为已过期")
            this.isImageError = true;
        },
        selectMosaic(item){
            console.log(item);
            this.currMosaic = item;
            this.isMosaic = true;
        },
        initImagePreViewer(){
            setTimeout(()=>{
                imgModal = document.getElementsByClassName("imgModal");
                for (let i = 0; i < imgModal.length; i++) {
                    imgModal[i].addEventListener('DOMMouseScroll', this.imgModalMouserScroll, false)
                    imgModal[i].addEventListener('mousewheel', this.imgModalMouserScroll, false)
                }
                window.addEventListener('keydown', this.listenerKeyDown)
                if(this.imageList){
                    this.imageLists = this.imageList.map(x => x);
                }
            },200)
        },
        nextImage(action, index) {
            let currentIndex = index || this.imageLists.indexOf(this.currentImage);
            if (currentIndex != -1) {
                if (action == 'next') {
                    if (currentIndex + 1 >= this.imageLists.length) {
                        this.currentImage = this.imageLists[0];
                        currentIndex = 0;
                    } else {
                        this.currentImage = this.imageLists[currentIndex + 1];
                        currentIndex = currentIndex + 1;
                    }
                    this.overSortImageList('next')
                } else if (action == 'prev') {
                    if (currentIndex - 1 < 0) {
                        this.currentImage = this.imageLists[this.imageLists.length - 1];
                        currentIndex = this.imageLists.length - 1;
                    } else {
                        this.currentImage = this.imageLists[currentIndex - 1];
                        currentIndex = currentIndex - 1
                    }
                    this.overSortImageList('prev')
                } else {
                    this.currentImage = action
                }
                if (this.imageListOriginal.indexOf(this.currentImage) == this.imageListOriginal.length - 1) {
                    this.showLastPic = true;
                    setTimeout(() => {
                        this.showLastPic = false;
                    }, 1000);
                }
            } else {
                console.warn("当前图片不在这个imageList中，当前图片地址：",this.currentImage,"。imageList：",this.imageLists)
            }
            return false;
        },
        overSortImageList(direction) {
            let replaceElement;
            if (direction == 'next') {
                replaceElement = this.imageLists.splice(0, 1)[0];
                console.log("next重新排序的数组", replaceElement)
                this.imageLists.push(replaceElement);
            } else {
                replaceElement = this.imageLists.splice(this.imageLists.length - 1, 1)[0];
                this.imageLists.unshift(replaceElement);
                console.log("prev重新排序的数组", replaceElement)
            }
        },
        replaceIndex(currentIndex, currentElement) {
            this.imageLists[currentIndex] = this.imageLists[this.middleIndex]
            this.imageLists[this.middleIndex] = currentElement
        },
        cancelMove(ev) {
            this.grab = 'grab'
            var e = ev || window.event;
            e.target.onmousemove = null
        },
        imageMouseDown(ev) {
            this.grab = 'grabbing'
            var e = ev || window.event;
            this.tempX = e.clientX - e.target.offsetLeft
            this.tempY = e.clientY - e.target.offsetTop
            e.target.onmousemove = (ev) => {
                return this.moveImage(ev, this.tempX, this.tempY);
            }
            return false;
        },
        moveImage(e, tempX, tempY) {
            var ev = e || window.event;
            this.imageLeft = ev.clientX - tempX + 'px'
            this.imageTop = ev.clientY - tempY + 'px'
            return false;
        },
        listenerKeyDown(e) {
            if (e.keyCode == 27) {
                this.closeModal();
            }
        },
        showImageModal() {
            if(this.config.clickEvent && this.config.clickEvent=="verifyAction"){
                return;
            }
            this.showImage = true;
            this.rotatedeg = 0;
            this.scaledeg = 1
            this.imageTop = '50%'
            this.imageLeft = '50%'
            if (this.imageLists.length > 0) {
                let currentIndex = this.imageLists.indexOf(this.$attrs.src);
                this.middleIndex = parseInt(this.imageLists.length / 2)
                if (currentIndex == -1) {
                    this.imageLists.splice(this.middleIndex, 0, this.$attrs.src)
                } else {
                    this.replaceIndex(currentIndex, this.$attrs.src)
                }
                this.imageListOriginal = this.imageLists.map(x => x);
            }
            this.initImagePreViewer();
        },
        rotate(direction) {
            if (direction == 'right') {
                this.rotatedeg += 90
            } else {
                this.rotatedeg -= 90
            }
        },
        closeModal() {
            this.showImage = false;
             window.removeEventListener('keydown',this.listenerKeyDown);
             for (let i = 0; i < imgModal.length; i++) {
                imgModal[i].removeEventListener('DOMMouseScroll', this.imgModalMouserScroll, false)
                imgModal[i].removeEventListener('mousewheel', this.imgModalMouserScroll, false)
            }
            this.$emit("changeTipShow",this.$attrs.recordData)
        },
        imgModalMouserScroll(event) {
            let detail = event.wheelDelta || event.detail
            let s = detail > 0 ? this.scaledeg + 0.1 : this.scaledeg - 0.1
            if (s < 0.1) {
                this.scaledeg = 0.1
            } else {
                this.scaledeg = s;
            }
            if (event.preventDefault) {
                event.preventDefault();
            }
            return false;
        }
    },
}
</script>

<style scoped>
.imagePreview-icon {
    height: 40px;
}

.imgModal {
    transition: all 2s ease-out;
}

.imagePreViewer {
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.imagePreview-middleContainer::-webkit-scrollbar {
    display: none
}

.imagePreview-middleContainer {
    overflow: auto;
    display: flex;
    justify-content: space-evenly;
    width: 560px;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
}

.imagePreview-bottomImage {
    height: 100px;
    width: 39vw;
    background: rgba(0, 0, 0, 0.65);
    position: fixed;
    z-index: 1101;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.imagePreview-bottomButton {
    height: 50px;
    width: 500px;
    background: rgba(0, 0, 0, 0.65);
    position: fixed;
    z-index: 1101;
    bottom: 2%;
    left: 50%;
    border-radius: 50px;
    transform: translate(-50%);
    display: flex;
    color: white;
    justify-content: space-evenly;
    align-items: center;
    font-size: 30px
}
.imagePreview-imgSize{
    width: 80px;
    height: 80px;
}
.imagePreview-img {
    max-height:80vh;
    position: fixed;
    z-index: 1101;
    -moz-transition: -moz-transform 1s;
    /* Firefox 4 */
    -webkit-transition: -webkit-transform 1s;
    /* Safari and Chrome */
    -o-transition: -o-transform 1s;
    /* Opera */
}
</style>
