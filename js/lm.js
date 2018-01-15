  function $(id) {
      return typeof id==='string'?document.getElementById(id):id;
    }
    window.onload=function(){
      var index=0;
      var timer=null;
      var pic=$("pic").getElementsByTagName("li");
      var num=$("num").getElementsByTagName("li");
      var flash=$("flash");
      var left=$("left");
      var right=$("right");
      //单击左箭头
      left.onclick=function(){
        index--;
        if (index<0) {index=num.length-1};
        changeOption(index);
      }
      //单击右箭头
      right.onclick=function(){
        index++;
        if (index>=num.length) {index=0};
        changeOption(index);
      }      
      //鼠标划在窗口上面，停止计时器
      flash.onmouseover=function(){
        clearInterval(timer);
      }
      //鼠标离开窗口，开启计时器
      flash.onmouseout=function(){
        timer=setInterval(run,2000)
      }
      //鼠标划在页签上面，停止计时器，手动切换
      for(var i=0;i<num.length;i++){
        num[i].id=i;
        num[i].onmouseover=function(){
          clearInterval(timer);
          changeOption(this.id);
        }
      }    
      //定义计时器
      timer=setInterval(run,3000)
      //封装函数run
      function run(){
        index++;
        if (index>=num.length) {index=0};
        changeOption(index);
      }
      //封装函数changeOption
      function changeOption(curindex){
        console.log(index)
        for(var j=0;j<num.length;j++){
          pic[j].style.display="none";
          num[j].className="";
        }
        pic[curindex].style.display="block";
        num[curindex].className="active";
        index=curindex;
      }
    }
    function getStyle(obj,attr) {  //  谁的      那个属性
    if(obj.currentStyle)  // ie 等
    {
        return obj.currentStyle[attr];  // 返回传递过来的某个属性
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];  // w3c 浏览器
    }
}



 function on(obj,event,fn){
        if(obj.addEventListener){
            return obj.addEventListener(event,fn,false)
        }else{
            return obj.attachEvent("on"+event,function(){
                fn.call(obj)
            })
        }
    }

// 多个属性运动框架  添加回调函数 
function animate(obj,json,fn) {  // 给谁    json

    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  // 用来判断是否停止定时器   一定写到遍历的外面
        for(var attr in json){   // attr  属性     json[attr]  值
            //开始遍历 json
            // 计算步长    用 target 位置 减去当前的位置  除以 10
            // console.log(attr);
            var current = 0;
            if(attr == "opacity")
            {
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
                console.log(current);
            }
            else
            {
                current = parseInt(getStyle(obj,attr)); // 数值
            }
            // console.log(current);
            // 目标位置就是  属性值
            var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
            console.log(getStyle(obj,attr))
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //判断透明度
            if(attr == "opacity")  // 判断用户有没有输入 opacity
            {
                if("opacity" in obj.style)  // 判断 我们浏览器是否支持opacity
                {
                    // obj.style.opacity
                    obj.style.opacity = (current + step) /100;
                }
                else
                {  // obj.style.filter = alpha(opacity = 30)
                    obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                }
            }
            else if(attr == "zIndex")
            {
                obj.style.zIndex = json[attr];
            }
            else
            {
                obj.style[attr] = current  + step + "px" ;
            }

            if(current != json[attr])  // 只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
            {
                flag =  false;
            }
        }
        if(flag)  // 用于判断定时器的条件
        {
            clearInterval(obj.timer);
            //alert("ok了");
            if(fn)   // 很简单   当定时器停止了。 动画就结束了  如果有回调，就应该执行回调
            {
                fn(); // 函数名 +  （）  调用函数  执行函数
            }
        }
    },10)
}

		
	
       