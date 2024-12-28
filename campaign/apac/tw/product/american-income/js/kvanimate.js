// 呼叫 window.matchMedia Function ，代入判斷用的值，並得到 MediaQueryList 物件
var queryForPhone = window.matchMedia("(max-width: 767px)");
// 指定老鷹動畫Y軸出現的位置
var positionY = queryForPhone.matches ? 0 : -800;

// 播放30週年 loading 影片
setTimeout(function () {
    document.getElementById("aip30thVideo").play();
}, 2000);
// 取得30週年影片
const video = document.querySelector("#aip30thVideo");
// 偵測影片是否停止
video.addEventListener("pause", (e) => {
    // 左刷特效
    $("#loading").addClass("close");
    // 加入 wow 動畫效果
    wow = new WOW({ animateClass: "animated", offset: 100 });
    // wow init
    wow.init();
    // Play KV animate
    animateKV(positionY);
});

// 設定 #eagle 的初始值
gsap.set("#eagle", { opacity: 0 });
// 老鷹淡出
const animateKV = (positionY) => {
    const numberTween = gsap.timeline().fromTo(
        "#eagle",
        {
            y: positionY,
            opacity: 0,
        },
        {
            duration: 1,
            y: 0,
            opacity: 1,
            onComplete: () => {
                document.getElementById("eagle").classList.add("kv-eagle-fly-h");
            },
        },
        "+=1"
    );
};
