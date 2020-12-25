// import
import { setArchive, setText, setTheme, setLog, setSkill, setTagColor } from "./layout/layout.js";
import addAnimation from "../js/animation/animation.js";

// open index.html event
document.addEventListener("DOMContentLoaded", function () {

    // add event
    addAnimation();

    // add click event
    document.getElementById('modalWindow').addEventListener('click', (e) => e.stopPropagation());

    // load tag and skill
    Promise.all([
        new Promise((resolve) => loadTextFile("./data/tag.json", resolve)),
        new Promise((resolve) => loadTextFile("./data/skill.json", resolve)),
    ]).then(function (result) {
        setTagColor(result[0]);
        setSkill(result[0], result[1]);
    });

    // load for contents
    loadTextFile("./data/contents.json", (result) => InitialWorks(result));
    loadTextFile("./data/text.json", (result) => setText(result));
    loadTextFile("./data/theme.json", (result) => setTheme(result));
    loadTextFile("./data/archive.json", (result) => setArchive(result));
    loadTextFile("./data/log.json", (result) => setLog(result));
});