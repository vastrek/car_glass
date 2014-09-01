/**
 * 音频弹出控制
 */
var audioManger = (function () {

    // 当前是否正在显示
    var isDiaogShow = false;

    /**
     * 生成锁屏DOM对象
     * @returns {*|jQuery|HTMLElement}
     */
    var getScreenLock = function () {
        var screenLock = $('#screenLock');
        if (screenLock.length == 0) {
            screenLock = $('<div id="screenLock"></div>');
            screenLock.click(audioManger.close);
            screenLock.appendTo('body');
        }
        return screenLock;
    };

    /**
     * 获取数据信息
     * @param url
     * @param callback
     */
    var getData = function (url, callback) {
        // 处理AJAX
        var data = {
            name: '参赛人姓名',
            audioUrl: 'audios/1.mp3',
            logo: 'images/user_logo.jpg',
            good: 658,
            share: 263,
            description: '参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述参赛人描述'
        };
        callback && callback(data);
    };

    /**
     * 生成HTML
     * @param data
     * @returns {string}
     */
    var generateHtml = function (data) {
        var list = [];
        list.push('<div id="messageDialog">');
        list.push('    <div class="close"></div>');
        list.push('    <div class="audioElement"><div class="playButton"></div></div>');
        list.push('    <div class="userInfo">');
        list.push('        <div class="logo"><img src="' + data.logo + '" alt=""/></div>');
        list.push('        <div class="name">' + data.name + '</div>');
        list.push('        <div class="buttons">');
        list.push('            <div class="good">' + data.good + '</div>');
        list.push('            <div class="share">' + data.share + '</div>');
        list.push('        </div>');
        list.push('        <div class="clear"></div>');
        list.push('    </div>');
        list.push('    <div class="description">');
        list.push(data.description);
        list.push('    </div>');
        list.push('</div>');
        return list.join('');
    };

    var audioObj, audioContainer;

    /**
     * 设置Audio
     */
    var setAudioDOM = function (url) {
        if (!audioObj) {
            $('<audio src="' + url + '" preload="auto" />').appendTo('body');
            audiojs.events.ready(function () {
                audioObj = audiojs.createAll()[0];
                audioObj.trackEnded = function () {
                    audioContainer.find('.playButton').removeClass('pause');
                };
            });
        } else {
            audioObj.load(url);
        }
    };

    return {
        open: function (url) {
            getData(url, function (data) {
                $('#messageDialog').remove();

                // Audio
                setAudioDOM(data.audioUrl);

                audioContainer = $(generateHtml(data));
                audioContainer.appendTo('body');

                audioContainer.css('top', ($(window).height() - audioContainer.height()) / 2 + $(document).scrollTop());
                audioContainer.css('left', ($(document).width() - audioContainer.width()) / 2);
                audioContainer.find('.close').click(audioManger.close);
                audioContainer.find('.audioElement').click(function () {
                    audioObj.playPause();
                    if (audioObj.playing) {
                        $(this).find('.playButton').addClass('pause');
                    } else {
                        $(this).find('.playButton').removeClass('pause');
                    }
                });

                var screenLock = getScreenLock();
                screenLock.css({ 'height': $(document).height() }).show();
                audioContainer.css('opacity', 0).show().animate({ opacity: 1 }, 400);
                isDiaogShow = true;
            });
        },

        /**
         * 关闭对话框
         */
        close: function () {
            var screenLock = getScreenLock();
            screenLock.hide();
            $('#messageDialog').remove();
            audioObj.pause();
            isDiaogShow = false;
        },

        /**
         * 当前是否正在显示对话框
         * @returns {boolean}
         */
        isShowing: function () {
            return isDiaogShow;
        }
    };

})();