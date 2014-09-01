//验证
	
	//email验证
	function checkEmail(value) {
		//$("#EMAIL").val(value.replace(/(^\s+)|\s+$/g,""));
		var reg =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if (reg.test(value)) {
			// 合法
			$("#EMAILMsg").html("");
			return true;
		} else {
			$("#EMAILMsg").html("<font color='red'>邮箱格式不正确！</font>");
			return false;
		}
	}
	
	//age验证
	function checkAge(value) {
		//$("#AGE").val(value.replace(/(^\s+)|\s+$/g,""));
		var reg =/^[0-9]+$/;
		if (reg.test(value)) {
				if(value.length<=0||value.length>2){
					$("#AGEMsg").html("<font color='red'>请输入正确年龄！</font>");
					return false;
				}else{
					$("#AGEMsg").html("");
					return true;
				}
			// 合法
			$("#AGEMsg").html("");
			return true;
		} else {
			$("#AGEMsg").html("<font color='red'>请输入正确年龄！</font>");
			return false;
		}
	}
	//工作
	function checkJob(value){
		//$("#JOB").val(value.replace(/(^\s+)|\s+$/g,""));
		if(value.length>10||value.length<=0){
			$("#JOBMsg").html("<font color='red'>输入1~10个字！</font>");
			return false;
		}else{
			$("#JOBMsg").html("");
			return true;
		}
		
	}
	//店铺
	function checkStores(value){
		//$("#STORES").val(value.replace(/(^\s+)|\s+$/g,""));
		if(value.length>10||value.length<=0){
			$("#STORESMsg").html("<font color='red'>输入1~10个字！</font>");
			return false;
		}else{
			$("#STORESMsg").html("");
			return true;
		}
		
	}
	//宣言
	function checkEclaration(value){
		//$("#DECLARATION").val(value.replace(/(^\s+)|\s+$/g,""));
		if(value.length>50||value.length<=0){
			$("#DECLARATIONMsg").html("<font color='red'>输入1~50个字！</font>");
			return false;
		}else{
			$("#DECLARATIONMsg").html("");
			return true;
		}
		
	}
	//姓名
	/*function checkUSER_NAME(value){
		//$("#USER_NAME").val(value.replace(/(^\s+)|\s+$/g,""));
		var arr =  new Array("\\","!","@","#","$","%","^","&","*","(",")","?","-","+","=","~","\/","！","@","#","￥","%","……","&","*","（","）","——","+","|","；",";","'","、",".",",","，","[","]","{","}");
		for(var i=0;i<arr.length;i++){
			if(value.indexOf(arr[i])>0||value.indexOf(arr[i])==0){
				$("#USER_NAMEMsg").html("<font color='red'>禁止输入特殊字符！</font>");
				return false;
			}
		}
		if(value.length>4||value.length<=0){
			$("#USER_NAMEMsg").html("<font color='red'>输入1~4个字！</font>");
			return false;
		}else{
			$("#USER_NAMEMsg").html("");
			return true;
		}
		
	}*/
	//地址
	function checkAddress(){
		var province = $("#province_title").val();
		var city= $("#city_title").val();
		if(province=='710000'||province=='810000'||province=='820000'){
			return true;
		}else if(province==null||province==""||city==null||city==""){
				$("#ADDRESSMsg").html("<font color='red'>请选择城市！</font>");
				return false;
		}else{
			$("#ADDRESSMsg").html("");
			return true;
		}		
		
	}
	//大区小区
	function checkClassifyMsg(){
		var bigClassify = $("#bigClassify_title").val();
		var smallClassify= $("#smallClassify_title").val();
		if(bigClassify==null||bigClassify==""||smallClassify==null||smallClassify==""){
			$("#ClassifyMsg").html("<font color='red'>请选择大区、小区！</font>");
			return false;
		}else{
			$("#ClassifyMsg").html("");
			return true;
		}		
	}
	//头像
	function checkPhoto(){
		var checkPhoto = $("#photo").val();
		var oldPhoto = $("#OLDPHOTO").val();
		if(oldPhoto==""||oldPhoto==null){
			if(checkPhoto==null||checkPhoto==""){
				$("#PHOTOMsg").html("<font color='red'>请选择头像！</font>");
				return false;
			}else{
				$("#PHOTOMsg").html("");
				return true;
			}	
		}else{
			$("#PHOTOMsg").html("");
			return true;
			
		}
			
	}
	
	