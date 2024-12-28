const SVG_ANIM_DURATION = 120;
const SVG_REDRAW_DURATION = 3600;
const SVG_VIVUS_ANITYPE = "oneByOne";
const WIDTH_BREAKPOINT_DEVICE = 920;
var navHeight = 76;
var topMenuOffset = navHeight;
var scrollAnimTime = 500;
var svg_idFooterLine_interval;

// 「債券熱門問答」sided sticky initialization
var sticky = new Sticky(".qna_menu_group");

function funcCloseMobMenu() {
    $(".jsMobMenuToggle, .jsMobMenuHeader").removeClass("open");
    $(".jsMobMenu").fadeOut(300);
}
function funcOpenMobMenu() {
    $(".jsMobMenuToggle, .jsMobMenuHeader").addClass("open");
    $(".jsMobMenu").fadeIn(300);
}
function redraw(icon) {
    icon.reset();
    icon.play(1);
}

function jsGoAnchor(e) {
    // 偵測是否有實體的點擊物件
    // 有：代入父元素的屬性值(data-link)
    // 沒有：代入預設值
    var anchorId = e ? e.target.parentNode.getAttribute("data-link") : "idAnchor2";

    if ($(".jsMobMenuToggle").hasClass("open")) {
        funcCloseMobMenu();
    }
    if (!$("#idHeader").hasClass("stickyed")) {
        //選單未在sticky狀態時click menu item
        var navStickyOffset = $("#idHeader").outerHeight();
        $("html, body").animate({ scrollTop: $("#" + anchorId).offset().top - topMenuOffset - navStickyOffset + 2 }, 500);
    } else {
        $("html, body").animate({ scrollTop: $("#" + anchorId).offset().top - topMenuOffset + 2 }, 500);
    }
    $(".jsGoAnchor").removeClass("-active");
    $('[data-link="' + anchorId + '"]').addClass("-active");
}

//play animation
if (true) {
    $(".jsWowRepeat")
        .on("scrollSpy:exit", function () {
            $(this)
                .css({
                    visibility: "hidden",
                    "animation-name": "none",
                })
                .removeClass("animated");
        })
        .scrollSpy();
    $(".jsWowRepeat").on("scrollSpy:enter", function () {
        $(this)
            .css({
                visibility: "visible",
                "animation-name": $(this).attr("data-anim"),
            })
            .addClass("animated");
    });
}

//initialize
navHeight = $("#idHeader").outerHeight();
topMenuOffset = navHeight;
$(window).resize(function () {
    navHeight = $("#idHeader").outerHeight();
    topMenuOffset = navHeight;
});

//top選單-mobile
$(".jsMobMenuToggle").on("click", function () {
    if ($(".jsMobMenuToggle").hasClass("open")) {
        funcCloseMobMenu();
    } else {
        funcOpenMobMenu();
    }
});

//top選單 anchor click
$(".jsGoAnchor").on("click", function (e) {
    jsGoAnchor(e);
});

// 記錄點擊目標的 id
var dataId;
// 記錄 ab-section__aip30th-body 的高度
// var inlineCSS;

// $(".jsTopicNav").on("click", function () {
    // if (dataId === $(this).attr("data-target")) {
        // "ab-section__aip30th-body" is closed
        // if (inlineCSS == "0px") {
            // Open "ab-section__aip30th-body"
            // $(".ab-section__aip30th-body").animate({ height: "100%", maxHeight: "2000px", paddingTop: "65px", paddingBottom: "65px" }, 300, "swing", () => {
                // changeSliderContent($(this));
                // 設定 tab navigation 狀態
                // $(".jsTopicNav").removeClass("active");
                // $(this).addClass("active");
            // });
        // } else {
            // Close "ab-section__aip30th-body"
            // $(".ab-section__aip30th-body").animate({ height: "0", maxHeight: "0", paddingTop: "0", paddingBottom: "0" }, 300, "swing", () => {
                // changeSliderContent($(this));
                // 設定 tab navigation 狀態
                // $(".jsTopicNav").removeClass("active");
            // });
        // }
    // } else {
        // Open "ab-section__aip30th-body"
        // $(".ab-section__aip30th-body").animate({ height: "100%", maxHeight: "2000px", paddingTop: "65px", paddingBottom: "65px" }, 300, "swing", () => {
            // changeSliderContent($(this));
            // 設定 tab navigation 狀態
            // $(".jsTopicNav").removeClass("active");
            // $(this).addClass("active");
        // });
    // }
// });

// function changeSliderContent(e) {
    // $(".jsTopicBody").fadeOut();

    // 重新記錄 "ab-section__aip30th-body" 目前高度
    // inlineCSS = $(".ab-section__aip30th-body").css("height");

    // 寫入 "jsTopicNav" 的 "data-target" 屬性的值
    // dataId = e.attr("data-target");

    // 移除 "jsTopicBody" 的 class
    // $(".jsTopicBody").removeClass("active");

    // 展開擊點目標對應內容區塊
    // $('[data-id="' + dataId + '"]')
        // .fadeIn()
        // .addClass("active");

    //捲動到jsTgHeader置頂
    // var anchorId = e.attr("data-link");
    // 頁面滑動到指定位置
    // $("html, body").animate({ scrollTop: $("#" + anchorId).offset().top - topMenuOffset - 40 }, 500);
// }

// function runJsCounter($this) {
    // $this.prop("Counter", 0).animate(
        // {
            // Counter: $this.text(),
        // },
        // {
            // duration: 1000,
            // easing: "swing",
            // step: function (now) {
                // $this.text(Math.ceil(now));
            // },
        // }
    // );
// }


// 一進入頁面展開超群實力選單與內容
$(document).ready(function () {
    // 初始化：只打開第一個選單和內容
    var firstNavItem = $(".jsTopicNav").first();
    var firstContentItem = $(".jsTopicBody").first();

    firstNavItem.addClass("active");
    firstContentItem.addClass("active").fadeIn();

    // 初始化ab-section__aip30th-body高度，只針對第一則內容
    $(".ab-section__aip30th-body").css({ height: "100%", maxHeight: "2000px", paddingTop: "65px", paddingBottom: "65px" });

    // 隱藏其他內容
    $(".jsTopicBody").not(firstContentItem).hide();

    // 點擊事件
    $(".jsTopicNav").on("click", function () {
        var dataId = $(this).attr("data-target");

        if ($(this).hasClass("active")) {
            // 若已經是active狀態，則不執行操作
            return;
        } else {
            // 展開新的內容
            $(".jsTopicNav").removeClass("active");
            $(this).addClass("active");

            $(".jsTopicBody").removeClass("active").fadeOut();
            $('[data-id="' + dataId + '"]').fadeIn().addClass("active");
        }
    });

    function changeSliderContent(e) {
        // 確保所有內容區塊隱藏
        $(".jsTopicBody").fadeOut();

        // 寫入jsTopicNav的data-target屬性的值
        var dataId = e.attr("data-target");

        // 展開擊點目標對應內容區塊
        $('[data-id="' + dataId + '"]')
            .fadeIn()
            .addClass("active");
    }
});





//sec03-基金檔案
//收合
$(".jsTgHeader").on("click", function () {
    var myBody = $(this).prev(".jsTgBody");
    if ($(this).hasClass("open")) {
        //關起來
        $(this).removeClass("open");
        myBody.removeClass("open");
        myBody.slideUp();
    } else {
        //打開body
        $(this).addClass("open");
        myBody.addClass("open");
        myBody.slideDown();
    }
    //捲動到jsTgHeader置頂
    var anchorId = $(this).attr("data-link");
    $("html, body").animate({ scrollTop: $("#" + anchorId).offset().top - topMenuOffset + 2 }, 500);
});

var svg_idSec3IconG1 = new Vivus("idSec3IconG1", {
    type: "sync",
    duration: 50,
    reverseStack: true,
});
var svg_idSec3IconG2 = new Vivus("idSec3IconG2", {
    type: "sync",
    duration: 50,
    reverseStack: true,
});
var svg_idSec3IconG3 = new Vivus("idSec3IconG3", {
    type: "sync",
    duration: 50,
    reverseStack: true,
});
var svg_idSec3IconG4 = new Vivus("idSec3IconG4", {
    type: "sync",
    duration: 50,
    reverseStack: true,
});
if ($(window).width() >= WIDTH_BREAKPOINT_DEVICE) {
    $(".jsFileIcon").on("mouseenter", function () {
        var myId = $(this).find(".jsFileIconSvg").attr("id");
        if (myId == "idSec3IconG1") {
            redraw(svg_idSec3IconG1);
        } else if (myId == "idSec3IconG2") {
            redraw(svg_idSec3IconG2);
        } else if (myId == "idSec3IconG3") {
            redraw(svg_idSec3IconG3);
        } else if (myId == "idSec3IconG4") {
            redraw(svg_idSec3IconG4);
        }
    });
}

// 聯博主題投資方案
var swiper_idSwiperInvest = new Swiper("#idSwiperInvest", {
    watchOverflow: true,
    spaceBetween: 0,
    centeredSlides: false,
    loop: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },
    pagination: {
        clickable: true,
        el: ".idSwiperInvestPagination",
        type: "bullets",
    },
    breakpoints: {
        1: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
        },
    },
});
//進入視線時，才開始自動輪播
$("#idSwiperInvest").scrollSpy();
$("#idSwiperInvest").on("scrollSpy:enter", function () {
    swiper_idSwiperInvest.slideTo(0, 1000, false); //從頭開炲
    swiper_idSwiperInvest.autoplay.start();
});
$("#idSwiperInvest").on("scrollSpy:exit", function () {
    swiper_idSwiperInvest.autoplay.stop();
});

// 聯博主題投資方案
var swiper_idSwiperInvest = new Swiper("#idSwiperInvest", {
    watchOverflow: true,
    spaceBetween: 0,
    centeredSlides: false,
    loop: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },
    pagination: {
        clickable: true,
        el: ".idSwiperInvestPagination",
        type: "bullets",
    },
    breakpoints: {
        1: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
        },
    },
});
$(document).ready(function () {}); //ready

//捲動
$(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();

    //收起mobile menu
    if ($(".jsMobMenuToggle").hasClass("open")) {
        funcCloseMobMenu();
    }
    //pc sticky menu 出現
    if (scrollDistance > navHeight) {
        $("#idHeader").addClass("stickyed");
    } else {
        $("#idHeader").removeClass("stickyed");
    }
    if (scrollDistance > navHeight * 3) {
        // scroll 加入滑入效果
        $("#idHeader").addClass("inview");
    } else {
        $("#idHeader").removeClass("inview");
    }
    //選單項目 active
    if (scrollDistance > $("#idAnchor1").offset().top - topMenuOffset && scrollDistance <= $("#idAnchor2").offset().top - topMenuOffset) {
        $(".jsGoAnchor").removeClass("-active");
        $('[data-link="idAnchor1"]').addClass("-active");
    } else if (scrollDistance > $("#idAnchor2").offset().top - topMenuOffset && scrollDistance <= $("#idAnchor3").offset().top - topMenuOffset) {
        $(".jsGoAnchor").removeClass("-active");
        $('[data-link="idAnchor2"]').addClass("-active");
    } else if (scrollDistance > $("#idAnchor3").offset().top - topMenuOffset && scrollDistance <= $("#idAnchor4").offset().top - topMenuOffset) {
        $(".jsGoAnchor").removeClass("-active");
        $('[data-link="idAnchor3"]').addClass("-active");
    } else if (scrollDistance > $("#idAnchor4").offset().top - topMenuOffset && scrollDistance <= $("#idAnchor5").offset().top - topMenuOffset) {
        $(".jsGoAnchor").removeClass("-active");
        $('[data-link="idAnchor4"]').addClass("-active");
    } else if (scrollDistance > $("#idAnchor5").offset().top - topMenuOffset && scrollDistance <= $("#idAnchor6").offset().top - topMenuOffset) {
        $(".jsGoAnchor").removeClass("-active");
        $('[data-link="idAnchor5"]').addClass("-active");
    } else if (scrollDistance > $("#idAnchor6").offset().top - topMenuOffset) {
        $(".jsGoAnchor").removeClass("-active");
        $('[data-link="idAnchor6"]').addClass("-active");
    }

    // 更新 slider sticky 高度
    sticky.update();
});

// 影片專區
var swiper_idSwiper_VideoThumb = new Swiper("#idSwiper_VideoThumb", {
    speed: 500,
    slidesPerView: 3,
    spaceBetween: 20,
    direction: "vertical",
    navigation: {
        nextEl: ".idPrev_VideoThumb",
        prevEl: ".idNext_VideoThumb",
    },
    watchOverflow: true,
    loop: false,
    autoplay: false,
    mousewheel: {
        invert: false,
    },
});

// 切換"影音專區"主要影片
$(".jsVideoThumb").on("click", function () {
    var target = $(this).attr("data-target");
    $(".jsVideoThumb").removeClass("active");
    $(this).addClass("active");
    $(".jsVideoMain").hide();
    $('[data-id="' + target + '"]').fadeIn(300);
});

// "債券熱門問答"選單與內容切換功能
function changeTab(thisObj, index, target) {
    console.log(thisObj);
    switch (target) {
        // 手機版選單
        case "qna_article_header-mobile":
            if (thisObj.parent().hasClass("active")) {
                // 移除全部 class "active"
                $(".qna_article").removeClass("active");
                // 網頁滑動第一個元素的位置
                $("html, body").animate({ scrollTop: $(".qna_article").eq(0).offset().top - topMenuOffset }, 500);
            } else {
                // 移除全部 class "active"
                $(".qna_article").removeClass("active");
                // 取得點擊元素本身，切換 class "active"
                $(".qna_article_body").fadeOut(0);
                $(".qna_article").eq(index).toggleClass("active");
                // 文章 fadeIn
                $(".qna_article_body").fadeIn(500);
                // 網頁滑動點擊元素本身位置
                $("html, body").animate({ scrollTop: thisObj.offset().top - topMenuOffset }, 500);
            }
            break;
        // 電腦版選單
        case "qna_menu_item":
            // 移除全部選單 class "active"
            $(".qna_menu_item").removeClass("active");
            // 取得點擊選單本身，切換 class "active"
            $(".qna_menu_item").eq(index).toggleClass("active");
            // 移除全部文章 class "active"
            $(".qna_article").removeClass("active");
            // 文章 fadeOut
            $(".qna_article").fadeOut(200);
            // 取得文章元素，切換 class "active"
            $(".qna_article").eq(index).toggleClass("active");
            // 文章 fadeIn
            $(".qna_article").fadeIn(200);
            // 更新 slider sticky 高度
            // sticky.update();
            break;
    }
}

// "債券熱門問答"手機版選單偵聽事件
$(".qna_article_header-mobile").on("click", function () {
    // 取得點擊元素本身的 index
    var index = $(".qna_article_header-mobile").index(this);
    changeTab($(this), index, "qna_article_header-mobile");
});

// "債券熱門問答"電腦版選單偵聽事件
$(".qna_menu_item").on("click", function () {
    var index = $(".qna_menu_item").index(this);
    changeTab($(this), index, "qna_menu_item");
});
