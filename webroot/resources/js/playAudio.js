/**
 * Created by Visolleon on 2014/4/13.
 */
$(document).ready(function () {
    var audioObj;
    audiojs.events.ready(function () {
        audioObj = audiojs.createAll()[0];
        audioObj.trackEnded = function () {
            $('.audioElement .playButton').removeClass('pause');
        };
    });

    $('.audioElement').click(function () {
        audioObj.playPause();
        if(audioObj.playing) {
            $(this).find('.playButton').addClass('pause');
        } else {
            $(this).find('.playButton').removeClass('pause');
        }
    });
});