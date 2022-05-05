import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Index", component: () => import("./views/Index.vue") },
  { path: "/test", name: "Test", component: () => import("./views/Test.vue") },
  { path: "/about", name: "About", component: () => import("./views/About.vue") },
];

const router = createRouter({
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  history: createWebHistory(),
});

export default router;
