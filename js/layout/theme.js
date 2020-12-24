// setTheme
function setTheme(_themeData) {
    let color = JSON.parse(_themeData);

    // initialize
    let id = GetCookie('themeID');
    if (id > color.length || id < 0) id = 0;
    Object.keys(color[id]).forEach(key => {
        document.documentElement.style.setProperty(key, color[id][key]);
    });

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
            SetCookie("themeID", i);
        };
        div.appendChild(inner);
        frame.appendChild(div);
    }
}

