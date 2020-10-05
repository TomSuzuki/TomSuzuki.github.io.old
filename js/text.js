// text
function setText(_textData) {
    let textData = JSON.parse(_textData);

    // simple text
    let tagText = textData["text"];
    for (key in tagText) if (document.getElementById(key) != null) document.getElementById(key).innerHTML = tagText[key];

    // list text
    let tagList = textData["list"];
    for (key in tagList) if (document.getElementById(key) != null) {
        let ul = document.getElementById(key);
        for (i in tagList[key]) {
            let li = document.createElement("li");
            li.innerHTML = tagList[key][i];
            ul.appendChild(li);
        }
    }
}