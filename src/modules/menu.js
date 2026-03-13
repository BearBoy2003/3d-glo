const menu = () => {
	const menuElement = document.querySelector('menu')
	
	const smoothScroll = target => {
		const startPosition = window.pageYOffset
		const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
		const distance = targetPosition - startPosition
		const duration = 600
		let startTime = null

		const animateScroll = currentTime => {
			if (!startTime) {
				startTime = currentTime
			}

			const timeElapsed = currentTime - startTime
			const progress = Math.min(timeElapsed / duration, 1)
			const easing = progress < 0.5
				? 2 * progress * progress
				: 1 - Math.pow(-2 * progress + 2, 2) / 2

			window.scrollTo(0, startPosition + distance * easing)

			if (progress < 1) {
				requestAnimationFrame(animateScroll)
			}
		}

		requestAnimationFrame(animateScroll)
	}

	const toggleMenu = event => {
		const burgerBtn = event.target.closest('header .menu')
		const closeBtn = event.target.closest('menu .close-btn')
		const menuLink = event.target.closest('menu ul a[href^="#"]')
		const scrollLink = event.target.closest('main > a[href^="#"]')
		const clickedInsideMenu = event.target.closest('menu')
		const isMenuOpen = menuElement.classList.contains('active-menu')

		if (burgerBtn) {
			menuElement.classList.toggle('active-menu')
		} else if (closeBtn) {
			event.preventDefault()
			menuElement.classList.remove('active-menu')
		} else if (menuLink) {
			event.preventDefault()
			menuElement.classList.remove('active-menu')
			smoothScroll(document.querySelector(menuLink.getAttribute('href')))
		} else if (scrollLink) {
			event.preventDefault()
			smoothScroll(document.querySelector(scrollLink.getAttribute('href')))
		} else if (isMenuOpen && !clickedInsideMenu) {
			menuElement.classList.remove('active-menu')
		}
	}

	document.addEventListener('click', toggleMenu)
}

export default menu
