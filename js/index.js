// open index.html event
document.addEventListener("DOMContentLoaded", function () {

    // add event
    animationAddition();

    // add click event
    document.getElementById('modalWindow').addEventListener('click', (e) => e.stopPropagation());

    // load tag and skill
    Promise.all([
        new Promise((resolve) => LoadTextFile("./data/tag.json", resolve)),
        new Promise((resolve) => LoadTextFile("./data/skill.json", resolve)),
    ]).then(function (result) {
        additionTagColor(result[0]);
        createSkillList(result[0], result[1]);
    });

    // load for contents
    LoadTextFile("./data/contents.json", (result) => InitialWorks(result));
    LoadTextFile("./data/text.json", (result) => setText(result));
    LoadTextFile("./data/theme.json", (result) => setTheme(result));
    LoadTextFile("./data/archive.json", (result) => createArchive(result));
    LoadTextFile("./data/log.json", (result) => logGeneration(result));
});