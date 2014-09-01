$(function(){
	//大区级联
	$("#bigClassify").change(function(){
		$("select[id='smallClassify'] option:gt(0)").remove();
		var pid=$(this).val();
		if(pid !=""){
			$.ajax({
				url:'/admin/find_address',
				type:"POST",
				dataType:"json",
				data:{"status1":"displaySmallClassify","pid":pid},
				success: function(msg){
					var select = $("select[id='smallClassify']");
					var option ="";
					$.each(msg,function(i,v){
						option+="<option value='"+v.id+"'>"+v.name+"</option>";
					});
					select.append(option);
				}
			});	
		}else{
			alert("请选择大区！");
		}
	});
	
	//省份级联
	$("#province").change(function(){
		$("select[id='city'] option:gt(0)").remove();
		var code=$(this).val();
		if(code !=""){
			$.ajax({
				url:'/admin/find_address',
				type:"POST",
				dataType:"json",
				data:{"status1":"displayCity","code":code},
				success: function(msg){
					var select = $("select[id='city']");
					var option ="";
					$.each(msg,function(i,v){
						option+="<option value='"+v.code+"'>"+v.name+"</option>";
					});
					select.append(option);
				}
			});	
		}else{
			alert("请选择省份！");
		}
	});
	
	//筛选
	$("#filter").click(function(){
		$(".keyword").val("");
		var bigClassify = $("select[id='bigClassify'] option:selected").html();
		var smallClassify = $("select[id='smallClassify'] option:selected").html();
		var province = $("select[id='province'] option:selected").html();
		var city = $("select[id='city'] option:selected").html();
		
		var created_at = $("select[id='created_at'] option:selected").val();
		var likes = $("select[id='likes'] option:selected").val();
		
		like=[];
		order=[];
		
		if(bigClassify!="--大区--"){
			like.push("u.bigclasstitle LIKE '%"+ bigClassify +"%'");
		}
		if(smallClassify !="--小区--"){
			like.push("u.smallclasstitle LIKE '%"+ smallClassify +"%'");
		}
		if(province !="--省份--"){
			like.push("u.province LIKE '%"+ province +"%'");
		}
		if(city !="--城市--"){
			like.push("u.city LIKE '%"+ city +"%'");
		}
		like=like.join(" AND ");
		
		//排序
		if(created_at !=""){
			order.push(created_at);
		}
		if(likes !=""){
			order.push(likes);
		}
		order= order.join(",");
		if(order !=""||like !=""){
			keyword="";
	    	userid="";
	    	
			currentPage = 1;
			//加载数据
			isLoading = false;
			$(".productList .column").empty();
			$(document).scrollTop(0);
			$(window).scroll();
			//alert(order);
			//alert(like);
		}else{
			alert("请选择筛选条件...");
		}
	
		
	});
	
	//搜索
	$(".searchwords").click(function(){
		$("select").each(function(){
		     this.options[0].selected = true; 
		});
		keyword = $(".keyword").val();
		if(keyword !=""){
			order ="";
	    	like ="";
	    	userid="";
	    	
			currentPage = 1;
			//加载数据
			isLoading = false;
			$(".productList .column").empty();
			$(document).scrollTop(0);
			$(window).scroll();
			 
		}else{
			alert("请输入您想要查找的关键词...");
		}
	});
	
	//查询获奖用户的作品
	$(".name").live('click',function(){
	     userid= $(this).attr("attr");
	     $("select").each(function(){
		     this.options[0].selected = true; 
		 });
	     $(".keyword").val("")
		if(userid !=""){
			keyword="";
			order ="";
	    	like ="";
	    	
			currentPage = 1;
			//加载数据
			isLoading = false;
			$(".productList .column").empty();
			$(document).scrollTop(0);
			$(window).scroll();
			 
		}
    });
	//5月12日mengyuan添加-begin  二级菜单
    $(".menuList .tape_race").hover(function(){    	
        $(this).find("ul").show();
    },function(){
        $(this).find("ul").hide();
    });
  //5月12日mengyuan添加-end
})