// GA Bounce Rate
var otherFunction = function () {
    sectionObservation();
    initRellax();
    youtubePlay();
    bindAnimeIcon();
};

// gtag DATA-GTM 程式
var customGtag = function (category, id) {
    if (category === "scrollDepth") {
        gtag("event", "scroll", { event_category: category, event_label: id });
    } else {
        gtag("event", "click", { event_category: "button", event_label: id });
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

// 設定影片的 tracking code
// youtube api 使用參考：https://developers.google.com/youtube/iframe_api_reference#Events
function clickTracking(e) {
    var data = e.data;
    if (data == "-1") {
        // 設計 gtag tracking code
        gtag("event", "click", {
            event_category: "button",
            event_label: "click-video'",
        });

        // 設定 Floodlight Tag Code: click
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        $("body").append('<iframe src="https://10511252.fls.doubleclick.net/activityi;src=10511252;type=q12020;cat=q1202001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
    }
}
function clickTracking30th(e) {
    var data = e.data;
    if (data == "-1") {
        // 設計 gtag tracking code
        gtag("event", "click", {
            event_category: "button",
            event_label: "click-animated-video'",
        });

        // 設定 Floodlight Tag Code: click
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        $("body").append('<iframe src="https://10511252.fls.doubleclick.net/activityi;src=10511252;type=q12020;cat=q22020;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
    }
}

// 設定 Floodlight Tag Code: click
$("#fltUnit01").click(function () {
    var axel = Math.random() + "";
    var a = axel * 10000000000000;
    $(this).append('<iframe src="https://10511252.fls.doubleclick.net/activityi;src=10511252;type=q12020;cat=q1202000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
});

// 設定 Floodlight Tag Code: scroll
var waypoints = $("#idAnchor3").waypoint({
    element: this,
    handler: function (direction) {
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        $("#idAnchor3").append('<iframe src="https://10511252.fls.doubleclick.net/activityi;src=10511252;type=q12020;cat=q120200;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
        this.destroy();
    },
});
