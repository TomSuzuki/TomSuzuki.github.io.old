// ログの年表を生成する（ページロード時に1回だけ実行）
window.addEventListener("DOMContentLoaded", function () {
    // ロード
    loadTextFile("./data/log.json", function (result) {
        // JSONに変換
        let logData = JSON.parse(result);

        // 取得
        let frame = document.getElementById("log_frame");
        while (frame.childNodes.length > 0) frame.childNodes[0].remove();

        // undefinedだったときは空白にする
        let ifUndefined = (l, w = "") => (l === undefined ? w : l);

        // 生成
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
    });
});