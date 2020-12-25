import { checkParameter, scrollToID } from "../common/system.js";
import { modalOpen } from "./modal.js";

// content data
var contentData = null;

// create content
function pageContents(p) {
	// all delete
	let doc_content_box = document.getElementById("works_parentFrame");
	doc_content_box.innerHTML = "";

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
		<a class="works_tileFrame" href="javascript:void(0);">
			<div class="works_tileFrameLayout">
				<img src="${data["image"]}" onerror="this.src='./img/default.gif';">
				<h3 class="title">${data["title"]}</h3>
				<h5 class="date">${data["date"]}</h5>
				<div class="tag"></div>
			</div>
		</a>
		`;
	div.addEventListener('click', function () {
		modalOpen(data["path"], data["title"]);
	});

	// addition
	document.getElementById("works_parentFrame").appendChild(div);
}

// update content bar
function barContents(p) {

	// page switch animation
	scrollTo(0, window.pageYOffset - 1);

	// delete bar
	let frame = document.getElementById("works_contentsBar");
	frame.innerHTML = "";

	// create bar
	let PageNumber = [p - 1, p + 1];
	let NextText = ["前のページへ", "次のページへ"];
	for (let i in PageNumber) if (PageNumber[i] >= 0 && PageNumber[i] * 12 < contentData.length) {
		let div = document.createElement("div");
		let a = document.createElement("a");
		div.classList.add("ani");
		a.classList.add("contentsBar_" + i);
		a.setAttribute("href", "javascript:void(0);");
		a.addEventListener("click", function () {
			pageContents(PageNumber[i]);
			scrollToID("works", -20, 500);
		});
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
export default function setWorks(list) {
	list = JSON.parse(list);

	// make list
	let json = [];
	for (let i in list) {
		// split
		list[i] = decodeURIComponent(list[i]);
		let s = list[i].split("/")[2].split("_");

		// this is not content
		if (s.length != 2) continue;

		// add
		json.push({
			title: s[1].split(".")[0],
			date: s[0],
			path: list[i],
			image: `./md/img/${s[0]}_${s[1].split(".")[0]}.jpg`,
		});
	}

	// sort
	json.sort(function (a, b) {
		if (a["date"] == b["date"]) return -a["title"].localeCompare(b["title"]);
		return -a["date"].localeCompare(b["date"]);
	});

	// return
	contentData = json;

	// create contens
	pageContents(0);

	// check parameter
	checkParameter(contentData);
}