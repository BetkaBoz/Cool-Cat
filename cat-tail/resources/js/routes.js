import Welcome from "./components/HomeComponent"
import ExampleComponent from "./components/ExampleComponent";
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Welcome,
        name: 'Welcome'
    },
    {
        path: '/ex',
        component: ExampleComponent,
        name: 'Ex'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
//
// export default {
//     mode: 'history',
//     base: '/cool-cat-db/',
//     fallback: true,
//     routes: [
//         {
//             path: '/',
//             component: Welcome,
//             name: 'Welcome'
//         },
//         {
//             path: '/ex',
//             component: ExampleComponent,
//             name: 'Ex'
//         }
//     ]
// }
