import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Posts from '@/components/Posts';
import Postedit from '@/components/Postedit';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/postedit/:id',
      name: 'Postedit',
      component: Postedit
    }
  ]
});
