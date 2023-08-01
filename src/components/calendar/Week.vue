<template>
    <div class="body">
        <div id="header" class="row">
            <div style="width: 5em;">&nbsp</div>
            <div class="col" v-for="day in days" style="text-align: center">
                <div>{{ day.toLocaleString('en-us', {  weekday: 'short' }) }}</div>
                <div class="badge" :class="{ 'today': this.compareDates(day, new Date()) }">
                    {{ day.getDate() }}
                </div>
            </div>
        </div>
        <div class="row" style="width: 100%">
            <div style="margin-left: 8px; width: 5em;">&nbsp</div>
            <div class="col" v-for="(day, index) in days" style="border-left: 1px solid #dadce0;" :style="{ 'border-right': index == days.length - 1 ? '1px solid #dadce0' : '0px' }">
                &nbsp
            </div>
        </div>
        <div id="grid" class="row">
            <div style="text-align: right; width: 4em; margin-top: -12px">
                <div v-for="i in 24" :style="{ 'height': (dayHeight/24).toString() + 'px' }">
                    <div v-if="i > 1">{{ (i-1).toString() + ':00' }}</div>
                </div>
            </div>
            <div style="margin-top: -1px; width: 1em; background-image: linear-gradient(to bottom, #dadce0 1px, transparent 1px);" :style="{ 'background-size': '10px ' + (dayHeight/24).toString() + 'px' }">
                &nbsp
            </div>
            <div id="container">
                <div class="col" v-for="(day, index) in days" style="height: 200vh; margin-top: -1px; padding: 0; background-image: linear-gradient(to bottom, #dadce0 1px, transparent 1px);" :style="{ 'background-size': '10px ' + (dayHeight/24).toString() + 'px' }">
                    <div class="day">
                        <div class="draggable" v-for="activity in this.filteredActivityArr[index]" @mousedown="startDrag" :style="{ 'top': boxTop + 'px', 'left': boxLeft + 'px' }">
                            <Activity :data="activity" :boxHeight="timeToHeight(activity)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Activity from './Activity.vue';
    import activityData from '@/assets/activities.json';

    export default {
        components: { Activity },
        props: {
            firstDate: { type: Date, required: true },
            numDays: { type: Number, required: true },
        },
        data() {
            return {
                dayHeight: null,
                activityArr: activityData,
                insetLeft: 0, insetTop: 0,
                boxTop: null, boxLeft: null,
            }
        },
        computed: {
            days() {
                let days = new Array(this.numDays);
                for (let i = 0; i < this.numDays; i++) {
                    days[i] = this.addDays(this.firstDate, i);
                }
                return days;
            } ,
            filteredActivityArr() {
                let dataArr = [];
                this.days.forEach(day => {
                    dataArr.push(this.activityArr.filter(activity => {
                        const beginDate = new Date(activity.begin);
                        const beginsHere = beginDate > day && beginDate < new Date(new Date(day).setHours(23,59,1,0));

                        const endDate = new Date(activity.end);
                        const endsHere = endDate > day && endDate < day;

                        return beginsHere || endsHere;
                    }));
                });
                return dataArr;
            }
        },
        methods: {
            addDays(date, nDays) {
                let result = new Date(date);
                result = new Date(result.setDate(result.getDate() + nDays));
                return new Date(result.setHours(0,0,0,0));
            },
            compareDates(date1, date2) {
                return date1.getYear() == date1.getYear() && date2.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
            },
            timeToTop(activity) {
                return 100*(Number(activity.begin.split("T")[1].split(":").join(""))/240000);
            },
            timeToHeight(activity) {
                return 200*(Number(activity.end.split("T")[1].split(":").join(""))/240000) - this.timeToTop(activity);
            },
            // Dragging functionality
            startDrag(e) {
                e = e || window.event;
                e.preventDefault();

                // Set the target and day id
                e.currentTarget.setAttribute('id', 'dragBox');
                e.currentTarget.parentElement.setAttribute('id', 'day');
                console.log(e.currentTarget);

                // get mouse cursor inset into draggable
                const dragRect = e.target.getBoundingClientRect();
                this.insetTop = e.clientY - dragRect.top;
                this.insetLeft = e.clientX - dragRect.left;

                document.onmouseup = this.endDrag;
                document.onmousemove = this.drag;
            },
            drag(e) {
                e = e || window.event;
                e.preventDefault();

                // calculate new cursor position
                const dayRect = document.querySelectorAll('#day')[0].getBoundingClientRect();
                this.boxTop = e.clientY - this.insetTop - dayRect.top;
                this.boxLeft = e.clientX - this.insetLeft - dayRect.left;
            },
            endDrag(e) {
                document.onmouseup = null;
                document.onmousemove = null;

                const dragRect = document.querySelectorAll('#dragBox')[0].getBoundingClientRect();
                const dayRect = document.querySelectorAll('#day')[0].getBoundingClientRect();
                
                // snap to container
                if (dragRect.top < dayRect.top) {
                    this.boxTop = 0;
                }
                if (dragRect.bottom > dayRect.bottom) {
                     this.boxTop = dragRect.top + (dragRect.bottom - dayRect.bottom);
                }
                console.log(dragRect.bottom);
                console.log(dayRect.bottom);
            },
        },
        mounted() {
            this.dayHeight = document.querySelector(".day").offsetHeight;
        }
    }
</script>

<style scoped>
.body {
    position: relative;
    width: 100%;
    height: 100%;
}
#header {
    width: 100%;
}
#grid::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
}
#grid {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    overflow-y: auto;

    width: 100%;
    height: 100%;

    border-right: 1px solid #dadce0;
    border-bottom: 1px solid #dadce0;
    border-top: 1px solid #dadce0;
}
#container {
  display: contents;
}
.day {
    height: 200vh;
    border-left: 1px solid #dadce0;
    background-image: linear-gradient(to bottom, #dadce0 1px, transparent 1px);
}
.side { 
    width: 10px;

}
.today {
    background-color: var(--primary-color);
    color: white !important;
}
.badge {
    height: 40px;
    width: 40px;
    border-radius: 40px;
    text-align: center;
    color: black;
    font-size: 18px;
    padding: 10px;
}
.draggable {
    position: relative;
    height: fit-content;
    width: 100%;
    z-index: 10;

    pointer-events: auto;
}
</style>