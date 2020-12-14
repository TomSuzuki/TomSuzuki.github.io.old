// content data
var contentsPage = 0;
var contentData = null;

// create content
function pageContents(p) {
	// all delete
	let doc_content_box = document.getElementById("works_parentFrame");
	while (doc_content_box.childNodes.length > 0) doc_content_box.childNodes[0].remove();

	// create
	for (let i = p * 12; i < Math.min(p * 12 + 12, contentData.length); i++) addContents(contentData[i]);
	barContents(p);
}

// addition create
function addContents(data) {
	// create content
	let div = document.createElement("div");
	div.classList.add("ani");
	div.innerHTML = `
		<a class="works_tileFrame" href="javascript:modalOpen('${data["path"]}', '${data["title"]}');">
			<div class="works_tileFrameLayout">
				<img src="${data["image"]}" onerror="this.src='./img/default.gif';">
				<h3 class="title">${data["title"]}</h3>
				<h5 class="date">${data["date"]}</h5>
				<div class="tag"></div>
			</div>
		</a>
		`;

	// addition
	document.getElementById("works_parentFrame").appendChild(div);
}

// update content bar
function barContents(p) {

	// page switch animation
	scrollTo(0, window.pageYOffset - 1);

	// delete bar
	let frame = document.getElementById("works_contentsBar");
	while (frame.childNodes.length > 0) frame.childNodes[0].remove();

	// create bar
	let PageNumber = [p - 1, p + 1];
	let NextText = ["前のページへ", "次のページへ"];
	for (i in PageNumber) if (PageNumber[i] >= 0 && PageNumber[i] * 12 < contentData.length) {
		let div = document.createElement("div");
		let a = document.createElement("a");
		div.classList.add("ani");
		a.classList.add("contentsBar_" + i);
		a.setAttribute("href", "javascript:void(0);");
		a.setAttribute("onclick", `pageContents(${PageNumber[i]}); scrollToID("works",-20,500);`);
		a.innerText = NextText[i];
		div.appendChild(a)
		frame.appendChild(div);
	}

	// addition bar
	let div = document.createElement("div");
	div.classList.remove("show");
	div.classList.add("page", "ani");
	div.innerText = (p + 1) + "/" + Math.floor((contentData.length - 1) / 12 + 1);
	frame.appendChild(div);
}

// make json
function makeContentJSON(list) {
	let res = [];
	for (let i in list) {
		list[i] = decodeURIComponent(list[i]);
		let s = list[i].split("/")[2].split("_");
		if(s.length != 2) continue;
		let c = {};
		c.title = s[1].split(".")[0];
		c.date = s[0];
		c.path = list[i];
		c.image = `./md/img/${c.date}_${c.title}.jpg`;
		res.push(c);
	}
	res.sort(compareFunc);
	return res;

	function compareFunc(a, b) {
		if (a["date"] == b["date"]) return 0 - compareString(a["title"], b["title"]);
		return 0 - compareString(a["date"], b["date"]);
	}

	function compareString(a, b) {
		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}
		return 0;
	}
}