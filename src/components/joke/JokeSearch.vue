<template>
    <section>
        <form class="box" @submit.prevent="submit">
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">Filter</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <label class="radio">
                                <input type="radio" v-model="type" value="include"> 
                                Limit
                            </label>
                            <label class="radio">
                                <input type="radio" v-model="type" value="exclude">
                                Exclude
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Categories</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <div class="select">
                                <select v-model="category" @change="onSelectCategory">
                                    <option value="" disabled>
                                        Select one or more categories
                                    </option>
                                    <option v-for="(category, index) in filteredCategories" :key="index">
                                        {{category}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">Selected</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <div class="tags">
                                <span class="tag" 
                                    v-for="(selected, index) in selectedCategories"
                                    :key="index">
                                    {{selected}}
                                    <button type="button" class="delete is-small" 
                                        @click="removeCategory(index)">
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label"></div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <button type="submit" 
                                class="button is-primary is-mobile"
                                :disabled="loading">
                                Search
                            </button>
                            <button type="button"
                                class="button is-primary is-mobile"
                                :disabled="loading"
                                @click="random">
                                Random
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            category: '',
            type: '',
            selectedCategories: []
        }
    },
    computed: {
        ...mapGetters({
            loading: 'jokes/loading',
            categories: 'jokes/categories'
        }),
        filteredCategories() {
            return this.categories.filter((element) => {
                return this.selectedCategories.indexOf(element) < 0
            })
        }
    },
    methods: {
        submit() {
            // load jokes by type and categories
            this.$store.dispatch('jokes/loadJokes', {
                type: this.type,
                categories: [...this.selectedCategories],
                page: 1
            })
        },
        random() {
            // go to random joke page
            this.$router.push({name: 'RandomJoke'})
        },
        onSelectCategory() {
            this.selectedCategories.push(this.category)
            this.category = ''
        },
        removeCategory(index) {
            this.selectedCategories.splice(index, 1)
        }
    },
    created() {
        // load categories
        this.$store.dispatch('jokes/loadCategories')
        // set selected categories and type from current state
        this.selectedCategories = [...this.$store.getters['jokes/selectedCategories']]
        this.type = this.$store.getters['jokes/selectedType']
    }
}
</script>
