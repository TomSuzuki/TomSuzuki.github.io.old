// element fade animation
function animationAddition() {
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
}

// start button (top)
function showContents() {
	scrollToID("anchor", 0, 800);
}

// scroll（ID、correction（px）、time）
// [fix] if user scroll, kill loop
function scrollToID(id, _cor, _ms) {

	// create scroll id
	if(scroll_id === undefined) var scroll_id = 0;

	// init
	const frameCount = 60; // fps
	let from = window.pageYOffset;
	let cor = _cor | 0;
	let ms = _ms | 800;
	let to = document.getElementById(id).getBoundingClientRect().top + cor;
	let scroll_id_now = ++scroll_id;
	doScrollLoop(frameCount * ms / 1000, 0);

	return;

	// loop
	function doScrollLoop(maxCount, i) {
		if (i <= maxCount) {
			if(scroll_id_now != scroll_id) return;
			scrollTo(0, eas(from, to, i, frameCount * ms / 1000));
			setTimeout(function () { doScrollLoop(maxCount, ++i) }, 1000 / frameCount);
		} else {
			scrollTo(0, document.getElementById(id).getBoundingClientRect().top + cor + window.pageYOffset);
		}
	}

	// easeing
	function eas(b, c, t, d) {
		t /= d / 2.0;
		if (t < 1) return c / 2.0 * t * t + b;
		t = t - 1;
		return -c / 2.0 * (t * (t - 2) - 1) + b;
	}
}
