// 記錄 browser 視窗的寬度
var width = window.innerWidth;

// remove loading mask
// $(window).on("load", function () {
//     setTimeout(function () {
//         $('#loading').addClass('close'); //左刷特效
//         setTimeout(function () {
//             $("#loading").hide(); //hide loading
//         }, 100);
//     }, 1500);
// });

// 取得網址字串
var url = window.location.href;
// 記錄首頁離開時 pageYOffset 的數值
var y;
// 記錄內頁離開時 data-js-scroll-to 的數值
var scroll;

// 尋找網址列中是否有資料傳遞(QueryString)
if (url.indexOf("?") != -1) {
  // 在此直接將各自的參數資料切割放進 ary 中
  var ary = url.split("?")[1].split("&");

  // 使用迴圈搜尋每個資料參數
  for (i = 0; i <= ary.length - 1; i++) {
    // 如果資料名稱為 y 的話那就把他取出來
    if (ary[i].split("=")[0] == "y") y = ary[i].split("=")[1];
    if (ary[i].split("=")[0] == "scroll") scroll = ary[i].split("=")[1];
  }
}

// 取得須要記住首頁視窗位置的按鈕 ".articalLink"
var $articalLink = $(".articalLink");

$articalLink.click(function (e) {
  // 取消 a 標籤轉跳頁面的功能
  e.preventDefault();
  // 取得 target 的連結頁面名稱
  var href = $(this).attr("href");
  // 存放新的網址
  var goPage;

  if (href === "index.html") {
    // 須轉跳至 index.html
    goPage = href + "?" + "y=" + y;
  } else {
    // 不轉跳至 index.html
    goPage = href + "?" + "y=" + window.pageYOffset;
  }
  // 頁面轉跳動作
  window.location = goPage;
});

function scrollWindow(n) {
  var back = $(".header").outerHeight();
  var slug = n;
  var target;
  var offset;
  var speed = 600;
  var delay = 0;

  if (target !== "undefined") {
    target = $('*[data-js-scroll-to-target="' + slug + '"]');
    offset = target.offset().top - back + 60;
  }

  // 頁面滑動至指定區塊
  setTimeout(function () {
    $("html, body").animate(
      {
        scrollTop: offset,
      },
      speed,
      function () {}
    );
  }, delay);
}

// Scroll to section
$(document).on("click", ".js-scroll-to", function (e) {
  // 取得 target 的連結頁面名稱
  var href = $(this).attr("href");
  var slug = $(this).attr("data-js-scroll-to");

  if (href === "javascript:;") {
    scrollWindow(slug);
  } else {
    e.preventDefault();

    var goPage;

    goPage = href + "?" + "scroll=" + slug;
    // 頁面轉跳動作
    window.location = goPage;
  }
});

var $a = $(".naviga a");

$a.click(function (e) {
  // 取消 a 標籤轉跳頁面的功能
  e.preventDefault();

  if (width > 768) {
    $(this).addClass("active").siblings(".active").removeClass("active");
  } else {
    // 重設選單 icon 的樣式
    $(".hamburger").removeClass("active");
    $(".naviga").removeClass("active");
  }
});

// 偵測 scroll direction 功能
var astScrollPos = 0,
  scrollDir = "down",
  scrollThreadhold,
  doAction;

function checkScrollDirection() {
  if ($(window).scrollTop() >= lastScrollPos) {
    scrollDir = "down";
  } else {
    scrollDir = "up";
  }

  lastScrollPos = $(window).scrollTop();
}

function doAction() {
  if (scrollDir == "down") {
    // console.log('down');
  } else {
    // console.log('up');
  }

  window.clearTimeout(scrollThreadhold);
}

// Window ready
$(window).ready(function () {
  if (window.location.pathname == "/index.html" && width < 768) {
    $("html, body").animate(
      {
        scrollTop: y,
      },
      0,
      function () {}
    );
  }
  // var back = $(".header").outerHeight();
  // var target = $('*[data-js-scroll-to-target="' + scroll + '"]');
  // var offset = target.offset().top - back + 60;
  // var speed = 600;
  // var delay = 0;

  // // 頁面滑動至指定區塊
  // setTimeout(function () {
  //   $("html, body").animate(
  //     {
  //       scrollTop: offset,
  //     },
  //     speed,
  //     function () {}
  //   );
  // }, delay);
  scrollWindow(scroll);
});

// Hamburger toggle
$(".hamburger").click(function () {
  $(this).toggleClass("active");
  $(".naviga").toggleClass("active");
  $(".naviga a").removeClass("active");
});

// Window resize
$(window).resize(function () {
  width = window.innerWidth;

  if (width > 768) {
    $(".hamburger").removeClass("active");
    $(".naviga").removeClass("active");
  }
});

// Window scroll
$(window).on("scroll", function () {
  window.clearTimeout(scrollThreadhold);

  scrollThreadhold = window.setTimeout(function () {
    // checkScrollDirection();
    if (typeof doAction == "function") {
      doAction();
    }
  }, 100);
});

// gtag 程式
var customGtag = function (category, id) {
  if (category === "scrollDepth") {
    gtag("event", "scroll", {
      event_category: category,
      event_label: id,
    });
  } else {
    gtag("event", "click", {
      event_category: "button",
      event_label: id,
    });
  }
};

// section 偵測 gtm 程式
var observerArray = [];
var sectionObservation = function () {
  var scroller = document.querySelectorAll("[data-gtm]");
  var intersectionObserver = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var gtmID = entries[i].target.getAttribute("data-gtm");
        if (entries[i].intersectionRatio > 0) {
          if (observerArray.indexOf(gtmID) === -1) {
            observerArray.push(gtmID);
            customGtag("scrollDepth", gtmID);
          }
        } else {
          var index = observerArray.indexOf(gtmID);
          observerArray.splice(index, 1);
        }
      }
    },
    {
      threshold: [0],
      root: null,
    }
  );
  if (scroller.length && scroller) {
    for (var i = 0; i < scroller.length; i++) {
      intersectionObserver.observe(scroller[i]);
    }
  }
};
sectionObservation();

// GA Bounce Rate 設定碼
var otherFunction = function () {
  sectionObservation();
  initRellax();
  youtubePlay();
  bindAnimeIcon();
};

// 進入視線時，才開始自動輪播
$("#idSwiperInvest").on("scrollSpy:enter", function () {
  swiper_idSwiperInvest.slideTo(0, 1000, false); //從頭開炲
  swiper_idSwiperInvest.autoplay.start();
});
$("#idSwiperInvest").on("scrollSpy:exit", function () {
  swiper_idSwiperInvest.autoplay.stop();
});
