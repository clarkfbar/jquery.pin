/* jQuery Pin Plugin - v1.0.1 
 * Copyright (c) 2015 Zeyu Feng; Licensed MIT
 * https://github.com/clarkfbar/pin
 * */

(function(){
  // 单个目标的pin
  var pin = function(options) {
    var settings = {
      container: "body",
      top: 0,
      bottom: 0,
      activeClass: null
    };
    settings = $.extend(settings, options);
    
    var originalTop, originalLeft, maxBottom, $window = $(window), $nav = $(this);
    
    // 他的container必须是目标的父级
    if ($nav.parents(settings.container).size() == 0 ){
      settings.container = "body";
    } 
    var $container = $nav.closest(settings.container);
    
    function calculatePosition(){
      // 先把位置改为默认的
      $nav.css({position: "static"});
      
      // 计算默认时的位置
      originalTop = $nav.offset().top;
      originalLeft = $nav.offset().left;
      
      // 计算最大可以到哪里
      if(settings.container) {
        maxBottom = $container.offset().top + $container.height() - settings.bottom - $nav.height();
      }
      
      // 重新定位位置
      onScroll();
    };

    function leftAdjust(){
      if($nav.offset().left > $container.offset().left){
        $nav.css("left", originalLeft - ($nav.offset().left - $container.offset().left));
      }
    }
    
    function onScroll(){
      if(document.body.scrollTop > originalTop - settings.top) {
        // 如果超过最大底部，那么设置为absolute,使目标停留在固定位置
        if (maxBottom && maxBottom <= document.body.scrollTop + settings.top) {
          $nav.css({position: "absolute", top: maxBottom, left: originalLeft});
          if(settings.activeClass){
            $nav.removeClass(settings.activeClass);
          }
        } else {          
          // 把目标设置为fixed,并设置对应的left,top
          $nav.css({position: "fixed", left: originalLeft, top: settings.top});
          if(settings.activeClass){
            $nav.addClass(settings.activeClass);
          }
        }
      } else {
        // 还原为默认
        $nav.css({position: "static", left: "", top: ""});
        if(settings.activeClass){
          $nav.removeClass(settings.activeClass);
        }
      }
      leftAdjust();
    }
    
    calculatePosition();
    $window.scroll(onScroll);
    $window.resize(calculatePosition);
    
    $("img", this).one("load", calculatePosition);
    
    return this;
  };
  
  // 批量目标的pin
  $.fn.pin = function(options){
    this.each(function(){
      pin.call(this, options);
    });
    return this;
  };
})(jQuery);
