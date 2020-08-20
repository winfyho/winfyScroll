const transform = (el, attrs = {}) => {

    // let transformAttr = ['translateX', 'translateY']
    if (!el.transform) {
        el.transform = {}
    }

    let attrArray = Object.keys(attrs)

    if (attrArray.length > 0) {
        el.transform.translateX = attrs.translateX
        el.transform.translateY = attrs.translateY
        let x = attrs.translateX || el.transform.translateX || 0
        let y = attrs.translateY || el.transform.translateY || 0
        el.style.transform = `translateX(${x}px) translateY(${y}px)`
    }


    return el.transform

}

export {
    transform
}