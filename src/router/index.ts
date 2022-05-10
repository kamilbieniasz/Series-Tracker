import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SeriesList from '../components/SeriesList.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'series-list',
    component: SeriesList
  }
]

const router = new VueRouter({
  routes
})

export default router
