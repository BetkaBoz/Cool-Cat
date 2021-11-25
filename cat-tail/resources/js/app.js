/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import {createApp} from 'vue';
import App from './App.vue'

// require('./bootstrap');

// window.Vue = require('vue').default;
// import VueRouter from "vue-router";
import router from './routes'
import BootstrapVue from 'bootstrap-vue'

// Vue.use(BootstrapVue)

// Vue.use(VueRouter)

// const router = new VueRouter(routes)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/WelcomeComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/WelcomeComponent.vue').default);
// Vue.component('home-component', require('./components/HomeComponent.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// const app = new Vue({
//     el: '#app',
//     // router,
// });
const app = createApp(App)
// app.component('Router', SearchInputComponent)
app.use(router);
app.mount('#app');

// console.log('app done')
// console.log(router)
