<template>
    <div class="container mt-5" style="margin-left: 3em;">
        <div class="row">
            <div class="col-3">
                <div class="filter">
                    <h6><b>Type of course</b></h6>
                    <hr>
                    <div>
                        <button class="btn btn-filter" @click="addFilter('type', 'core')" :class="{ 'active': this.selectedFilters['type'] == 'core'}">Core</button>
                        <button class="btn btn-filter" @click="addFilter('type', 'field')" :class="{ 'active': this.selectedFilters['type'] == 'field'}">Field</button>
                        <button class="btn btn-filter" @click="addFilter('type', 'skill')" :class="{ 'active': this.selectedFilters['type'] == 'skill'}">Skill</button>
                    </div>
                </div>
                <div class="filter">
                    <h6><b>Programme year</b></h6>
                    <hr>
                    <div>
                        <button class="btn btn-filter" @click="addFilter('year', 1)" :class="{ 'active': this.selectedFilters['year'] == '1'}">First</button>
                        <button class="btn btn-filter" @click="addFilter('year', 2)" :class="{ 'active': this.selectedFilters['year'] == '2'}">Second</button>
                    </div>
                </div>
                <div class="filter">
                    <h6><b>Period</b></h6>
                    <hr>
                    <div>
                        <button class="btn btn-filter" @click="addFilter('period', 0)" :class="{ 'active': this.selectedFilters['period'] == '0'}">Period 0</button>
                        <button class="btn btn-filter" @click="addFilter('period', 1)" :class="{ 'active': this.selectedFilters['period'] == '1'}">Period 1</button>
                        <button class="btn btn-filter" @click="addFilter('period', 2)" :class="{ 'active': this.selectedFilters['period'] == '2'}">Period 2</button>
                        <button class="btn btn-filter" @click="addFilter('period', 3)" :class="{ 'active': this.selectedFilters['period'] == '3'}">Period 3</button>
                        <button class="btn btn-filter" @click="addFilter('period', 4)" :class="{ 'active': this.selectedFilters['period'] == '4'}">Period 4</button>
                        <button class="btn btn-filter" @click="addFilter('period', 5)" :class="{ 'active': this.selectedFilters['period'] == '5'}">Period 5</button>
                    </div>
                </div>
                <div class="filter">
                    <h6><b>Fields</b></h6>
                    <hr>
                    <div>
                        <button class="btn btn-filter" @click="addFilter('field', 'Behavioral Economics')" :class="{ 'active': this.selectedFilters['field'] == 'Behavioral Economics'}">Behavioral Economics</button>
                        <button class="btn btn-filter" @click="addFilter('field', 'Complexity')" :class="{ 'active': this.selectedFilters['field'] == 'Complexity'}">Complexity</button>
                        <button class="btn btn-filter" @click="addFilter('field', 'Data Science')" :class="{ 'active': this.selectedFilters['field'] == 'Data Science'}">Data Science</button>
                        <button class="btn btn-filter" @click="addFilter('field', 'Econometrics')" :class="{ 'active': this.selectedFilters['field'] == 'Econometrics'}">Econometrics</button>
                        <button class="btn btn-filter" @click="addFilter('field', 'Empirical Microeconomics')" :class="{ 'active': this.selectedFilters['Empirical Microeconomics'] == 'core'}">Empirical Microeconomics</button>
                        <button class="btn btn-filter" @click="addFilter('field', 'Finance')" :class="{ 'active': this.selectedFilters['field'] == 'Finance'}">Finance</button>
                        <button class="btn btn-filter" @click="addFilter('field', 'Macroeconomics')" :class="{ 'active': this.selectedFilters['field'] == 'Macroeconomics'}">Macroeconomics</button>
                        <button class="btn btn-filter" @click="addFilter('field', 'Organizations and Markets')" :class="{ 'active': this.selectedFilters['field'] == 'Organizations and Markets'}">Organizations and Markets</button>
                        <button class="btn btn-filter" @click="addFilter('field', 'Spatial Economics')" :class="{ 'active': this.selectedFilters['field'] == 'Spatial Economics'}">Spatial Economics</button>
                    </div>
                </div>
            </div>
            <div class="col-9" style="padding-left: 5em; color: var(--primary-color); text-align: left; font-weight: bold;">
                <div class="input-group mb-3">
                    <input class="form-control" type="text" placeholder="Search course by keywords, type, teacher or field..." v-model="searchTerm" @keyup.enter="searchFilter">
                    <div class="input-group-append">
                        <button class="btn btn-search" type="button" @click="searchFilter"><i class="fas fa-magnifying-glass" /></button>
                    </div>
                </div>
                <div style="font-size: 20px">Courses</div>
                <div>
                    <router-link class="d-flex flex-row" v-for="course in filteredCourses" :to="'/courses/' + course.id">
                        <div class="container" style="margin-left: 15px; width: 100%">
                            <div class="row" style="font-size: 24px; margin-bottom: 15px">{{ course['name'] }}</div>
                            <div class="row" style="font-weight: normal; margin-bottom: 3px">
                                <div class="col-4">Teacher(s)</div>
                                <div class="col-4">Period</div>
                                <div class="col-3">Credits</div>
                            </div>
                            <div class="row">
                                <div class="col-4">{{ course['teachers'].join(", ") }}</div>
                                <div class="col-4">{{ course['dates'] }}</div>
                                <div class="col-3">{{ course['credits'] }}</div>
                                <div class="col-1"><i class="fas fa-arrow-right course-arrow" /></div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import courseData from '@/assets/courses.json';

    export default {
        data() {
            return {
                selectedFilters: {},
                selectedSearchFilters: {},
                searchTerm: '',
                courses: courseData,
            };
        },
        computed: {
            filteredCourses() {
                return this.courses.filter((course) => {
                    let filterBool = true;
                    Object.keys(this.selectedFilters).forEach(key => {
                        filterBool = filterBool && course[key] == this.selectedFilters[key];
                    });
                    let searchBool = false;
                    if (Object.keys(this.selectedSearchFilters).length > 0) {
                        Object.keys(this.selectedSearchFilters).forEach(key => {
                            searchBool = searchBool || course[key].toLowerCase().includes(this.selectedSearchFilters[key]);
                        });
                    } else {
                        searchBool = true;
                    }
                    return filterBool && searchBool;
                });
            }
        },
        methods: {
            addFilter(key, value) {
                if (this.selectedFilters[key] == value) {
                    delete this.selectedFilters[key];
                } else {
                    this.selectedFilters[key] = value;
                }
            },
            searchFilter() {
                if (this.searchTerm.length === 0) {
                    delete this.selectedSearchFilters['name'];
                    //delete this.selectedSearchFilters['teachers'];
                    delete this.selectedSearchFilters['description'];
                } else {
                    this.selectedSearchFilters['name'] = this.searchTerm;
                    //this.selectedSearchFilters['teachers'] = this.searchTerm;
                    this.selectedSearchFilters['description'] = this.searchTerm;
                }
            },
        },
    };
</script>

<style scoped>
.btn-search {
    background-color: var(--secondary-color);

    border-radius: 0 5px 5px 0;
    color: white;
}
.filter {
    text-align: left;
    margin-bottom: 2em;
}
hr {
    border: 1.5px solid var(--primary-color) !important;;
}
.btn-filter {
    background-color: white;
    margin: 0 9px 9px 0;
    padding: 6px;

    font-size: 13px;
    font-weight: bold;

    color: var(--primary-color);
}
.btn.active {
    background-color: var(--primary-color);
    color: white;
}
a {
    transition: box-shadow .3s;

    padding: 17px;
    margin-bottom: 25px;

    color: var(--primary-color);
    background-color: white;
    text-decoration: none;
}
a:hover {
    box-shadow: inset 0 -2px var(--primary-color);
}
a:hover .course-arrow {
    margin-left: 10px;
}
</style>