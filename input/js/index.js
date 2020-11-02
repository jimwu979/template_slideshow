(function(){
'use strict';
function build_slideshow(){
    let $slideshow = $('.slideshow');
    let slideshowOutter_W = $slideshow.parent().width();
    let $page = $slideshow.find('.page');
    let page_length = $page.length;
    $page.width(slideshowOutter_W);
    $slideshow.children('.pageBox')
                .width(slideshowOutter_W * page_length)
                .css('left', 0)
        .siblings('.control').find('li').eq(0).addClass('now')
        .siblings().removeClass('now');
}
function next_or_prev(){
    let _this = $(this);
    let $slideshow = _this.parents('.slideshow');
    let direction = _this.parent().index() == 0 ? -1 : 1;
    let nowIndex = $slideshow.find('li.now').index();
    let newIndex = nowIndex + direction;
    if (newIndex > $slideshow.find('li').length - 1) {
        newIndex = 0;
    } else if (newIndex < 0){
        newIndex == $slideshow.find('li').length - 1;
    }
    movePage($slideshow, newIndex);
}
function specifyIndex(){
    let _this = $(this);
    let $slideshow = _this.parents('.slideshow');
    let newIndex = _this.index();
    _this.addClass('now')
        .siblings('li').removeClass('now');
    movePage($slideshow, newIndex);
}
function movePage($slideshow, newIndex){
    $slideshow.find('li.now').removeClass('now')
        .parent().children().eq(newIndex).addClass('now');
    let move_W = $slideshow.find('.page').width() * newIndex * -1;
    $slideshow.children('.pageBox').css('left', move_W);
}
function slideshow_dragstart(){
    var start_X = (event.pageX) ? event.pageX : event.touches[0].clientX;
    var start_Y = (event.pageY) ? event.pageY : event.touches[0].clientY;
    $(this).attr({
        'start_X': start_X,
        'start_Y': start_Y
    });
}
function slideshow_dragmove(){
    let _this = $(this);
    if (_this.attr('move_lock') != '1') {
        _this.attr('move_lock', '1');
        let end_X = (event.pageX) ? event.pageX : event.touches[0].clientX;
        let end_Y = (event.pageY) ? event.pageY : event.touches[0].clientY;
        let start_X = Number($(this).attr('start_X'));
        let start_Y = Number($(this).attr('start_Y'));
        if (Math.abs(start_Y - end_Y) < 10) {
            let direction = end_X - start_X < 0 ? 1 : -1;
            let $slideshow = _this.parents('.slideshow');
            let newIndex = $slideshow.find('li.now').index() + direction;
            if (newIndex > $slideshow.find('li').length - 1) {
                newIndex = 0;
            } else if (newIndex < 0){
                newIndex = $slideshow.find('li').length - 1;
            }
            movePage($slideshow, newIndex);
        }
        setTimeout(function(){
            _this.attr('move_lock', '0');
        }, 500);
    }
}

build_slideshow();
$(window).resize(build_slideshow);
$('.slideshow .control button').click(next_or_prev);
$('.slideshow .control li').click(specifyIndex);
$('.slideshow .pageBox').on({
    'touchstart': slideshow_dragstart,
    'dragstart': slideshow_dragstart,
    'touchmove': slideshow_dragmove,
    'drag': slideshow_dragmove
});
}());