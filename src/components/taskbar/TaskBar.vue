<template>
    <div class="taskbar" :style="{ width: taskBarWidth }">
        <div>
            <span class="collapse-icon" @click="toggleTaskBar" style="margin-left: 10px;">
                <i class="fas fa-bars"/>
            </span>
            <span class="title" v-if="!collapsed">
                Tasks
                <span class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filter
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="padding: 1em">
                        <div>
                            <div style="font-weight: bold;">Field</div>
                            <select v-model="this.selectedField" style="width: 100%; margin-bottom: 10px">
                                <option disabled value="">Select field</option>
                                <option value="categoryArr">Category</option>
                                <option v-if="Object.keys(this.selectedFilters).includes('categoryArr')" value="courseArr">Course</option>
                                <option value="statusArr">Status</option>
                            </select>
                        </div>
                        <div class="item">
                            <div style="font-weight: bold;">Value</div>
                            <select v-model="this.selectedValue" style="width: 100%; margin-bottom: 20px">
                                <option disabled value="">Select value</option>
                                <option v-for="val in this.usedFields[this.selectedField]" :value="val.id">{{ val.name }}</option>
                            </select>
                        </div>
                        <button class="btn" @click="submitFilter" :disabled="!(this.selectedField && this.selectedValue)">Submit <i class="fas fa-check" /></button>
                    </div>
                </span>
            </span>
        </div>
        <hr :class="{ 'collapse-hr': collapsed }" style="margin: 1em">
        <div class="task-list">
            <div v-if="!collapsed" v-for="task in this.filteredTasks">
                <div style="margin-left: 2em;" :style="{ 'margin': Object.keys(this.selectedFilters).length > 0 ? '1em 0 1em' : 0 }">
                    <div class="filter" v-for="(value, key) in this.selectedFilters">
                        <span>{{ key[0].toUpperCase() + key.split("Arr")[0].substr(1) + ": " + this.usedFields[key].filter(item => { return item.id == value })[0].name }}</span>
                        <span @click="deleteFilter(key)"><i class="fas fa-ban" style="margin-left: 5px"/></span>
                    </div>
                </div>
                <TaskBarItem :data="task" />
            </div>
        </div>
    </div>
</template>

<script>
    import taskData from '@/assets/tasks.json';
    import categoryData from '@/assets/activity_categories.json';
    import courseData from '@/assets/courses.json';
    import taskStatusData from '@/assets/task_statuses.json';

    import TaskBarItem from './TaskBarItem.vue';
    import { collapsed, toggleTaskBar, taskBarWidth } from './state';

    export default {
        props: {},
        components: { TaskBarItem },
        data() {
            return { 
                tasks: taskData,
                categoryArr: categoryData,
                courseArr: courseData,
                statusArr: taskStatusData,

                selectedField: null,
                selectedValue: null,
                selectedFilters: {},
             };
        },
        setup() {
            return { collapsed, toggleTaskBar, taskBarWidth }
        },
        computed: {
            usedFields() {
                let fields = {};

                let categoryIDs = [...new Set(this.tasks.map(task => task.category_id))];
                fields.categoryArr = this.categoryArr.filter(category => {
                    return categoryIDs.includes(category.id);
                });

                let courseIDs = [...new Set(this.tasks.map(task => task.course_id))];
                fields.courseArr = this.courseArr.filter(course => {
                    return courseIDs.includes(course.id);
                });
                fields.courseArr.forEach(course => {
                    course.name = course.name.split("(")[0];
                });

                let statusIDs = [...new Set(this.tasks.map(task => task.status_id))];
                fields.statusArr = this.statusArr.filter(status => {
                    return statusIDs.includes(status.id);
                });

                return fields;
            },
            filteredTasks() {
                return this.tasks.filter((task) => {
                    let filterBool = true;
                    Object.keys(this.selectedFilters).forEach(key => {
                        const fieldStr = key.split("Arr")[0] + "_id";
                        filterBool = filterBool && task[fieldStr] == this.selectedFilters[key];
                    });
                    return filterBool;
                });
            },
        },
        methods: {
            submitFilter() {
                this.selectedFilters[this.selectedField] = this.selectedValue;
                this.selectedField = null;
                this.selectedValue = null;
            },
            deleteFilter(key) {
                delete this.selectedFilters[key];
            }
        },
    }
</script>

<style scoped>
.taskbar {
    color: black;
    background-color: var(--bg-color);
    border-left: 0.5px solid var(--primary-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 1.5em 0 2em 0;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.collapse-icon {
    padding: 0.74em;
    color: var(--primary-color);
}
.collapse-hr {
    margin-left: 10px;
    margin-right: 10px;
}
.title {
    font-size: 18px;
    font-weight: bold;
    color: var(--primary-color);
}
hr {
    border: 1px solid var(--primary-color);
}
.footer {
    display: flex;
    flex-direction: column;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    margin: 0 2em 1em 2em;
}
ul {
    list-style: none;
    margin: auto;
}
ul li {
    display: inline-block;
    color: var(--primary-color);
    margin-right: 1em;
}
.dropdown {
    position: absolute;
    right: 2em;
    top: 1em;
}
.dropdown .btn {
    border-radius: 10px;
}
.dropdown > .btn {
    background-color: var(--bg-color);
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
}
.dropdown-menu > .btn {
    background-color: var(--primary-color);
    color: white;
}
.filter {
    display: inline;
    background-color: var(--primary-color);
    color: white;
    border-radius: 100px;
    padding: 0.5em 1em 0.5em 1em;
    margin-right: 1em;
}
.task-list::-webkit-scrollbar {
    display: none;
}
.task-list {
    -ms-overflow-style: none;
    overflow-y: auto;
}
</style>