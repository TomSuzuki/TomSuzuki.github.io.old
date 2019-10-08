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

function sleep(waitMsec) {
	var startMsec = new Date();
	while (new Date() - startMsec < waitMsec);
  }

WebFont.load({
	custom: {
		families: [ '851手書き雑フォント' ]
	}, active: function () {
		document.getElementById("load").style.display = "none";
		document.getElementById("top").style.display = "table";
	},
	inactive: function () {
		document.getElementById("load").style.display = "none";
		document.getElementById("top").style.display = "table";
	},
});