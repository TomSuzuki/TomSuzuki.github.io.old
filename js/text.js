// textに対応するIDにデータを入れる
window.addEventListener("DOMContentLoaded", function () {
    // ロード
    loadTextFile("./data/text.json", function (result) {
        let textData = JSON.parse(result);

        // テキストを配置
        let tagText = textData["text"];
        for (key in tagText) if (document.getElementById(key) != null) document.getElementById(key).innerHTML = tagText[key];

        // リストに追加
        let tagList = textData["list"];
        for (key in tagList) if (document.getElementById(key) != null) {
            let ul = document.getElementById(key);
            for (i in tagList[key]) {
                let li = document.createElement("li");
                li.innerHTML = tagList[key][i];
                ul.appendChild(li);
            }
        }
    });
});