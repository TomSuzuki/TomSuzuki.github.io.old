// コンテンツ関連
var contentsPage = 0;
var contentData = null;
window.addEventListener("DOMContentLoaded", function () {
	// コンテンツのデータをすべてロード
	loadTextFile("./data/content.json", function (result) {
		// コンテンツデータをjsonに
		contentData = JSON.parse(result);

		// コンテンツを組み立てる
		pageContents(0);
	});
});

// コンテンツを消す関数
function delContents() {
	let doc_content_box = document.getElementById("works_parentFrame");	// 親DOM
	while (doc_content_box.childNodes.length > 0) doc_content_box.childNodes[0].remove();
}

// コンテンツを追加するための関数
function addContents(data) {
	let doc_content_box = document.getElementById("works_parentFrame");
	let content = document.createElement("a");
	let contentChild = document.createElement("div");
	let tagString = "";
	for (let j in data["tag"]) tagString += (`#${data["tag"][j]}  `);
	content.setAttribute("class", "works_tileFrame ani ani--up");
	content.setAttribute("href", "javascript:void(0);");
	contentChild.setAttribute("class", "works_tileFrameLayout");
	content.setAttribute("onclick", `modalOpen("${data["path"]}", "${data["title"]}");`);
	contentChild.insertAdjacentHTML("beforeend", `<img src="${data["image"]}" onerror="this.src='./img/default.gif';" ><h3 class="title">${data["title"]}</h3><h5 class="date">${data["date"]}</h5><h5 class="tag">${tagString}</h5>`);
	content.appendChild(contentChild);
	doc_content_box.appendChild(content);
}

// コンテンツをページ指定で構成する
function pageContents(p) {
	let start = p * 12;
	let goal = Math.min(p * 12 + 12, contentData.length);
	delContents();
	for (let i = start; i < goal; i++) addContents(contentData[i]);
	barContents(p);
}

// コンテンツバーを更新する
function barContents(p) {
	scrollTo(0, window.pageYOffset - 1);	// ページインのアニメーションを動かすため（後で変更する！）
	var frame = document.getElementById("works_contentsBar");
	while (frame.childNodes.length > 0) frame.childNodes[0].remove();
	let t = [p - 1, p + 1];
	let u = ["前のページへ", "次のページへ"];
	for (i in t) {
		if (t[i] >= 0 && t[i] * 12 < contentData.length) {
			let a = document.createElement("a");
			a.classList.add("contentsBar_" + i, "ani", "ani--up");
			a.setAttribute("href", "javascript:void(0);");
			a.setAttribute("onclick", `pageContents(${t[i]}); scrollToID("works",-20,500);`);
			a.innerText = u[i];
			frame.appendChild(a);
		}
	}
	let div = document.createElement("div");
	div.classList.add("page", "ani", "ani--up");
	div.innerText = (p + 1) + "/" + Math.floor((contentData.length - 1) / 12 + 1);
	frame.appendChild(div);
}

// 指定したIDまでスクロールする（ID、補正（px）、時間）
function scrollToID(id, cor, ms) {
	let frameCount = 60;	// 1秒間に何回実行するか
	let from = window.pageYOffset;
	let to = document.getElementById(id).getBoundingClientRect().top + cor;
	doSomethingLoop(frameCount * ms / 1000, 0);
	return;

	// ループ用
	function doSomethingLoop(maxCount, i) {
		if (i <= maxCount) {
			scrollTo(0, eas(from, to, i, frameCount * ms / 1000));
			setTimeout(function () { doSomethingLoop(maxCount, ++i) }, 1000 / frameCount);
		}
	}

	// イージング用
	function eas(b, c, t, d) {
		t /= d;
		t = t - 1;
		return c * (t * t * t + 1) + b;
	}
}
