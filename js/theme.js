// textに対応するIDにデータを入れる
window.addEventListener("DOMContentLoaded", function () {
    // ロード
    loadTextFile("./data/theme.json", function (result) {
        let color = JSON.parse(result);
        // 初期テーマ（theme idをcookieに保存するかも）
        let id = getCookie('themeID');
        if (id > color.length || id < 0) id = 0;
        for (key in color[id]) document.documentElement.style.setProperty(key, color[id][key]);

        // カラーボタン
        let frame = document.getElementById("theme");
        for (let i in color) {
            let div = document.createElement("div");
            let inner = document.createElement("div");
            div.classList.add("themeButton", "ani", "ani--up");
            inner.classList.add("inner");
            div.style.backgroundColor = color[i]["--Color_Theme"];
            inner.style.backgroundColor = color[i]["--Color_White1"];
            div.onclick = () => {
                for (key in color[i]) document.documentElement.style.setProperty(key, color[i][key]);
                document.cookie = `themeID=${i}`;
            };
            div.appendChild(inner);
            frame.appendChild(div);
        }
    });
});

// クッキーの取得
function getCookie(str) {
    if (document.cookie.indexOf(str) === -1) return null;
    let result = null;
    let cookieName = name + '=';
    let allcookies = document.cookie;
    let position = allcookies.indexOf(cookieName);
    if (position != -1) {
        let startIndex = position + cookieName.length;
        let endIndex = allcookies.indexOf(';', startIndex);
        if (endIndex == -1) endIndex = allcookies.length;
        result = decodeURIComponent(allcookies.substring(startIndex, endIndex));
    }
    return result;
}