import { getCookie, setCookie } from "../common/common.js";

// setTheme ...
export default function setTheme(result) {

    // initialize
    let color = JSON.parse(result);
    let id = getCookie('themeID') || 0;
    if (id > color.length || id < 0) id = 0;
    stylePropertys(color[id]);

    // color button
    let frame = document.getElementById("theme_list");
    for (let i in color) {
        // create color button
        let div = document.createElement("div");
        div.innerHTML = `<div class="theme_button ani" style="background-color: ${color[i]["--Color_Theme"]};"><div class="inner" style="background-color: ${color[i]["--Color_White1"]};"></div></div>`;

        // add event
        div.addEventListener("click", function () {
            stylePropertys(color[i]);
            setCookie("themeID", i);
        });

        // append
        frame.appendChild(div);
    }

    // stylePropertys ...css update.
    function stylePropertys(style) {
        Object.keys(style).forEach(key => {
            document.documentElement.style.setProperty(key, style[key]);
        });
    }
}