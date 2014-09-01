/**
 * Created by Visolleon on 2014/4/14.
 */
$(document).ready(function () {
    bShare && bShare.init();

    /**
     * 分享
     * @param title
     * @param summary
     */
    window.shareThing = function (event,title, summary,address) 
    {
    	
        bShare.addEntry({
            title: '数字营销大赛 - 【' + title + '】的个人作品',
            url: address,
            summary: summary
        });
        bShare.more(event);
    };

    /**
     * 分享
     * @param e Event
     * @param obj DOM
     */
    window.shareThingForHome = function (obj,id,activity_id) {
    	var address ="http://ddmc.phluency.com/works_front/findById?works_id="+id+"&activity_id="+activity_id;
        var title = $(obj).attr('shareTitle');
        var summary = $(obj).attr('shareContent');
        shareThing(obj,title, summary,address);
    };

    /**
     * 个人页面分享
     * @param e
     */
    window.shareThingForInfoPage = function () {
    	
        var title = $('#productMaster').text().trim();
        var summary = $('#productDescription').text().trim();
        shareThing(title, summary);
    };
});