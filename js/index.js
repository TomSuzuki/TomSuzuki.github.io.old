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

    // load text.json
    loadTextFile("./data/text.json", function (textData) {
        // text
        setText(textData);
    });

    // load theme.json
    loadTextFile("./data/theme.json", function (themeData) {
        // set theme button
        setTheme(themeData);
    });

    // load archive.json
    loadTextFile("./data/archive.json", function (archiveData) {
        // set archive list
        createArchive(archiveData);
    });
});

