import timer from './modules/timer.js'
import menu from './modules/menu.js'
import modal from './modules/modal.js'
import calc from './modules/calc.js'
import forms from './modules/forms.js'
import tabs from './modules/tabs.js'
import './styles/bootstrap.min.css'
import './styles/style.min.css'

timer(Date.now() + 86400000)
menu()
modal()
calc()
forms()
tabs()
