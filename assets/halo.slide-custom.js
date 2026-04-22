(function ($) {
    var halo = {
        initCustomSlide: function(targetSelector) {
            var customSlide = $('[slide-custom-init]');
            var initSlick = function(self) {
                if (self.hasClass("slick-initialized")) return;
                var arrowEnable = self.data('arrow-enable') || false,
                    dotEnable = self.data('dots') || false,
                    dotEnable_mb = self.data('mb-dots') || false,
                    autoplay = self.data('autoplay') || false,
                    autoplaySpeed = self.data('autoplay-speed') || 1000,
                    infinite = self.data('infinite') || false;
                    fade = self.data('fade') || false;

                    centerMode = self.data('center-mode') || false;
                    centerPadding = self.data('center-padding') || '15%'

                    slidesToShow = self.data('slides-to-show') || 3;
                    slidesToScroll = self.data('slides-to-scroll') || 1;

                    slidesToShow_mb = self.data('mb-slides-to-show') || 1;
                    slidesToScroll_mb = self.data('mb-slides-to-scroll') || 1;

                    breakpoint = self.data('breakpoint') || 768

                self.slick({
                    speed: autoplaySpeed,
                    autoplay: autoplay,         
                    arrows: arrowEnable,
                    dots: dotEnable,
                    centerMode:centerMode,
                    centerPadding: '15%',
                    slidesToShow: slidesToShow, // 轮播一次显示多少个幻灯片
                    rows: 1, // 轮播的行数
                    slidesToScroll: slidesToScroll, // 每次滚动 / 切换多少个幻灯片
                    slidesPerRow: 1, // 当 rows > 1 时，设置每行显示多少个幻灯片
                    infinite: infinite,
                    fade: fade,
                    get nextArrow() {
                        return (this.nextArrow =
                        `<button type="button" aria-label="Next" class="slick-next">
                        <svg t="1758703771314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19663" width="16" height="16">
                        <path d="M413.696 494.364444l265.272889-216.348444a28.444444 28.444444 0 1 0-35.953778-44.032L351.800889 471.438222a28.444444 28.444444 0 0 0-0.853333 43.349334l291.214222 257.479111a28.444444 28.444444 0 1 0 37.660444-42.666667L413.696 494.364444z" transform="scale(-1, 1) translate(-1024, 0)" p-id="19664">
                        </path>
                        </svg>
                        </button>`);
                    },
                    get prevArrow() {
                        return (this.prevArrow =
                        `<button type="button" aria-label="Previous" class="slick-prev">
                        <svg t="1758703771314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19663" width="16" height="16">
                        <path d="M413.696 494.364444l265.272889-216.348444a28.444444 28.444444 0 1 0-35.953778-44.032L351.800889 471.438222a28.444444 28.444444 0 0 0-0.853333 43.349334l291.214222 257.479111a28.444444 28.444444 0 1 0 37.660444-42.666667L413.696 494.364444z" p-id="19664">
                        </path>
                        </svg>
                        </button>`);
                    },
                    rtl: window.rtl_slick,
                    responsive: [
                        {
                            breakpoint: breakpoint, // 小于时
                            settings: {
                                slidesToShow: slidesToShow_mb,
                                slidesToScroll: slidesToScroll_mb,
                                dots: dotEnable_mb
                            }
                        },
                    ]
                });
            }

            var destroySlick = function(self) {
                if (self.hasClass("slick-initialized")) {
                    self.slick('unslick'); // Slick官方销毁方法
                }
            };
            var handleSlideByScreen = function() {
                var windowWidth = $(window).width(); // 获取当前窗口宽度
                customSlide.each(function() {
                    var self = $(this);
                    var initOnlyMobile = self.data('init-only-mobile') || false;
                    if(initOnlyMobile && windowWidth > 767){
                        destroySlick(self);
                    } else {
                        initSlick(self);
                    }
                    
                });
            };
            handleSlideByScreen();

            $(window).on('resize', function() {
                // 加延迟避免频繁触发（优化性能）
                clearTimeout(window.slideResizeTimer);
                window.slideResizeTimer = setTimeout(handleSlideByScreen, 200);
            });
        }
    }
    $(document).ready(function() {
        halo.initCustomSlide();
    });
})(jQuery);