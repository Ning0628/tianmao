(function(){


	// 头部显示隐藏导航   楼层导航
	var cn=document.querySelector('.container-nav');
	var cf=document.querySelector('.container-floornav');
	var cfli=document.querySelectorAll('.cf-li');
	var cfli2=document.querySelector('.cf-li2');
	// 内容
	var main=document.querySelectorAll('.main1-m2');

	window.onscroll=function(){  
		var scrollTop = document.documentElement.scrollTop || 
	                    window.pageYOffset || 
	                    document.body.scrollTop;    
	    if(scrollTop>500){     	
	    	cn.style.top=0;   		
	  	}else{ 	   	
	    	cn.style.top="-80px";  
	    }

        //楼层导航     
 	    if(scrollTop>=main[0].offsetTop){     	
 	  		cf.style.width="36px";    		
 	  		cf.style.height="380px";    		
 		}else{ 	   	
 	  		cf.style.width=0; 
 	  		cf.style.height=0;    		
 	    }
 	    // 切换楼层块颜色
 	    for(var i=0;i<cfli.length;i++){
	 	    if(scrollTop>=main[i].offsetTop-100){
		 	    for(var j=0;j<cfli.length;j++){
	 	  			cfli[j].style.background="#626262"; 	    		
	 	    	}
	 	  		cfli[i].style.background="#64c333";
	 	    }
 	    	 	    		
 	    }
	    
	    
    }

    // 点击楼层 导航到相应块
    for(var i=0;i<cfli.length;i++){
    	(function(i){
    		cfli[i].onclick=function(){
				mainMove(main[i].offsetTop);
 	    	}	
    	})(i); 	     	
 	}

 	// 回到顶部
	var rp9=document.querySelector('.rp9');
	rp9.onclick=function(){
 		mainMove(-400);
 	} 	
 	cfli2.onclick=function(){
 		mainMove(-400);
 	}

 	// 右侧边栏
	var rightp=document.getElementsByClassName('right-position')[0];
	var rpbg=document.getElementsByClassName('rpbg');
	var rp=document.getElementsByClassName('rp');

	for(var i=0;i<rp.length;i++){
		(function(i){
			rp[i].onmouseenter=function(){
				for(var j=0;j<rpbg.length;j++){
					rp[j].style.background="#000";
					rpbg[j].style.opacity=0;
					if(j==7){
						rpbg[j].style.left="-200px";						
					}else{
						rpbg[j].style.left="-150px";						
					}
				}
				rp[i].style.background="#ff0036";
				rpbg[i].style.opacity=1;
				if(i==7){
					rpbg[i].style.left="-157px";						
				}else{
					rpbg[i].style.left="-91px";						
				}
			}
			rp[i].onmouseleave=function(){
				for(var j=0;j<rp.length;j++){
					rp[j].style.background="#000";
					rpbg[j].style.opacity=0;
					if(j==7){
						rpbg[j].style.left="-200px";						
					}else{
						rpbg[j].style.left="-150px";						
					}
				}				
			}
		})(i);
	}


 	function mainMove(end){
 		var scrollTop = document.documentElement.scrollTop || 
	                    window.pageYOffset || 
	                    document.body.scrollTop; 
 		var _scrollTop=scrollTop;
 		var speed=16.7*((end-scrollTop)/500);
 		var Ti=setInterval(function(){
 			scrollTop+=speed;
 			if(_scrollTop>end?scrollTop<=(end+400):scrollTop>=(end+400)){
 				scrollTop=end+400;
 				clearInterval(Ti);
 			}
 			setScrollTop(scrollTop);
 		},16.7);
 	}
  

	// banner
	var bc_img=document.querySelector('.bc_img');
	var bc_btn=document.querySelector('.bc_btn');
	var banner=document.querySelector('.banner');
	var t,count=0;

	t=setInterval(move,4000);
	function move(){
		count++;
		if(count>5){
			count=0;
		}
		changebt(count);
	}

	for(var i=0;i<bc_btn.children.length;i++){
		(function(i){
			bc_btn.children[i].onclick=function(){
				if(t){
					clearInterval(t);
				}
				t=setInterval(move,4000);
				changebt(i);
				count=i;
			}
		})(i);
	}

	
	function changebt(bt){
		var Bgarr=["#304a9f","#5be923","#e8e8e8","#fff","#e8e8e8","#848cef"];
		for(var i=0;i<bc_btn.children.length;i++){
			bc_btn.children[i].style.background="#a2a2a2";
			bc_img.children[i].style.display="none";
			animate(bc_img.children[i],"opacity",0);
		}
		bc_btn.children[bt].style.background="#f6f6f6";
		banner.style.background=Bgarr[bt];
		bc_img.children[bt].style.display="block";
		animate(bc_img.children[bt],"opacity",1);
	}


	// 商品分类导航颜色和二级导航显示

	var bmlu_li=document.querySelectorAll('.bmlu_li');
	var iconfont=document.querySelectorAll('.iconfont');
	var bm_main=document.querySelectorAll('.bm_main');
	var bmaColor=["#e94077","#427def","#6633ff","#e54077","#6347ed","#427def",
				"#fa5c5c","#f7a831","#f8a831","#427def","#dd2727","#427def",
				"#f7a831","#3bc7b0","#dd2727","#3bc7b0"];
	for(var i=0;i<bmlu_li.length;i++){
		(function(i){
			bmlu_li[i].onmouseenter=function(){
				this.children[1].style.color=bmaColor[i];
				iconfont[i].style.color=bmaColor[i];
				this.style.background="#fff";
				bm_main[i].style.display="block";
			}
			bmlu_li[i].onmouseleave=function(){
				for(var i=0;i<bmlu_li.length;i++){
					bmlu_li[i].children[1].style.color="#fff";
					iconfont[i].style.color="#fff";
					bmlu_li[i].style.background="";
					bm_main[i].style.display="none";					
				}				
			}
		})(i);
	}
	

	// 天猫超市小tab切换
	var mm2cr1=document.querySelector(".mm2cr1");
	var mm2cr2=document.querySelectorAll(".mm2cr2");
	mm2cr1.children[0].style.background="#00b262";
	mm2cr1.children[0].style.color="#fff";
	mm2cr1.children[1].style.background="#f1f1f1";
	mm2cr2[0].style.display="block";
	var tcount=0,flag=true;
	for(var i=0;i<mm2cr1.children.length;i++){
		(function(i){
			mm2cr1.children[i].onmouseover=function(){
				flag=false;
				changesmallTab(i);
			}
			mm2cr1.children[i].onmouseout=function(){
				flag=true;	
			}
		})(i);		
	}
	var timer=setInterval(function(){
		if(flag){
			tcount++;
			if(tcount>1){
				tcount=0;
			}
			changesmallTab(tcount);
		}		
	},2000);
	function changesmallTab(i){
		for(var j=0;j<mm2cr1.children.length;j++){
			mm2cr1.children[j].style.background="#f1f1f1";
			mm2cr1.children[j].style.color="#000";
			mm2cr2[j].style.display="none";
		}
		mm2cr1.children[i].style.background="#00b262";
		mm2cr1.children[i].style.color="#fff";
		mm2cr2[i].style.display="block";
	}

})();