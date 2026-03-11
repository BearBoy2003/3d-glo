const menu = () => {
	const menuBtn = document.querySelector('.menu')
	const menu = document.querySelector('menu')
	const closeBtn = menu.querySelector('.close-btn')
	const menuItems = menu.querySelectorAll('ul>li>a')
	const scrollBtn = document.querySelector('main > a[href^="#"]')

	const toggleMenu = () => {
		menu.classList.toggle('active-menu')
	}

	const closeMenu = () => {
		menu.classList.remove('active-menu')
	}

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

	menuBtn.addEventListener('click', toggleMenu)
	closeBtn.addEventListener('click', event => {
		event.preventDefault()
		closeMenu()
	})

	menuItems.forEach(item => item.addEventListener('click', event => {
		event.preventDefault()
		closeMenu()
		smoothScroll(document.querySelector(item.getAttribute('href')))
	}))

	scrollBtn.addEventListener('click', event => {
		event.preventDefault()
		smoothScroll(document.querySelector(scrollBtn.getAttribute('href')))
	})
}

export default menu
