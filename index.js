import WinfyScroll from "./winfyScroll.js"
const ctx = '@WinfyScroll';
const plugin = {
    install: function (Vue) {
        Vue.directive('winfy-scroll', {
            bind(el, binding, vnode) {
                const vm = vnode.context;
                console.log(el);


                vm.$nextTick(_ => {

                    WinfyScroll({
                        el,
                        srcollY: true,
                        srcollX: false,
                        preventMove: true,
                        threshold: 0,

                        onTouchStart(e) {
                        },

                        onScroll: (e, info) => {
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

                })
            },
        });
    }
}
export default plugin