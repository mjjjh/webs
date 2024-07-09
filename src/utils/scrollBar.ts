// params:--scrollbar-display,--navbar-transparent,--navbar-lfet

import type { HtmlHTMLAttributes } from "vue";

//自定义滚动条
function myScrollBar(elementBox:HTMLElement,elementScroll:HTMLElement,param:string[]){
    //滚动条
    // const element = document.querySelector<HTMLElement>('.AI-D-NNN') as HTMLElement;
    // const elementB = document.querySelector<HTMLElement>('.navBar') as HTMLElement;
    
    // 获取计算后的样式
    const computedStyle = window.getComputedStyle(elementBox);
    // const computedStyleF = window.getComputedStyle(elementf);

    elementBox.addEventListener('mouseenter', () => {
        elementScroll.style.setProperty(param[1], "0.7");
        elementBox.addEventListener('wheel', handleWheelEvent);
    });

    elementBox.addEventListener('mouseleave', () => {
        elementScroll.style.setProperty(param[1], "0");
        // 移除滚动事件监听器
        elementBox.removeEventListener('wheel', handleWheelEvent);
    });

    function handleWheelEvent(e:WheelEvent) {
        // console.log(e)
        let gundong = (e.deltaY) * 3 * 0.6; 
            

        // 获取transform属性的值
        const transformValue = computedStyle.getPropertyValue('transform');
        
        // console.log(transformValue) //matrix(1, 0, 0, 1, 31, 21)
        // 滚动元素
        const before = transformValue.split(',')[4];
        // console.log(Number(before) + gundong);
        let now = Number(before) + gundong;
        const widthC = elementBox.scrollWidth - elementBox.clientWidth;
        // console.log(widthC);
        
        if(now > 0) now = 0;
        if(now <= -widthC) now = -widthC;
        let barLeft = -now / widthC * (elementBox.clientWidth - elementScroll.clientWidth);
        if(barLeft < 0) barLeft = 0;
        elementScroll.style.setProperty(param[2],`${barLeft}px`);
        // console.log(barLeft);
        // element.scrollLeft += dundong;
        elementBox.style.setProperty(param[0], `${now}px`);
    }
}

export default myScrollBar;