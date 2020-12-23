// file data
var file_TagData = [];

// open index.html event
document.addEventListener("DOMContentLoaded", function () {

    // add event
    animationAddition();

    // create log
    logGeneration();

    // add click event
    document.getElementById('modalWindow').addEventListener('click', (e) => e.stopPropagation());

    // load tag.json
    loadTextFile("./data/tag.json", function (tagData) {
        // create color tag
        additionTagColor(tagData);

        // load skill.json
        loadTextFile("./data/skill.json", function (skillData) {
            // create skill list
            createSkillList(tagData, skillData);
        });
    });


    // load for works
    loadTextFile("./data/contents.json", function (list) {
        // JSON
        list = jsonToArray(JSON.parse(list));
        contentData = makeContentJSON(list);

        // create contens
        pageContents(0);

        // check parameter
        paramCheck();
    });

    // for other
    loadTextFile("./data/text.json", (result) => setText(result));
    loadTextFile("./data/theme.json", (result) => setTheme(result));
    loadTextFile("./data/archive.json", (result) => createArchive(result));
});

