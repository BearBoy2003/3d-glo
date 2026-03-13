const tabs = () => {
	const tabPanel = document.querySelector('.service-header')
	const tabs = document.querySelectorAll('.service-header-tab')
	const tabContent = document.querySelectorAll('.service-tab')

	tabPanel.addEventListener('click', event => {
		const currentTab = event.target.closest('.service-header-tab')

		if (currentTab) {
			tabs.forEach((tab, index) => {
				if (tab === currentTab) {
					tab.classList.add('active')
					tabContent[index].classList.remove('d-none')
				} else {
					tab.classList.remove('active')
					tabContent[index].classList.add('d-none')
				}
			})
		}
	})
}

export default tabs
