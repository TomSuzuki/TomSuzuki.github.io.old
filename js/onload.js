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
			for (var j in contentData[i]["tag"]) tagString += (`#${contentData[i]["tag"][j]}  `);
			content.setAttribute("class", "works_tileFrame");
			content.setAttribute("href", "javascript:void(0);");
			contentChild.setAttribute("class", "works_tileFrameLayout");
			content.setAttribute("onclick", `modalOpen("${contentData[i]["path"]}", "${contentData[i]["title"]}");`);
			contentChild.insertAdjacentHTML("beforeend", `<img src="${contentData[i]["image"]}" onerror="this.src='./img/default.gif';" ><h3 class="title">${contentData[i]["title"]}</h3><h5 class="date">${contentData[i]["date"]}</h5><h5 class="tag">${tagString}</h5>`);
			content.appendChild(contentChild);
			doc_content_box.appendChild(content);
		}
	});
});

// フォントロード関連
window.addEventListener("DOMContentLoaded", function () {
	function detectFontLoading(fontName) {
		var tester = document.createElement('span');
		tester.style.fontFamily = '"' + fontName + '", "Blank Font"';
		tester.style.position = 'fixed';
		tester.style.top = '-100px';
		tester.appendChild(document.createTextNode('a'));
		document.body.appendChild(tester);
		tester.classList.add("__tester");
		// これとtesterがが違うなら読み込み完了
		var tester2 = document.createElement('span');
		tester2.style.fontFamily = '"Blank Font"';
		tester2.style.position = 'fixed';
		tester2.style.top = '-100px';
		tester2.appendChild(document.createTextNode('a'));
		tester2.classList.add("__tester");

		document.body.appendChild(tester);
		document.body.appendChild(tester2);
		var timerId = setInterval(checkWidth, 500);
		var cnt = 0;
		function checkWidth() {
			var tmp = 10000 * tester.getBoundingClientRect().width;
			if (cnt++ > 24 || (cnt > 1 && 10000 * tester.getBoundingClientRect().width != 10000 * tester2.getBoundingClientRect().width)) {
				//console.log(10000 * tester.getBoundingClientRect().width, 10000 * tester2.getBoundingClientRect().width);
				clearInterval(timerId);
				document.documentElement.className += ' ' + fontName.toLowerCase().replace(/\s/g, '_');
				let tmp = document.getElementsByClassName("__tester");
				for (let t of tmp) t.parentNode.removeChild(t);
				// ロード完了
				document.getElementById("load").style.display = "none";
				document.getElementById("top").style.display = "table";
			}
		}
	}
	detectFontLoading("851手書き雑フォント");
});