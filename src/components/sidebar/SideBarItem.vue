<template>
    <router-link :to="to" class="link" :class="{ 'active': route.path == to }">
        <i class="icon" :class="icon"/>
        <transition name="fade">
            <span v-if="!collapsed">
                <slot/>
            </span>
        </transition>
    </router-link>
</template>

<script>
    import { useRoute } from 'vue-router';
    import { collapsed } from './state';

    export default {
        props: {
            to: { type: String, required: true},
            icon: { type: String, required: true},
        },
        setup(props) {
            const route = useRoute()
            return { collapsed, route }
        }
    }
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.link {
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin: 0.3em 0.25em 0 0.25em;
    padding: 0.4em;
    border-radius: 0.25em;
    height: 2em;

    color: white;
    text-decoration: none;
}
.link:hover {
    background-color: var(--primary-dark-color);
}
.link.active {
    background-color: var(--secondary-color);
}
.link .icon {
    flex-shrink: 0;
    width: 25px;
    margin-right: 10px;
}
</style>