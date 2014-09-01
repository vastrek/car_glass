<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>新闻管理系统-首页</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="/resources/lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/resources/lib/bootstrap/css/bootstrap-responsive.min.css">
    <link rel="stylesheet" type="text/css" href="/resources/stylesheets/theme.css">
    <link rel="stylesheet" href="/resources/lib/font-awesome/css/font-awesome.css">

    <script src="/resources/lib/jquery-1.8.1.min.js" type="text/javascript"></script>

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
                    
                    <li id="fat-menu" class="dropdown">
                        <a href="#" id="drop3" role="button" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-user"></i> <?php //echo $user?>
                            <i class="icon-caret-down"></i>
                        </a>

                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="#"><?php if(!empty(Yii::app()->session['admin'])){echo Yii::app()->session['admin']->username ;}?></a></li>
                            <li class="divider"></li>
                            <li><a tabindex="-1" href="/admin/logout">退出</a></li>
                        </ul>
                    </li>
                    
                </ul>
                <a class="brand" href="index.php"><span class="first"><?php echo Options::model()->find("option_name=?",array('sitename'))->option_value?></span> <span class="second">管理系统</span></a>
            </div>
        </div>
    </div>
        
    

    <div class="container-fluid">
        
        <div class="row-fluid">
            <div class="span3">
                <div class="sidebar-nav">
                  <div class="nav-header" data-toggle="collapse" data-target="#dashboard-menu"><i class="icon-dashboard"></i>仪表盘</div>
                    <ul id="dashboard-menu" class="nav nav-list collapse in">
                        <li><a href="">首页</a></li>
                        
                        
                    </ul>
               
                <div class="nav-header" data-toggle="collapse" data-target="#accounts-menu"><i class="icon-briefcase"></i>服务商管理</div>
                <ul id="accounts-menu" class="nav nav-list collapse in">
                  <li ><a href="/admin/user">服务商列表</a></li>
                  <li ><a href="/admin/user">添加服务商</a></li>
                </ul>
                 <div class="nav-header" data-toggle="collapse" data-target="#settings-menu"><i class="icon-exclamation-sign"></i>分类管理</div>
                <ul id="settings-menu" class="nav nav-list collapse in">   
                  <li ><a href="">分类列表</a></li>
                  <li ><a href="">添加分类</a></li>
                </ul>
                
                <div class="nav-header" data-toggle="collapse" data-target="#bangdan-menu"><i class="icon-briefcase"></i>新闻管理</div>
                <ul id="bangdan-menu" class="nav nav-list collapse in">
                   <!--<li ><a href="/win_list/set">奖项设置</a></li>-->
                   <li ><a href="/win_list/insert">添加新闻</a></li>
                   <li ><a href="/win_list">新闻榜单</a></li>
                </ul>

                </div>                
        </div>

    <?php echo $content?>
    </div>
    

    
    <footer>
        <hr>
        <!-- Purchase a site license to remove this link from the footer: http://www.portnine.com/bootstrap-themes -->
        <p class="pull-right" style="display:none">A <a href="http://www.portnine.com/bootstrap-themes" target="_blank">Free Bootstrap Theme</a> by <a href="http://www.portnine.com" target="_blank">Portnine</a></p>
        
        
        <p>&copy; 2014 <a href="#"></a></p>
    </footer>    
    

    

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="/resources/lib/bootstrap/js/bootstrap.js"></script>
    
    
    
    
    
    
    

  </body>
</html>


