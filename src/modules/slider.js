const slider = ({
	container,
	slide,
	dotsContainer,
	nextArrow,
	prevArrow,
	dotClass = 'dot',
	activeDotClass = 'dot-active',
	activeSlideClass = 'portfolio-item-active',
	intervalTime = 2000
} = {}) => {
	const sliderBlock = document.querySelector(container)

	if (!sliderBlock) {
		return
	}

	const slides = document.querySelectorAll(slide)

	if (!slides.length) {
		return
	}

	const dotsBlock = sliderBlock.querySelector(dotsContainer)

	if (!dotsBlock) {
		return
	}

	let currentSlide = 0
	let interval
	const controlsSelector = `.${dotClass}, ${nextArrow}, ${prevArrow}`
	const getIndex = step => (currentSlide + step + slides.length) % slides.length

	dotsBlock.innerHTML = ''
	slides.forEach((_, index) => {
		const dot = document.createElement('li')
		dot.className = index === 0 ? `${dotClass} ${activeDotClass}` : dotClass
		dotsBlock.append(dot)
	})

	const dots = dotsBlock.querySelectorAll(`.${dotClass}`)

	const setSlide = index => {
		slides[currentSlide].classList.remove(activeSlideClass)
		dots[currentSlide].classList.remove(activeDotClass)
		currentSlide = index
		slides[currentSlide].classList.add(activeSlideClass)
		dots[currentSlide].classList.add(activeDotClass)
	}

	const stopSlide = () => clearInterval(interval)

	const startSlide = () => {
		stopSlide()
		interval = setInterval(() => setSlide(getIndex(1)), intervalTime)
	}

	sliderBlock.addEventListener('click', event => {
		const dot = event.target.closest(`.${dotClass}`)
		const nextBtn = event.target.closest(nextArrow)
		const prevBtn = event.target.closest(prevArrow)

		if (!dot && !nextBtn && !prevBtn) {
			return
		}

		event.preventDefault()

		if (nextBtn) {
			setSlide(getIndex(1))
		} else if (prevBtn) {
			setSlide(getIndex(-1))
		} else {
			setSlide([...dots].indexOf(dot))
		}
	})

	sliderBlock.addEventListener(
		'mouseenter',
		event => {
			if (event.target.closest(controlsSelector)) {
				stopSlide()
			}
		},
		true
	)

	sliderBlock.addEventListener(
		'mouseleave',
		event => {
			if (event.target.closest(controlsSelector)) {
				startSlide()
			}
		},
		true
	)

	startSlide()
}

export default slider
