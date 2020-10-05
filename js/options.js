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
    if (urlQueryString !== "") {
        for (let i = 0; i < params.length; i++) {
            let param = params[i].split("=");
            let key = param[0];
            let value = param[1];
            if (key === target) continue;
            if (replaceQueryString !== "") replaceQueryString += "&";
            else replaceQueryString += "?";
            replaceQueryString += key + "=" + value;
        }
    }
    window.history.replaceState(null, null, "index.html" + replaceQueryString);
}