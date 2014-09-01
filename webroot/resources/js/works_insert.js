$(function(){
	if(type=="image"){
		
		$("#uploadify").uploadify({
				'swf'                : '/resources/swf/uploadify.swf',
				'uploader'           : '/works/upload',
				'cancelImg'          : '/resources/images/cancel.png',
				'quenID'             : false,
				'auto'               : true,
				'width'			     : 45,
				'height'		     : 27,	
				'buttonText'         : '上传',
				'debug'              : false,
				'buttonClass'        : 'btn btn_upload',
				'multi'              : false,
				'fileSizeLimit'      : '2MB' ,
				'queueSizeLimit'     : '1',
				'fileTypeExts'       : '*.jpg;*.gif;*.png',
 				'fileTypeDesc'       : 'Web Image Files (.JPG, .GIF, .PNG)',
 				'overrideEvents'     : ['onDialogClose'],
 				'onFallback'         : function(){    //检测FLASH失败调用    
					 					alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");    
                  					   },
                'onSelectError'      : function(file, errorCode, errorMsg){
							               switch(errorCode) {    
							                    case -100:    
							                        alert("上传的文件数量已经超出系统限制的"+$('#uploadify').uploadify('settings','queueSizeLimit')+"个文件！");    
							                        break;    
							                    case -110:    
							                        alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadify').uploadify('settings','fileSizeLimit')+"大小！");    
							                        break;    
							                    case -120:    
							                        alert("文件 ["+file.name+"] 大小异常！");    
							                        break;    
							                    case -130:    
							                        alert("文件 ["+file.name+"] 类型不正确！");    
							                        break;    
							                } 
                						},
 				'onInit'             : function(){
 										$("#uploadify-queue").hide();
 									   },
 				'onUploadError'      : function(file, errorCode, errorMsg) {
 									   },
			    'onUploadSuccess'	 : function (file, data, response) {
											var data=$.evalJSON(data);
											if(data.error !=0&&response){
												$("#loading_works").hide();
												alert("作品上传失败!");
											}else{
												$("#loading_works").hide();
												alert("上传成功");
												$("#works").val(data.url);
												$("#img").val(data.url);
												$("#works_name").val(data.name);
											}
								       },
			    'onUploadProgress'    : function(file, fileBytesLoaded, fileTotalBytes){
			    	$("#loading_works").show();
			    }
				
		});
		
	}else if(type=="voice"){
	
			$("#uploadify").uploadify({
				'swf'                : '/resources/swf/uploadify.swf',
				'uploader'           : '/works/upload',
				'cancelImg'          : '/resources/images/cancel.png',
				'quenID'             : false,
				'auto'               : true,
				'width'			     : 45,
				'height'		     : 27,	
				'buttonText'         : '上传',
				'debug'              : false,
				'buttonClass'        : 'btn btn_upload',
				'multi'              : false,
				'fileSizeLimit'      : '20MB' ,
				'queueSizeLimit'     : '1',
				'fileTypeExts'       : '*.mp3',
				'fileTypeDesc'       : 'Web Vioce Files (.MP3)',
				'overrideEvents'     : ['onDialogClose'],
				'onFallback'         : function(){    //检测FLASH失败调用    
											alert("您未安装FLASH控件，无法上传语音！请安装FLASH控件后再试。");    
                  					   },
                'onSelectError'      : function(file, errorCode, errorMsg){
							               switch(errorCode) {    
							                    case -100:    
							                        alert("上传的文件数量已经超出系统限制的"+$('#uploadify').uploadify('settings','queueSizeLimit')+"个文件！");    
							                        break;    
							                    case -110:    
							                        alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadify').uploadify('settings','fileSizeLimit')+"大小！");    
							                        break;    
							                    case -120:    
							                        alert("文件 ["+file.name+"] 大小异常！");    
							                        break;    
							                    case -130:    
							                        alert("文件 ["+file.name+"] 类型不正确！");    
							                        break;    
							                } 
              						    },
			    'onInit'             : function(){
										 $("#uploadify-queue").hide();
									   },
				'onUploadError'      : function(file, errorCode, errorMsg) {
									   },
			    'onUploadSuccess'	 : function (file, data, response) {
											var data=$.evalJSON(data);
											if(data.error !=0&&response){
												$("#loading_works").hide();
												alert("作品上传失败!");
											}else{
												$("#loading_works").hide();
												alert("上传成功");
												$("#works").val(data.url);
												$("#works_name").val(data.name);
											}
								       },
		       'onUploadProgress'    : function(file, fileBytesLoaded, fileTotalBytes){
			    							$("#loading_works").show();
			    					   }
		});
	}else if(type=="video"){
	
			$("#uploadify").uploadify({
				'swf'                : '/resources/swf/uploadify.swf',
				'uploader'           : '/works/upload',
				'cancelImg'          : '/resources/images/cancel.png',
				'quenID'             : false,
				'auto'               : true,
				'width'			     : 45,
				'height'		     : 27,	
				'buttonText'         : '上传',
				'debug'              : false,
				'buttonClass'        : 'btn btn_upload',
				'multi'              : false,
				'fileSizeLimit'      : '20MB' ,
				'queueSizeLimit'     : '1',
				'fileTypeExts'       : '*.flv;*.mp4',
				'fileTypeDesc'       : 'Web Vioce Files (.FLV,.MP4)',
				'overrideEvents'     : ['onDialogClose'],
		        'onFallback'         : function(){    //检测FLASH失败调用    
		            					 alert("您未安装FLASH控件，无法上传视频！请安装FLASH控件后再试。");    
		                              },
		        'onSelectError'      : function(file, errorCode, errorMsg){
							               switch(errorCode) {    
							                    case -100:    
							                        alert("上传的文件数量已经超出系统限制的"+$('#uploadify').uploadify('settings','queueSizeLimit')+"个文件！");    
							                        break;    
							                    case -110:    
							                        alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadify').uploadify('settings','fileSizeLimit')+"大小！");    
							                        break;    
							                    case -120:    
							                        alert("文件 ["+file.name+"] 大小异常！");    
							                        break;    
							                    case -130:    
							                        alert("文件 ["+file.name+"] 类型不正确！");    
							                        break;    
							                } 
             						    },
			    'onInit'             : function(){
										 $("#uploadify-queue").hide();
									   },
				'onUploadError'      : function(file, errorCode, errorMsg) {
									   },
			    'onUploadSuccess'	 : function (file, data, response) {
											var data=$.evalJSON(data);
											if(data.error !=0&&response){
												$("#loading_works").hide();
												alert("作品上传失败!");
											}else{
												$("#loading_works").hide();
												alert("上传成功");
												$("#works").val(data.url);
												$("#works_name").val(data.name);
											}
								       },
		       'onUploadProgress'    : function(file, fileBytesLoaded, fileTotalBytes){
			    							$("#loading_works").show();
			    					   }
		});
	}
	if(type=="video"||type=="voice"){
	
			$("#uploadify_back").uploadify({
				'swf'                : '/resources/swf/uploadify.swf',
				'uploader'           : '/works/upload',
				'cancelImg'          : '/resources/images/cancel.png',
				'quenID'             : false,
				'auto'               : true,
				'width'			     : 45,
				'height'		     : 27,	
				'buttonText'         : '上传',
				'debug'              : false,
				'buttonClass'        : 'btn btn_upload',
				'multi'              : false,
				'fileSizeLimit'      : '2MB' ,
				'queueSizeLimit'     : '1',
				'fileTypeExts'       : '*.jpg;*.gif;*.png',
 				'fileTypeDesc'       : 'Web Image Files (.JPG, .GIF, .PNG)',
				'overrideEvents'     : ['onDialogClose'],
				'onFallback'         : function(){    //检测FLASH失败调用    
					 						alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");    
                                       },
                'onSelectError'      : function(file, errorCode, errorMsg){
							               switch(errorCode) {    
							                    case -100:    
							                        alert("上传的文件数量已经超出系统限制的"+$('#uploadify_back').uploadify('settings','queueSizeLimit')+"个文件！");    
							                        break;    
							                    case -110:    
							                        alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadify_back').uploadify('settings','fileSizeLimit')+"大小！");    
							                        break;    
							                    case -120:    
							                        alert("文件 ["+file.name+"] 大小异常！");    
							                        break;    
							                    case -130:    
							                        alert("文件 ["+file.name+"] 类型不正确！");    
							                        break;    
							                } 
              						    },
			    'onInit'             : function(){
										 $("#uploadify_back-queue").hide();
									   },
				'onUploadError'      : function(file, errorCode, errorMsg) {
									   },
			    'onUploadSuccess'	 : function (file, data, response) {
											var data=$.evalJSON(data);
											if(data.error !=0&&response){
												$("#loading_back").hide();
												alert("封面上传失败!");
											}else{
												alert("上传成功");
												$("#loading_back").hide();
												$("#img").val(data.url);
											}
								       },
		       'onUploadProgress'    : function(file, fileBytesLoaded, fileTotalBytes){
		    	   							$("#loading_back").show();
			   						   }
		});
	}
	
	$(".swfupload").each(function(i,v){
		$(this).attr("width","71");
		$(this).attr("height","37");
	});
	
	//加载编辑器
	if(type=="text"||type=="mix"){
		KindEditor.ready(function(K) {
				editor	= K.create('textarea[name="maincontext"]', {
						cssPath : '/resources/kindeditor-4.1.7/plugins/code/prettify.css',
						uploadJson : '/resources/kindeditor-4.1.7/php/upload_json.php',
						fileManagerJson : '/resources/kindeditor-4.1.7/php/file_manager_json.php',
						allowFileManager : true,
						items:[  'source', '|', 'undo', 'redo', '|', 'preview','cut', 'copy', 'paste',
    							 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                                 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                                 'superscript', 'clearhtml', 'quickformat', 'selectall', '|' ,
                                 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                                 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
                                 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
                                 'anchor', 'link', 'unlink'],
						afterCreate : function() {
							var self = this;
							K.ctrl(document, 13, function() {
								self.sync();
								K('form[name=example]')[0].submit();
							});
							K.ctrl(self.edit.doc, 13, function() {
								self.sync();
								K('form[name=example]')[0].submit();
							});
						}
					});
					prettyPrint();
		})
	}
	//作品提交
	 $("#works_submit").click(function(){		
		 works_submit_flag =true;
		 var content="";
		 var works = $("#works").val();
		 var user_id = $("#user_id").val();
		 var description = $("#description").val();
		 var name=$("#works_name").val();
		 var activity_id=$("#activity_id").val();
		 var works_type=$("#works_type").val();
		 var img=$("#img").val();	
		 var content_editor ="";
		 if(typeof editor!="undefined"&&type=="text"||type=="mix"){
			 content =editor.text();
			 content_editor = editor.html();
			 if(content==""){
				 alert("文案内容不能为空!");
				 return;
			 }
			
		 }
		 if(type=="voice"||type=="image"||type=="video"){
			 if(works==""){
				 alert("作品不能为空!");
				 return ;
			 }
			 /*if(img==""){
				 alert("封面不能为空!");
				 return ;
			 }*/
			 
		 }
		 if(user_id==""){
			 alert("用户id不能为空!");
			 return;
		 }
		 
		 if(description==""){
			 alert("描述不能为空!");
			 return;
		 }
		 
		 if(description !=""){
			 if(len(description) > 200){
				 alert("作品描述只能是100汉字!");
				 return;
			 }
		 }
		 /*
		 if(content !=""){			 
			 if(len(content) > 4000){
				 alert("文案只能是2000汉字!");
				 return;
			 }
		 }
		 */
		 var flag = true;
		 if(user_id!=""){
			 $.ajax({    
					type:'post',
					url:'/works/findByUserId',
					dataType:"json",
					async : false,
					data:{"user_id":user_id,"activity_id":activity_id},
					success:function(data){
						/*if(data['msg'] ==1){
							alert("该用户已经上传过作品!");
							flag = false;
						}*/
						if(data['msg'] ==1){
							alert("用户不存在或用户信息没有完善!");
							flag = false;
						}
					},
					error:function(){
						//alert("保存失败");
					}

		     }); 
		 }
		
		 if(flag){
			 $("#works_submit").unbind("click");
			 $.ajax({    
					type:'post',
					url:'/works/insert',
					dataType:"json",
					async : false,
					data:{"works":works,"user_id":user_id,"description":description,"name":name,"activity_id":activity_id,"works_type":works_type,"img":img,"content":content_editor},
					success:function(data){
						if(data['msg'] !=0){
							alert("添加成功");
							window.location="/works/findAll?id="+activity_id+"&type="+type;
						}
					},
					error:function(){
						//alert("保存失败");
					}
	
		     });
		 }
	 });
})
function len(s) { 
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

