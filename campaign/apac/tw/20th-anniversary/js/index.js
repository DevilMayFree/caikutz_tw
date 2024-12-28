var mdSize = window.matchMedia("(max-width: 768px)");

$(".navbar-collapse").on("click", function () {
  $(".header").toggleClass("open");
  $(".header__anchor-list").fadeToggle().css("display", "flex");
});

$(window).on("resize", function () {
  if (mdSize.matches) {
    $(".header__anchor-list").css("display", "none");
    $(".header").removeClass("open");
  } else {
    $(".header__anchor-list").css("display", "flex");
  }
});

//slider
$(".slider").slick({
  arrows: false,
});

$(".slider-prev").on("click", function () {
  $(".slider").slick("slickPrev");
});
$(".slider-next").on("click", function () {
  $(".slider").slick("slickNext");
});
$(".slider").on(
  "afterChange",
  function (event, slick, currentSlide, nextSlide) {
    $(".slider").next(".text-wrap").find(".text-in p").hide();
    $(".slider")
      .next(".text-wrap")
      .find(".text-in p")
      .eq(currentSlide)
      .fadeIn();
  }
);

$("#gotop").on("click", function () {
  $("html, body").animate({
    scrollTop: 0,
  });
});

var domain = window.location.origin;
var folderPath = window.location.pathname.substring(
  0,
  window.location.pathname.lastIndexOf("/") + 1
);

var url = domain + folderPath;

//achievement
var achievementCircle1 = new Vivus("achievement-circle-1", {
  type: "sync",
  duration: 100,
  file: url + "/img/achievement-circle.svg",
});
var achievementCircle2 = new Vivus("achievement-circle-2", {
  type: "sync",
  duration: 100,
  file: url + "/img/achievement-circle.svg",
});

$("#achievement-circle-1")
  .on("scrollSpy:enter", function () {
    redraw(achievementCircle1);
    redraw(achievementCircle2);
    countUp();
  })
  .scrollSpy();

//investChoose
var btn1 = new Vivus("investChoose-btn-1", {
  type: "sync",
  duration: 150,
  file: url + "/img/investChoose-btn-1.svg",
});
var btn2 = new Vivus("investChoose-btn-2", {
  type: "sync",
  duration: 150,
  file: url + "/img/investChoose-btn-2.svg",
});
var btn3 = new Vivus("investChoose-btn-3", {
  type: "sync",
  duration: 150,
  file: url + "/img/investChoose-btn-3.svg",
});
var btn4 = new Vivus("investChoose-btn-4", {
  type: "sync",
  duration: 150,
  file: url + "/img/investChoose-btn-4.svg",
});

$("#investChoose-btn-1")
  .on("scrollSpy:enter", function () {
    redraw(btn1);
  })
  .scrollSpy();
$("#investChoose-btn-2")
  .on("scrollSpy:enter", function () {
    redraw(btn2);
  })
  .scrollSpy();
$("#investChoose-btn-3")
  .on("scrollSpy:enter", function () {
    redraw(btn3);
  })
  .scrollSpy();
$("#investChoose-btn-4")
  .on("scrollSpy:enter", function () {
    redraw(btn4);
  })
  .scrollSpy();

//csr
var sun = new Vivus("sun", {
  type: "sync",
  duration: 100,
  file: url + "/img/sun.svg",
});
var csrCircle1 = new Vivus("csr-circle-1", {
  type: "sync",
  duration: 100,
  file: url + "/img/csr-circle.svg",
});
var csrCircle2 = new Vivus("csr-circle-2", {
  type: "sync",
  duration: 100,
  file: url + "/img/csr-circle.svg",
});
var sliderLine = new Vivus("slider-line", {
  type: "oneByOne",
  duration: 100,
  file: url + "/img/slider-line.svg",
});

$("#sun")
  .on("scrollSpy:enter", function () {
    redraw(sun);
  })
  .scrollSpy();
$("#csr-circle-1")
  .on("scrollSpy:enter", function () {
    redraw(csrCircle1);
    redraw(csrCircle2);
    countUp();
  })
  .scrollSpy();

//tl
var timelineBottomLine = new Vivus("timelineBottomLine", {
  type: "oneByOne",
  duration: 100,
  file: url + "/img/timeline-bottom-line.svg",
});
$("#timelineBottomLine")
  .on("scrollSpy:enter", function () {
    redraw(timelineBottomLine);
  })
  .scrollSpy();

//join
var qrLine = new Vivus("qrLine", {
  type: "sync",
  duration: 100,
  file: url + "/img/qr-line.svg",
});
var lineIcon = new Vivus("lineIcon", {
  type: "sync",
  duration: 100,
  file: url + "/img/line-icon.svg",
});
$("#qrLine")
  .on("scrollSpy:enter", function () {
    redraw(qrLine);
    redraw(lineIcon);
  })
  .scrollSpy();

function redraw(icon) {
  icon.reset();
  icon.play(1);
}

$(".video__border")
  .on("scrollSpy:enter", function () {
    initClass($(".video__border"));
  })
  .scrollSpy();
$(".achievement__btn-border")
  .on("scrollSpy:enter", function () {
    initClass($(".achievement__btn-border"));
  })
  .scrollSpy();

function initClass(el) {
  el.removeClass("active");
  setTimeout(function () {
    el.addClass("active");
  }, 500);
}

function countUp() {
  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).attr("data-num"),
        },
        {
          duration: 2000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
}

function scrollTo(el) {
  $("body, html").animate({
    scrollTop: el.offset().top - $("header").height() - 20,
  });
  $(".header").removeClass("open");
  if (mdSize.matches) {
    $(".header__anchor-list").fadeOut();
  }
}
AOS.init({
  once: true,
});

$(".down-arrow").on("click", function () {
  scrollTo($(".achievement"));
});

scrollGrow($("#scrollGrow1"));
scrollGrow($("#scrollGrow2"));
scrollGrow($("#scrollGrow3"));
scrollGrow($("#scrollGrow4"));
function scrollGrow(target) {
  var scrollTop = target.offset().top * 1.1;
  $(window).on("scroll", function () {
    var wt = $(window).scrollTop() + $(window).height();
    var nowScrollTop = wt - scrollTop;
    var step = Math.floor(target.height() / 80);
    target
      .find("div")
      .css(
        "height",
        Math.floor(nowScrollTop / step) > 100
          ? "100%"
          : Math.floor(nowScrollTop / step) + "%"
      );
  });
}
