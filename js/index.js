function showContents() {
    document.getElementById("top").style.animationPlayState = "running";
    document.getElementById("contents").style.animationPlayState = "running";
    document.getElementById("contents").style.display = "block";
}

// デバッグ用
window.addEventListener("DOMContentLoaded", function () {
    showContents();
    modalOpen("./html/portfolio.html","ポートフォリオ");
});
