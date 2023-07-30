<template>
    <div class="task" :style="{ 'border': '2px solid' + category.color }">
        <div class="row">
            <span class="type" :style="{ 'color': category.color }"><i :class="category.icon" />{{ '&nbsp&nbsp' + category.name + (course.name.length > 0 ? ': ' + course.name : '') }}</span>
        </div>
        <div class="row">
            <div class="col-7">
                <div class="title">{{ data.name }}</div>
                <hr :style="{ 'color': category.color }">
            </div>
            <div class="col-5">
                <div class="progress" v-if="this.data.est_hours > 0" style="margin-top: 9px">
                    <div class="progress-bar" :style="{ 'width': (100*this.data.used_hours/this.data.est_hours).toString() + '%', 'background-color': category.color }" role="progressbar" :aria-valuenow="this.data.used_hours.toString" aria-valuemin="0" :aria-valuemax="this.data.est_hours"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div style="margin-bottom: 10px;">{{ data.description }}</div>
            <div><b>Due: </b>{{ data.due }}</div>
            <div v-if="data.est_hours > 0">
                <div><b>Estimated hours: </b>{{ data.est_hours }}</div>
                <div><b>Planned hours: </b>{{ data.used_hours }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import categoryData from '@/assets/activity_categories.json';
    import courseData from '@/assets/courses.json';

    export default {
        props: {
            data: { type: Object, required: true },
        },
        data() {
            return { 
                categories: categoryData,
                courses: courseData,
            };
        },
        computed: {
            category() {
                return this.categories.filter((category) => {
                    return category.id == this.data.category_id;
                })[0];
            },
            course() {
                if (this.data.course_id === null) {
                    return {
                        'name': '',
                    };
                }
                return this.courses.filter((course) => {
                    return course.id == this.data.course_id;
                })[0];
            }
        }
    }
</script>

<style scoped>
.task {
    background-color: white;
    padding: 2em;
    margin: 1em 2em 1em 2em;

    border-radius: 15px;

    font-size: 14px;
}
.title {
    font-weight: bold;
    margin-top: 5px;
    font-size: 16px;
}
.type {
    font-weight: bold;
    font-size: 12px;
    color: var(--secondary-color);
}
hr {
    margin-top: 5px;
    border-width: 2px;
    opacity: 1;
    width: 4em;
}
</style>