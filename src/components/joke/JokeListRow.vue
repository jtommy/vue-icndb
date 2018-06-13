<template>
    <tr class="joke-row">
        <td>
            <article class="media">
                <div class="media-content no-overflow">
                    <p>
                        <router-link tag="a" :to="{name: 'Joke', params: {id: joke.id}}">
                            <strong> {{joke.joke}} </strong>
                        </router-link>
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
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        joke: Object
    }
}
</script>
