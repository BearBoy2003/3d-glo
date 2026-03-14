const calc = () => {
	const calcBlock = document.querySelector('.calc-block')
	const calcType = calcBlock.querySelector('.calc-type')
	const calcSquare = calcBlock.querySelector('.calc-square')
	const calcCount = calcBlock.querySelector('.calc-count')
	const calcDay = calcBlock.querySelector('.calc-day')
	const total = document.getElementById('total')
	const BASE_PRICE = 100
	let currentTotal = +total.textContent || 0
	let frameId = 0

	const animateTotal = nextValue => {
		cancelAnimationFrame(frameId)

		const startValue = currentTotal
		const startTime = performance.now()

		const updateValue = currentTime => {
			const progress = Math.min((currentTime - startTime) / 300, 1)
			currentTotal = Math.round(startValue + (nextValue - startValue) * progress)
			total.textContent = currentTotal

			if (progress < 1) {
				frameId = requestAnimationFrame(updateValue)
			}
		}

		frameId = requestAnimationFrame(updateValue)
	}

	const updateTotal = () => {
		const calcTypeValue = +calcType.value
		const calcSquareValue = +calcSquare.value
		const calcCountValue = +calcCount.value
		const calcDayValue = +calcDay.value

		let totalValue = 0
		let roomsMultiplier = 1
		let daysMultiplier = 1

		if (calcCountValue > 1) {
			roomsMultiplier += calcCountValue / 10
		}

		if (calcDay.value && calcDayValue < 5) {
			daysMultiplier = 2
		} else if (calcDay.value && calcDayValue < 10) {
			daysMultiplier = 1.5
		}

		if (calcTypeValue && calcSquareValue) {
			totalValue = BASE_PRICE * calcTypeValue * calcSquareValue * roomsMultiplier * daysMultiplier
		}

		animateTotal(Math.round(totalValue))
	}

	calcBlock.addEventListener('input', event => {
		if (event.target !== calcType) {
			event.target.value = event.target.value.replace(/\D/g, '')
		}

		updateTotal()
	})
}

export default calc
