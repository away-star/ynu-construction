<template>
    <div class="star-rating">
        <div
            v-for="index in 5"
            :key="index"
            class="star"
        >
            <span class="star-background">☆</span>
            <span
                class="star-filled"
                :style="{ width: filledWidth(index) + '%' }"
                >★</span
            >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        rating: {
            type: Number,
            default: 0,
            validator: value => value >= 0 && value <= 5
        }
    },
    methods: {
        filledWidth(index) {
            const fill = this.rating - (index - 1)
            if (fill >= 1) return 100
            if (fill <= 0) return 0
            return fill * 100
        }
    }
}
</script>

<style>
.star-rating {
    display: inline-flex;
}

.star {
    position: relative;
    display: inline-block;
    font-size: 14px;
}

.star-background {
    color: #e0e0e0;
}

.star-filled {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
    color: #ffd700;
}
</style>
