(function ($) {

    var targetElm = $(document.body);

    var loadingFrame = $("div[class='overlayMask open']");

    var contentWrap = $('.wrapper');

    var countingThreshold = 0;
    var lastCount = 0;

    var imgElm = $('img[on-image-load]');

    var timeOut = function (value, element) {
        setTimeout(function () {
            void 0;
            void 0;
            if (value) {
                $(element).addClass('imageLoaded');
            }
        });
    };

    imgElm.one("load", function () {
        timeOut(true, $(this));
    }).each(function () {
        if (this.complete) timeOut(true, $(this));
    });



    var totalImgNum = 0;
    targetElm.find('img[on-image-load]').each(function () {
        if ($(this).css('display') != 'none') {
            totalImgNum++;
        }
    });

    var finishAction = function () {
        contentWrap.addClass('show');


        loadingFrame.removeClass('open');

        if (typeof window.loadingCompleteCallback != 'undefined') {
            window.loadingCompleteCallback();
        }

        var event;
        if (typeof Event === 'function') {
            event = new Event('loading.completed');
        } else {
            event = document.createEvent('Event');
            event.initEvent('loading.completed', true, true);
        }
        document.dispatchEvent(event);
    };

    void 0;

    var chkImg = setInterval(function () {

        var okImgNum = targetElm.find('img[class$="imageLoaded"]').length;
        void 0;

        if (okImgNum == totalImgNum) {
            finishAction();

            clearInterval(chkImg);
        } else {
            if (lastCount != okImgNum) {
                lastCount = okImgNum;
            } else {
                countingThreshold++;
            }
        }

        if (countingThreshold > 10) {
            finishAction();

            clearInterval(chkImg);
        }

        if (okImgNum != totalImgNum && okImgNum != 0) {
            var stepRate = Math.floor(okImgNum / totalImgNum * 100);
            void 0;
        }
        if ($('#loadingText').length) {
            document.getElementById('loadingText').innerHTML = String(stepRate);
        }

        if ($('#loadingPic').length) {
            document.getElementById('loadingPic').style.height = String(100 - stepRate) + '%';
        }
    }, 100);
})(jQuery);
