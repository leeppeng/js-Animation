function getStyle(obj,attr){//获取样式
	if(obj.currentStyle){
		return obj.currentStyle[attr];//IE
	}else{
		return getComputedStyle(obj,false)[attr];//火狐
	}
}
function Move(obje,json,fn){
	clearInterval(obje.duo_timer);
	obje.duo_timer = setInterval(function(){
		let flag = true; //假设条件
		for(var attr in json){
			 //取当前值
			 let cur =0;
			 if(attr=='opacity'){//判断是不是透明度动画
				cur = Math.round(parseFloat(getStyle(obje,attr))*100);
			 }else{
				cur = parseInt(getStyle(obje,attr));
			 }
				//console.log(attr);
			 //算速度
			 var wsd = (json[attr]-cur)/8;
			 wsd = wsd>0?Math.ceil(wsd):Math.floor(wsd);
			 //检测停止
			 if(cur != json[attr]){
			 	flag = false;
			 }
			if(attr=='opacity'){//判断是不是透明度动画
				obje.style.filter = 'alpha(opacity:'+(cur+wsd)+')';
				obje.style.opacity = (cur+wsd)/100;
			}else{
				obje.style[attr] = cur+wsd+'px';
			}
		}
		if(flag){//当flag = true; 时停止定时器。当有fn时继续回调
			clearInterval(obje.duo_timer);
			if(fn){
				fn();
			}
		}
	},30);
}
 //调用 Move(this,{opacity:100,width:150},fn);
/* duowidth(this,{opacity:100,width:150},function(){
	duowidth(that,{height:200})
});

//注意json key中不能识别‘-’，所以像margin-top这类样式会报错,需要用引号引起来
{'margin-top':-25,opacity:0}
*/