// 全局通用的一些函数或一开始要执行的全局代码
function $(selector) {
    return document.querySelector(selector)
}
function $$(selector) {
    return document.querySelectorAll(selector)
}
function width() {
    return document.documentElement.clientWidth;
}
function height() {
    return document.documentElement.clientHeight;
}

// 轮播图
var carouselId = "newsCarousel"   //容器的Id

// 轮播图数据
var datas = [
    {
        link:
            "https://lolm.qq.com/m/news_detail.html?docid=8584324486918752329&amp;e_code=492513&amp;idataid=279688",
        image:
            "https://ossweb-img.qq.com/upload/adw/image/20191015/80cbdbaff4a1aa009f61f9240a910933.jpeg",
    },
    {
        link:
            "https://lolm.qq.com/m/news_detail.html?docid=13355407427466544705&amp;e_code=492506&amp;idataid=279689",
        image:
            "https://ossweb-img.qq.com/upload/adw/image/20191015/696545e262f2cbe66a70f17bf49f81e0.jpeg",
    },
    {
        link:
            "https://lolm.qq.com/m/news_detail.html?docid=15384999930905072890&amp;e_code=492507&amp;idataid=279690",
        image:
            "https://ossweb-img.qq.com/upload/adw/image/20191018/3c910d44898d7221344718ef3b7c0a7e.jpeg",
    },
];


function createCarousel(carouselId,datas ){
    // 获取dom元素
var container = document.getElementById(carouselId);
var carouselList = container.querySelector(".g_carousel-List");
var indicator = container.querySelector(".g_carousel-indicator");
var prev = container.querySelector(".g_carousel-prev");
var next = container.querySelector(".g_carousel-next");

var curIndex = 0   //当前的图片索引

// 创建轮播图中的各种元素
function creatrCaroudelElement() {
    var listHtml = "";//轮播图的内部HTML
    var indHtml = "";//指示器的内部HTML
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        if (data.link) {
            listHtml += `<li> 
            <a href="${data.link}" target="_blank">
             <img src="${data.image}">
             </a> 
             </li>`
        } else (
            listHtml += `<li> 
             <img src="${data.image}">
             </li>`
        )
        indHtml += "<li></li>"
    }
    carouselList.style.width = `${datas.length}00%`;
    carouselList.innerHTML = listHtml;
    indicator.innerHTML = indHtml;
}
creatrCaroudelElement()


function setStatus() {
    //图片状态
    carouselList.style.marginLeft = -curIndex * width() + "px";
    //指示器状态
    //排他 获取添加之前带有样式的删掉
    var beforeSelected = indicator.querySelector(".selected");
    if (beforeSelected) {
        beforeSelected.classList.remove("selected")
    }
    indicator.children[curIndex].classList.add("selected");

    //处理前进和后退
    if (prev) {
        if (curIndex === 0) {
            prev.classList.add("disabled")
        } else {
            prev.classList.remove("disabled")
        }
    }
    if (next) {
        if (curIndex === datas.length - 1) {
            next.classList.add("disabled")
        } else {
            next.classList.remove("disabled")
        }
    }
}
setStatus();



//上一个
function toPrev() {
    if (curIndex === 0) {
        return
    } else
        curIndex--;
    setStatus()

}
toPrev();

//下一个
function toNext() {
    if (curIndex === datas.length - 1) {
        return
    }
    curIndex++;
    setStatus()

}
toNext();

//自滚动
var timer = null;//自动切换的计时器id

//开始自滚动
function start() {
    if (timer) {
        return  //表示已经在切换了
    }
    timer=setInterval(function(){
        curIndex++;
        if(curIndex===datas.length){
            curIndex=0
        }
        setStatus()
    },2000)

}
start()
//停止自滚动
function stop() {
    clearInterval(timer);
    timer = null;
}

//点击事件
if (prev) {
    prev.onclick = toPrev;
}
if (next) {
    next.onclick = toNext;
}

container.ontouchstart=function(e){
    e.stopPropagation();  //组织事件冒泡
    var x = e.touches[0].clientX;
    // console.log(x); 
    //去掉过渡效果
    carouselList.style.transition="none";
    stop();
    //记录时间
    var pressTime = Date.now(); //手指按下的时间
    //监听移动事件
container.ontouchmove=function(e){
    var dis = e.touches[0].clientX-x;
    carouselList.style.marginLeft=-curIndex * width() + dis + "px";
}
container.ontouchend=function(e){
    var dis = e.changedTouches[0].clientX-x;
    start();
    carouselList.style.transition="";
    container.ontouchmove=null;  //结束监听
    var duration = Date.now()-pressTime    //手指滑动的时间
    // console.log(duration);
    if(duration<300){
        if(dis>20 && curIndex>0){
            toPrev()
        }else if(dis<-20 && curIndex<datas.length-1){
            toNext()
        }else{
            setStatus()
        }
    }else{
        if(dis<-width()/2 && curIndex<datas.length-1){
            toNext();
        }else if(dis>width()/2 && curIndex>0){
            toPrev();
        }else{
            setStatus()
        }
    }

   
    
}

}
}

// ajax请求
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
      throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
      headers: {
        target,
      },
    }).then((r) => r.json());
  }
