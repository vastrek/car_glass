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
    window.shareThing = function (title, summary,obj) {
        bShare.addEntry({
            title: '数字营销大赛 - 【' + title + '】的个人作品',
            url: window.location,
            summary: summary
            //pic: pic
        });
        bShare.more(obj);
    };

    /**
     * 分享
     * @param e Event
     * @param obj DOM
     */
    window.shareThingForHome = function (obj) {
        var title = $(obj).attr('shareTitle');
        var summary = $(obj).attr('shareContent');
        shareThing(title, summary,obj);
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