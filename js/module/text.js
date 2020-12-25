import { embedHTML } from "../common/common.js"

// setText ...
export default function setText(result) {
    let textData = JSON.parse(result);

    // simple text
    let tagText = textData["text"];
    for (let key in tagText) {
        embedHTML(key, tagText[key]);
    }

    // list text
    let tagList = textData["list"];
    for (let key in tagList) {
        let html = tagList[key].reduce((previousValue, currentValue) => { return previousValue += `<li>${currentValue}</li>` }, "");
        embedHTML(key, html);
    }
}