// text
function setText(result) {
    let textData = JSON.parse(result);

    // simple text
    let tagText = textData["text"];
    for (key in tagText) {
        if (document.getElementById(key) == null) continue;
        document.getElementById(key).innerHTML = tagText[key];
    }

    // list text
    let tagList = textData["list"];
    for (key in tagList) {
        if (document.getElementById(key) == null) continue;
        let ul = document.getElementById(key);
        for (i in tagList[key]) {
            let li = document.createElement("li");
            li.innerHTML = tagList[key][i];
            ul.appendChild(li);
        }
    }
}