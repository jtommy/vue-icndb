import Jokes from '../../api/jokes'
import * as types from '../mutations-types'

const state = {
    loading: false,
    detail: null
}

const getters = {
    detail(state) {
        return state.detail
    },
    loading(state) {
        return state.loading
    }
}

const mutations = {
    [types.SET_LOADING](state, loading) {
        state.loading = loading
    },
    [types.SET_JOKE](state, joke) {
        state.detail = joke
    }
}

const actions = {
    loadJoke({commit}, id) {
        commit(types.SET_LOADING, true)
        return Jokes.getJoke(id).then((data) => {
            commit(types.SET_JOKE, data)
        }).catch(() => {
            commit(types.SET_JOKE, null)
        }).finally(() => {
            commit(types.SET_LOADING, false)
        })
    },
    loadRandomJoke({commit}) {
        commit(types.SET_LOADING, true)
        return Jokes.getRandomJoke().then((data) => {
            commit(types.SET_JOKE, data)
        }).catch(() => {
            commit(types.SET_JOKE, null)
        }).finally(() => {
            commit(types.SET_LOADING, false)
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
