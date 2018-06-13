<template>
    <section>
        <joke-search></joke-search>
        <br>
        <joke-list v-if="submitted"></joke-list>
    </section>
</template>

<script>
import JokeSearch from '@/components/joke/JokeSearch'
import JokeList from '@/components/joke/JokeList'
import { mapGetters } from 'vuex'

export default {
    components: {
        JokeSearch,
        JokeList
    },
    computed: {
        ...mapGetters({
            submitted: 'jokes/isSubmitted'
        })
    }
}
</script>
