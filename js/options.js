// ページロード時にパラメータがあった場合の処理用

// パラメータのチェックを行う（コンテンツデータロード後に行う）
function paramCheck() {
    // パラメータがあるか解析
    let contentTitle = getParam("content");

    // あった場合の処理
    if (contentTitle != null) {
        scrollToID("works", -20, 500);
        let contentPath = [{ "title": "", "path": null }, ...contentData].reduce((pre, cur) => cur["title"] == contentTitle ? cur["path"] : pre);
        modalOpen(contentPath, contentTitle);
    }

}

// パラメータの取得
function getParam(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// パラメータの削除
function delParam(target) {
    var urlQueryString = document.location.search;
    var replaceQueryString = "";
    var params = urlQueryString.slice(1).split("&");
    if (urlQueryString !== "") {
        for (var i = 0; i < params.length; i++) {
            var param = params[i].split("=");
            var key = param[0];
            var value = param[1];
            if (key === target) continue;
            if (replaceQueryString !== "") replaceQueryString += "&";
            else replaceQueryString += "?";
            replaceQueryString += key + "=" + value;
        }
    }
    window.history.replaceState(null, null, "index.html" + replaceQueryString);
}