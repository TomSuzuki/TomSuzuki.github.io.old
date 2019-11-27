// textに対応するIDにデータを入れる
window.addEventListener("DOMContentLoaded", function () {
    // ロード
    loadTextFile("./data/text.json", function (result) {
        let tagText = JSON.parse(result);
        for (key in tagText) if (document.getElementById(key) != null) document.getElementById(key).textContent = tagText[key];
    });
});