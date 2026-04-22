/*
 * 手风琴插件说明：
 * 1、treeTrunk对应树干
 * 2、treeLeaf对应树叶，html代码结构一般为treeTrunk.next()元素
 * 3、treeTrunkActiveClass是树干展开后添加的样式
 * 4、treeType是触发手风琴效果的事件形式
 * 5、treeIs 加载后是否将第一个树干展开
 * 6、speed 展开、闭合动画执行时间
 * 7、插件命名为jquery.accordion.js
 */
;
(function($) {
    $.fn.accordion = function(options) {
        //插件默认值
        var defaultVal = {
            treeTrunk: 'a', //树干--点击需要展开的元素            
            treeLeaf: 'ul', //树叶--点击展开元素后显示的内容
            treeTrunkActiveClass: 'active', //当前树干--当前展开树干元素的添加的样式
            treeType: 'click', //触发展开/关闭的事件类型：click,mouseenter,mouseleave,mouseout,mouseover  
            treeIs: true, //页面加载后是否显示第一个树干的树叶内容
            speed:500//动画执行时间
        };
        var obj = $.extend(defaultVal, options); //合并参数
        return this.each(function() {
            var selObject = $(this); //获取触发手风琴事件对象
            var selTreeTrunk = selObject.find(obj.treeTrunk); //获取当前对象下的树干元素
            var selTreeLeaf = selTreeTrunk.next(obj.treeLeaf); //获取当前对象下的树干元素下的树叶
            //绑定事件
            selTreeTrunk.bind(obj.treeType, function() {
                //判断树叶是否显示
                if($(this).next(selTreeLeaf).is(':visible')) {
                    //关闭树叶
                    $(this).next(selTreeLeaf).slideUp(obj.speed);
                    //移除active样式
                    $(this).removeClass(obj.treeTrunkActiveClass);
                } else {
                    //所有树干移除移除active样式
                    selTreeTrunk.removeClass(obj.treeTrunkActiveClass);
                    //当前树干添加active样式
                    $(this).addClass(obj.treeTrunkActiveClass);
                    //所有树叶闭合
                    selTreeTrunk.next(selTreeLeaf).slideUp(obj.speed);
                    //当前树干下的树叶展开
                    $(this).next(selTreeLeaf).slideDown(obj.speed);
                }
            });
            //页面加载后触发第一个树干显示树叶内容
            if(obj.treeIs) {
                selTreeTrunk.eq(0).trigger(obj.treeType);
            }
        });
    }
})(jQuery);