import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/dashboard/index.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/courses",
    name: "courses",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/courses/index.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/calendar/index.vue"),
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tasks/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
