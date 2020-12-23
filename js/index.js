// file data
var file_TagData = [];

// open index.html event
document.addEventListener("DOMContentLoaded", function () {

    // add event
    animationAddition();

    // add click event
    document.getElementById('modalWindow').addEventListener('click', (e) => e.stopPropagation());

    // load tag.json
    LoadTextFile("./data/tag.json", function (tagData) {
        // create color tag
        additionTagColor(tagData);

        // load skill.json
        LoadTextFile("./data/skill.json", function (skillData) {
            // create skill list
            createSkillList(tagData, skillData);
        });
    });

    // load for contents
    LoadTextFile("./data/contents.json", (result) => InitialWorks(result));
    LoadTextFile("./data/text.json", (result) => setText(result));
    LoadTextFile("./data/theme.json", (result) => setTheme(result));
    LoadTextFile("./data/archive.json", (result) => createArchive(result));
    LoadTextFile("./data/log.json", (result) => logGeneration(result));
});

