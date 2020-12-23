// load text file
function loadTextFile(fName, Callback) {
	var httpObj = createXMLHttpRequest();
	httpObj.onreadystatechange = function () {
		if (httpObj.readyState === 4 && httpObj.status === 200) {
			Callback(httpObj.responseText);
		}
	}
	httpObj.open("GET", fName, true);
	httpObj.send(null);
}

// http
function createXMLHttpRequest() {
	var XMLhttpObject = null;
	try {
		XMLhttpObject = new XMLHttpRequest();
	} catch (e) {
		return null;
	}
	return XMLhttpObject;
}
