var showPage= (function(){
    // 设置警示状态下图片（页面的位置）
var pageIndex = 0;
var pages = $$(".page_container .page")//找到所有页面
var nextIndex = null;

function setStatic() {
    nextIndex = null;
    for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (i === pageIndex) {
            page.style.zIndex = 1;
        } else {
            page.style.zIndex = 10;
        }
        // 位置
        page.style.top = (i - pageIndex) * height() + "px";
    }
}
setStatic();
//移动中
// dis移动偏移量
function moving(dis) {
    for (var i = 0; i < pages.length; i++) {
        var page = pages[i]
        if (i !== pageIndex) {
            page.style.top = (i - pageIndex) * height() + dis + "px"
        }
    }
    if (dis > 0 && pageIndex > 0) {
        nextIndex = pageIndex - 1;
    }
    else if (dis < 0 && pageIndex < pages.length - 1) {
        nextIndex = pageIndex + 1;
    }
    else {
        nextIndex = null;
    }
}
// 移动结束
function finishMove() {
    if (nextIndex === null) {
        setStatic();
        return;
    }
    var nextPage = pages[nextIndex];
    nextPage.style.transition = ".5s"
    nextPage.style.top = 0;
    setTimeout(function () {
        pageIndex = nextIndex;
        nextPage.style.transition = ""
        setStatic()
    }, 500)

}

// 事件
var pageContainer = $(".page_container")
pageContainer.ontouchstart = function (e) {
    var y = e.touches[0].clientY;
    console.log(y);
    pageContainer.ontouchmove = function (e) {
        var dis = e.touches[0].clientY - y;
        if (Math.abs(dis) < 30) {
            dis = 0;
        }
        //    console.log(dis);
        moving(dis);
        // e.preventDefault()
    }
    //    手指松开，结束移动
    pageContainer.ontouchend = function () {
        finishMove();
        pageContainer.ontouchmove = null;
    }
}


//自动切换页面
function showPage(index){
    var nextPage= pages[index];
    if(index <pageIndex){
        nextPage.style.top = -height()+"px";
        
    }else if(index > pageIndex){
        nextPage.style.top = height()+"px";
    }else{
        if(pageIndex===0){
            pageIndex++;
           
        }else {
            pageIndex--;
        }
        setStatic()
    }
    nextPage.clientHeight;
    nextIndex = index;
    finishMove();
}
return showPage
})()