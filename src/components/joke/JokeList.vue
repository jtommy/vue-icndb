<template>
    <div>
        <div v-if="!loading && total === 0">
            <div class="content has-text-grey has-text-centered">
                <p>No jokes found</p>
            </div>
        </div>
        <div v-else-if="!loading">
            <table class="table is-hoverable is-fullwidth">
                <tbody>
                    <joke-list-row v-for="(joke, index) in jokes"
                        :key="index"
                        :joke="joke">
                    </joke-list-row>
                </tbody>
            </table>
            <pagination v-if="total > 0"
                :total="total"
                :page-size="pageSize"
                :current-page="page"
                @change="onPageChange">
            </pagination>
        </div>      
    </div>
</template>

<script>
import JokeListRow from '@/components/joke/JokeListRow'
import Pagination from '@/components/pagination/Pagination'
import { mapGetters } from 'vuex'

export default {
    components: {
        JokeListRow,
        Pagination
    },
    computed: {
        ...mapGetters({
            jokes: 'jokes/filteredList',
            total: 'jokes/total',
            loading: 'jokes/loading',
            pageSize: 'jokes/pageSize',
            page: 'jokes/page'
        })
    },
    methods: {
        onPageChange(page) {
            this.$store.dispatch('jokes/updatePage', page)
        }
    }
}
</script>
