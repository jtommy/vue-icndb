<template>
    <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" 
            href="#"
            @click.prevent="prev"
            :disabled="!hasPrev">
            Previous
        </a>
        <ul class="pagination-list">
            <li>
                <span>{{newCurrentPage}}/{{pageCount}}</span>
            </li>
        </ul>
        <a class="pagination-next"
            @click.prevent="next"
            :disabled="!hasNext">
            Next
        </a>
    </nav>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            newCurrentPage: this.currentPage
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.total / this.pageSize)
        },
        hasPrev() {
            return this.newCurrentPage > 1
        },
        hasNext() {
            return this.newCurrentPage < this.pageCount
        }
    },
    watch: {
        pageCount(value) {
            if (this.newCurrentPage > value) {
                this.newCurrentPage = value
                this.$emit('change', this.newCurrentPage)
            }
        },
        currentPage(value) {
            this.newCurrentPage = value
        }
    },
    methods: {
        next() {
            if (!this.hasNext) return
            this.newCurrentPage += 1
            this.$emit('change', this.newCurrentPage)
        },
        prev() {
            if (!this.hasPrev) return
            this.newCurrentPage -= 1
            this.$emit('change', this.newCurrentPage)
        }
    }
}
</script>
