// setSkill
export default function setSkill(result1, result2) {

    // json
    let tagData = JSON.parse(result1);
    let skillData = JSON.parse(result2);

    // get
    let frame = document.getElementById("skill_frame");
    frame.textContent = "";

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
            skill_button.classList.add("button", tagData.find((item) => { return skillData[i]["skill"][j] == item["name"]; })["tag"]);
            skill.appendChild(skill_button);
            skill_parent.appendChild(skill);
        }

        // addition
        frame.appendChild(skill_title);
        frame.appendChild(skill_parent);
    }
}
