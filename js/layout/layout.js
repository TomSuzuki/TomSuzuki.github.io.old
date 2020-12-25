export { setArchive, setText, setTheme, setLog, setSkill, setTagColor };

// setArchive ...
function setArchive(archiveData) {
    // frame
    let frame = document.getElementById("archive_frame");
    frame.innerHTML = "";
    archiveData = JSON.parse(archiveData);

    // create
    for (let y in archiveData) {
        let details = document.createElement("details");
        let summary = document.createElement("summary");
        let ul = document.createElement("ul");
        summary.textContent = `${archiveData[y]["title"]} (${archiveData[y]["list"].length})`;

        // add title
        details.appendChild(summary);
        details.appendChild(ul);

        // add list
        for (let i in archiveData[y]["list"]) {
            let dic = archiveData[y]["list"][i];
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.textContent = dic["name"];
            a.href = dic["link"];
            li.appendChild(a);
            ul.appendChild(li);
        }

        // add details
        frame.appendChild(details);
    }
}

// setText ...
function setText(result) {
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

// setTheme ...
function setTheme(result) {

    // initialize
    let color = JSON.parse(result);
    let id = getCookie('themeID') || 0;
    if (id > color.length || id < 0) id = 0;
    stylePropertys(color[id]);

    // color button
    let frame = document.getElementById("theme_list");
    for (let i in color) {
        // color frame
        let div = document.createElement("div");
        div.classList.add("theme_button", "ani");
        div.style.backgroundColor = color[i]["--Color_Theme"];

        // inner
        let inner = document.createElement("div");
        inner.classList.add("inner");
        inner.style.backgroundColor = color[i]["--Color_White1"];

        // theme change
        div.onclick = () => {
            stylePropertys(color[i]);
            setCookie("themeID", i);
        };

        // append
        div.appendChild(inner);
        frame.appendChild(div);
    }

    // stylePropertys ...css update.
    function stylePropertys(style) {
        Object.keys(style).forEach(key => {
            document.documentElement.style.setProperty(key, style[key]);
        });
    }
}

// setLog ...
function setLog(result) {
    // json
    let logData = JSON.parse(result);

    // get
    let frame = document.getElementById("log_frame");
    frame.innerHTML = "";

    // undefined -> ""
    let ifUndefined = (l, w = "") => (l === undefined ? w : l);

    // addition
    for (let i in logData) {
        let log_parent = document.createElement("li");
        log_parent.classList.add("ani");
        log_parent.innerHTML = `
                <div class="log_date">${logData[i]["date"]}</div>
                <div class="log_content">
                    <div class="log_title">${logData[i]["title"]}</div>
                    <div class="log_text">${ifUndefined(logData[i]["text"])}</div>
                </div>
            `;
        frame.appendChild(log_parent);
    }
}

// setSkill
function setSkill(result1, result2) {

    // json
    let tagData = JSON.parse(result1);
    let skillData = JSON.parse(result2);

    // get
    let frame = document.getElementById("skill_frame");
    frame.innerHTML = "";

    // create
    for (let i in skillData) {
        // initial
        let skill_parent = document.createElement("ul");
        let skill_title = document.createElement("h4");
        skill_title.innerText = skillData[i]["title"];
        skill_title.classList.add("ani");
        skill_parent.classList.add("button_list");

        // list
        for (let j in skillData[i]["skill"]) {
            let skill = document.createElement("li");
            let skill_button = document.createElement("div");
            skill_button.textContent = skillData[i]["skill"][j];
            skill.classList.add("ani");
            skill_button.classList.add("button", tagData[skillData[i]["skill"][j]]["tag"]);
            skill.appendChild(skill_button);
            skill_parent.appendChild(skill);
        }

        // addition
        frame.appendChild(skill_title);
        frame.appendChild(skill_parent);
    }
}

// setTagColor ...addition style
function setTagColor(_tagData) {

    // json
    let tagData = JSON.parse(_tagData);

    // button color
    for (let i in tagData) {
        let stylesheet = document.styleSheets.item(document.styleSheets.length - 1);
        stylesheet.insertRule(`.${tagData[i]["tag"]} { border-color : ${tagData[i]["color"]} }`, stylesheet.cssRules.length);
    }
}
