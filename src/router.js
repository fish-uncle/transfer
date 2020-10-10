import Vue from 'vue'
import Router from 'vue-router'

const routes = []
const context = require.context('./pages', true, /\.(route.js)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

Vue.use(Router);

const router = new Router({
	routes: [
		...routes,
	]
});

export default router;
