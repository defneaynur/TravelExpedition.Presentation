import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/views/HomePage.vue";
// import LoginPage from "@/views/LoginPage.vue";
import Home from "@/views/DashboardPage.vue";
import auth from "@/api/auth";


//#region Definition Pages
import TravelExpedition from "../views/TravelX/TravelExpedition.vue"
//#endregion




const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: { title: 'Ana Sayfa - Travel X', requiresAuth: true }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { title: 'Home - Travel X', requiresAuth: true }
  },
  {
    path: "/travelexpedition",
    name: "TravelExpedition",
    component: TravelExpedition,
    meta: { title: 'Travel Expedition - Travel X', requiresAuth: true }
  },
 
  {
    path: "/:pathMatch(.*)*",
    redirect: "/home"
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {

  const isAuthorized = auth.getToken()
  if(isAuthorized!==null){
    if(to.path==='/'){
      next('/home');
    }
    else{
      next()
    }
  }
  else{
    if (to.path === '/home' ) {
      next()  
    } 
    else 
    {
      next('/home');
    }
  }
  var titlestr = to.meta.title
  document.title = titlestr
})

export default router;