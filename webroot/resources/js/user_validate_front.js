window.cityCode="";
window.cityText="";
window.classCode="";
window.classText="";
window.bianji="";
window.sign="";
//验证
	function checkEmail(value) {
		var reg =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if (reg.test(value)) {
			// 合法
			return true;
		} else {
			alert("邮箱格式不正确！");
			return false;
		}
	}
	
	
	$(function(){
	//编辑用户信息	
		$(".bianji").click(function(){
			bianji = "start";
	    	var user_id = $("#user_id").val();
	    	$.ajax({
				url:'/front/update_userPre',
				type:"POST",
				dataType:"json",
				data:{"user_id":user_id},
				success: function(msg){
					sign=msg.user.SIGN;
					//所有省份  start
					var allProvince=msg.user_province;
					var options = new Array();
					//options.push({value: 0, text: "请 "});
					$.each(allProvince,function(i,v){
						options.push({value: v.code, text: v.name});
						});
				    $("#ex1_orig3").linkselect("replaceOptions", options);
					//所有省份  end
					
					
					//所有大区  start
					var allBigClass=msg.user_bigClassify;
					var options2 = new Array();
					$.each(allBigClass,function(i,v){
						options2.push({value: v.id, text: v.name});
						});
				    $("#ex1_orig1").linkselect("replaceOptions", options2);
					//所有大区  end
				   
				    //alert(sign);
				    if(msg.user.ADDRESS==null||msg.user.ADDRESS ==""){
				    	//用户未完善信息
				    }else{
				   		 //地址回填
				    	 var address = eval("(" + msg.user.ADDRESS + ")");//转换后的JSON对象
					     if(address.province_code!=""){
					        $("#ex1_orig3").linkselect("val",address.province_code);	
					      }
				   		  cityCode=address.city_code;
				   		  cityText=address.city_title;
						 // 大区回填
						    if(msg.user.BIGCLASSIFY!=""){
						     $("#ex1_orig1").linkselect("val",msg.user.BIGCLASSIFY);	
						    }
							classCode=msg.user.SMALLCLASSIFY;
							classText=msg.user.SMALLCLASSTITLE;
				    }
				   
				  
				//头像start
				if(msg.user.PHOTO==""||msg.user.PHOTO==null){
					
				$(".upload_img_div img").attr({ src: "/resources/images/pp2.jpg" });
				}else{
					$(".upload_img_div img").attr({ src: msg.user.PHOTO });
				}//头像end
				$("#PHOTO").val(msg.user.PHOTO);
				$("#USER_NAME").val(msg.user_data.USER_NAME);
				$("#EMAIL").val(msg.user_data.EMAIL);
				$("#AGE").val(msg.user_data.AGE);
				$("#JOB").val(msg.user_data.JOB);
				$("#STORES").val(msg.user_data.STORES);
				$("#DECLARATION").html(msg.user_data.DECLARATION);
					
				}
			});	
	        $(".mask").show();
	         isLoading=true;
			$(".mask").before('<iframe id="ss"></iframe>');
	        $(".grxx").css({"display":"block"})
	    });
		
	//取消按钮
			$("#cancel").click(function(){
				$(".mask").hide();
				$(".grxx").hide();
			})
				
	})
	
	
	
	//age验证
	function checkAge(value) {
		
		var reg =/^[0-9]+$/;
		if (reg.test(value)) {
				if(value.length<=0||value.length>2){
					alert("请输入正确年龄！");
					return false;
				}else{
					return true;
				}
			// 合法
			return true;
		} else {
			alert("请输入正确年龄！");
			return false;
		}
	}
	
	//工作
	function checkJob(value){
		if(value.length>10||value.length==0){
			alert("岗位请输入1~10个字！");
			return false;
		}else{
			return true;
		}
		
	}
	//店铺
	function checkStores(value){
		if(value.length>10||value.length==0){
			alert("专营店名称请输入1~10个字！");
			return false;
		}else{
			return true;
		}
		
	}
	//宣言
	function checkEclaration(value){
		if(value.length>50||value.length==0){
			alert("参赛个人宣言请输入1~50个字！");
			return false;
		}else{
			return true;
		}
		
	}
	//地址
	function checkAddress(){
		var province = $("#ex1_orig3").val();
		var city= $("#ex1_orig4").val();
		if(province=='710000'||province=='810000'||province=='820000'){
			return true;
		}else if(province==null||province==""||city==null||city==""){
				alert("请选择城市！");
				return false;
		}else{
			return true;
		}		
		
	}
	//大区小区
	function checkClassifyMsg(){
		var bigClassify = $("#ex1_orig1").val();
		var smallClassify= $("#ex1_orig2").val();
		if(bigClassify==null||bigClassify==""||smallClassify==null||smallClassify==""){
			alert("请选择大区、小区！");
			return false;
		}else{
			return true;
		}		
	}
	//头像
	function checkPhoto(){
		var checkPhoto = $("#photo").val();
		var oldPhoto = $("#OLDPHOTO").val();
		if(oldPhoto==""||oldPhoto==null){
			if(checkPhoto==null||checkPhoto==""){
				alert("请选择头像！");
				return false;
			}else{
				return true;
			}	
		}else{
			return true;
			
		}
			
	}

	
	
	//级联城市
	function showCity() {	
		if(bianji=="start"&&sign==1){
			code = $("#ex1_orig3").linkselect("val");
			$.ajax({
				url:'/front/find_address',
				type:"POST",
				dataType:"json",
				data:{"status1":"displayCity","code":code},
				success: function(msg){
				$("select[id='ex1_orig4'] option:gt(0)").remove();
				var options = new Array();
				options.push({value: cityCode, text: cityText});
				 $("#ex1_orig4").linkselect("replaceOptions", options);
				}
			});	
			window.bianji = "end";
			window.sign = 2;
		}else{
			code = $("#ex1_orig3").linkselect("val");
			$.ajax({
				url:'/front/find_address',
				type:"POST",
				dataType:"json",
				data:{"status1":"displayCity","code":code},
				success: function(msg){
					$("select[id='ex1_orig4'] option:gt(0)").remove();
					var options = new Array();
				//	options.push({value: 0, text: "-请选择-"});
					$.each(msg,function(i,v){
						options.push({value: v.code, text: v.name});
						});
					if(options.length==0){
						options.push({value: 0, text: "-无-"});
					}
				 $("#ex1_orig4").linkselect("replaceOptions", options);
				 $("#ex1_orig4").linkselect("val",cityCode);
				}
				
			});	
		}
		
		
	}
	

  function showSmallClassify(){
	 if(bianji=="end"&&sign==2){
		 pid = $("#ex1_orig1").linkselect("val");
			$("select[id='ex1_orig2'] option:gt(0)").remove();
			$.ajax({
					url:'/front/find_address',
					type:"POST",
					dataType:"json",
					data:{"status1":"displaySmallClassify","pid":pid},
					success: function(msg){
						$("select[id='ex1_orig2'] option:gt(0)").remove();
						var options = new Array();
						options.push({value:classCode, text:classText});
					 $("#ex1_orig2").linkselect("replaceOptions", options);
					}
				});	
		 window.bianji="";
	 }else{
		 	pid = $("#ex1_orig1").linkselect("val");
			$("select[id='ex1_orig2'] option:gt(0)").remove();
			$.ajax({
					url:'/front/find_address',
					type:"POST",
					dataType:"json",
					data:{"status1":"displaySmallClassify","pid":pid},
					success: function(msg){
						$("select[id='ex1_orig2'] option:gt(0)").remove();
						var options = new Array();
						$.each(msg,function(i,v){
							options.push({value:v.id, text: v.name});
							});
						if(options.length==0){
							options.push({value: 0, text: "-无-"});
						}
					 $("#ex1_orig2").linkselect("replaceOptions", options);
					 $("#ex1_orig2").linkselect("val",classCode);
					}
				});	
	 }
  	
	
}
	