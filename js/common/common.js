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

// embedHTML ...embed html in key element if key is not null
export function embedHTML(key, html) {
    if (document.getElementById(key) != null)
        document.getElementById(key).innerHTML = html;
}

// setParameter ...set parameter
export function setParameter(name, key) {
    let url = new URL(window.location.href);
    url.searchParams.set(name, key);
    window.history.replaceState(null, null, url.toString());
}

// getParameter ...get parameter
export function getParameter(name) {
    let url = new URL(window.location.href);
    let key = url.searchParams.get(name);
    return key;
}

// removeParameter ...delete parameter
export function removeParameter(name) {
    let url = new URL(window.location.href);
    url.searchParams.delete(name);
    window.history.replaceState(null, null, url.toString());
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