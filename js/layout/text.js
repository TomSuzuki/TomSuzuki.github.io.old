// text
function setText(result) {
    let textData = JSON.parse(result);

    // simple text
    let tagText = textData["text"];
    for (let key in tagText) {
        EmbedHTML(key, tagText[key]);
    }

    // list text
    let tagList = textData["list"];
    for (key in tagList) {
        let html = tagList[key].reduce((previousValue, currentValue) => { return previousValue += `<li>${currentValue}</li>` }, "");
        EmbedHTML(key, html);
    }
}