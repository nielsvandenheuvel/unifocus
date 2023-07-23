<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <h3>Type</h3>
                <ul class="filter-list">
                    <li class="item">Core</li>
                    <li class="item">Elective</li>
                </ul>
            </div>
        </div>
        <div class="col">
            <div class="card" v-for="course in courses">
                <div class="card-header">{{ course.title }}</div>
                <div class="card-body">
                    <p>{{ "Block" + course.period }}</p>
                    <p>{{ course.type }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import courseData from '@/assets/courses.json';

    export default {
        data() {
            return { courses: courseData };
        },
    };
</script>

<style scoped>
.filter-list {
    display: inline-block;
}
.filter-list.item {
    display: inline-block;
}
</style>