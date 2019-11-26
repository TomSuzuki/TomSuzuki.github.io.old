// スタートボタンを押したときに実行
function showContents() {
    scrollToID("contents", 0, 800);
}


window.addEventListener("DOMContentLoaded", function () {
    // アニメーション用
    let scrollAnimationElm = document.getElementsByClassName('ani');
    for (let i = 0; i < scrollAnimationElm.length; i++) scrollAnimationElm[i].classList.add('show');
    let scrollAnimationFunc = function () {
        for (let i = 0; i < scrollAnimationElm.length; i++) {
            let triggerMargin = window.innerHeight;
            if (scrollAnimationElm[i].getBoundingClientRect().top - triggerMargin < 0) scrollAnimationElm[i].classList.add('show');
            if (scrollAnimationElm[i].getBoundingClientRect().top > window.innerHeight * 1.2) scrollAnimationElm[i].classList.remove('show');
        }
    }
    scrollAnimationFunc();
    window.addEventListener('scroll', scrollAnimationFunc);
});


// 指定したIDまでスクロールする（ID、補正（px）、時間）
function scrollToID(id, cor, ms) {
    // 実行前の状態
    const frameCount = 60;	// 1秒間に何回実行するか
    let from = window.pageYOffset;
    let to = document.getElementById(id).getBoundingClientRect().top + cor;
    doSomethingLoop(frameCount * ms / 1000, 0);
    return;

    // ループ用
    function doSomethingLoop(maxCount, i) {
        if (i <= maxCount) {
            scrollTo(0, eas(from, to, i, frameCount * ms / 1000));
            setTimeout(function () { doSomethingLoop(maxCount, ++i) }, 1000 / frameCount);
        }
    }

    // イージング用
    function eas(b, c, t, d) {
        t /= d / 2.0;
        if (t < 1) return c / 2.0 * t * t + b;
        t = t - 1;
        return -c / 2.0 * (t * (t - 2) - 1) + b;
    }
}
