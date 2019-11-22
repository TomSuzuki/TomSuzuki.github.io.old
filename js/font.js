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