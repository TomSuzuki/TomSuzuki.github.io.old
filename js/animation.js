// スタートボタンを押したときに実行
function showContents() {
	scrollToID("anchor", 0, 800);
}


document.addEventListener("DOMContentLoaded", function () {
	// アニメーション用
	let scrollAnimationElm = document.getElementsByClassName('ani');
	for (let i = 0; i < scrollAnimationElm.length; i++) scrollAnimationElm[i].classList.add('show');
	let scrollAnimationFunc = function () {
		for (let i = 0; i < scrollAnimationElm.length; i++) {
			let triggerMargin = window.innerHeight;
			if (scrollAnimationElm[i].getBoundingClientRect().top - triggerMargin < 0) scrollAnimationElm[i].classList.add('show');
			if (scrollAnimationElm[i].getBoundingClientRect().top > window.innerHeight * 1.2) scrollAnimationElm[i].classList.remove('show');
		}
	}
	scrollAnimationFunc();
	window.addEventListener('scroll', scrollAnimationFunc);
});


// 指定したIDまでスクロールする（ID、補正（px）、時間）
function scrollToID(id, _cor, _ms) {
	// 実行前の状態
	const frameCount = 60;	// 1秒間に何回実行するか
	let from = window.pageYOffset;
	let cor = _cor | 0;
	let ms = _ms | 800;
	let to = document.getElementById(id).getBoundingClientRect().top + cor;
	doScrollLoop(frameCount * ms / 1000, 0);
	return;

	// ループ用
	function doScrollLoop(maxCount, i) {
		if (i <= maxCount) {
			scrollTo(0, eas(from, to, i, frameCount * ms / 1000));
			setTimeout(function () { doScrollLoop(maxCount, ++i) }, 1000 / frameCount);
		} else {
			// 強制的に移動
			scrollTo(0, document.getElementById(id).getBoundingClientRect().top + cor + window.pageYOffset);
		}
	}

	// イージング用
	function eas(b, c, t, d) {
		t /= d / 2.0;
		if (t < 1) return c / 2.0 * t * t + b;
		t = t - 1;
		return -c / 2.0 * (t * (t - 2) - 1) + b;
	}
}

// メニュー用
function scrollToID_menu(id) {
	let h = -document.getElementById("menu").getBoundingClientRect().bottom - 25;
	let e = getComputedStyle(document.getElementById("menu_open"), null).getPropertyValue("display") != "none";
	if (e) h = -25;
	scrollToID(id, h)
}
