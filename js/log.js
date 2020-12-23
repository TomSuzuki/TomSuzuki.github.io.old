// log
function logGeneration(result) {
    // json
    let logData = JSON.parse(result);

    // get
    let frame = document.getElementById("log_frame");
    while (frame.childNodes.length > 0) frame.childNodes[0].remove();

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