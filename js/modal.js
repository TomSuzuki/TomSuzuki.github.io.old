// ウィンドウを閉じる
function modalClose() {
    document.body.style.overflow = "auto";
    document.getElementById("modal").style.display = "none";
}

// クリックのイベント登録
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById('modalWindow').addEventListener('click', (e) => e.stopPropagation());
});

// 開く
function modalOpen(path, title) {
    document.body.style.overflow = "hidden";
    contentWindow("Now Loading...", "Now Loading...");
    document.getElementById("modal").style.display = "block";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${path}`, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        loadTextFile(([`./html/error.html`, `${path}`])[Number(xhr.status === 200)], function (result) {
            contentWindow(([`Error - 404 - File not found`, `./html/${title}.html`])[Number(xhr.status === 200)], result);
        });
    }
    xhr.send();
}

// 組み立てる
function contentWindow(title, text) {
    document.getElementById("modalBarTitle").innerHTML = title;
    document.getElementById("modalContent").innerHTML = text;
}