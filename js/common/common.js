// dirname ...get dirname (ex. "./md/a.md" -> "./md")
export function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');;
}

// loadTextFile ...load text file from server
export function loadTextFile(fName, Callback) {
    let httpObj = new XMLHttpRequest();
    httpObj.onreadystatechange = function () {
        if (httpObj.readyState === 4 && httpObj.status === 200) Callback(httpObj.responseText);
    }
    httpObj.open("GET", fName, true);
    httpObj.send(null);
}

// EmbedHTML ...embed html in key element if key is not null
export function embedHTML(key, html) {
    if (document.getElementById(key) != null)
        document.getElementById(key).innerHTML = html;
}

// getParameter ...get parameter
export function getParameter(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    let url = window.location.href;
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// removeParameter ...delete parameter
export function removeParameter(key) {
    let queryString = "";
    let params = document.location.search.slice(1).split("&");
    for (let i in params) {
        if (params[i].split("=")[0] === key) continue;
        queryString += (queryString == "" ? "?" : "&") + params[i];
    }
    window.history.replaceState(null, null, "index.html" + queryString);
}

// getCookie ...get cookie from user
export function getCookie(key) {
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

// setCookie ...set cookie
export function setCookie(key, value) {
    document.cookie = `${key}=${value}`;
}

// showContents ...start button (top)
export function showContents() {
    scrollToID("anchor", 0, 800);
}

// scrollToID ...scroll(ID、correction（px）、time)
var isScrolling = false;
export function scrollToID(id, correction = 0, ms = 800) {
    // kill scroll
    if (isScrolling) return;
    isScrolling = true;

    // init
    const from = window.pageYOffset;
    const distance = document.getElementById(id).getBoundingClientRect().top + correction;
    const fps = 60;

    // scroll
    let count = 0;
    let interval = setInterval(() => {
        count++;
        let y = from + distance * easeOutExpo(count / (fps * ms / 1000));
        scrollTo(0, y);
        if (count == fps * ms / 1000) killScroll();
    }, 1000 / fps);

    // for kill
    window.addEventListener('wheel', () => {
        killScroll();
    });

    return;

    // kill
    function killScroll() {
        clearInterval(interval);
        isScrolling = false;
    }

    // easeing
    function easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }
}