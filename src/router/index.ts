import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import SeriesList from '../components/SeriesList.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'series-list',
    component: SeriesList
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
