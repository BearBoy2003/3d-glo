const modal = () => {
	const popup = document.querySelector('.popup')
	const popupContent = document.querySelector('.popup-content')
	const closeBtn = document.querySelector('.popup-close')
	const popupButtons = document.querySelectorAll('.popup-btn')

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
			popup.style.pointerEvents = 'auto'
			popupContent.style.left = '50%'
			popupContent.style.top = '50%'
			popupContent.style.maxWidth = 'calc(100% - 2rem)'
			document.body.style.overflow = 'hidden'
		}

		popupAnimation?.cancel()
		contentAnimation?.cancel()

		popupAnimation = popup.animate(popupFrames[open ? 'open' : 'close'], options)
		contentAnimation = popupContent.animate(contentFrames[open ? 'open' : 'close'], options)
		contentAnimation.onfinish = () => {
			if (!open) {
				popup.style.display = 'none'
				popup.style.pointerEvents = 'none'
				document.body.style.overflow = ''
			}
		}

		isOpen = open
	}

	popupButtons.forEach(button => button.addEventListener('click', () => toggleModal(true)))
	closeBtn.addEventListener('click', () => toggleModal(false))
}

export default modal
