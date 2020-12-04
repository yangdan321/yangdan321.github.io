var showPop = (function(){
    // 弹出窗口
function showPop(id) {
    var container = $("#" + id);
    container.style.display = "";
    if (id === "popVideo") {
        var vdo = container.querySelector("video");
        vdo.play();
      }
}
//  获取所有的关闭按钮
var closes = $$(".pop_close")
for (var i = 0; i < closes.length; i++) {
    closes[i].onclick = function () {
       var container= this.parentElement.parentElement;
       container.style.display="none";
    }
}


// 特殊效果
// 微信qq图片的点击时间
var popWx = $(".pop_wx");
var popQq = $(".pop_qq");
popWx.onclick=function(){
    //calssList.add添加类样式
    popQq.classList.remove("selected");
    popWx.classList.add("selected");
    
}
popQq.onclick=function(){
    popWx.classList.remove("selected");
    popQq.classList.add("selected");
    
}

//视频样式，在关闭弹窗的时候，视频暂停
var closeBtn = $("#popVideo .pop_close");
closeBtn.addEventListener("click", function () {
  $("#popVideo video").pause();
});
return showPop
})()