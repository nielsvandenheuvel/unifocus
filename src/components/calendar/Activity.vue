<template>
    <div class="wrapper"
    :style="{ 'height': boxHeight.toString() + 'vh' }">
        <div class="activity" :style="{ 'border': '3px solid' + (this.passed ? '#D3D3D3' : category.color) }">
            <h6 class="title" :style="{ 'color': (this.passed ? '#D3D3D3' : category.color) }">{{ data.name }}</h6>
            <p class="description" :style="{ 'color': (this.passed ? '#D3D3D3' : '#000000')}">{{ data.description }}</p>
        </div>
    </div>
</template>

<script>
    import categoryData from '@/assets/activity_categories.json';

    export default {
        props: {
            data: { type: Object, required: true },
            boxHeight: { type: Number, required: true },
        },
        setup(props) {
            console.log(props.boxTop);
        },
        data() {
            return {
                categoryArr: categoryData,
            }
        },
        computed: {
            category() {
                return this.categoryArr.filter((category) => {
                    return category.id == this.data.category_id;
                })[0];
            },
            passed() {
                const currentTime = new Date();
                const endTime = new Date(this.data.end);
                return currentTime - endTime > 0;
            }
        },
    }
</script>

<style scoped>
.wrapper {
    padding: 5px;

    position: absolute;
    left: 0;
    right: 0;

    font-size: 14px;
    text-align: left;

    z-index: 9;
}
.activity {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    background-color: white;

    padding: 0.8em;
}
.title {
    font-weight: bold;
    font-size: 13px;
}
.description {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>