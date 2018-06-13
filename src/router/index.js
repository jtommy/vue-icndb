import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/pages/Home')
const Joke = () => import('@/pages/Joke')
const RandomJoke = () => import('@/pages/RandomJoke')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/joke/:id',
            name: 'Joke',
            component: Joke,
            props: true
        },
        {
            path: '/random',
            name: 'RandomJoke',
            component: RandomJoke
        }
    ]
})
