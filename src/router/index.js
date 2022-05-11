import { createRouter, createWebHashHistory } from "vue-router";
import UsersPage from "../components/pages/UsersPage";
import UserProfile from "../components/pages/UserProfile";

const routes = [
  { path: "/", name: "Home", component: UsersPage },
  { path: "/user", name: "User", component: UserProfile },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
