// setTheme
function setTheme(_themeData) {
    let color = JSON.parse(_themeData);

    // initialize
    let id = getCookie('themeID');
    if (id > color.length || id < 0) id = 0;
    for (key in color[id]) document.documentElement.style.setProperty(key, color[id][key]);

    // color button
    let frame = document.getElementById("theme_list");
    for (let i in color) {
        let div = document.createElement("div");
        let inner = document.createElement("div");
        div.classList.add("theme_button", "ani");
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
}


// get cookie
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