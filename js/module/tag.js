// setTagColor ...addition style
export default function setTagColor(_tagData) {

    // json
    let tagData = JSON.parse(_tagData);

    // button color
    for (let i in tagData) {
        let stylesheet = document.styleSheets.item(document.styleSheets.length - 1);
        stylesheet.insertRule(`.${tagData[i]["tag"]} { border-color : ${tagData[i]["color"]} }`, stylesheet.cssRules.length);
    }
}
