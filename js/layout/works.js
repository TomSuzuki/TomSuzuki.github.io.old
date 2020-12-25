import { scrollToID, getParameter } from "../common/system.js";
import { modalOpen } from "./modal.js";

// Works ...
export default class Works {

	// load data
	contents = null;

	// initialize
	constructor(data) {
		// init
		this.contents = this.makeContents(JSON.parse(data));
		this.pageContents(0);
		this.checkContentParameter(this.contents);
	}

	// setWorks ...
	makeContents(contents) {
		let json = [];
		for (let i in contents) {
			// split
			contents[i] = decodeURIComponent(contents[i]);
			let s = contents[i].split("/")[2].split("_");

			// this is not content
			if (s.length != 2) continue;

			// add
			json.push({
				title: s[1].split(".")[0],
				date: s[0],
				path: contents[i],
				image: `./md/img/${s[0]}_${s[1].split(".")[0]}.jpg`,
			});
		}

		// sort
		json.sort(function (a, b) {
			if (a["date"] == b["date"]) return -a["title"].localeCompare(b["title"]);
			return -a["date"].localeCompare(b["date"]);
		});

		// return maked contents
		return json;
	}

	// pageContents ...
	pageContents(p) {
		// all delete
		let doc_content_box = document.getElementById("works_parentFrame");
		doc_content_box.innerHTML = "";

		// create
		for (let i = p * 12; i < Math.min(p * 12 + 12, this.contents.length); i++) this.addContents(this.contents[i]);
		this.barContents(p);
	}

	// barContents ...
	barContents(p) {
		// delete bar
		let frame = document.getElementById("works_contentsBar");
		frame.innerHTML = "";

		// create bar
		let PageNumber = [p - 1, p + 1];
		let NextText = ["前のページへ", "次のページへ"];
		for (let i in PageNumber) {
			if (PageNumber[i] >= 0 && PageNumber[i] * 12 < this.contents.length) {
				let div = document.createElement("div");
				let a = document.createElement("a");
				div.classList.add("ani");
				a.classList.add("contentsBar_" + i);
				a.setAttribute("href", "javascript:void(0);");
				a.addEventListener("click", () => {
					this.pageContents(PageNumber[i]);
					scrollToID("works", -20, 500);
				});
				a.innerText = NextText[i];
				div.appendChild(a)
				frame.appendChild(div);
			}
		}

		// addition bar
		let div = document.createElement("div");
		div.classList.remove("show");
		div.classList.add("page", "ani");
		div.innerText = (p + 1) + "/" + Math.floor((this.contents.length - 1) / 12 + 1);
		frame.appendChild(div);
	}

	// addContents ...
	addContents(data) {
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

	// checkParameter ...check parameter (open index)
	checkContentParameter(contentData) {
		let contentTitle = getParameter("content");
		if (contentTitle != null) {
			scrollToID("works", -20, 500);
			let contentPath = [{ "title": "", "path": null }, ...contentData].reduce((pre, cur) => cur["title"] == contentTitle ? cur["path"] : pre);
			modalOpen(contentPath, contentTitle);
		}
	}
}
