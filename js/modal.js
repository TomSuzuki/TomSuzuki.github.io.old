// close modal
function modalClose() {
    document.getElementById("modal").classList.remove("fadeIn");
    document.getElementById("modal").classList.add("fadeOut");
    const url = new URL(location);
    delParam("content");
}

// open modal
function modalOpen(path, title) {

    // url edit
    window.history.replaceState(null, null, '?content=' + title);

    // for create
    let contentWindow = (title, text) => {
        document.getElementById("modalBarTitle").innerHTML = title;
        document.getElementById("modalContent").innerHTML = text;
    }

    // now loading...
    contentWindow("Now Loading...", "Now Loading...");
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal").classList.add("fadeIn");
    document.getElementById("modal").classList.remove("fadeOut");

    // load
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${path}`, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        loadTextFile(([`./html/error.html`, `${path}`])[Number(xhr.status === 200)], function (result) {
            contentWindow(([`Error - 404 - File not found`, `./html/${title}.html`])[Number(xhr.status === 200)], marked(result));
        });
    }
    xhr.send();
}
