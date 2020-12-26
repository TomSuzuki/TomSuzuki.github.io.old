// setLog ...
export default function setLog(result) {
    // init
    let logData = JSON.parse(result);
    let frame = document.getElementById("log_frame");
    frame.textContent = "";

    // create log
    frame.innerHTML = logData.reduce((previousValue, currentValue) => {
        return previousValue + `<li class="ani"><div class="log_date">${currentValue["date"]}</div><div class="log_content"><div class="log_title">${currentValue["title"]}</div><div class="log_text">${currentValue["text"] || ""}</div></div></li>`;
    }, "");
}
