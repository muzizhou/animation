/**
 * Created by Administrator on 2016/7/18.
 */
/*创建游戏类*/
var coming=$(".coming")[0]
var come=$(".come")[0]
coming.onclick=function(){
come.style.display="none"
// 创建游戏类
function game(){
  this.arr=["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  this.imgs={A:"imgs/a.png",B:"imgs/b.png",C:"imgs/c.png",D:"imgs/d.png",E:"imgs/e.png",F:"imgs/f.png",G:"imgs/g.png",H:"imgs/h.png",I:"imgs/i.png",G:"imgs/j.png",K:"imgs/k.png",L:"imgs/l.png",M:"imgs/m.png",N:"imgs/n.png",O:"imgs/o.png",P:"imgs/p.png",Q:"imgs/q.png",R:"imgs/r.png",S:"imgs/s.png",T:"imgs/t.png",U:"imgs/u.png",V:"imgs/v.png",W:"imgs/w.png",X:"imgs/x.png",Y:"imgs/y.png",Z:"imgs/z.png"};
  this.len=3;
  this.currentletter=[]//当前的字母
  this.currentspan=[]//当前文档中的span
  this.cw=document.documentElement.clientWidth;
  this.ch=document.documentElement.clientHeight
  this.t
  this.speed=1
  this.step=10
  this.life=$(".life")[0]
  // alert(this.life)
  this.score=$(".score")[0]
  this.zongfen=$(".zongfen")[0]
  this.guanqia=$(".guanqia")[0]
  this.endbox=$(".endbox")[0]
  this.end=$(".end")[0]
  this.startbox=$(".startbox")[0]
  this.start=$(".start")[0]
}
game.prototype={
    play:function(){
        // alert(this._getRand(this,len))
      this._createspan(this._getRand(this.len))
      this._move()
      this._key()
    },
  _getRand:function(num){
        var newarr=[]
        for(var i=0;i<num;i++){
        var letter=this.arr[Math.floor(Math.random()*this.arr.length)]
        while(this._checkletter(letter,this.currentletter)){
          letter=this.arr[Math.floor(Math.random()*this.arr.length)]
        }
       this.currentletter.push(letter)
       newarr.push(letter)
    }
    return newarr
},

    _checkletter:function(val,arr){
    for(var i=0;i<arr.length;i++){
      if(val==arr[i]){
        return true
      }
    }
    return false
    },
_createspan:function(arr){
   var newarr=[]
   for (var i = 0; i < arr.length; i++) {
    var span=document.createElement("img")
     span.src="imgs/"+arr[i]+".png"
    span.className=arr[i]
    span.innerHTML="<imgs src="+this.imgs[arr[i]]+" style=width:75px;height:80px;>"
    //span.values=arr[i]
    var lefts=(100+Math.random()*(this.cw-200))
    span.lefts=lefts
    while(this._checkpos(span,this.currentspan)){
        lefts=(100+Math.random()*(this.cw-200))
        span.lefts=lefts
    }
    newarr.push(span)
    this.currentspan.push(span)
    span.style.cssText="position:absolute;left:"+lefts+"px;top:"+Math.random()*30+"px";
    document.body.appendChild(span)
   }
   return newarr
},
_checkpos:function(ele,eleArr){
    for(var i=0;i<eleArr.length;i++){
      if(ele.lefts>eleArr[i].lefts-80&&ele.lefts<eleArr[i].lefts+80){
        return true
      }
    }
    return false
},
_move:function(){
    var that=this
    that.t=setInterval(function(){
    for (var i = 0; i < that.currentspan.length; i++) {
        var tops=that.currentspan[i].offsetTop+that.speed
        that.currentspan[i].style.top=tops+"px"
    if(tops>that.ch){
        document.body.removeChild(that.currentspan[i])
        that.currentspan.splice(i,1);
        that.currentletter.splice(i,1)
        that._createspan(that._getRand(1))
      if(that.currentletter.splice(i,1)){
        that.life.innerHTML--
        if(that.life.innerHTML==0){
            clearInterval(that.t)
            that.endbox.style.display="block"
            that.end.onclick=function(){
            that.endbox.style.display="none"
            location.reload()
            }
          // alert("游戏结束")
          
        }
      }
         
      }
    }
   },50)
},
_key:function(){
    var that=this
    document.onkeydown=function(e){
    var e=e||window.event
    var letter=String.fromCharCode(e.keyCode)
    for (var i = 0; i < that.currentspan.length; i++) {
    if(that.currentspan[i].className==String.fromCharCode(e.keyCode)){
    // if(letter==that.currentspan[i].innerHTML){
        document.body.removeChild(that.currentspan[i])
        that.currentspan.splice(i,1);
        that.currentletter.splice(i,1)
        that._createspan(that._getRand(1))
        if(that.currentletter.splice(i,1)){
            that.score.innerHTML++
            that.zongfen.innerHTML++
        if(that.score.innerHTML>=that.step){
            // alert("进入下一关")
             clearInterval(that.t)
            that.startbox.style.display="block"
            that.start.onclick=function(){
            that.startbox.style.display="none"
             that._next()
            }
           
        }
        }
     }
    };
   }
},
_next:function(){
    var that=this
  clearInterval(that.t)
  for (var i = 0; i < that.currentspan.length; i++) {
        document.body.removeChild(that.currentspan[i])
    };
    that.currentletter=[]
    that.currentspan=[]
    that.speed+=1
    that.step+=5
    that.len+=1
    that.guanqia.innerHTML++
    that.score.innerHTML=0;
    // that.zongfen.innerHTML++
    that._getRand(that.len)
    that._createspan(that.currentletter)
    that._move(that.currentspan)
    that._key(that.currentspan)
},
 }
var game=new game()
game.play()
}