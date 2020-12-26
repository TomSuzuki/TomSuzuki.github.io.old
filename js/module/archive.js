// setArchive ...
export default function setArchive(archiveData) {
    // frame
    let frame = document.getElementById("archive_frame");
    frame.textContent = "";
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
        let list = archiveData[y]["list"];
        ul.innerHTML = list.reduce((previousValue, currentValue) => {
            return previousValue + `<li><a href="${currentValue["link"]}">${currentValue["name"]}</a></li>`;
        }, "");

        // add details
        frame.appendChild(details);
    }
}