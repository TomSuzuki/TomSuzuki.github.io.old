// ログの年表を生成する（ページロード時に1回だけ実行）
window.addEventListener("DOMContentLoaded", function () {
    // ロード
    loadTextFile("./data/tag.json", function (result) {
        let tagData = JSON.parse(result);

        loadTextFile("./data/skill.json", function (result) {
            // JSONに変換
            let skillData = JSON.parse(result);

            // 取得
            let frame = document.getElementById("skill_frame");
            while (frame.childNodes.length > 0) frame.childNodes[0].remove();

            // 生成
            for (let i in skillData) {
                let skill_parent = document.createElement("ul");
                let skill_title = document.createElement("h4");
                skill_title.textContent = skillData[i]["title"];
                skill_title.classList.add("ani", "ani--up");
                skill_parent.classList.add("ul_ver2");
                for (let j in skillData[i]["skill"]) {
                    let skill = document.createElement("li");
                    let skill_button = document.createElement("div");
                    skill_button.textContent = skillData[i]["skill"][j];
                    skill.classList.add("ani", "ani--up");
                    skill_button.classList.add("Button", tagData[skillData[i]["skill"][j]]["tag"]);
                    skill.appendChild(skill_button);
                    skill_parent.appendChild(skill);
                }
                frame.appendChild(skill_title);
                frame.appendChild(skill_parent);
            }
        });
    });
});