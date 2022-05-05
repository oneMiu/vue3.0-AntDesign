var color618 = {
    colorArr:["rgb(127,202,254)"," rgb(111,127,254)","rgb(24, 144, 255)","rgb(191, 19, 113)","rgb(250, 173, 20)","rgb(26, 150, 162)",
    "rgb(60, 150, 16)","rgb(224, 105, 107)","rgb(105, 121, 101)","rgb(83, 156, 172)","rgb(6, 68, 132)","rgb(134, 104, 18)","rgb(191, 107, 153)","rgb(143,188,143)","rgb(171, 109, 171)","rgb(251, 219, 1)","rgb(51, 109, 151)","rgb(64, 169, 255)"],
    // hsvtorgb:function (h, s, v) {//hsv转rgb
    //     var h_i = parseInt(h * 6);
    //     var f = h * 6 - h_i;
    //     var p = v * (1 - s);
    //     var q = v * (1 - f * s);
    //     var t = v * (1 - (1 - f) * s);
    //     var r, g, b;
    //     switch (h_i) {
    //         case 0:
    //             r = v;
    //             g = t;
    //             b = p;
    //             break;
    //         case 1:
    //             r = q;
    //             g = v;
    //             b = p;
    //             break;
    //         case 2:
    //             r = p;
    //             g = v;
    //             b = t;
    //             break;
    //         case 3 :
    //             r = p;
    //             g = q;
    //             b = v;
    //             break;
    //         case 4:
    //             r = t;
    //             g = p;
    //             b = v;
    //             break;
    //         case 5:
    //             r = v;
    //             g = p;
    //             b = q;
    //             break;
    //         default:
    //             r = 1;
    //             g = 1;
    //             b = 1;
    //     }
    //     return 'rgb('+parseInt(r*255)+','+parseInt(g*255)+','+parseInt(b*255)+')'
    // },
    // setColorArr:function(colorCount){//h和s值固定，随机生成v
    //     this.colorArr = new Array;
    //     var golden_ratio = 0.618033988749895;
    //     var s = 0.5;
    //     var v = 0.999;
    //     for(var i=0;i<colorCount;i++){
    //         var h = golden_ratio + Math.seededRandom(-0.5,0.3);
    //         var color = this.hsvtorgb(h,s,v);
    //         this.colorArr.push(color)
    //     }
    // }
}
// Math.seed = -1;
//var s = Math.seed;
// Math.seededRandom = function(max, min) {//伪随机数（关于伪随机数的运用可以百度下，挺有意思的）
//     max = max || 1;
//     min = min || 0;
//     Math.seed = (Math.seed * 9301 + 49297) % 233280;
//     var rnd = Math.seed / 233280.0;
//     return min + rnd * (max - min);
// };
export default {
    color618
}