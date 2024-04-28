import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForecastView from '../views/ForecastView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
		path: '/',
		name: 'home',
		component: HomeView
		},
		{
		path: '/forecast/:city/:state/:country',
		name: 'forecast',
		component: ForecastView
		},
		{
		path: '/about',
		name: 'about',
		component: AboutView
		},
	]
})

export default router
