<template>
    <div class="body" :style="{ 'margin-right': taskBarWidth }">
        <div class="row">
            <div class="button-group">
                <button class="btn btn-view" @click="changeView('agenda')">Agenda</button>
                <button class="btn btn-view" @click="changeView('day')">Day</button>
                <button class="btn btn-view" @click="changeView('week')">Week</button>
                <button class="btn btn-view" @click="changeView('month')">Month</button>
            </div>
        </div>
        <div class="row" style="height: 100%">
            <div class="calendar">
                <Week v-if="this.view == 'week'" :firstDate="this.firstDate" :numDays="this.numDays"/>
            </div>
        </div>
    </div>
    <TaskBar />
</template>

<script>
    import TaskBar from '@/components/taskbar/TaskBar.vue';
    import Week from '@/components/calendar/Week.vue'
    import { taskBarWidth } from '@/components/taskbar/state';

    export default {
        components: { TaskBar, Week },
        data() {
            return {
                view: 'week',
                numDays: 7,
            };
        },
        setup() {
            return { taskBarWidth };
        },
        computed: {
            firstDate() {
                const currentDate = new Date();
                return this.addDays(currentDate, -currentDate.getDay());
            }
        },
        methods: {
            changeView(viewName) {
                this.view = viewName;
            },
            addDays(date, nDays) {
                let result = new Date(date);
                result = new Date(result.setDate(result.getDate() + nDays));
                return new Date(result.setHours(0,0,0,0));
            },
        },
    }
</script>

<style scoped>
.body {
    background-color: white;
    position: absolute;
    padding-right: 3em;
}
.calendar {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: 100%;
}
.btn-view {
    background-color: white;
    border: 1px solid var(--primary-color);
    margin-right: 5px;
}
.btn-view:hover {
    background-color: var(--primary-color);
    color: white;
}
</style>