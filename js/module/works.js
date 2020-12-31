import { scrollToID, setParameter, getParameter } from "../common/common.js";
import { modalOpen } from "../layout/modal.js";

// Works ...
export default class Works {

	// load data
	contents = null;

	// initialize
	constructor(data) {
		// init
		this.contents = this.makeContents(JSON.parse(data));
		this.pageSwitch(0);
		this.checkContentParameter(this.contents);
	}

	// setWorks ...array -> json array
	makeContents(contents) {
		let json = [];
		for (let i in contents) {
			// split and check content
			contents[i] = decodeURIComponent(contents[i]);
			let s = contents[i].split("/")[2].split("_");
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

	// pageSwitch ...switch page if initialize or user clicked
	pageSwitch(p) {
		// all delete
		let doc_content_box = document.getElementById("works_parentFrame");
		doc_content_box.textContent = "";

		// check page
		if (p < 0) p = 0;
		else if (p * 12 - this.contents.length > 0) p = 0;

		// create
		for (let i = p * 12; i < Math.min(p * 12 + 12, this.contents.length); i++) this.addContent(this.contents[i]);
		this.worksBar(p);
	}

	// worksBar ...create bar
	worksBar(page) {
		// delete bar
		let frame = document.getElementById("works_contentsBar");
		frame.textContent = "";

		// create bar
		let pageNumber = [page - 1, page + 1];
		let nextText = ["前のページへ", "次のページへ"];
		for (let i in pageNumber) {
			if (pageNumber[i] >= 0 && pageNumber[i] * 12 < this.contents.length) {
				let a = document.createElement("a");
				a.classList.add("contentsBar_" + i, "ani");
				a.setAttribute("href", "javascript:void(0);");
				a.addEventListener("click", () => {
					// page switch
					this.pageSwitch(pageNumber[i]);
					setParameter("page", pageNumber[i]);

					// scroll event
					scrollTo(0, window.pageYOffset - 1);	// for showEvent
					scrollToID("works", -20, 500);
				});
				a.innerText = nextText[i];
				frame.appendChild(a);
			}
		}

		// addition bar
		let div = document.createElement("div");
		div.classList.remove("show");
		div.classList.add("page", "ani");
		div.innerText = (page + 1) + "/" + Math.floor((this.contents.length - 1) / 12 + 1);
		frame.appendChild(div);
	}

	// addContent ...add content frame
	addContent(data) {
		// create content
		let div = document.createElement("div");
		div.classList.add("ani");
		div.innerHTML = `<a class="works_tileFrame"><div class="works_tileFrameLayout"><img src="${data["image"]}" onerror="this.src='./img/default.gif';" alt="${data["title"]}"><h3 class="title">${data["title"]}</h3><h5 class="date">${data["date"]}</h5></div></a>`;
		div.addEventListener('click', function () {
			modalOpen(data["path"], data["title"]);
		});

		// addition
		document.getElementById("works_parentFrame").appendChild(div);
	}

	// checkParameter ...check parameter (open index)
	checkContentParameter(contentData) {
		// content
		let contentTitle = getParameter("content");
		if (contentTitle != null) {
			scrollToID("works", -20, 500);
			let contentPath = [{ "title": "", "path": null }, ...contentData].reduce((pre, cur) => cur["title"] == contentTitle ? cur["path"] : pre);
			modalOpen(contentPath, contentTitle);
		}

		// page
		let page = getParameter("page");
		if (page != null && page != 0) {
			this.pageSwitch(Number(page));
		}
	}
}
