// setTagColor ...addition style
export default function setTagColor(result) {
    // add color style
    let list = JSON.parse(result);//list
    let stylesheet = document.styleSheets.item(document.styleSheets.length - 1);
    for (let i in list) {
        stylesheet.insertRule(`.${list[i]["tag"]} { border-color : ${list[i]["color"]} }`, stylesheet.cssRules.length);
    }
}
