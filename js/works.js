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

// コンテンツを追加するための関数（後でなおす！）
function addContents(data) {
	let PageInAnimation = document.createElement("div");
	PageInAnimation.setAttribute("class", "ani ani--up");
	let doc_content_box = document.getElementById("works_parentFrame");
	let content = document.createElement("a");
	let contentChild = document.createElement("div");
	let tagString = "";
	for (let j in data["tag"]) tagString += (`#${data["tag"][j]}  `);
	content.setAttribute("class", "works_tileFrame");
	content.setAttribute("href", "javascript:void(0);");
	contentChild.setAttribute("class", "works_tileFrameLayout");
	content.setAttribute("onclick", `modalOpen("${data["path"]}", "${data["title"]}");`);
	contentChild.insertAdjacentHTML("beforeend", `<img src="${data["image"]}" onerror="this.src='./img/default.gif';" ><h3 class="title">${data["title"]}</h3><h5 class="date">${data["date"]}</h5><h5 class="tag">${tagString}</h5>`);
	content.appendChild(contentChild);
	PageInAnimation.appendChild(content);
	doc_content_box.appendChild(PageInAnimation);
}

// コンテンツをページ指定で構成する
function pageContents(p) {
	// 全部消す
	let doc_content_box = document.getElementById("works_parentFrame");
	while (doc_content_box.childNodes.length > 0) doc_content_box.childNodes[0].remove();

	// 生成する
	for (let i = p * 12; i < Math.min(p * 12 + 12, contentData.length); i++) addContents(contentData[i]);
	barContents(p);
}

// コンテンツバーを更新する
function barContents(p) {
	// ページインのアニメーションを動かすため（後で変更する？）
	scrollTo(0, window.pageYOffset - 1);

	// バーの中身を消す
	let frame = document.getElementById("works_contentsBar");
	while (frame.childNodes.length > 0) frame.childNodes[0].remove();

	// ページ移動の生成（ページの指定を見やすく変更する？）
	let PageNumber = [p - 1, p + 1];
	let NextText = ["前のページへ", "次のページへ"];
	for (i in PageNumber) {
		if (PageNumber[i] >= 0 && PageNumber[i] * 12 < contentData.length) {
			let div = document.createElement("div");
			let a = document.createElement("a");
			div.classList.add("ani", "ani--up");
			a.classList.add("contentsBar_" + i);
			a.setAttribute("href", "javascript:void(0);");
			a.setAttribute("onclick", `pageContents(${PageNumber[i]}); scrollToID("works",-20,500);`);
			a.innerText = NextText[i];
			div.appendChild(a)
			frame.appendChild(div);
		}
	}

	// ページ番号の生成
	let div = document.createElement("div");
	div.classList.remove("show");
	div.classList.add("page", "ani", "ani--up");
	div.innerText = (p + 1) + "/" + Math.floor((contentData.length - 1) / 12 + 1);
	frame.appendChild(div);
}
