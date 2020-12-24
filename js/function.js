// replaceAll
function ReplaceAll(string, target, replacement) {
    do {
        if (string.indexOf(target) == -1) return string;
        string = string.replace(target, replacement);
    } while (true);
}

// load text file
function LoadTextFile(fName, Callback) {
	let httpObj = new XMLHttpRequest();
	httpObj.onreadystatechange = function () {
		if (httpObj.readyState === 4 && httpObj.status === 200) Callback(httpObj.responseText);
	}
	httpObj.open("GET", fName, true);
	httpObj.send(null);
}
