<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-3 col-mr-3">
                <div class="filter">
                    <h6><b>Type of course</b></h6>
                    <hr>
                    <div>
                        <button class="btn" @click="addFilter('type', 'core')">Core</button>
                        <button class="btn" @click="addFilter('type', 'field')">Field</button>
                        <button class="btn" @click="addFilter('type', 'skill')">Skill</button>
                    </div>
                </div>
                <div class="filter">
                    <h6><b>Programme year</b></h6>
                    <hr>
                    <div>
                        <button class="btn" @click="addFilter('year', 1)">First</button>
                        <button class="btn" @click="addFilter('year', 2)">Second</button>
                    </div>
                </div>
                <div class="filter">
                    <h6><b>Period</b></h6>
                    <hr>
                    <div>
                        <button class="btn" @click="addFilter('period', 0)">Period 0</button>
                        <button class="btn" @click="addFilter('period', 1)">Period 1</button>
                        <button class="btn" @click="addFilter('period', 2)">Period 2</button>
                        <button class="btn" @click="addFilter('period', 3)">Period 3</button>
                        <button class="btn" @click="addFilter('period', 4)">Period 4</button>
                        <button class="btn" @click="addFilter('period', 5)">Period 5</button>
                    </div>
                </div>
                <div class="filter">
                    <h6><b>Fields</b></h6>
                    <hr>
                    <div>
                        <button class="btn" @click="addFilter('field', 'Behavioral Economics')">Behavioral Economics</button>
                        <button class="btn" @click="addFilter('field', 'Complexity')">Complexity</button>
                        <button class="btn" @click="addFilter('field', 'Data Science')">Data Science</button>
                        <button class="btn" @click="addFilter('field', 'Econometrics')">Econometrics</button>
                        <button class="btn" @click="addFilter('field', 'Empirical Microeconomics')">Empirical Microeconomics</button>
                        <button class="btn" @click="addFilter('field', 'Finance')">Finance</button>
                        <button class="btn" @click="addFilter('field', 'Macroeconomics')">Macroeconomics</button>
                        <button class="btn" @click="addFilter('field', 'Organizations and Markets')">Organizations and Markets</button>
                        <button class="btn" @click="addFilter('field', 'Spatial Economics')">Spatial Economics</button>
                    </div>
                </div>
            </div>
            <div class="col-9">
                <input class="search" type="text" placeholder="Search course by keywords, type, teacher or field...">
                <button class="search-button"><i class="fas fa-magnifying-glass" /></button>
            </div>
        </div>
    </div>
    {{ selectedFilters }}
</template>

<script>
    import courseData from '@/assets/courses.json';

    export default {
        data() {
            return {
                selectedFilters: [],
                searchTerm: '',
                filteredCourses: [],
                uniqueFilterTerms: [],
                courses: courseData,
            };
        },

        methods: {
            addFilter(field, value) {
                this.selectedFilters[field] = value;
            }
        }
    };
</script>

<style scoped>
.search {
    padding: 5px;

    font-size: 12px;
}
.search-button {
    padding: 5px;
    height: 40px;
    width: 40px;
}
.filter {
    text-align: left;
    margin-bottom: 2em;
}
hr {
    border: 1.5px solid var(--primary-color) !important;;
}
.btn {
    background-color: white;
    margin: 0 9px 9px 0;

    padding: 6px;
    font-size: 12px;

    color: var(--primary-color);
}
</style>