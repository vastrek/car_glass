$(function(){
	$("#works_page").live("click",function(){		//分页按钮点击事件
		$(this).find("a").live("click",function(){	
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
	//删除作品
	$(".icon-remove").live("click",function(){
		$("#works_id").val($(this).attr("works_id"));
	});
	$("#works_cancel").live("click",function(){
		$("#works_id").val("");
	});
	//删除作品
	$("#works_delete").live("click",function(){
		$.ajax({    
			type:'post',
			url:'/works/delete',
			dataType:"json",
			async : false,
			data:{"works_id":$("#works_id").val()},
			success:function(data){
				if(data['msg'] !=0){
					history.go(0) ;
				}
			},
			error:function(){
				//alert("保存失败");
			}

		});
		
	});
	$(".pull").live("click",function(){
		$("#works_id").val($(this).attr("works_id"));
	});
	
	$("#pull_cancel").live("click",function(){
		$("#works_id").val("");
	});
	//下架作品
	$("#works_pull").live("click",function(){
		$.ajax({    
			type:'post',
			url:'/works/pull',
			dataType:"json",
			async : false,
			data:{"works_id":$("#works_id").val()},
			success:function(data){
				if(data['msg'] !=0){
					history.go(0) ;
				}
			},
			error:function(){
				//alert("保存失败");
			}
			
		});
		
	});
	
	
	
	//作品排序
	$("#works_sort").toggle(
		function() {
			order = "ASC";
			findAll(1);
		}, function() {
			order="DESC";
			findAll(1);
		}
	);

	$("#search").click(function(){
		keyword = $("#keyword").val();
		if(keyword !=""){
			findAll("1");
		}else{
			alert("请输入您想要查找的关键词...");
		}
	});
	
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
//上架作品
function works_push(id){
	if(window.confirm("确定要上架吗?")){
		$.ajax({    
			type:'post',
			url:'/works/push',
			dataType:"json",
			async : false,
			data:{"works_id":id},
			success:function(data){
				if(data['msg'] !=0){
					alert("上架成功");
					history.go(0) ;
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
		url:'/works/findAll',
		dataType:"json",
		async : false,
		data:{"currentPage":currentPage,"activity_id":activity_id,"order":order,"keyword":keyword},
		success:function(data){
			if(data['msg'] !=0){
					$(".table tbody").empty();
					var content ="";
					for(var i=0; i< data['msg'].length; i++ ){
						content+= "<tr>"+
								          "<td>"+data['msg'][i]['works_id']+"</td>";
										  if(data['msg'][i]['is_pull']=="0"){
											  content+="<td>下架</td>";
										  }else{
											  content+="<td>上架</td>";
										  }
						if(data['msg'][i]['name']==""){
							//content+=         "<td style='word-break:break-all;overflow:auto;'><a href=/works/download/?id="+data['msg'][i]['works_id']+">作品详情</a></td>" ;
								content += "<td style='word-break:break-all;overflow:auto;'>&nbsp;</td>" ;
						}else{
					        content+=         "<td style='word-break:break-all;overflow:auto;'><a href=/works/download/?id="+data['msg'][i]['works_id']+">"+data['msg'][i]['name']+"</a></td>" ;							
						}										  
						
						content+=		          "<td style='word-break:break-all;overflow:auto;width:300px'>"+data['msg'][i]['description']+"</td>"+
								          "<td style='text-align:center;'>"+data['msg'][i]['created_at']+"</td>"+
								          "<td>";
						content += '<a href="/download?works_id='+data['msg'][i]['works_id']+'"  title="导出评论和赞"><img src="/resources/images/down.png" alt="导出评论和赞" title="导出评论和赞" width="20px"></a>' ;
									      if(data['msg'][i]['is_pull']=="0"){
											
				 	    content+=	    	   "<a href=\"javascript:;\" onclick=\"works_push("+data['msg'][i]['works_id']+")\">上架</a>&nbsp;&nbsp;";
										  }else{
						content+= 	            "<a href=\"#pullModal\" role=\"button\" class=\"pull\" works_id=\""+data['msg'][i]['works_id']+"\" data-toggle=\"modal\">下架</a>&nbsp;&nbsp;";
										  }
			            content+=        		"<a href=\"/works/findById?works_id="+data['msg'][i]['works_id']+"\">查看详情</a>&nbsp;&nbsp;"+
												"<a class='inline' like_name='"+data['msg'][i]['name']+"' like_id='"+data['msg'][i]['works_id']+"' href='#inline_content'>加赞</a>&nbsp;&nbsp;"+
								          		"<a href=\"/works/updatePre?works_id="+data['msg'][i]['works_id']+"\"><i class=\"icon-pencil\"></i></a>&nbsp;&nbsp;"+
									            "<a href=\"#myModal\" role=\"button\" data-toggle=\"modal\"><i class=\"icon-remove\" works_id=\""+data['msg'][i]['works_id']+"\"></i></a>"+
								          "</td>"+
								    "</tr>";
					}
					$(".table tbody").html(content);
					setPage(document.getElementById("works_page"),data['pagecount'],currentPage);
					$(".pagecount").html(data['pagecount']);
					$(".current_page").html(currentPage);
			}else{
				$(".table tbody").empty();
				$(".table tbody").html("<font color='red'>没有相关数据</font>");
				$("#works_page").empty();
			}
		},
		error:function(){
			//alert("保存失败");
		}

	});
$(".inline").colorbox({
			inline:true, width:"50%",
			onOpen:function(){ 
				//alert($(this).attr('like_name')); 
				$("#like_name").html($(this).attr('like_name')) ;
				$("#like_id").val($(this).attr('like_id')) ;
				$("#count").val('') ;
				$("#like_description").val('') ;
			}
			});	
}