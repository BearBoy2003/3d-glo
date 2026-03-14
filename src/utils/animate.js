function animate({ timing = timeFraction => timeFraction, draw, duration, complete = () => {} }) {
	const start = performance.now()
	let frameId = 0
	let isCancelled = false

	function frame(time) {
		if (isCancelled) {
			return
		}

		let timeFraction = (time - start) / duration

		if (timeFraction > 1) {
			timeFraction = 1
		}

		draw(timing(timeFraction))

		if (timeFraction < 1) {
			frameId = requestAnimationFrame(frame)
		} else {
			complete()
		}
	}

	frameId = requestAnimationFrame(frame)

	return () => {
		isCancelled = true
		cancelAnimationFrame(frameId)
	}
}

export { animate }
