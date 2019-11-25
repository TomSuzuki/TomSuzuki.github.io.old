// スタートボタンを押したときに実行
function showContents() {
    document.getElementById("top").style.animationDirection = ".8s";
    document.getElementById("top").style.animationName = "pageOut";
    document.getElementById("contents").style.animationPlayState = "running";
    document.getElementById("contents").style.display = "block";

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
}
