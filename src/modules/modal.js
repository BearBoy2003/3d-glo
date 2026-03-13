const modal = () => {
	const popup = document.querySelector('.popup')
	const popupContent = document.querySelector('.popup-content')

	let isOpen = false
	let popupAnimation
	let contentAnimation

	const popupFrames = {
		open: [{ opacity: 0 }, { opacity: 1 }],
		close: [{ opacity: 1 }, { opacity: 0 }],
	}

	const contentFrames = {
		open: [
			{ opacity: 0, transform: 'translate(-50%, calc(-50% + 20px)) scale(0.9)' },
			{ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
		],
		close: [
			{ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
			{ opacity: 0, transform: 'translate(-50%, calc(-50% + 20px)) scale(0.9)' },
		],
	}

	const options = {
		duration: 400,
		easing: 'ease-out',
		fill: 'forwards',
	}

	const toggleModal = open => {
		if (isOpen === open) {
			return
		}

		if (open) {
			popup.style.display = 'block'
		}

		popupAnimation?.cancel()
		contentAnimation?.cancel()

		popupAnimation = popup.animate(popupFrames[open ? 'open' : 'close'], options)
		contentAnimation = popupContent.animate(contentFrames[open ? 'open' : 'close'], options)
		contentAnimation.onfinish = () => {
			if (!open) {
				popup.style.display = 'none'
			}
		}

		isOpen = open
	}

	document.addEventListener('click', event => {
		if (event.target.closest('.popup-btn')) {
			toggleModal(true)
		}
	})

	popup.addEventListener('click', event => {
		if (!event.target.closest('.popup-content') || event.target.closest('.popup-close')) {
			toggleModal(false)
		}
	})
}

export default modal
