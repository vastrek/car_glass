<?php

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?php //echo $sitename?>管理后台</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="/resources/lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/resources/lib/bootstrap/css/bootstrap-responsive.min.css">
    <link rel="stylesheet" type="text/css" href="/resources/stylesheets/theme.css">
    <link rel="stylesheet" href="/resources/lib/font-awesome/css/font-awesome.css">
 <script type="text/javascript" src="/resources/js/html5.js"></script>
    <script src="/resources/lib/jquery-1.8.1.min.js" type="text/javascript"></script>
     <script type="text/javascript">
    function checkUserName(username){
    	var username = $("#username").val();
    	$("#username").val(username.replace(/(^\s+)|\s+$/g,""));
    	if(username.length>20){
    		var sub = username.substring(0,20);
    		$("#username").val(sub);
    		return false;
    	}else{
    		return true;
    	}
    	
    }
     
     function checkPassword(){
     	var password = $("#password").val();
     	$("#password").val(password.replace(/(^\s+)|\s+$/g,""));
    	if(password.length>25){
    		var sub = password.substring(0,20);
    		$("#password").val(sub);
    		return false;
    	}else{
    		return true;
    	}
    	
    }
     
     </script>

    <!-- Demo page code -->
    
    <style type="text/css">
        #line-chart {
            height:300px;
            width:800px;
            margin: 0px auto;
            margin-top: 1em;
        }
        .brand { font-family: georgia, serif; }
        .brand .first {
            color: #ccc;
            font-style: italic;
        }
        .brand .second {
            color: #fff;
            font-weight: bold;
        }
    </style>

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
  </head>

  <!--[if lt IE 7 ]> <body class="ie ie6"> <![endif]-->
  <!--[if IE 7 ]> <body class="ie ie7"> <![endif]-->
  <!--[if IE 8 ]> <body class="ie ie8"> <![endif]-->
  <!--[if IE 9 ]> <body class="ie ie9"> <![endif]-->
  <!--[if (gt IE 9)|!(IE)]><!--> 
  <body> 
  <!--<![endif]-->
    
    <div class="navbar">
        <div class="navbar-inner">
            <div class="container-fluid">
                <ul class="nav pull-right">
                    
                </ul>
                <a class="brand" href="/"><span class="first"><?php echo Options::model()->find("option_name=?",array('sitename'))->option_value?></span> <span class="second">管理系统</span></a>
            </div>
        </div>
    </div>
    

    <div class="container-fluid">
        
        <div class="row-fluid">
    <div class="dialog span4">
        <div class="block">
            <div class="block-heading">登录</div>
            <div class="block-body">
                <form>
                    <label>账号</label>
                    <input type="text" name="username" id="username" class="span12" >
                    <label>密码</label>
                    <input type="password" name="password" id="password" class="span12" >
                    <a href="javascript:;" id="loginBtn" class="btn btn-primary pull-right">登录</a>
                    <label class="remember-me" style="display:none"><input type="checkbox"> Remember me</label>
					<label class="tips" id="tips" style="color:red"></label>
                    <div class="clearfix"></div>
                </form>
            </div>
        </div>
        <p class="pull-right" style="display:none"><a href="http://www.portnine.com" target="blank">Theme by Portnine</a></p>
        
        <p style="display:none"><a href="reset-password.html">Forgot your password?</a></p>
    </div>
</div>



    
<div id="myModal" class="modal hide fade">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h3>提示</h3>
  </div>
  <div class="modal-body">
    <p>账号或密码错误</p>
  </div>
  <div class="modal-footer">
    <a href="#" class="btn" data-dismiss="modal">关闭</a>
  </div>
</div>
    
    

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="/resources/lib/bootstrap/js/bootstrap.js"></script>
    <script src="/resources/lib/bootstrap/js/bootstrap-tooltip.js"></script>
    <script src="/resources/lib/bootstrap/js/bootstrap-popover.js"></script>
	<script>
	function tips(title,content,time){
		$('#myModal').find("p").html(content) ;
		$('#myModal').modal({
			backdrop:true,
			keyboard:true,
			show:true
		});					
		setTimeout(function(){
			$('#myModal').modal('hide') ;
		},time) ;
		
	}
	function poptips(id,title,content,time){
		//弹出提示载入 
		$('#'+id).popover({
			title:title,
			placement:'right',
			content:content,
			trigger:'manual'
		});
		$('#'+id).popover('show') ;
		setTimeout(function(){
			$('#'+id).popover('hide') ;
		},time) ;
	}
	$(function(){
		function login(){
			var username = $.trim($("#username").val()) ;
			var password = $.trim($("#password").val()) ;
			if(username==""){
				poptips("username","提示","账号不能为空",3000)
				return ;
			}
			if(password==""){
				poptips("password","提示","密码不能为空",3000)
				return ;
			}
			$.post("/admin/loginAction",{'username':username,'password':password},function(data){
				var ret = eval('('+data+')') ;
				if(ret.status=="n"){
					tips("","账号或密码错误",3000) ;
				}else if(ret.status=="y"){
					//tips("","登录成功",3000) ;
					window.location.href="/admin/" ;
				}
			}) ;
		}
		$("#loginBtn").click(function(){
			login() ;
		});
		$(document).keyup(function(event){
		  if(event.keyCode ==13){
		    login() ;
		  }
		});		
	}) ;
	</script>    
    
  </body>
</html>