// 活动
$(function(){
	$(".btn_save").click(function(){  //添加活动按钮
		//接收数据
		$title = $(".title").val();	
		$sub_title = $(".sub_title").val();	
		$start_time = $(".start_time").val();
		$end_time = $(".end_time").val();
		$type=$(".bak_type").val();	
		$privilege = $(".privilege").val();
		$frequency = $(".frequency").val();		
		$originator = $(".originator").val();
		//数据验证	
		$reg = /^[1-9]+[0-9]*]*$/;  //正整数
		$title = $.trim($title);
		var reg_uname  = new RegExp(/^[\u4E00-\u9FA5\w\d]+$/);  // 文字，字母、数字、下划线
		if($title==null||$title==""){
			$.Showmsg("标题不能为空") ;
			return ;
		}else if($title.length>16){
			$.Showmsg("标题长度不能大于16") ;
			return ;
		}else if(!reg_uname.test($title)){
			$.Showmsg("标题只能输入文字、字母、数字、下划线") ;
			return ;
		}
		
		if($sub_title==null||$sub_title==""){
			$.Showmsg("副标题不能为空") ;
			return ;
		}else if($sub_title.length>16){
			$.Showmsg("副标题长度不能大于16") ;
			return ;
		}else if(!reg_uname.test($sub_title)){
			$.Showmsg("副标题只能输入文字、字母、数字、下划线") ;
			return ;
		}
		if($.trim($start_time)==null||$.trim($start_time)==""){
			$.Showmsg("活动开始时间不能为空") ;
			return ;
		}
		if($.trim($end_time)==null||$.trim($end_time)==""){
			$.Showmsg("活动结束时间不能为空") ;
			return ;
		}
		if($start_time>$end_time){
			$.Showmsg("活动开始时间必须早于活动结束时间");
			return;
		}
		
		if($type=="0"){
			$.Showmsg("请选择活动类型") ;
			return;
		}	
		
		if($privilege=='0'){
			$.Showmsg("请选择可参与的人员") ;
			return;
		}

		if(isNaN($frequency)||!$reg.test($frequency)){
			$.Showmsg("导出频率请输入正整数");
			return;
		}else if(!isNaN($frequency)){
			for(var i=0;i<$start_time.length;i++){
				$start_time = $start_time.replace("-",'/');
				$end_time = $end_time.replace("-",'/');
			}
			var time1 = new Date($end_time);
			var tiem2 = new Date($start_time);
			var days = (time1.getTime()-tiem2.getTime())/1000/60/60/24;//相差天数
			//alert(days);
			if(days<$frequency){
				$.Showmsg("数据导出频率不能超出活动时间");
				return ;
			}
		}
				
		var content = CKEDITOR.instances.content.getData() ; 
		var content_val = removeHTMLTag(content);		
		//var strlen = len(content_val);		
		if(content_val==null||content_val==""){
			$.Showmsg("活动描述不能为空") ;
			return ;
		}else if(content_val.length>400){
			$.Showmsg("活动描述文字不能超过400个") ;
			return;
		}
		//var jxsz = CKEDITOR.instances.jxsz.getData() ; 
		//var jxsz_des = CKEDITOR.instances.jxszdes.getData() ; 
		
	
		$.ajax({
			url:"/activity_back/save/add",
			type:"post",
			data:{'title':$title,'sub_title':$sub_title,'start_time':$start_time,'end_time':$end_time,'type':$type,'content':content,'export_fre':$frequency,'privilege':$privilege,'originator':$originator},
			success:function(data){	
				//alert(data)
				if(data=='1'){
					alert('添加成功' );
					window.location.href="/activity_back/all";				
				}else if(data=='no'){
					alert('请不要刷新本页面或重复提交表单');
				}else{
					alert('添加失败');
					window.location.href="/activity_back/save";	
				}
			}
		})
	})
	
  
	
	function len(s) { 
		//alert(s);
		var l = 0; 
		var a = s.split(""); 
		for (var i=0;i<a.length;i++) { 
			if (a[i].charCodeAt(0)<299) { 
			l++; 
			} else { 
			l+=2; 
			} 
		} 
		return l;
	}
	
	function removeHTMLTag(str) {   //获取纯文本
	   str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag		   
	   //str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白	
	   str=str.replace(/[\r\n]/g,'');//去掉回车换行
	   str=str.replace(/^\n+|\n+$/g,'');//去掉首尾的换行符
	   str = str.replace(/\n[\s| | ]*\r/g,''); //去除多余空行		   	
	   str=str.replace(/^[\s　]+|[\s　]+$/g, '');//去掉全角半角空格	 
	   str=str.replace(/&quot;/g,'');	  
	   str = $.trim(str) ; 
	   str=str.replace(/&nbsp;/g,'');//去掉&nbsp;
	   str=str.replace(/\ +/g,'');//去掉空格;
	    return str;

	}	
   
	$(".btn_update").click(function(){  //保存修改
		$activity_id = $(".activity_id").val();
		$title = $(".title").val();				
		$sub_title = $(".sub_title").val();		
		$start_time = $(".start_time").val();
		$end_time = $(".end_time").val();
		$type=$(".bak_type").val();	
		$privilege = $(".privilege").val();
		$frequency = $(".frequency").val();
		$originator = $(".originator").val();
		//数据验证
		$reg = /^[1-9]+[0-9]*]*$/;  //正整数
		$title = $.trim($title);
		var reg_uname  = new RegExp(/^[\u4E00-\u9FA5\w\d]+$/);  // 文字，字母、数字、下划线
		if($title==null||$title==""){
			$.Showmsg("标题不能为空") ;
			return ;
		}else if($title.length>16){
			$.Showmsg("标题长度不能大于16") ;
			return ;
		}else if(!reg_uname.test($title)){
			$.Showmsg("标题只能输入文字、字母、数字、下划线") ;
			return ;
		}
		
		if($sub_title==null||$sub_title==""){
			$.Showmsg("副标题不能为空") ;
			return ;
		}else if($sub_title.length>16){
			$.Showmsg("副标题长度不能大于16") ;
			return ;
		}else if(!reg_uname.test($sub_title)){
			$.Showmsg("副标题只能输入文字、字母、数字、下划线") ;
			return ;
		}
		if($.trim($start_time)==null||$.trim($start_time)==""){
			$.Showmsg("活动开始时间不能为空") ;
			return ;
		}
		if($.trim($end_time)==null||$.trim($end_time)==""){
			$.Showmsg("活动结束时间不能为空") ;
			return ;
		}
		if($start_time>$end_time){
			$.Showmsg("活动开始时间必须早于活动结束时间");
			return;
		}
		if($type=="0"){
			$.Showmsg("请选择活动类型") ;
			return;
		}	
		if($privilege=='0'){
			$.Showmsg("请选择可参与的人员") ;
			return;
		}	
		
		if(isNaN($frequency)||!$reg.test($frequency)){
			$.Showmsg("导出频率请输入正整数");
			return;
		}else if(!isNaN($frequency)){
			for(var i=0;i<$start_time.length;i++){
				$start_time = $start_time.replace("-",'/');
				$end_time = $end_time.replace("-",'/');
			}
			var time1 = new Date($end_time);
			var tiem2 = new Date($start_time);
			var days = (time1.getTime()-tiem2.getTime())/1000/60/60/24;//相差天数
			//alert(days);
			if(days<$frequency){
				$.Showmsg("数据导出频率不能超出活动时间");
				return ;
			}
		}	
		var content = CKEDITOR.instances.content.getData() ; 
		var content_val = removeHTMLTag(content);
		var strlen = len(content_val);
		if(content_val==null||content_val==""){
			$.Showmsg("活动描述不能为空") ;
			return ;
		}else if(content_val.length>400){
			$.Showmsg("活动描述文字不能超过400个") ;
			return;
		}	
		//var jxsz = CKEDITOR.instances.jxsz.getData() ; 		
		//var jxsz_des = CKEDITOR.instances.jxszdes.getData() ; 
		//alert(jxsz_des)
		//var jxsz_des_val = removeHTMLTag(jxsz_des);	
		
		$.ajax({
			url:"/activity_back/save/update",
			type:"post",
			data:{'title':$title,'sub_title':$sub_title,'start_time':$start_time,'end_time':$end_time,'type':$type,'content':content,'activity_id':$activity_id,'privilege':$privilege,'export_fre':$frequency,'originator':$originator},
			success:function(data){				
				if(data=='1'){
					alert('修改成功');
					window.location.href="/activity_back/all";				
				}else if(data=='no'){
					alert('请不要刷新本页面或重复提交表单');
				}else{
					alert('修改失败');
					window.location.href="/activity_back/save";	
				}
			}
		})
	})
	
	$(".start").click(function(){   //按活动开始时间排序 
		$type = $(".choice_type").val();
		$value = $(this).val();
		if($value=="升序"){
			$sort = " start_time ASC";			
		}else if($value=="降序"){
			$sort = " start_time DESC";			
		}
		window.location.href="/activity_back/all?sort="+$sort+"&type="+$type;
	})
	$(".end").click(function(){   //按活动线束时间排序 
		$type = $(".choice_type").val();
		$value = $(this).val();
		if($value=="升序"){
			$sort = " end_time ASC";			
		}else if($value=="降序"){
			$sort = " end_time DESC";			
		}
		window.location.href="/activity_back/all?sort="+$sort+"&type="+$type;
	})
	$(".create").click(function(){   //按活动创建时间排序 
		$type = $(".choice_type").val();
		$value = $(this).val();
		if($value=="升序"){
			$sort = " created_at ASC";			
		}else if($value=="降序"){
			$sort = " created_at DESC";			
		}
		window.location.href="/activity_back/all?sort="+$sort+"&type="+$type;
	})
	$(".choice_type").change(function(){ //按类型筛选
		$type=$(this).val();
		window.location.href="/activity_back/all?type="+$type;
	})
	

});


