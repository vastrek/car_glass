$(function(){
	$(".good").live('click',function(){
		//console.log("activity_id:"+activity_id) ;
		//console.log($(this).text()) ;
		bindClick($(this)) ;
	}) ;
	function bindClick($this){
		var currentCount = $this.text() ;
		if(currentCount=="null"){
			currentCount = 0 ;
		}
		//$this = $(this) ;
		var works_id = $this.parent().prev().attr("works_id") ;
		
		//console.log(works_id) ;
		var url = "/vote/" ;
		var data = {'activity_id':activity_id,'works_id':works_id}  ;
		//未完善信息不能评论
		if(user_sign!="1"){
			alert("请完善用户信息!") ;
			return ;
		}
		//权限控制
		if((user_role=="" || activity_privilege=="")||(user_role=="user" && activity_privilege==3)||(user_role=="pv" && activity_privilege==2)){
			alert("对不起,您没有权限参加此活动!");
			return ;
		}
		$(".good").die('click') ;
		$.post(url, data, function(data){
			//console.log(data) ;
			var data = eval("("+data+")") ;
			if(data.status=="y"){
				$this.html(parseInt(currentCount)+1) ;
				alert("成功赞") ;
			}
			if(data.status=="n"){
				if(data.info=="haslike"){
					alert("您已经赞过该作品了") ;
				}else if(data.info=="more3"){
					alert("本次活动已经赞过三次了") ;
				}else if(data.info=="nologin"){
					alert("请重新登录") ;
					window.location.href = "/front/login" ;
				}else if(data.info=="noid"){
					alert("该活动或作品不存在了") ;
				}else if(data.info=="nostart"){
					alert("该活动还没有开始，敬请期待！") ;
				}else if(data.info=="hasend"){
					alert("抱歉，该活动已经结束了。") ;
				}
			}
			$(".good").live('click',function(){
				bindClick($(this)) ;
			}) ;
		}) ;		
	}
	//一级导航加粗样式
	if($(".tape_race").find("ul li a").hasClass('hover')){
		window.console&&console.log($(this).html()) ;
	} 
	//alert($(".tape_race").find("ul li a").hasClass('hover')) ;
	$(".tape_race").find("ul li a").each(function(i){
		//window.console&&console.log($(this).html()) ;
		$this = $(this) ;
		if($this.hasClass('hover')){
			$this.parent().parent().prev().addClass('hover') ;
		}
	}) ;
	
}) 