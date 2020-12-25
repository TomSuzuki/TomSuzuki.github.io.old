// close modal
function modalClose() {
    document.getElementById("modal").classList.remove("fadeIn");
    document.getElementById("modal").classList.add("fadeOut");
    removeParameter("content");
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
    xhr.onload = () => {
        loadTextFile(([`./md/error.md`, `${path}`])[Number(xhr.status === 200)], (result) => {
            contentWindow(([`Error - 404 - File not found`, `./html/${title}.html`])[Number(xhr.status === 200)], (function (result) {
                let code = marked(result);
                code = replaceAll(code, "./img/", "./md/img/");
                code = replaceAll(code, "./contents/", "./md/contents/");
                return code;
            }(result)));
        });
    }
    xhr.send();
}