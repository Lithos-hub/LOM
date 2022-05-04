import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Index", component: () => import("./views/index.vue") },
  { path: "/test", name: "Test", component: () => import("./views/test.vue") },
];

const router = createRouter({
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  history: createWebHistory(),
});

export default router;
