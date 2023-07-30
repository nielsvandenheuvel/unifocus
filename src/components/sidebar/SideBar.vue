<template>
    <div class="sidebar" :style="{ width: sideBarWidth }">
        <div class="logo">
            <img v-if="collapsed" src="@/assets/logo_white.png" alt="ti-logo">
            <img v-else src="@/assets/logo_text_white.png" alt="ti-logo">
        </div>
        <hr>

        <SideBarItem to="/dashboard" icon="fas fa-gauge">Dashboard</SideBarItem>
        <SideBarItem to="/courses" icon="fas fa-book">Courses</SideBarItem>
        <SideBarItem to="/planning" icon="fa-regular fa-calendar">Planning</SideBarItem>

        <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSideBar">
            <i class="fas fa-angle-double-left"/>
        </span>
    </div>
</template>

<script>
    import SideBarItem from './SideBarItem';
    import { collapsed, toggleSideBar, sideBarWidth } from './state';

    export default {
        props: {},
        components: { SideBarItem },
        setup() {
            return { collapsed, toggleSideBar, sideBarWidth }
        }
    }
</script>

<style scoped>
.sidebar {
    color: black;
    background-color: var(--primary-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.74em;

    color: rgba(255, 255, 255, 0.7);

    transition: 0.2s linear;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
}
.logo {
    height: 50px;
    align-items: center;
}
img {
    display: block;
    height: 100%;

    position: relative;
    top: 50%;
    transform: translate(0, -40%);
}
hr {
    color: white;
}

</style>