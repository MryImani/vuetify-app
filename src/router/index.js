import { app } from "@/firebase/config";
import { getAuth} from "firebase/auth";
import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Team from '../views/Team.vue'


Vue.use(VueRouter)

const requiredAuth = (to , from , next ) => {
  const auth = getAuth(app);
  const user = auth.currentUser ;
  if(!user)
  {
    next({ name : 'welcome'})
  }
  else
  {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props : true,
    beforeEnter: requiredAuth
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
    beforeEnter: requiredAuth
  },
  {
    path: '/team',
    name: 'team',
    component: Team,
    beforeEnter: requiredAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
