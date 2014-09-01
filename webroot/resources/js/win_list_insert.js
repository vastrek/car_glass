var table = '<tbody><tr>\
			      <td width="186" bgcolor="#EFEFEF" name="Num" edittype="TextBox">序号</td>\
			      <td width="152" bgcolor="#EFEFEF" name="ProductName" edittype="TextBox">得奖者姓名</td>\
			      <td width="103" bgcolor="#EFEFEF" name="Amount" edittype="TextBox">经销商</td>\
			      <td width="103" bgcolor="#EFEFEF" name="Price" edittype="TextBox">被评论数</td>\
			    </tr>\
			</tbody>' ;
$(function(){
	$.get("/win_list/insert?action=getallActivity",{},function(data){$("#win").append(data);})
	$("#win").change(function(){
		/*
		if(this.value=="电话邀约录音竞赛"){
			var option = '<option value="tel_sound">专区环节—最受欢迎录音</option>\
        				<option value="tel_review">专区环节—作品评论奖</option>\
        				<option value="tel_month">电话邀约月度冠亚季军 </option>\
        				<option value="tel_quarter">电话邀约季度冠亚季军 </option>\
        				<option value="user">自定义榜单类型</option>' ;
		}else if(this.value=="原创内容微博分享竞赛"){
			var option = '<option value="orl_works">专区环节—作品评论奖</option>\
        				<option value="orl_week">专区环节—原创内容周冠亚季军 </option>\
        				<option value="orl_month">专区环节—原创内容月度冠亚季军  </option>\
        				<option value="orl_quarter">专区环节—原创内容季度冠亚季军 </option>\
        				<option value="user">自定义榜单类型</option>' ;
		}
		*/
		if(this.value=="每月抽奖活动"){
			$("#win_type").html("").css("display","none");
			$("#time").html("");
			//var html = "表格列数：&nbsp;&nbsp;&nbsp;<input type=\"text\" value=\"0\" maxlength=\"2\" onblur=\"c();\" style=\"width: 20px;\"/><br/>" ;
			$("#made_table").html("");
			$("#win_week").html("");
			$("#tabProduct").html(table);
			$("#win_column").html("");
			//$("#win_column").html(html);
			c();
		}else if(this.value=="0"){
			$("#made_table").html("");
			$("#win_week").html("");
			$("#win_column").html("");
			$("#time").html("");
			$("#tabProduct").html(table);
			$("#win_type").html('<option value="0">请选择榜单类型</option>');
			return false;
		}else{
			$("#made_table").html("");
			$("#win_type").css("display","inline");
			$("#win_week").html("");
			$("#win_column").html("");
			$("#time").html("");
			$("#tabProduct").html(table);
			$.post("/win_list/insert?action=getWin_type",{activity:$("#win").val()},function(data){$("#win_type").html(data);}) ;
		}
	});
	$("#win_type").change(function(){
		$("#win_number").attr("value","0");
		var data  =$("#win_type").find("option:selected").attr("data");
		if(this.value=="0"){
			$("#made_table").html("");
			$("#win_column").html("");
			$("#win_week").html("");
			$("#time").html("");
			$("#tabProduct").html(table);
			return false;
		}
		if(this.value=="user"){
			var html = "表格列数：&nbsp;&nbsp;&nbsp;<input type=\"text\" value=\"0\" maxlength=\"2\" onblur=\"c();\" style=\"width: 20px;\"/><br/>" ;
			var html_time = '起始时间：&nbsp;&nbsp;&nbsp;<INPUT TYPE="text" id="start" NAME="hiredate" onclick=\'popUpCalendar(this, this, "yyyy-mm-dd")\' size="15" maxlength="15" readonly="true"><br/>结束时间：&nbsp;&nbsp;&nbsp;<INPUT TYPE="text" id="end" NAME="hiredate" onclick=\'popUpCalendar(this, this, "yyyy-mm-dd")\' size="15" maxlength="15" readonly="true">' ;
			$("#made_table").html("");
			$("#win_week").html("");
			$("#win_column").html(html);
			$("#time").html(html_time);
			$("#tabProduct").html(table);
		}else if(this.value=="quarter"||data=="month"){ //季度 月份
			$("#win_week").html("");
			$("#made_table").html('<input type="button" value="生成表格" onclick="b();"/><br/>');
			$("#win_column").html("");
			$("#time").html("");
			$("#tabProduct").html(table);
			//alert();
		}else{
			/*
			var week = ' <select id="week"> \
        				<option >请选择榜单周期</option>\
        				<option value="week_quarter">季周期</option>\
        				<option value="week_month">月周期</option>\
        				<option value="week_week">周周期</option>\
        				<option value="week_3">3天周期</option>\
        			  </select>';*/

			$.post("/win_list/insert?action=getWeek",{activity:$("#win").val(),win_type:$("#win_type").val(),data:data},function(week){
					$("#win_week").html(week);
			}) ;
			$("#tabProduct").html(table);
			$("#time").html("");

			//$("#win_week").html(week);
			$("#made_table").html('<input type="button" value="生成表格" onclick="b();"/><br/>');
			$("#win_column").html("");
		}
	});
})
function e(){
	$("#tabProduct").html(table);
}
function a(){
	$("#tabProduct").html(table);
	if($("#win_type").val()!="user"&&$("#win").val()!="每月抽奖活动"){return false;}

	var win_column = $("#win_column input").val();
	if(win_column ==undefined){
		 win_column = 4 ;
	}
	if(win_column==0){
		alert("请先选择列！");
		return false;
	}
	
	//$("#tabProduct").html(table);
	var tr = "" ;
	var td = '<td bgcolor="#FFFFFF">自定义</td>';
	while(win_column>0){
		tr += td ;
		win_column -- ;
	}
	tr  = "<tr>"+tr+"</tr>" ;
	var win_number = $("#win_number").val();
	if(win_number==0){
		return ;
	}
	var html ="" ;
	while(win_number>0){
		html += tr ;
		win_number -- ;
	}
	win_column = $("#win_column input").val();
	if(win_column ==undefined){
		 win_column = 4 ;
	}
	var table_head ="" ;
	//var table_head_td= ; 
	
	//alert(win_column);
	while(win_column>0){
		table_head += ('<td bgcolor="#EFEFEF" Name="name_'+win_column+'" EditType="TextBox">自定义表头</td>') ;
		win_column -- ;
	}	    
	$("#tabProduct").html("<tr>"+table_head+"</tr>"+html);


	var tabProduct = document.getElementById("tabProduct");
	EditTables(tabProduct);
}
function b(){
	var win_number = $("#win_number").val();
	if(win_number==0){
		alert("请选择获奖人数先")
		return ;
	}

	var win = $("#win").val(); //大活动
	var type = $("#win_type").val(); //几月份
	var type_data = $("#win_type").find("option:selected").attr("data"); //分赛类型
	var start = $("#week").find("option:selected").attr("start") ; //开始时间
	var end = $("#week").find("option:selected").attr("end") ; //结束时间
	var win_number = $("#win_number").val(); //获奖人数
	
	if(type_data=="month"||type_data=="quarter"){
		if(win==""||type==""||win_number==""){
			alert("请输入完整信息");
			return ;
		}else{
			$.post("/win_list/insert?action=getTable",{win:win,type:type,type_data:type_data,win_number:win_number},function(data){
				$("#tabProduct").html(data);
			});
		}
	}else if(type_data=="user"){
			alert("出错！");
			return ;
	
	}else{
		if(win==""||type==""||type_data==""||start==""||end==""||win_number==""){
			alert("请输入完整信息");
			return ;
		}else{
			$.post("/win_list/insert?action=getTable",{win:win,type:type,type_data:type_data,start:start,end:end,win_number:win_number},function(data){
				$("#tabProduct").html(data);
			});
		}
	}

	
	
}
function c(){
	$("#win_number").attr("value","0");
	var td= '<td bgcolor="#EFEFEF" Name="自定义表头" EditType="TextBox">自定义表头</td>'; 
	var win_column = $("#win_column input").val();
	if(win_column ==undefined){
		 win_column = 4 ;
	}
	//alert(win_column);
	if(isNaN(win_column)){
		$("#win_column input").attr("value","0");
		return ;
	}
	if(win_column<0){
		alert("不能输入负数！");
		$("#win_column input").attr("value","0");
		return ;
	}
	if(win_column==0){
		return ;
	}
	var html ="" ;
	while(win_column>0){
		html += td ;
		win_column -- ;
	}
	$("#tabProduct").html("<tr>"+html+"</tr>");
}
function d(){
	var data = GetTableData(document.getElementById('tabProduct')); //表格数据 Object
	data = JSON.stringify(data) ;
		
	/*
	$("#win_week").html(data);
	return ;
	*/
	var win = $("#win").val(); //总活动
	var win_type = $("#win_type").val(); //榜单类型  例如5月份或季度或自定义
	var win_type_data = $("#win_type").find("option:selected").attr("data"); //例如是 月 是 取评论是声音等
	var start = $("#week").find("option:selected").attr("start");
	var end = $("#week").find("option:selected").attr("end");
	
	var win_name = $("#win_name").val(); //表单名称
	var win_column = $("#win_column input").val(); //lie
	var win_number = $("#win_number").val(); //获奖人数
	var description = $("#description").val(); //描述

	var win_order = $("#win_order").val(); //排序


	var user_start = $("#start").val(); //自定义时的开始
	var user_end = $("#end").val(); //自定义时的开始

	var jsonobj=eval('('+data+')');  
	if (win=="0"||$.trim(win_name)==""||win_number=="0"||$.trim(description)=="")
	{
		alert("请填全表单再提交！");
		return ;
	}else{

		if(win_name.length>32){
			alert("榜单名称不能超过32个字符");
			return ;
		}
		if(description.length>200){
			alert("榜单描述不能超过200个字符！");
			return ;
		}

		if(win_type=="user"){
			if(win_column==""||win_column=="0"){
				alert("请填写列数！");
				return ;
			}
			if(user_start==""||user_end==""){
				alert("请填写时间段！");
				return ;
			}
			if(user_end<user_start){
				alert("结束时间不能大于起始时间！");
				return ;
			}
		}else if(win_type=="review"||data=="sound"){
			if(start==""){
				alert("请选择榜单周期！");
				return ;
			}
		}
		if(win_column==undefined){
			win_column=4;
		}
		if(data=="[]"){
			alert("表格没有数据，无法提交");
			return ;
		}
		if(jsonobj.length<=1){
		alert("表格内没有数据！");
		return ;
	}
		if(!CheckIfEnglish(win_name)){
			alert("榜单名称不能有特殊字符");
			return ;
		}
		$("#Submit3").attr("disabled","true").attr("value","正在提交...");
		$.post("/win_list/insert?action=isHave",{user_start:user_start,user_end:user_end,win:win,win_type:win_type,start:start,end:end,win_name:win_name,win_type_data:win_type_data},function(m){
			if(m=="y"){
				alert("该活动已存在！");
				$("#Submit3").removeAttr("disabled").attr("value","提交");
				return ;
			}else{
				$.post("/win_list/insert?action=submit",{user_start:user_start,user_end:user_end,win:win,win_type:win_type,win_type_data:win_type_data,win_column:win_column,start:start,end:end,win_name:win_name,win_number:win_number,description:description,win_order:win_order,data:data},function(msg){
				if(msg=="y"){
					alert("提交成功！");
					$("#Submit3").removeAttr("disabled").attr("value","提交");
					window.location="/win_list" ;
					
				}else{
					alert("提交榜单失败！");
					$("#Submit3").removeAttr("disabled").attr("value","提交");
				
				}
			});
			
			}
		});
	}



}
function CheckIfEnglish( String )
{
    var Letters = "(!@#$%^&*;':";
    var i;
    var c;
    if(String.charAt( 0 )=='-')
	return false;
      if( String.charAt( String.length - 1 ) == '-' )
          return false;
		for( i = 0; i < String.length; i ++ ){
            c = String.charAt( i );
			if (Letters.indexOf( c ) > 0)
			return false;       
		}
		return true;
}