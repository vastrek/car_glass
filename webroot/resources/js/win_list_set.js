
$(function(){
	var editor = CKEDITOR.replace('jxszdes', { 
		language:'zh-cn',//简体中文 
		resize_enabled: false,
		toolbar ://工具栏设置 
		[ 
			['Source'], 
			['Bold','Italic','Underline'],			
			['Table'],
		]
	}); 

	$.post("/win_list/insert?action=getallActivity",{"meiri":"1"},function(data){$("#win").append(data);})
	$("#win").change(function(){
		$.post("/win_list/set?action=getContent",{activity:$("#win").val()},function(data){
			//console.log(data);return;
			if(data=="y"){
				$("#insert").attr("value","y");
				$("#description").attr("value","");
				CKEDITOR.instances.jxszdes.setData("");
			}else{
				$("#insert").attr("value","n");
			
				var content = eval('('+data+')');
				$("#description").attr("value",content.description);
				//alert(content.data);
				//CKEDITOR.instances.jxszdes.setData(content.data);
				editor.setData(content.data);
			}
		}) ;
	});
})

function d(){
	var data  = CKEDITOR.instances.jxszdes.getData() ; 
	/*
	alert(data);
	return ;
	*/
	var win = $("#win").val(); //总活动
	var description = $("#description").val(); 
	var insert = $("#insert").val(); 
	
 
	if (win=="0"||$.trim(description)=="")
	{
		alert("请填全表单再提交！");
		return ;
	}else{
		if(description.length>200){
			alert("奖项描述不能超过200个字符！");
			return ;
		}
		if(data==""){
			alert("表格没有数据，无法提交");
			return ;
		}
		$("#Submit3").attr("disabled","true").attr("value","正在提交...");
		//alert(data);return;
		$.post("/win_list/set?action=submit",{win:win,description:description,insert:insert,data:data},function(msg){
			if(msg=="y"){
				alert("提交成功！");
				//window.location="/win_list" ;
				$("#insert").attr("value","n");
				$("#Submit3").removeAttr("disabled").attr("value","提交");
			}else{
					alert("提交失败！");
				$("#Submit3").removeAttr("disabled").attr("value","提交");
			
			}
		});
		
	}

}
