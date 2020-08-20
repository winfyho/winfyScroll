import { transform } from "./transform.js"
function WinfyScroll({
    el = document.body,
    srcollX = false,
    srcollY = false,
    preventMove = false,
    threshold = 50,
    onTouchStart = () => { },
    onScroll = () => { },
    onTouchEnd = () => { },
    onScrollToUpper = () => { },
    onScrollToLower = () => { }
}) {


    let startPoint = {
        x: 0,
        y: 0
    }

    let movePoint = {
        x: 0,
        y: 0
    }

    let endPoint = {
        x: 0,
        y: 0
    }

    let startPosition = {
        x: 0,
        y: 0
    }

    let position = {
        x: 0,
        y: 0
    }

    let maxHeight = 0

    let startTouchTime = 0
    let endTouchTime = 0

    const init = (el) => {
        if (preventMove) {
            el.addEventListener('touchmove', e => {
                e.preventDefault()
            })
        }
        maxHeight = el.offsetHeight - el.parentElement.offsetHeight + threshold
        transform(el, {
            translateX: 0,
            translateY: 0,
        })

    }
    init(el)


    const render = (el = document.body, pos) => {
        pos = pos || position

        // X方向滚动
        if (srcollX && srcollY === false) {
            transform(el, {
                translateX: pos.x,
                translateY: 0
            })
        }

        // Y方向滚动
        if (srcollY && srcollX === false) {
            let y = pos.y === 0 ? 0 : -pos.y
            if (y <= 0 - threshold) {
                pos.y = threshold

                // callback
                // onScrollToUpper(e)

            } else if (pos.y <= -maxHeight) {
                pos.y = -maxHeight

                // callback
                // onScrollToLower(e)

            }
            transform(el, {
                translateX: 0,
                translateY: pos.y
            })
        }

        // X Y同时移动
        // if (srcollX && srcollY) {
        //     transform(el, {
        //         translateX: pos.x,
        //         translateY: pos.y
        //     })
        // }
    }



    el.addEventListener('touchstart', e => {
        startTouchTime = new Date().getTime()
        startPoint.x = e.changedTouches[0].pageX
        startPoint.y = e.changedTouches[0].pageY

        let elTransform = transform(el)

        startPosition.x = elTransform.translateX
        startPosition.y = elTransform.translateY

        el.style.transition = ``

        // callback
        onTouchStart(e)
    })

    el.addEventListener('touchmove', e => {

        movePoint.x = e.changedTouches[0].pageX - startPoint.x
        movePoint.y = e.changedTouches[0].pageY - startPoint.y

        position.x = startPosition.x + movePoint.x
        position.y = startPosition.y + movePoint.y



        let x = position.x === 0 ? 0 : -position.x
        let y = position.y === 0 ? 0 : -position.y
        if (y <= 0 - threshold) {
            position.y = threshold

            // callback
            // onScrollToUpper(e)

        } else if (position.y <= -maxHeight) {
            position.y = -maxHeight

            // callback
            // onScrollToLower(e)

        }

        // 渲染滚动
        render(el, position)

        // callback
        onScroll(e, {
            scrollX: el.transform.translateX === 0 ? 0 : -el.transform.translateX,
            scrollY: el.transform.translateY === 0 ? 0 : -el.transform.translateY
        })

    })

    el.addEventListener('touchend', e => {
        endPoint.x = e.changedTouches[0].pageX
        endPoint.y = e.changedTouches[0].pageY

        let deltTime = new Date().getTime() - startTouchTime
        let delt = {
            x: endPoint.x - startPoint.x,
            y: endPoint.y - startPoint.y,
        }

        if (deltTime <= 200 && Math.abs(delt.y) > 30) {
            console.log('运动', position, deltTime, delt.y);

            position.x += (delt.x * 10)
            position.y += (delt.y * 10)
            el.style.transition = `all ${deltTime / 80}s ease-out`
            render(el, position)

        }




        // callback
        onTouchEnd(e)

    })
}


export default WinfyScroll