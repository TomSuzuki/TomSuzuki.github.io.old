// コンテンツ関連
window.addEventListener("DOMContentLoaded", function () {
	// コンテンツのデータをすべてロード
	loadTextFile("./data/content.json", function (result) {
		// コンテンツデータをjsonに
		contentData = JSON.parse(result);

		// コンテンツを組み立てる（量が多い場合は...あとで...）
		var doc_content_box = document.getElementById("works_parentFrame");	// 親DOM
		while (doc_content_box.childNodes.length > 0) doc_content_box.childNodes[0].remove();

		// 追加
		for (var i in contentData) {
			var content = document.createElement("a");
			var contentChild = document.createElement("div");
			var tagString = "";
			for (var j in contentData[i]["tag"]) tagString += (`#${contentData[i]["tag"][j]} `);
			content.setAttribute("class", "works_tileFrame");
			content.setAttribute("href", "javascript:void(0);");
			contentChild.setAttribute("class", "works_tileFrameLayout");
			content.setAttribute("onclick", `modalOpen("${contentData[i]["path"]}", "${contentData[i]["title"]}");`);
			contentChild.insertAdjacentHTML("beforeend", `<img src="${contentData[i]["image"]}" onerror="this.src='./img/default.gif';" ><div class="works_tileText"><h3 class="title">${contentData[i]["title"]}</h3><h5 class="date">${contentData[i]["date"]}</h5><h5 class="tag">${tagString}</h5></div>`);
			content.appendChild(contentChild);
			doc_content_box.appendChild(content);
		}
	});
});

/*
function sleep(waitMsec) {
	var startMsec = new Date();
	while (new Date() - startMsec < waitMsec);
}
/**/

// フォントロード関連
// 容量の少ないaだけの幅0のフォントを使って幅があったらフォントのロードが完了
// が理想だけど作ったフォントの幅がおかしい（幅13ある）のでそれを下回ったらロード完了

window.addEventListener("DOMContentLoaded", function () {
	function detectFontLoading(fontName) {
		var tester = document.createElement('span');
		tester.style.fontFamily = '"' + fontName + '", "Blank Font"';
		tester.style.position = 'fixed';
		tester.style.top = '-100px';
		tester.appendChild(document.createTextNode('a'));
		document.body.appendChild(tester);
		var timerId = setInterval(checkWidth, 500);
		var cnt = 0;
		function checkWidth() {
			if (cnt++ > 10 || (cnt > 4 && tester.offsetWidth < 12)) {
				//console.log(tester.offsetWidth);
				clearInterval(timerId);
				document.documentElement.className += ' ' + fontName.toLowerCase().replace(/\s/g, '_');
				tester.parentNode.removeChild(tester);
				// ロード完了
				document.getElementById("load").style.display = "none";
				document.getElementById("top").style.display = "table";
			}
		}
	}
	detectFontLoading("851手書き雑フォント");
});