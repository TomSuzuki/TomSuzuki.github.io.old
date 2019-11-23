// フォントロード関連
window.addEventListener("DOMContentLoaded", function () {
	function detectFontLoading(fontName, nextFunction) {
		// テスターの生成
		var fontTester = [,];
		for (let i = 0; i < 2; i++) {
			fontTester[i] = document.createElement('span');
			fontTester[i].style.fontFamily = (i == 0 ? '"' + fontName + '",' : "") + '"Blank Font"';
			fontTester[i].style.position = 'fixed';
			fontTester[i].style.top = '-100px';
			fontTester[i].textContent = "a";
			fontTester[i].classList.add("__tester");
			document.body.appendChild(fontTester[i]);
		}

		// ロードまで待つ
		var timerId = setInterval(checkWidth, 500);
		var cnt = 0;
		function checkWidth() {
			if (cnt++ > 24 || (cnt > 1 && 10000 * fontTester[0].getBoundingClientRect().width != 10000 * fontTester[1].getBoundingClientRect().width)) {
				clearInterval(timerId);
				nextFunction();
				for (let i = 0; i < 2; i++)fontTester[i].remove();
			}
		}
	}

	// ロード＆ロード完了後の処理
	detectFontLoading("851手書き雑フォント", function () {
		document.getElementById("load").style.display = "none";
		document.getElementById("top").style.display = "table";
	});
});