
import axios from 'axios'

const host = process.env.ICNDB_URL

export default {
    getJokes: (categoriesToInclude, categoriesToExclude) => {
        return new Promise((resolve, reject) => {
            let queryParams = ''
            if (categoriesToInclude && categoriesToInclude.length > 0) {
                queryParams = `limitTo=[${categoriesToInclude}]`
            } else if (categoriesToExclude && categoriesToExclude.length > 0) {
                queryParams = `exclude=[${categoriesToExclude}]`
            }
            axios.get(`${host}/jokes/?${queryParams}`).then((response) => {
                const data = response.data
                if (data.type === 'success') {
                    return resolve(data.value)
                } else {
                    return resolve([])
                }
            }).catch((error) => {
                return reject(error)
            })
        })
    },
    getJoke: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${host}/jokes/${id}`).then((response) => {
                const data = response.data
                if (data.type === 'success') {
                    return resolve(data.value)
                } else {
                    return resolve(null)
                }
            }).catch((error) => {
                return reject(error)
            })
        })
    },
    getCategories: () => {
        return new Promise((resolve, reject) => {
            axios.get(`${host}/categories`).then((response) => {
                const data = response.data
                if (data.type === 'success') {
                    return resolve(data.value)
                } else {
                    return resolve([])
                }
            }).catch((error) => {
                return reject(error)
            })
        })
    },
    getRandomJoke: () => {
        return new Promise((resolve, reject) => {
            axios.get(`${host}/jokes/random`).then((response) => {
                const data = response.data
                if (data.type === 'success') {
                    return resolve(data.value)
                } else {
                    return resolve(null)
                }
            }).catch((error) => {
                return reject(error)
            })
        })
    }
}
