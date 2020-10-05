// addition style
function additionTagColor(_tagData) {

    // json
    let tagData = JSON.parse(_tagData);

    // button color
    for (let i in tagData) {
        stylesheet = document.styleSheets.item(document.styleSheets.length - 1);
        stylesheet.insertRule(`.${tagData[i]["tag"]} { border-color : ${tagData[i]["color"]} }`, stylesheet.cssRules.length);
    }
}
