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
        // color frame
        let div = document.createElement("div");
        div.classList.add("theme_button", "ani");
        div.style.backgroundColor = color[i]["--Color_Theme"];

        // inner
        let inner = document.createElement("div");
        inner.classList.add("inner");
        inner.style.backgroundColor = color[i]["--Color_White1"];

        // theme change
        div.onclick = () => {
            stylePropertys(color[i]);
            setCookie("themeID", i);
        };

        // append
        div.appendChild(inner);
        frame.appendChild(div);
    }

    // stylePropertys ...css update.
    function stylePropertys(style) {
        Object.keys(style).forEach(key => {
            document.documentElement.style.setProperty(key, style[key]);
        });
    }
}