import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import {FontAwesomeIcon} from "./plugins/font-awesome"

createApp(App)
    .use(router)
    .use(PrimeVue, {ripple: true})
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
