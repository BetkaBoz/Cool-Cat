import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {guest: true}
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {guest: true}
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        meta: {requiresAuth: true},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Game.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
