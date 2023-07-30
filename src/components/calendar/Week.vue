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
        <div class="row grid">
            <div style="text-align: right; width: 4em; margin-top: -12px">
                <div v-for="i in 24" :style="{ 'height': (dayHeight/24).toString() + 'px' }">
                    <div v-if="i > 1">{{ (i-1).toString() + ':00' }}</div>
                </div>
            </div>
            <div style="margin-top: -1px; width: 1em; background-image: linear-gradient(to bottom, #dadce0 1px, transparent 1px);" :style="{ 'background-size': '10px ' + (dayHeight/24).toString() + 'px' }">
                &nbsp
            </div>
            <div class="col" v-for="day in days" style="margin-top: -1px; padding: 0; background-image: linear-gradient(to bottom, #dadce0 1px, transparent 1px);" :style="{ 'background-size': '10px ' + (dayHeight/24).toString() + 'px' }">
                <div class="day">
                    <Day :date="day"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Day from './Day.vue';

    export default {
        components: { Day },
        props: {
            firstDate: { type: Date, required: true },
            numDays: { type: Number, required: true },
        },
        data() {
            return {
                dayHeight: null,
            }
        },
        computed: {
            days() {
                let days = new Array(this.numDays);
                for (let i = 0; i < this.numDays; i++) {
                    days[i] = this.addDays(this.firstDate, i);
                }
                return days;
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
            }
        },
        mounted() {
            this.dayHeight = document.querySelector("#day").offsetHeight;
        }
    }
</script>

<style scoped>
.body {
    position: relative;
    width: 100%;
    height: 100%;

    margin-left: 3em;
}
#header {
    width: 100%;
}
.grid::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
}
.grid {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    overflow-y: auto;

    width: 100%;
    height: 100%;

    border-right: 1px solid #dadce0;
    border-bottom: 1px solid #dadce0;
    border-top: 1px solid #dadce0;
}
.container {
    height: 100%;
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
    border-radius: 40px;
    text-align: center;
    color: black;
    font-size: 18px;
    padding: 10px;
}
</style>