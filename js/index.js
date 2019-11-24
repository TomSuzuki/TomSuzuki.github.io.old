// スタートボタンを押したときに実行
function showContents() {
    document.getElementById("top").style.animationDirection = ".8s";
    document.getElementById("top").style.animationName = "pageOut";
    document.getElementById("contents").style.animationPlayState = "running";
    document.getElementById("contents").style.display = "block";
}
