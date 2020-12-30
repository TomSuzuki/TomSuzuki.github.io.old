// element fade animation
export default function setAnimation() {
	let scrollAnimationElm = document.getElementsByClassName('ani');
	for (let i = 0; i < scrollAnimationElm.length; i++) scrollAnimationElm[i].classList.add('show');

	// define event
	let showEvent = function () {
		for (let i = 0; i < scrollAnimationElm.length; i++) {
			let top = scrollAnimationElm[i].getBoundingClientRect().top;
			if (top - window.innerHeight < 0) scrollAnimationElm[i].classList.add('show');
			if (top > window.innerHeight * 1.2) scrollAnimationElm[i].classList.remove('show');
		}
	};

	// add event
	window.addEventListener('scroll', showEvent);
	window.addEventListener('resize', showEvent);
}
