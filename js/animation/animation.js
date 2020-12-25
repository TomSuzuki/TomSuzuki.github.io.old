// element fade animation
function animationAddition() {
	let scrollAnimationElm = document.getElementsByClassName('ani');
	for (let i = 0; i < scrollAnimationElm.length; i++) scrollAnimationElm[i].classList.add('show');
	window.addEventListener('scroll', (
		function () {
			for (let i = 0; i < scrollAnimationElm.length; i++) {
				let top = scrollAnimationElm[i].getBoundingClientRect().top;
				if (top - window.innerHeight < 0) scrollAnimationElm[i].classList.add('show');
				if (top > window.innerHeight * 1.2) scrollAnimationElm[i].classList.remove('show');
			}
		}
	));
}

// start button (top)
function ShowContents() {
	scrollToID("anchor", 0, 800);
}

// scrollToID ...scroll(ID、correction（px）、time)
var isScrolling = false;
function scrollToID(id, correction = 0, ms = 800) {
	// kill scroll
	if (isScrolling) return;
	isScrolling = true;

	// init
	const from = window.pageYOffset;
	const distance = document.getElementById(id).getBoundingClientRect().top + correction;
	const fps = 60;

	// scroll
	let count = 0;
	let interval = setInterval(() => {
		count++;
		let y = from + distance * easeOutExpo(count / (fps * ms / 1000));
		scrollTo(0, y);
		if (count == fps * ms / 1000) killScroll();
	}, 1000 / fps);

	// for kill
	window.addEventListener('wheel', () => {
		killScroll();
	});

	return;

	// kill
	function killScroll() {
		clearInterval(interval);
		isScrolling = false;
	}

	// easeing
	function easeOutExpo(x) {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
	}
}

