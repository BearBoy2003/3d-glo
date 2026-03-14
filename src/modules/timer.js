const timer = () => {
	const timerHours = document.getElementById('timer-hours')
	const timerMinutes = document.getElementById('timer-minutes')
	const timerSeconds = document.getElementById('timer-seconds')
	const storageKey = 'timerDeadline'
	const duration = 86400000

	const getDeadline = () => {
		const savedDeadline = +localStorage.getItem(storageKey)

		if (savedDeadline > Date.now()) {
			return savedDeadline
		}

		localStorage.setItem(storageKey, Date.now() + duration)
		return +localStorage.getItem(storageKey)
	}

	let dateStop = getDeadline()

	const formatTime = value => (value < 10 ? `0${value}` : `${value}`)

	const updateClock = () => {
		const timeRemaining = Math.max(0, Math.floor((dateStop - Date.now()) / 1000))
		const hours = Math.floor(timeRemaining / 3600)
		const minutes = Math.floor((timeRemaining / 60) % 60)
		const seconds = Math.floor(timeRemaining % 60)

		timerHours.textContent = formatTime(hours)
		timerMinutes.textContent = formatTime(minutes)
		timerSeconds.textContent = formatTime(seconds)

		if (timeRemaining === 0) {
			dateStop = getDeadline()
		}
	}

	updateClock()
	setInterval(updateClock, 1000)
}

export default timer
