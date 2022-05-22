import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import SeriesList from '../components/SeriesList.vue';
import SeriesDetails from '../components/SeriesDetails.vue';
import SeasonDetails from '../components/SeasonDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'series-list',
    component: SeriesList
  },
  {
    path: '/details/:id',
    name: 'series-details',
    component: SeriesDetails,
  },
  {
    path: '/details/:id/season/:seasonId',
    name: 'season-details',
    component: SeasonDetails
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
