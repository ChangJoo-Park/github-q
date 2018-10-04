import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'auth-check-page',
      component: require('@/components/AuthCheckPage').default
    },
    {
      path: '/login',
      name: 'login-page',
      component: require('@/components/LoginPage').default
    },
    {
      path: '/app',
      component: require('@/components/AppPage').default,
      children: [
        {
          path: 'notifications',
          name: 'app-page',
          component: require('@/components/AppPage/Notifications').default
        },
        {
          path: 'bookmarked',
          name: 'app-page-bookmarked',
          component: require('@/components/AppPage/Bookmarked').default
        },
        {
          path: 'assigned',
          name: 'app-page-assigned',
          component: require('@/components/AppPage/Assigned').default
        },
        {
          path: 'mentioned',
          name: 'app-page-mentioned',
          component: require('@/components/AppPage/Mentioned').default
        },
        {
          path: 'pullrequests',
          name: 'app-page-pullrequests',
          component: require('@/components/AppPage/PullRequests').default
        },
        {
          path: 'newissue',
          name: 'app-page-new-issue',
          component: require('@/components/AppPage/NewIssue').default
        },
        {
          path: 'organizations',
          name: 'app-page-organizations',
          component: require('@/components/AppPage/Organizations').default
        },
        {
          path: 'repos',
          name: 'app-page-repos',
          component: require('@/components/AppPage/Repos').default
        },
        {
          path: 'issue/:id',
          name: 'app-page-issue',
          component: require('@/components/AppPage/Issue').default
        },
        {
          path: 'stats',
          name: 'app-page-stats',
          component: require('@/components/AppPage/Stats').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
