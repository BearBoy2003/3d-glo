import { animate } from '../utils/animate.js'

const modal = () => {
	const popup = document.querySelector('.popup')
	const popupContent = document.querySelector('.popup-content')

	let isOpen = false
	let stopAnimation = () => {}

	const easeOut = timeFraction => 1 - (1 - timeFraction) ** 3
	const render = progress => {
		popup.style.opacity = progress
		popupContent.style.opacity = progress
		popupContent.style.transform = `translate(-50%, calc(-50% + ${20 * (1 - progress)}px)) scale(${0.9 + progress * 0.1})`
	}

	const toggleModal = open => {
		if (isOpen === open) {
			return
		}

		if (open) {
			popup.style.display = 'block'
		}

		stopAnimation()

		const startProgress = open ? 0 : 1
		const endProgress = open ? 1 : 0
		render(startProgress)

		stopAnimation = animate({
			duration: 400,
			timing: easeOut,
			draw(progress) {
				render(startProgress + (endProgress - startProgress) * progress)
			},
			complete() {
				if (!open) {
					popup.style.display = 'none'
				}
			},
		})

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
