// ウィンドウを閉じる
function modalClose() {
    document.body.style.overflow = "auto";
    document.getElementById("modal").classList.remove("fadeIn");
    document.getElementById("modal").classList.add("fadeOut");
    const url = new URL(location);
    delParam("content");
}

// クリックのイベント登録
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById('modalWindow').addEventListener('click', (e) => e.stopPropagation());
});

// 開く
function modalOpen(path, title) {

    // URLの書き換え
    window.history.replaceState(null, null, '?content='+title);

    // 組み立て用
    let contentWindow = (title, text) => {
        document.getElementById("modalBarTitle").innerHTML = title;
        document.getElementById("modalContent").innerHTML = text;
    }

    // ロード状態
    document.body.style.overflow = "hidden";
    contentWindow("Now Loading...", "Now Loading...");
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal").classList.add("fadeIn");
    document.getElementById("modal").classList.remove("fadeOut");

    // ロード
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${path}`, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        loadTextFile(([`./html/error.html`, `${path}`])[Number(xhr.status === 200)], function (result) {
            contentWindow(([`Error - 404 - File not found`, `./html/${title}.html`])[Number(xhr.status === 200)], result);
        });
    }
    xhr.send();
}
