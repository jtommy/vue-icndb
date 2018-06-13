<template>
    <section :class="{'is-loading': loading}">
        <template v-if="!loading && joke">
            <div class="block">
                <a class="button" @click.prevent="goBack">
                    <span class="icon">
                        <i class="fa fa-arrow-left"></i>
                    </span>
                    <span>Back</span>
                </a>
            </div>
            <joke-detail></joke-detail>
        </template>
        <template v-else-if="!loading">
            <div class="has-text-grey has-text-centered">
                Joke not found!!!
            </div>
        </template>
    </section>
</template>

<script>
import JokeDetail from '@/components/joke/JokeDetail'
import { mapGetters } from 'vuex'

export default {
    components: {
        JokeDetail
    },
    computed: {
        ...mapGetters({
            joke: 'joke/detail',
            loading: 'joke/loading'
        })
    },
    methods: {
        goBack() {
            this.$router.replace({name: 'Home'})
        }
    },
    created() {
        this.$store.dispatch('joke/loadRandomJoke')
    }
}
</script>
