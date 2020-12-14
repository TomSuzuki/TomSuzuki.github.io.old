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
		try {
			XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				return null;
			}
		}
	}
	return XMLhttpObject;
}

// file list
fileList("html/", /\.(md|html)$/, function (l) {
	console.log("response", l);
});
function fileList(pass, mat, Callback) {
	$.ajax({
		url: pass,
		success: function (data) {
			let list = [];
			$(data).find("a").attr("href", function (i, val) {
				if (val.match(mat)) {
					list.push(val);
				}
			});
			Callback(list);
		}
	});
}