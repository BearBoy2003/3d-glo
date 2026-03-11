const timer = deadline => {
	const timerHours = document.getElementById('timer-hours')
	const timerMinutes = document.getElementById('timer-minutes')
	const timerSeconds = document.getElementById('timer-seconds')
	const dateStop = new Date(deadline).getTime()

	if (!Number.isFinite(dateStop)) {
		return
	}

	const getTimeRemaining = () => {
		const dateNow = new Date().getTime()
		const timeRemaining = Math.max(0, Math.floor((dateStop - dateNow) / 1000))

		const hours = Math.floor(timeRemaining / 3600)
		const minutes = Math.floor((timeRemaining / 60) % 60)
		const seconds = Math.floor(timeRemaining % 60)

		return { timeRemaining, hours, minutes, seconds }
	}

	const formatTime = value => (value < 10 ? `0${value}` : `${value}`)

	const updateClock = timerInterval => {
		const currentTime = getTimeRemaining()
		const { timeRemaining, hours, minutes, seconds } = currentTime

		timerHours.textContent = formatTime(hours)
		timerMinutes.textContent = formatTime(minutes)
		timerSeconds.textContent = formatTime(seconds)

		if (timeRemaining === 0 && timerInterval) {
			clearInterval(timerInterval)
		}
	}

	const initialTime = getTimeRemaining()
	if (initialTime.timeRemaining > 0) {
		const timerInterval = setInterval(() => updateClock(timerInterval), 1000)
		updateClock(timerInterval)
	} else {
		updateClock()
	}
}

export default timer
