import WinfyScroll from "../winfyScroll.js"

const scrollEle = document.getElementById('scroll')
WinfyScroll({
    el: scrollEle,
    srcollY: true,
    srcollX: false,
    preventMove: true,
    threshold: 0,

    onTouchStart(e) {
    },

    onScroll: (e, info) => {
        // console.log('winfy-scroll', info);
    },

    onTouchEnd(e) {

    },

    onScrollToUpper(e) {
        console.log('onScrollToUpper', e);
    },
    onScrollToLower(e) {
        console.log('onScrollToLower', e);
    }

})