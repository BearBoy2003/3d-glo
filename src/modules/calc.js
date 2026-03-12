const calc = () => {
	const calcType = document.querySelector('.calc-type')
	const calcSquare = document.querySelector('.calc-square')
	const calcCount = document.querySelector('.calc-count')
	const calcDay = document.querySelector('.calc-day')
	const total = document.getElementById('total')
	const numberInputs = [calcSquare, calcCount, calcDay]
	
	const getValue = input => Number(input.value)

	const updateTotal = () => {
		const typeValue = getValue(calcType)
		const squareValue = getValue(calcSquare)
		const countValue = getValue(calcCount) || 1
		const dayValue = getValue(calcDay) || 10

		if (!typeValue || !squareValue) {
			total.textContent = '0'
			return
		}

		const speedMultiplier = dayValue < 5 ? 2 : dayValue < 10 ? 1.5 : 1
		total.textContent = String(Math.round(typeValue * squareValue * 100 * countValue * speedMultiplier))
	}

	numberInputs.forEach(input => {
		input.inputMode = 'numeric'
		input.addEventListener('input', () => {
			input.value = input.value.replace(/\D/g, '')
			updateTotal()
		})
	})
	calcType.addEventListener('change', updateTotal)
}

export default calc
