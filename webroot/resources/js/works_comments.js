$(function(){
		$("#comments_page").click(function(){		//分页按钮点击事件
			$(this).find("a").click(function(){	
				$prev_page = $(".current_page").html();//点击前的页码
				$current_page = $(this).text();				//当前点击的页码数								
				if($current_page!=null){
					 if($current_page=="上一页"){
						 if($(this).attr("class")=="prev unclick"){
							 $current_page = 1;	
						 }else{
							 $current_page = --$prev_page;	
						 }
						 
					 }else if($current_page=="下一页"){
						 if($(this).attr("class")=="next unclick"){							
							 $current_page = $(".pagecount").html();	
						 }else{
							 $current_page = ++$prev_page;			
						 }					 				
					 }else if($current_page =="首页"){
						 $current_page = 1;
					 }else if($current_page =="尾页"){
						 $current_page = $(".pagecount").html();
					 }		
					 
				}else{	
					$current_page=1;
				}	
				findAll($current_page);
			})
	 });
	//5月12日mengyuan添加-begin   二级菜单
	    $(".menuList .tape_race").hover(function(){	    	
	        $(this).find("ul").show();
	    },function(){
	        $(this).find("ul").hide();
	    });
   // 5月12日mengyuan添加-end
	$(".redButton").click(function(){			
		$works_id = $(".works_id").val();
		$.ajax({
			'url':'/comments_front/check_privilege',
			'type':'post',
			'data':{'id_works':$works_id,'activity_id':activity_id},
			'success':function(data){	
				if(data=='nostart'){
					alert("该活动还没有开始，敬请期待！");
					return ;
				}
				if(data=='hasend'){
					alert("抱歉，该活动已经结束了。");
					return ;
				}
				if(data=='nws'){
					alert("请您先完善信息");
					return ;
				}
				if(data=='n'){
					alert("该作品您没有评论权限");
					return ;
				}
				if(data =='t'){
					return ;
				}
				if(data=='y'){
					$content = $(".comment_content").val();							
					if($content.length>0){
						$(".redButton").attr("disabled","disabled");
						$data = {'works_id':$works_id,'content':$content};
						$.ajax({
							'url':'/comments_front/add',
							'type':'post',
							'data':$data,
							'dataType':"json",
							'success':function(data){
								if(data.result=='1'){
									$(".comment_content").val("");
									alert("评论成功");						
									if(data.comment_photo==null){
										photo = "/resources/uploads/nophoto.jpg";
									}else{
										photo = data.comment_photo;
									}
									$(".no_comments").addClass("no");
									$(".revertList").prepend("<div class='revert'><div class='icon'><img alt='' src='"+photo+"'></div><div class='revertContent' style='word-wrap:break-word; overflow:hidden;'><strong>"+
											data.comment_name+"：</strong>"+data.content+"("+data.created_at+")</div><div class='clear'></div></div>");
									$num_comment = $(".weixin").html();						
									$(".weixin").html(++$num_comment);
									$(".redButton").removeAttr("disabled");	
								}else{
									alert("评论失败");
									//$(".redButton").removeAttr("disabled");	
								}								
							}
						})			
					}else{
						alert("评论内容不能为空");
					}
				}
			}
		})		
	})
});
function setPage(container, count, pageindex) {	
	var container = container;
	var count = count;
	var pageindex = pageindex;
	var a = [];
	
	  //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
	  if (pageindex == 1) {
	    a[a.length] = "<a href=\"javascript:;\" class=\"prev unclick\">上一页</a>";
	  } else {
	    a[a.length] = "<a href=\"javascript:;\" class=\"prev\">上一页</a>";
	  }
	  a[a.length] = "<a href=\"javascript:;\" class=\"first\">首页</a>";
	  function setPageList() {
	    if (pageindex == i) {
	      a[a.length] = "<a href=\"javascript:;\" class=\"on\">" + i + "</a>";
	    } else {
	      a[a.length] = "<a href=\"javascript:;\" >" + i + "</a>";
	    }
	  }
	  //总页数小于10
	  if (count <= 10) {
	    for (var i = 1; i <= count; i++) {
	      setPageList();
	    }
	  }
	  //总页数大于10页
	  else {
	    if (pageindex <= 4) {
	      for (var i = 1; i <= 5; i++) {
	        setPageList();
	      }
	      a[a.length] = "...<a href=\"javascript:;\">" + count + "</a>";
	    } else if (pageindex >= count - 3) {
	      a[a.length] = "<a href=\"javascript:;\">1</a>...";
	      for (var i = count - 4; i <= count; i++) {
	        setPageList();
	      }
	    }
	    else { //当前页在中间部分
	      a[a.length] = "<a href=\"javascript:;\">1</a>...";
	      for (var i = pageindex - 2; i <= pageindex + 2; i++) {
	        setPageList();
	      }
	      a[a.length] = "...<a href=\"javascript:;\">" + count + "</a>";
	    }
	  }
	  a[a.length] = "<a href=\"javascript:;\" class=\"last\">尾页</a>";
	  if (pageindex == count) {
	    a[a.length] = "<a href=\"javascript:;\" class=\"next unclick\">下一页</a>";
	  } else {
	    a[a.length] = "<a href=\"javascript:;\" class=\"next\">下一页</a>";
	  }
	  container.innerHTML = a.join("");
}
function comments_delete(comment_id){
	if(window.confirm("你确认要删除此评论吗?")){
		$.ajax({    
			type:'post',
			url:'/works/deleteComments',
			dataType:"json",
			async : false,
			data:{"comment_id":comment_id},
			success:function(data){
				if(data['msg'] !=0){
					alert("删除成功");
					$("#"+comment_id).remove();
					findAll(1);
				}
			},
			error:function(){
				//alert("保存失败");
			}

     });
	}
}
function findAll(currentPage){
	$.ajax({    
		type:'post',
		url:'/comments/findAll',
		dataType:"json",
		async : false,
		data:{"currentPage":currentPage,"works_id":works_id},
		success:function(data){
			if(data['msg'] !=0){
					$(".table tbody").empty();
					var content ="";
					for(var i=0; i< data['msg'].length; i++ ){
						 content+= "<tr id=\""+data['msg'][i]['comment_id']+"\">"+
					        	       "<td>"+data['msg'][i]['comment_id']+"</td>"+
					        	       "<td>"+data['msg'][i]['content']+"</td>"+
					        	       "<td>"+data['msg'][i]['user_name']+"</td>"+
					        	       "<td>"+data['msg'][i]['created_at']+"</td>"+
							           "<td>"+
							              "<a href=\"#\" onclick=\"comments_delete("+data['msg'][i]['comment_id']+")\">删除</a>"+
							           "</td>"+
				      	           "</tr>";
					}
					$(".table tbody").html(content);
					setPage(document.getElementById("comments_page"),data['pagecount'],currentPage);
					$(".pagecount").html(data['pagecount']);
					$(".current_page").html(currentPage);
			}else{
				$(".table tbody").remove();
			}
		},
		error:function(){
			//alert("保存失败");
		}

	});	

	
}

