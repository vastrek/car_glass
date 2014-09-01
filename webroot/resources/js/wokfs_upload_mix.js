$(function(){
		$("#uploadify_video").uploadify({
			'swf'                : '/resources/swf/uploadify.swf',
			'uploader'           : '/works/upload',
			'cancelImg'          : '/resources/images/cancel.png',
			'quenID'             : false,
			'auto'               : true,
			'width'			     : 45,
			'height'		     : 27,	
			'buttonText'         : '选择文件',
			'debug'              : false,
			'buttonClass'        : 'btn_a',
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
						                        alert("上传的文件数量已经超出系统限制的"+$('#uploadify_video').uploadify('settings','queueSizeLimit')+"个文件！");    
						                        break;    
						                    case -110:    
						                        alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadify_video').uploadify('settings','fileSizeLimit')+"大小！");    
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
									 $("#uploadify_video-queue").hide();
								   },
			'onUploadError'      : function(file, errorCode, errorMsg) {
								   },
		    'onUploadSuccess'	 : function (file, data, response) {
										var data=$.evalJSON(data);
										if(data.error !=0&&response){
											$(".loading_works").eq(index).hide();
											alert("作品上传失败!");
										}else{
											$(".loading_works").eq(index).hide();
											alert("上传成功");
											works=data.url;
											name=data.name;
										}
							       },
	       'onUploadProgress'    : function(file, fileBytesLoaded, fileTotalBytes){
	    	   								$(".loading_works").eq(index).show();
		    					   }
	   });
	
		$("#uploadify_voice").uploadify({
			'swf'                : '/resources/swf/uploadify.swf',
			'uploader'           : '/works/upload',
			'cancelImg'          : '/resources/images/cancel.png',
			'quenID'             : false,
			'auto'               : true,
			'width'			     : 45,
			'height'		     : 27,	
			'buttonText'         : '选择文件',
			'debug'              : false,
			'buttonClass'        : 'btn_a',
			'multi'              : false,
			'fileSizeLimit'      : '20MB' ,
			'queueSizeLimit'     : '1',
			'fileTypeExts'       : '*.mp3',
			'fileTypeDesc'       : 'Web Vioce Files (.MP3)',
			'overrideEvents'     : ['onDialogClose'],
	        'onFallback'         : function(){    //检测FLASH失败调用    
	            					 alert("您未安装FLASH控件，无法上传视频！请安装FLASH控件后再试。");    
	                              },
	        'onSelectError'      : function(file, errorCode, errorMsg){
						               switch(errorCode) {    
						                    case -100:    
						                        alert("上传的文件数量已经超出系统限制的"+$('#uploadify_voice').uploadify('settings','queueSizeLimit')+"个文件！");    
						                        break;    
						                    case -110:    
						                        alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadify_voice').uploadify('settings','fileSizeLimit')+"大小！");    
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
									 $("#uploadify_voice-queue").hide();
								   },
			'onUploadError'      : function(file, errorCode, errorMsg) {
								   },
		    'onUploadSuccess'	 : function (file, data, response) {
										var data=$.evalJSON(data);
										if(data.error !=0&&response){
											$(".loading_works").eq(index).hide();
											alert("作品上传失败!");
										}else{
											$(".loading_works").eq(index).hide();
											alert("上传成功");
											works=data.url;
											name=data.name;
										}
							       },
	       'onUploadProgress'    : function(file, fileBytesLoaded, fileTotalBytes){
	    	   							$(".loading_works").eq(index).show();
		    					   }
	   });
	
		$("#uploadify_image").uploadify({
			'swf'                : '/resources/swf/uploadify.swf',
			'uploader'           : '/works/upload',
			'cancelImg'          : '/resources/images/cancel.png',
			'quenID'             : false,
			'auto'               : true,
			'width'			     : 45,
			'height'		     : 27,	
			'buttonText'         : '选择文件',
			'debug'              : false,
			'buttonClass'        : 'btn_a',
			'multi'              : false,
			'fileSizeLimit'      : '2MB' ,
			'queueSizeLimit'     : '1',
			'fileTypeExts'       : '*.jpg;*.gif;*.png',
		    'fileTypeDesc'       : 'Web Image Files (.JPG, .GIF, .PNG)',
			'overrideEvents'     : ['onDialogClose'],
	        'onFallback'         : function(){    //检测FLASH失败调用    
	            					 alert("您未安装FLASH控件，无法上传视频！请安装FLASH控件后再试。");    
	                              },
	        'onSelectError'      : function(file, errorCode, errorMsg){
						               switch(errorCode) {    
						                    case -100:    
						                        alert("上传的文件数量已经超出系统限制的"+$('#uploadify_image').uploadify('settings','queueSizeLimit')+"个文件！");    
						                        break;    
						                    case -110:    
						                        alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadify_image').uploadify('settings','fileSizeLimit')+"大小！");    
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
									 $("#uploadify_image-queue").hide();
								   },
			'onUploadError'      : function(file, errorCode, errorMsg) {
								   },
		    'onUploadSuccess'	 : function (file, data, response) {
										var data=$.evalJSON(data);
										if(data.error !=0&&response){
											$(".loading_works").eq(index).hide();
											alert("作品上传失败!");
										}else{
											$(".loading_works").eq(index).hide();
											alert("上传成功");
											works=data.url;
											name=data.name;
											img=data.url;
											$(".xzwj>img").eq(index).attr("src",img);
										}
							       },
	       'onUploadProgress'    : function(file, fileBytesLoaded, fileTotalBytes){
		    							$(".loading_works").eq(index).show();
		    					   }
	});
		
	$("#uploadify_video_back").uploadify({
		'swf'                : '/resources/swf/uploadify.swf',
		'uploader'           : '/works/upload',
		'cancelImg'          : '/resources/images/cancel.png',
		'quenID'             : false,
		'auto'               : true,
		'width'			     : 45,
		'height'		     : 27,	
		'buttonText'         : '封面上传',
		'debug'              : false,
		'buttonClass'        : 'btn_a',
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
					                        alert("上传的文件数量已经超出系统限制的"+$('#uploadify_video_back').uploadify('settings','queueSizeLimit')+"个文件！");    
					                        break;    
					                    case -110:    
					                        alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadify_video_back').uploadify('settings','fileSizeLimit')+"大小！");    
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
								 $("#uploadify_video_back-queue").hide();
							   },
		'onUploadError'      : function(file, errorCode, errorMsg) {
							   },
	    'onUploadSuccess'	 : function (file, data, response) {
									var data=$.evalJSON(data);
									if(data.error !=0&&response){
										$(".loading_back").eq(index).hide();
										alert("封面上传失败!");
									}else{
										alert("上传成功");
										$(".loading_back").eq(index).hide();
										img=data.url;
										$(".xzwj>img").eq(0).attr("src",img);
									}
						       },
	   'onUploadProgress'    : function(file, fileBytesLoaded, fileTotalBytes){
		   								$(".loading_back").eq(index).show();
	   						   }
	});
	
	$("#uploadify_voice_back").uploadify({
		'swf'                : '/resources/swf/uploadify.swf',
		'uploader'           : '/works/upload',
		'cancelImg'          : '/resources/images/cancel.png',
		'quenID'             : false,
		'auto'               : true,
		'width'			     : 45,
		'height'		     : 27,	
		'buttonText'         : '封面上传',
		'debug'              : false,
		'buttonClass'        : 'btn_a',
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
					                        alert("上传的文件数量已经超出系统限制的"+$('#uploadify_voice_back').uploadify('settings','queueSizeLimit')+"个文件！");    
					                        break;    
					                    case -110:    
					                        alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadify_voice_back').uploadify('settings','fileSizeLimit')+"大小！");    
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
								 $("#uploadify_voice_back-queue").hide();
							   },
		'onUploadError'      : function(file, errorCode, errorMsg) {
							   },
	    'onUploadSuccess'	 : function (file, data, response) {
									var data=$.evalJSON(data);
									if(data.error !=0&&response){
										$(".loading_back").eq(index).hide();
										alert("封面上传失败!");
									}else{
										alert("上传成功");
										$(".loading_back").eq(index).hide();
										img=data.url;
										$(".xzwj>img").eq(index).attr("src",img);
									}
						       },
	   'onUploadProgress'    : function(file, fileBytesLoaded, fileTotalBytes){
		   							$(".loading_back").eq(index).show();
	   						   }
	});
});
KindEditor.ready(function(K) {
	editor	= K.create('textarea[name="maincontext"]', {
			cssPath : '/resources/kindeditor-4.1.7/plugins/code/prettify.css',
			uploadJson : '/resources/kindeditor-4.1.7/php/upload_json.php',
			fileManagerJson : '/resources/kindeditor-4.1.7/php/file_manager_json.php',
			width : '640px',
			height: '448px',
			minWidth : '640px',
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
			},
			afterFocus : function(){
				//alert(editor.text());
				if(editor.text()=="请输入车主活动流程（包括背景和目的、费用、参与人数等），效果及总结，字数不限"){
					editor.html("");
					
				}
			}
		});
		prettyPrint();
		$(".tab_tit li").eq(3).click(function(){
			editor.html("<div style='color:#A3A3A3;'>请输入车主活动流程（包括背景和目的、费用、参与人数等），效果及总结，字数不限</div>");
		});
		/*
			$(".cleanK").click(function(){
			if(editor.text()=="标题+正文内容"){
				editor.html("");
				$(".cleanK").css("display","none");
			}
		})
		*/
});
