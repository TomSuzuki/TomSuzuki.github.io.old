// データを読み込んでスタイルシートを変化させる
window.addEventListener("DOMContentLoaded", function () {
    // ロード
    loadTextFile("./data/tag.json", function (result) {
        let tagData = JSON.parse(result);

        // ボタンの枠線カラー
        for (let i in tagData) {
            stylesheet = document.styleSheets.item(document.styleSheets.length - 1);
            stylesheet.insertRule(`.${tagData[i]["tag"]} { border-color : ${tagData[i]["color"]} }`, stylesheet.cssRules.length);
        }
    });

});