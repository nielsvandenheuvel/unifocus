<template>
    <div id=".day">
        <div class="draggable" v-for="activity in this.filteredActivityArr" @mousedown="startDrag" :style="{ 'top': boxTop + 'px', 'left': boxLeft + 'px' }">
            <Activity :data="activity" :boxHeight="timeToHeight(activity)"/>
        </div>
    </div>
</template>

<script>
    import Activity from './Activity.vue';
    import activityData from '@/assets/activities.json';

    export default {
        components: { Activity },
        props: {
            date: { type: Date, required: true },
        },
        data() {
            return {
                activityArr: activityData,
                dayHeight: null,
                insetLeft: 0, insetTop: 0,
                boxTop: null, boxLeft: null,
            }
        },
        computed: {
            filteredActivityArr() {
                return this.activityArr.filter(activity => {
                    const beginDate = new Date(activity.begin);
                    const beginsHere = beginDate > this.date && beginDate < new Date(new Date(this.date).setHours(23,59,1,0));

                    const endDate = new Date(activity.end);
                    const endsHere = endDate > this.date && endDate < this.date;

                    return beginsHere || endsHere;
                });
            }
        },
        methods: {
            timeToTop(activity) {
                return 100*(Number(activity.begin.split("T")[1].split(":").join(""))/240000);
            },
            timeToHeight(activity) {
                return 100*(Number(activity.end.split("T")[1].split(":").join(""))/240000) - this.timeToTop(activity);
            },
            // Dragging functionality
            startDrag(e) {
                e = e || window.event;
                e.preventDefault();

                // get mouse cursor inset into draggable
                let dragRect = document.querySelectorAll('.draggable')[0].getBoundingClientRect();
                this.insetTop = e.clientY - dragRect.top;
                this.insetLeft = e.clientX - dragRect.left;

                document.onmouseup = this.endDrag;
                document.onmousemove = this.drag;
            },
            drag(e) {
                e = e || window.event;
                e.preventDefault();

                // calculate new cursor position
                let dayRect = document.querySelectorAll('.day')[0].getBoundingClientRect();
                this.boxTop = e.clientY - this.insetTop - dayRect.top;
                this.boxLeft = e.clientX - this.insetLeft - dayRect.left;
            },
            endDrag(e) {
                document.onmouseup = null;
                document.onmousemove = null;

                // Set position
            },
        },
    }
</script>

<style scoped>
.day {
    position: relative;
    height: 100%;
    width: 100%;
}
.draggable {
    position: relative;
    height: 100%;
    z-index: 10;
}
</style>