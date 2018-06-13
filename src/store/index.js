import Vue from 'vue'
import Vuex from 'vuex'

import jokes from './jokes'
import joke from './joke'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        jokes,
        joke
    }
})

export default store
