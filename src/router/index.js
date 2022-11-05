import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Team from '../views/Team.vue'


Vue.use(VueRouter)

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
    props : true
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
