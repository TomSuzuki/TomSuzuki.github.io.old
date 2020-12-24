// Archive
function createArchive(archiveData) {
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