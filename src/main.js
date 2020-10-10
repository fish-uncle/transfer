import Vue from 'vue'
import App from './App'
import router from './router'
import './api'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
new Vue({
	router,
	render: h => h(App)
}).$mount("#app")
