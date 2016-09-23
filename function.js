 
/*function aa (select,fat) {//找类名
	fat=fat||document
	if (fat.getElementsByClassName){//判断用什么类型的浏览器
		return fat.getElementsByClassName(select)
	}else{
		var newarr=[];
		var all=fat.getElementsByTagName("*")//选住body中所有的标签对
        for (var i = 0; i < all.length; i++) {//遍历每一个类名
        	if(bb(all[i].className),select){//判断是否有类名也是box
                newarr.push(all[i]);//把所要寻找的类名放在新的数组中
        	}
        }
        return newarr;
	}

}
function bb(str,select){
	var arr=str.split(" ");//把字符串转化为数组
    for(var i in arr){//遍历数组
    	if(arr[i]==select){
    		return true;//找到类名就输出为真
    	}
    }
    return false;
	
}
*/



//练习  获取类名
function getClass(selector,father){
	father=father||document
	if(father.getElementsByClassName){
		return father.getElementsByClassName(selector)
	}else{
		var newarr=[];
		var all=father.getElementsByTagName("*");
		for (var i = 0; i < all.length; i++) {
			if(getcheck(all[i].className,selector)){
            newarr.push(all[i]);
		    }
		}
		return newarr;
	}
}
//获取父容器中子容器的类名
function getcheck(str,selector){
    var arr=str.split(" ");
    for (var i in arr) {
    	if(arr[i]==selector){
    		return true;
    	}
    }
    return false;
}


//解决外部样式的兼容问题
// function getStyle(ele,attr){
// 	if(ele.currentStyle){
// 	    return ele.currentStyle[attr];
// 	}else{
// 		return getComputedStyle(ele,null)[attr];
// 	}
// }


//获取元素的函数  参数类型必须是字符串
/*function $(selector,father){
	father=father||document
	if(typeof selector=="string"){
		selector=selector.replace(/^\s*|\s*$/g,"")//去掉字符串中前后的空格
		if(selector.charAt(0)=="."){
			return getClass(selector.slice(1),father)//截取名字
		}else if(selector.charAt(0)=="#"){
			return father.getElementById(selector.slice(1)) //用selector.substring(1)也行
		}else if(/^[a-z1-6]{1,10}/.test(selector)){//正则
			return father.getElementsByTagName(selector)
		}else if(typeof selector=="function"){
            window.onload=function(){
            	selector();

            }
		}
	}
}*/

//绑定添加的兼容
function $(selector,father){
	father=father||document//给father设置默认值
	if(typeof selector=="string"){
		selector=selector.replace(/^\s*|\s*$/g,"")//去掉字符串中前后的空格
		if(selector.charAt(0)=="."){
			return getClass(selector.slice(1),father)//截取名字
		}else if(selector.charAt(0)=="#"){
			return father.getElementById(selector.slice(1)) //用selector.substring(1)也行
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,10}/.test(selector)){//正则
			return father.getElementsByTagName(selector)
		}
	}else if(typeof selector=="function"){
            // window.onload=function(){
            // 	selector();
            // }
            bang(window,"load",selector)
		}
}

 
function bang(aa,event,callback){//aa  事件源  event  事件  callback 事件处理程序
	if(aa.addEventListener){
		aa.addEventListener(event,callback)
	}else{
		aa.attachEvent("on"+event,callback)
	}
}


function det(aa,event,callback){//aa  事件源  event  事件  callback 事件处理程序
	if(aa.removeEventListener){
		aa.removeEventListener(event,callback)
	}else{
		aa.detachEvent("on"+event,callback)
	}
}
//4.获取子节点的兼容函数
//"a"  代表元素子节点
//"b"  元素+文本节点
// var father=$(".father")[0];
function getChilds (father,type) {
	type=type||"a"
	var all=father.childNodes;
	var arr=[];
	for (var i = 0; i < 
		all.length; i++) {
		if(type=="a"){
			if(all[i].nodeType==1){//元素节点
				arr.push(all[i])
			}
		}else if(type=="b"){
             if(all[i].nodeType==1 || all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""){//元素节点  文本节点  获取引号中的空格去掉
             	arr.push(all[i]);
             }
		}
		
	}
	return arr
}	
// getChilds(father,"a")


//5.第一个节点
function getFirst(father){
	return getChilds(father)[0];
}

//6.最后一个节点
function getLast(father){
	return getChilds(father)[getChilds(father).length-1]
}

//7.获取指定位置的子节点
function getNum(father,Num){
	return getChilds(father)[Num]
}

//获取下一个兄弟节点
//找到一个兄弟时，对它判断，如果是空文本或者是注释时，再接着向下找，如果找到的是元素节点时，停止寻找。
//ele 表示元素
function getNext(ele){
	var next=ele.nextSibling;
	if(next==null){
		return false
	}
	while(next.nodeType==3||next.nodeType==8){
		next=next.nextSibling;
		if(next==null){
			return false
		}
	}
	return next
}

//获取上一个兄弟节点
function getPrevious(ele){
	var previous=ele.previousSibling;
	if(previous==null){
		return false
	}
	while(previous.nodeType==3||previous.nodeType==8 && previous.nodeValue.replace(/^\s*|\s*$/g,"")){
		previous=previous.previousSibling;
		if(previous==null){
			return false
		} 
	}
	return previous
}



//在某个对象的后面插入标签
function insertAfter(father,newNode,node){
	var next=getNext(node);
	//alert(next)
	if(next){
		father.insertBefore(newNode,next)
	}else{
		father.appendChild(newNode)
	}
}