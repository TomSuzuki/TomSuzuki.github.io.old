import { setParameter, removeParameter, loadTextFile, dirname } from "../common/common.js";

// modalClose ...close modal
export function modalClose() {
    document.getElementById("modal").classList.remove("fadeIn");
    document.getElementById("modal").classList.add("fadeOut");
    removeParameter("content");
}

// modalOpen ...open modal (markdown filepath, window title)
export function modalOpen(path, title) {

    // default
    const ERROR_FILE = "./md/error.md";
    const ERROR_TITLE = "Error - 404 - File not found";

    // url edit
    setParameter("content", title);

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
    let dir = dirname(path) + "/";
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${path}`, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
        loadTextFile(([ERROR_FILE, `${path}`])[Number(xhr.status === 200)], (result) => {
            contentWindow(([ERROR_TITLE, `./html/${title}.html`])[Number(xhr.status === 200)], (function (result) {
                return marked(result).replaceAll('href="./', 'href="' + dir).replaceAll('src="./', 'src="' + dir);
            }(result)));
        });
    }
    xhr.send();
}
