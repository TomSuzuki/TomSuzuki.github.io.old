// skill
function createSkillList(_tagData, _skillData) {

    // json
    let tagData = JSON.parse(_tagData);
    let skillData = JSON.parse(_skillData);

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