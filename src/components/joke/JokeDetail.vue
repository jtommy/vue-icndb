<template>
    <article class="message is-warning">
        <div class="message-body">
            <p>
                {{joke.joke}}
            </p>
            <div class="tags">
                <span class="tag" 
                    v-for="(category, index) in joke.categories"
                    :key="index">
                    {{category}}
                </span>
            </div> 
        </div>
        
    </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            joke: 'joke/detail'
        })
    }
}
</script>

