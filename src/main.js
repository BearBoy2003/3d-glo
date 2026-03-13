import timer from './modules/timer.js'
import menu from './modules/menu.js'
import modal from './modules/modal.js'
import calc from './modules/calc.js'
import forms from './modules/forms.js'
import tabs from './modules/tabs.js'
import slider from './modules/slider.js'
import './styles/bootstrap.min.css'
import './styles/style.min.css'

timer(Date.now() + 86400000)
menu()
modal()
calc()
forms()
tabs()
slider({
	container: '.portfolio-content',
	slide: '.portfolio-item',
	dotsContainer: '.portfolio-dots',
	nextArrow: '#arrow-right',
	prevArrow: '#arrow-left',
	activeSlideClass: 'portfolio-item-active',
	activeDotClass: 'dot-active',
})
