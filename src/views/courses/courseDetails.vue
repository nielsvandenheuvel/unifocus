<template>
    <div class="body" :style="{ 'margin-left': sideBarWidth }">
        <div class="container overview">
            <span style="color: var(--secondary-color); font-weight: bold;">Course</span>
            <h1 style="margin-top: 10px; font-weight: bold;">{{ course.title }}</h1>
            <hr>
            <div class="row">
                <div class="col-5">
                    <span class="subtitle">Teacher(s)</span>
                    <p style="font-weight: bold;">{{ course.teachers.join(", ") }}</p>
                </div>
                <div class="col-7">
                    <span class="subtitle">Course type</span>
                    <p style="font-weight: bold;">{{ course.type[0].toUpperCase() + course.type.substr(1) }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-5">
                    <span class="subtitle">Research field</span>
                    <p style="font-weight: bold;">{{ course.field }}</p>
                </div>
                <div class="col-7">
                    <span class="subtitle">Program year</span>
                    <p style="font-weight: bold;">{{ course.year == 1 ? 'First' : 'Second' }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-5">
                    <span class="subtitle">Dates</span>
                    <p style="font-weight: bold;">{{ 'Period ' + course.period.toString() + ' - ' + course.dates }}</p>
                </div>
                <div class="col-7">
                    <span class="subtitle">Credits</span>
                    <p style="font-weight: bold;">{{ course.credits }}</p>
                </div>
            </div>
        </div>
        <div style="width: 50%">
            <h3>Course Description</h3>
            <p>{{ course.description }}</p>
            <h3>Literature</h3>
            <div v-if="course.literature.required.length > 0">
                <h6>Required</h6>
                <ul class="fa-ul">
                    <li v-for="item in course.literature.required"><i class="fa-li fas fa-arrow-right" />{{ item }}</li>
                </ul>
            </div>
            <div v-if="course.literature.recommended.length > 0">
                <h6>Recommended</h6>
                <ul class="fa-ul">
                    <li v-for="item in course.literature.recommended"><i class="fa-li fas fa-arrow-right" />{{ item }}</li>
                </ul>
            </div>
            <div v-if="course.literature.other.length > 0">
                <h6>Other</h6>
                <ul class="fa-ul">
                    <li v-for="item in course.literature.other"><i class="fa-li fas fa-arrow-right" />{{ item }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import courseData from '@/assets/courses.json';
    import { sideBarWidth } from '@/components/sidebar/state';

    export default {
        props: {
            id: { type: Number, required: true },
        },
        setup(props) {
            let course = courseData.filter((item) => {
                return item.id == props.id;
            })[0];
            return { course };
        },
        data() {
            return { sideBarWidth }
        },
    }
</script>

<style scoped>
.body {
    background-color: white;
    align-items: center;
}
h6 {
    font-weight: bold;
}
.overview {
    width: 80%;
    background-color: var(--bg-color);

    margin: 4em; 
    padding: 4em;
}
.subtitle {
    font-family: var(--subtitle-font);
}
hr {
    border: 2.5px solid var(--secondary-color);
    opacity: 1;
    width: 3em;
}
h3 {
    font-weight: bold;
}
</style>