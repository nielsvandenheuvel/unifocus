<template>
    <div id="day">
        <Activity v-for="activity in this.filteredActivityArr" :data="activity" :boxTop="boxTop(activity)" :boxHeight="boxHeight(activity)"/>
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
            }
        },
        computed: {
            filteredActivityArr() {
                return this.activityArr.filter(activity => {
                    const beginDate = new Date(activity.begin);
                    const beginsHere = beginDate > this.date && beginDate < new Date(new Date(this.date).setHours(23,59,1,0));
                    console.log(beginDate > this.date);
                    console.log(beginDate < new Date(new Date(this.date).setHours(23,59,1,0)));
                    const endDate = new Date(activity.end);
                    const endsHere = endDate > this.date && endDate < this.date;
                    console.log(endsHere);
                    return beginsHere || endsHere;
                });
            }
        },
        methods: {
            boxTop(activity) {
                return 100*(Number(activity.begin.split("T")[1].split(":").join(""))/240000);
            },
            boxHeight(activity) {
                return 100*(Number(activity.end.split("T")[1].split(":").join(""))/240000) - this.boxTop(activity);
            },

        },
    }
</script>

<style scoped>
#day {
    position: relative;
    height: 100%;
    width: 100%;
}
.grid-line {
    position: relative;
    display: inline-block;
}
</style>