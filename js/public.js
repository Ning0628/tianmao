//className的切换
function taggleClass(obj,cla){
	var arr=obj.className.split(" ");
	var index=arr.indexOf(cla);

	if (index!=-1) {
		arr.splice(index,1);
		obj.className=arr.join(" ");
	}else{
		obj.className+=" "+cla;
	}

}

//获取parent的元素节点
function getChild(parent){
	var child=parent.childNodes;
	var arr=[];
	for(var i=0;i<child.length;i++){
		// console.log(list.childNodes[i].nodeType);
		if (child[i].nodeType==1) {
			arr.push(child[i]);
			
		}
	}

	return arr;
}

function getLastChild(parent){
	var arr=getChild(parent);

	return arr[arr.length-1];
}

function getFirstChild(parent){
	var arr=getChild(parent);

	return arr[0];
}

//是否包含元素节点,如果包含则返回true,否则返回false
function hasTagChild(parent){
	var arr=getChild(parent);

	return arr.length>0?true:false;
}

//得到下一个兄弟节点
function getNextSibling(obj){
	return obj.nextElementSibling||obj.nextSibling;
}
//得到上一个兄弟节点
//previousSibling
function getPreviousSibling(obj){
	return obj.previousElementSibling||obj.previousSibling;
}

// 获取当前样式
function getStyle(el,type){
	if (el.currentStyle) {
		return el.currentStyle[type];
	}else{
		return getComputedStyle(el,null)[type];
	}
}

/**
 * target:对象,给该对象添加事件
 * type:事件类型, 不加"on"
 * handler:是处理函数
 *
 * 该方法解决了this的指向的不一致的问题
 */

function addEvent(target,type,handler){
	if (target.addEventListener) {
		target.addEventListener(type,handler,false);
	}else{
		target.attachEvent("on"+type,function(){
			handler.call(target);
		});
	}

}
function addEvent2(target,type,handler){
	if (target.addEventListener) {
		target.addEventListener(type,handler,false);
	}else{
		//window.handler
		window[handler]=function(){
			handler.call(target);
		}
		target.attachEvent("on"+type,window[handler]);
	}

}

function removeEvent(target,type,handler){
	if (target.removeEventListener) {
		target.removeEventListener(type,addBorder,false);
	}else{
		target.detachEvent("on"+type,window[handler]);
	}

}

//获取事件委托的目标源
//target:事件点击的目标
//end是结束条件
//attr 属性    eg:nodeName
//attrValue 属性值  eg:LI
function getTarget(target,end,attr,attrValue){
	if (target!=end) {
		while(target.parentNode!=end){
			target=target.parentNode;
		}
		if (attr=="className") {
			if (target[attr].indexOf(attrValue)!=-1) {
				return target;
			}
		}else if(target[attr]==attrValue){
			return target;
		}
		
		
	}

}

//阻止事件冒泡
function stopBubble(e){
	e=e||window.event;
	if (e.stopPropagation) {
		e.stopPropagation();
	}else{
		e.cancelBubble=true;
	}

}
//阻止浏览器默认行为
function stopDefault(e){
	e=e||window.event;
	if (e.preventDefault) {
		e.preventDefault();
	}else{
		e.returnValue=false;
	}
}


//el是变化的对象
//end结束的位置
//st是变化的属性
//cb是函数 ,当动画结束的时候会执行
//cb是可选参数,如果传递则执行,不传递则步执行

function animate(el,st,end,t,cb){
	t=t?t:1000;
	var start=parseInt(getStyle(el,st));
	var _start=start;
	var speed=16.7*((end-start)/t);
	var flag=false;
	//比如end=5  ,start=20  10  0  
	var t=setInterval(function(){
		// var speed=16.7*((end-start)/1000);
		start+=speed;
		//修改成三目运算符
		if (_start>end?start<=end:start>=end) {
			start=end;
			clearInterval(t);
			
			flag=true;
		
		}
		// el.style.left=start+"px";
		if (st=="opacity") {
			el.style[st]=start;
		}else{
			el.style[st]=start+"px";
		}
		if (flag) {
			if (cb) {
				cb();
			}
		}
		

	},16.7)
	return t;

}
//获取
function getScrollTop(){
	var scrollTop = document.documentElement.scrollTop ||
	                    window.pageYOffset || document.body.scrollTop;
	window.pageYOffset=scrollTop;
	return scrollTop
}
//设置
function setScrollTop(top){
	document.documentElement.scrollTop=top;
	//在火狐下面一旦设置了值,不会在随着滚动条的运动而发生变化
	window.pageYOffset=top;
	document.body.scrollTop=top;
}

function getWindow(){
	var o={};
	o.width=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	o.height=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	return o;
}