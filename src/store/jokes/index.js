import Jokes from '../../api/jokes'
import * as types from '../mutations-types'

const state = {
    loading: false,
    list: [],
    page: 1,
    pageSize: 10,
    categories: [],
    params: {
        submitted: false,
        type: 'include',
        categories: []
    }
}

const getters = {
    filteredList(state) {
        const start = (state.page - 1) * state.pageSize
        const end = start + state.pageSize
        return state.list.slice(start, end)
    },
    total(state) {
        return state.list.length
    },
    page(state) {
        return state.page
    },
    pageSize(state) {
        return state.pageSize
    },
    loading(state) {
        return state.loading
    },
    isSubmitted(state) {
        return state.params.submitted
    },
    categories(state) {
        return state.categories
    },
    selectedCategories(state) {
        return state.params.categories
    },
    selectedType(state) {
        return state.params.type
    }
}

const mutations = {
    [types.SET_LOADING](state, loading) {
        state.loading = loading
    },
    [types.SET_JOKES](state, jokes) {
        state.list = jokes
    },
    [types.SET_SEARCH](state, data) {
        state.params.type = data.type
        state.params.categories = data.categories
        state.params.submitted = data.submitted
        state.page = data.page
    },
    [types.SET_PAGE](state, page) {
        state.page = page
    },
    [types.SET_CATEGORIES](state, categories) {
        state.categories = categories
    },
    [types.SET_JOKE](state, joke) {
        state.random = joke
    }
}

const actions = {
    loadJokes({commit, state}, data) {
        commit(types.SET_SEARCH, { ...data, submitted: true })
        commit(types.SET_LOADING, true)
        const categoriesToInclude = state.params.type === 'include'
            ? state.params.categories : null
        const categoriesToExclude = state.params.type === 'exclude'
            ? state.params.categories : null
        return Jokes.getJokes(categoriesToInclude, categoriesToExclude).then((data) => {
            commit(types.SET_JOKES, data)
        }).catch(() => {
            commit(types.SET_JOKES, [])
        }).finally(() => {
            commit(types.SET_LOADING, false)
        })
    },
    loadCategories({commit}, data) {
        const params = {}
        return Jokes.getCategories(params).then((data) => {
            commit(types.SET_CATEGORIES, data)
        }).catch(() => {
            commit(types.SET_CATEGORIES, [])
        })
    },
    updatePage({commit}, page) {
        commit(types.SET_PAGE, page)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
