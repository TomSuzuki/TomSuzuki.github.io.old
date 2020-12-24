// check parameter
function paramCheck() {
    let contentTitle = getParam("content");
    if (contentTitle != null) {
        scrollToID("works", -20, 500);
        let contentPath = [{ "title": "", "path": null }, ...contentData].reduce((pre, cur) => cur["title"] == contentTitle ? cur["path"] : pre);
        modalOpen(contentPath, contentTitle);
    }
}

// get parameter
function getParam(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    let url = window.location.href;
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// delete parameter
function delParam(target) {
    let urlQueryString = document.location.search;
    let replaceQueryString = "";
    let params = urlQueryString.slice(1).split("&");
    if (urlQueryString != "") {
        for (let i in params) {
            if (params[i].split("=")[0] === target) continue;
            if (replaceQueryString != "") replaceQueryString += "&";
            else replaceQueryString += "?";
            replaceQueryString += params[i];
        }
    }
    window.history.replaceState(null, null, "index.html" + replaceQueryString);
}

// get cookie
function GetCookie(key) {
    if (document.cookie.indexOf(key) === -1) return null;
    let result = null;
    let cookieName = key + '=';
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

// set cookie
function SetCookie(key, value) {
    document.cookie = `${key}=${value}`;
}
