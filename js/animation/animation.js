// element fade animation
export default function addAnimation() {
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
