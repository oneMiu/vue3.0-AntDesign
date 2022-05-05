const publicAPI = ["customerapi","merchantapi","shopapi","wechatpubapi","serviceapi","areaapi"];
let apiList = [];
for(let i=0;i<publicAPI.length;i++){
  let apiResponse = {
    url:publicAPI[i],
    type:"get",
    response(config){
      return {"code": 1,"data":[],"msg":"OK"}
    }
  }
  apiList.push(apiResponse);
}
module.exports=apiList;
