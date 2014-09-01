// 榜单

$(function(){
	$(".tel_invite .title dd a").each(function(){    	//奖项名称列表change时触发
		$(this).live("click",function(){
			//alert();
			var val = $(this).html();	
			$winner_id = $(this).attr("id");
			$activity_title = $(this).attr("ai");
			$cycle_w = $(this).attr("wc");   		 //   奖项周期
			$("."+$activity_title).html("");	
			$(this).closest("dl").next().find("dt").html("--");
			$(this).closest("dl").next().find("dd").html("");
			if($activity_title=='jxsz'){  
				//奖项设置  处理
				$(this).parents(".title").next().find(".description").html("");
				$(this).parents(".title").next().find(".table_thead").html("");
				$(this).parents(".title").next().find(".table_tbody").html("");
				$ac_name = $(this).parents(".title").next().find(".ac_name").val();
				$("#jxsz"+$ac_name).html("");
				//alert($ac_name)
				$.ajax({
					'url':'/winner/showJxsz',
					'type':'post',
					'data':{'activity_title':$ac_name},
					'dataType':'json',
					'success':function(data){
						//alert(data);
						$("#jxsz"+$ac_name).append(data[0]['description']);
						$("#jxsz"+$ac_name).next(".table").find(".jxsz").append(data[0]['data']);
					}
				})			
				$(this).closest("dl").find("dt").html(val);  			//将选中的奖项名称显示在第一位
				$(this).closest("dd").slideUp();          			   //其它奖项名称隐藏
			}else if($cycle_w == null || $cycle_w =="" ||$cycle_w=="~"){               //奖项周期为空，第二个下拉没有
				
				//第二个下拉设置
				$(this).closest("dl").next().find("dt").html("--");
				$(this).closest("dl").next().find("dd").html("");
				//第一个下拉赋值收起
				$val = $(this).html();
				$(this).closest("dl").find("dt").html($val);  			//将选中的奖项名称显示在第一位
				$(this).closest("dd").slideUp();            			 //其它奖项名称隐藏	
				//原奖项内容清空
				$(this).parents(".title").next().find(".description").html("");
				$(this).parents(".title").next().find(".table_thead").html("");
				$(this).parents(".title").next().find(".table_tbody").html("");
				$(this).parents(".title").next().find("colgroup").html("");
				$(this).parents(".title").next().find(".jxsz").html("");
				$(this).parents(".title").next().find(".jxsz_des").html("");
				$(this).parents(".title").next().find(".table_content").next().html("");
				//新奖项内容显示
				$.ajax({
					'url':'/winner/showContent',
					'type':'post',
					'data':{'id':$winner_id},
					'dataType':'json',
					'success':function(data){
						//alert(data[0]['description'])
						//动态控制表格列数
						$col = data[0]['col'];
						for($c=0;$c<$col;$c++){
							$("#"+$activity_title).find("colgroup").append("<col width='25%' />");
						}						
						//动态添加描述						
						$("#"+$activity_title).find(".description").html(data[0]['description']);  
						$winner_data = JSON.parse(data[0]['data']);   //取得json字符串						
						//动态添加表头
						$("#"+$activity_title).find(".table_content .table_thead").append("<tr>");
						for($j=$col;$j>0;$j--){
							$n = 'name_'+$j;						
							$("#"+$activity_title).find(".table_content .table_thead").append("<th>"+$winner_data[0][$n]+"</th>");
						}					
						$("#"+$activity_title).find(".table_content .table_thead").append("</tr>");
						//动态添加奖项表格
						for($i=1;$i<$winner_data.length;$i++){						
							$("#"+$activity_title).find(".table_content .table_tbody").append("<tr>	");
							for($j=$col;$j>0;$j--){
								$n = 'name_'+$j;
								$("#"+$activity_title).find(".table_content .table_tbody").append("<td>"+$winner_data[$i][$n]+"</td>");
							}
							$("#"+$activity_title).find(".table_content .table_tbody").append("</tr>	");
						}	
					}
				})
			}else{
				$.ajax({
					'url':'/winner/showFuquency',
					'type':'post',
					'data':{'activity_title':$activity_title,'title':val},
					'dataType':'json',
					'success':function(data){				
						//alert(data.length);					
						for($i=0;$i<data.length;$i++){	
							$("."+$activity_title).append("<a href='javascript:;' num='"+$i+"'>"+data[$i]['cycle_w']+"</a>");  //动态添加某个奖项的奖项周期											
						}
						$("."+$activity_title+" a").click(function(){      						 //点击奖项周期							
							$(this).parents(".title").next().find(".jxsz_content").html("");
							$(this).parents(".title").next().find(".table_thead").html("");
							$(this).parents(".title").next().find(".table_tbody").html("");
							$(this).parents(".title").next().find(".description").html("");
							$(this).parents(".title").next().find("colgroup").html("");
							$(this).parents(".title").next().find(".jxsz_des").html("");	
							$(this).parents(".title").next().find(".table_content").next().html("");
							$(this).parents(".title").next().find(".jxsz").html("");
							$num = $(this).attr("num");	
							//alert($num);
							$col = data[$num]['col'];  	    						//取得列数							
							//动态控制表格列数						
							for($c=0;$c<$col;$c++){
								$("#"+$activity_title).find("colgroup").append("<col width='25%' />");
							}							
							//显示描述
							$(this).parents(".title").next().find(".description").html(data[$num]['description']);  					
							$winner = data[$num]['data'];       					//取得获奖信息(json串)
							$winner = JSON.parse($winner);						
							//动态添加表头							
							$(this).parents(".title").next().find(".table_content .table_thead").append("<tr>");							
							for($j=$col;$j>0;$j--){
								$n = 'name_'+$j;			
								//alert($winner[0][$n]);
								$(this).parents(".title").next().find(".table_content .table_thead").append("<th>"+$winner[0][$n]+"</th>");
							}					
							$(this).parents(".title").next().find(".table_content .table_thead").append("</tr>");
							//动态添加奖项表格
							for($i=1;$i<$winner.length;$i++){						
								$(this).parents(".title").next().find(".table_content .table_tbody").append("<tr>	");
								for($j=$col;$j>0;$j--){
									$n = 'name_'+$j;
									$(this).parents(".title").next().find(".table_content .table_tbody").append("<td>"+$winner[$i][$n]+"</td>");
								}
								$(this).parents(".title").next().find(".table_content .table_tbody").append("</tr>	");
							}	
							$val = $(this).html();
							$(this).closest("dl").find("dt").html($val);  			//将选中的奖项名称显示在第一位
							$(this).closest("dd").slideUp();            			 //其它奖项名称隐藏						
						})
		
					},
				});	
				$(this).closest("dl").find("dt").html(val);  //将选中的奖项名称显示在第一位
				$(this).closest("dd").slideUp();             //其它奖项名称隐藏
			}			
			
		})
	})
});
$(function(){
	//load();
	//alert($(".tel_invite .title dd a:last").attr("ai"));//trigger("click");
	$(".bdyf").click(function(){  				 //每月榜单
		$my_content = $(this).attr('mycontent');
		$descripton = $(this).attr('ms');		
		$(this).parents(".title").next().find(".mybd_desc").html("");
		$(this).parents(".title").next().find("thead").html("");
		$(this).parents(".title").next().find("tbody").html("");
		
		$(this).parents(".title").next().find(".mybd_desc").html($descripton);		
		$content=JSON.parse($my_content);		
		//alert($content[0].name_4);
//		动态添加表头
		$head = $content[0];			
		$(this).parents(".title").next().find("thead").append("<tr>");		
		for($j=4;$j>0;$j--){			
			$(this).parents(".title").next().find("thead").append("<th>"+$content[0]['name_'+$j]+"</th>");
		}					
		$(this).parents(".title").next().find("thead").append("</tr>");
		
//		动态添加奖项表格
		for($i=1;$i<$content.length;$i++){						
			$(this).parents(".title").next().find("tbody").append("<tr>	");
			for($j=4;$j>0;$j--){				
				$(this).parents(".title").next().find("tbody").append("<td>"+$content[$i]['name_'+$j]+"</td>");
			}
			$(this).parents(".title").next().find("tbody").append("</tr>");
		}	
		
	})
	
	$(".update_sort").click(function(){		 //修改榜单排序
		if($(".update_sort").hasClass("sub_btn")){
			var sort_data = $(this).prev().children().val();
			var winner_id = $(this).prev().children().attr("wid");			
			if(isNaN(sort_data)){
				alert("请输入数字");
			}else{
				$.ajax({
					'url':'/win_list/updateSort',
					'type':'post',
					'data':{'winner_id':winner_id,'sort_data':sort_data},				
					'success':function(data){					
						if(data=='1'){
							alert("排序修改成功");						
						}else if(data=='0'){
							alert("排序数据无变化");
						}
					}
						
				})		
				$(this).siblings(".sort_data").html(sort_data);
				$(this).siblings(".sort_data").removeClass("show");			
				$(this).prev().addClass("show");
				$(this).children().attr("value","修改");
				$(this).removeClass("sub_btn");
			}
			
		}else{
			$(this).siblings(".sort_data").addClass("show");
			$(this).prev().removeClass("show");
			$(this).children().attr("value","提交");
			$(this).addClass("sub_btn");
		}
		
		
	})
	
	
})
	




