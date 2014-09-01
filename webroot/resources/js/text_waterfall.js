/**
 * Created by Visolleon on 2014/4/13.
 */
$(document).ready(function () {
	$(document).scrollTop(0);
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn) {
            for (var i = 0; i < this.length; i++) {
                fn && fn(this[i], i);
            }
        };
    }

    /**
     * 获取数据 (AJAX处理)
     * @param currentPage
     * @param callback
     */
    var getProductData = function (currentPage, callback) {
    	findAll(currentPage);
        callback && callback(dataList);
    };

    /**
     * 生成HTML
     * @param data
     */
    var generateHtml = function (data) {
    	if(!data.sum_point){
    		data.sum_point = 0;
    	}
    	if(!data.count_comments){
    		data.count_comments = 0;
    	}
        var list = [];
        list.push('<div class="unit">');
        list.push('    <div class="info clearfix">');
        list.push('        <img src="' + data.photo + '" alt="" style="width:100px;height:100px;"/>');
        list.push('        <div class="userinfo">');
        list.push('            <div class="item"><span>姓名：</span>' + data.user_name + '</div>');
        list.push('            <div class="item"><span>年龄：</span>' + data.age + '</div>');
        list.push('            <div class="item"><span>岗位：</span>' + data.job + '</div>');
        list.push('            <div class="item"><span>专营店：</span>' + data.stores + '</div>');
        list.push('        </div>');
        list.push('    </div>');
        list.push('    <div class="clear"></div>');
        list.push('    <div class="userMessage" works_id="' + data.works_id + '" >');
        list.push('        <span>个人宣言：</span>' + data.declaration);
        if(data.description.length < 90 ){
       	   list.push('        <span>作品描述：</span><p style="word-break:break-all;overflow:auto;cursor:pointer;" class="description" works_id="'+data.works_id+'">' + data.description+'</p>');
        }else{
       	   list.push('        <span>作品描述：</span><p style="word-break:break-all;overflow:auto;cursor:pointer;" class="description" works_id="'+data.works_id+'">' + data.description.substr(0,90)+"......"+'</p>');
        }
        list.push('    </div>');
        list.push('    <div class="buttons">');
        list.push('        <div class="good">' + data.sum_point + '</div>');
        list.push('        <div class="weixin" works_id="' + data.works_id + '">' + data.count_comments + '</div>');
        list.push('        <div class="share bshareDiv" ');
        list.push('shareTitle="' + data.name + '" ');
        list.push('shareContent="' + data.description + '"');
        list.push('onclick=javascript:shareThingForHome(this,'+data.works_id+','+data.activity_id+');></div>');
        list.push('    </div>');
        list.push('</div>');
        return list.join('');
        
    };
    var o = {};

    // 浏览器类型
    var userAgent = navigator.userAgent.toLowerCase();
    o.browser = {};
    o.browser.isIE = (/msie/i).test(userAgent);

    // 获取IE版本
    o.IEVer = function () {
        var m = userAgent.match(/msie ([\d.]+)/);
        if (m && m.length > 1) {
            return parseInt(userAgent.match(/msie ([\d.]+)/)[1], 10);
        }
        return null;
    };

    var __isSupportH5 = null;

    // 判断当前浏览器是否支持HTML5和CSS3
    o.isSupportH5 = function () {
        if (__isSupportH5 == null) {
            if (this.browser.isIE) {
                var v = this.IEVer();
                if (v > 0 && v < 10) {
                    __isSupportH5 = false;
                } else {
                    __isSupportH5 = true;
                }
            } else {
                __isSupportH5 = true;
            }
        }
        return !!__isSupportH5;
    };

    /**
     * 获取并显示信息
     * @param pageNo
     * @param callback
     */
    var showList = function (pageNo, callback) {
    	
        getProductData(pageNo, function (dataList) {
        	if(!dataList){
        		$(".productList .column:first").html("<font color='red' size='3'>没有查询到相关作品!</font>");
        		return ;
        	}
            dataList.forEach(function (data, i) {
                var jqItem = $(generateHtml(data));
                jqItem.appendTo($('.productList .column').eq(i % 4));
                (function (jqItem) {
                    // 处理动画
                    setTimeout(function () {

                        if (o.isSupportH5()) {
                            jqItem.addClass("animated zoomIn");
                        } else {
                            jqItem.css("visibility", 'visible');
                        }
                        // 设置事件
                        jqItem.find(".description,.weixin").click(function () {
                        	window.open( "/works_front/findById?works_id="+$(this).attr("works_id")+"&activity_id="+activity_id);
                        });
                    }, Math.floor(Math.random() * 600) + 100);
                })(jqItem);
            });
            callback && callback();
        });
    };

    // 当前页数
   if(currentPage){
	   currentPage = 1;
   }

    /**
     * 是否获取数据中
     * @type {boolean}
     */
    window.isLoading = false;

    // 滚动事件处理
    $(window).scroll(function () {
        if (!audioManger.isShowing()) {
            var totalHeight = $(document).height();
            var scrollTop = $(document).scrollTop();
            var canSeeHeight = $(window).height();
            $(".mask").css({ 'height':$(document).height()})

            //console.log(totalHeight + '==' + scrollTop + '+' + canSeeHeight);
            if (totalHeight == scrollTop + canSeeHeight) {
                if (!isLoading) {
                    isLoading = true;
                    showList(currentPage, function () {
                       if(currentPage < pagecount){ //判断是否加载页面
                    	   currentPage++;
                    	   isLoading = false;
                    	   loadingFlag=false;
                       }else{
                    	   isLoading = true;
                    	   loadingFlag=true;
                       }
                    });
                }
            }
        }
    });
    //加载数据
    function findAll(currentPage){
    	 $.ajax({    
				type:'post',
				url:'/works_front/findAll',
				dataType:"json",
				async : false,
				data:{"currentPage":currentPage,"activity_id":activity_id,"order":order,"like":like,"keyword":keyword,"user_id":userid},
				success:function(data){
					if(data['msg'] !=0){
						dataList = data.works;
						pagecount = data.pagecount;
						loadingFlag=true;
					}
				},
				error:function(){
					//alert("保存失败");
				}

	     });
    }
});