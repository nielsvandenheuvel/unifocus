import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/dashboard/index.vue";

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/courses",
    name: "courses",
    component: () =>
      import(/* webpackChunkName: "courses" */ "../views/courses/index.vue"),
  },
  {
    path: "/courses/:id",
    component: () =>
      import(/* webpackChunkName: "course" */ "../views/courses/courseDetails.vue"),
    props: true,
  },
  {
    path: "/planning",
    name: "planning",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/planning/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
