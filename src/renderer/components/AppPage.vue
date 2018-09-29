<template>
  <div class="app">
    <aside class="app-sidebar">
      <ul>
        <router-link tag="li" :to="{ name: 'app-page' }">Notifications</router-link>
        <router-link tag="li" :to="{ name: 'app-page-bookmarked' }">Bookmarked</router-link>
        <router-link tag="li" :to="{ name: 'app-page-assigned' }">Assigned</router-link>
        <router-link tag="li" :to="{ name: 'app-page-mentioned' }">Mentioned</router-link>
      </ul>
      <ul>
        <router-link tag="li" :to="{ name: 'app-page-organizations' }">All Organizations</router-link>
        <router-link tag="li" :to="{ name: 'app-page-repos' }">All Repos</router-link>
      </ul>
      <ul>
        <router-link tag="li" :to="{ name: 'app-page-new-issue' }">New Issue</router-link
        <!-- Issue Lists -->
        <router-link tag="li" :to="{ name: 'app-page-issue', params: { id: 1 } }">이슈목록1</router-link>
      </ul>
    </aside>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import octokit from '@octokit/rest'

export default {
  data () {
    return {
      accessToken: window.localStorage.getItem('accessToken'),
      notifications: []
    }
  },
  mounted () {
    const api = octokit()
    api.authenticate({
      type: 'oauth',
      token: this.accessToken
    })

    api.orgs.get({org: 'tabling'}).then(response => {
      console.log('orgs => ', response)
    })
    api.search.issues({ q: 'is:open is:issue author:ChangJoo-Park archived:false user:tabling' }).then(response => {
      console.log('issues => ', response)
    })
    // this.getNotifications()
    // this.getIssues()
  },
  methods: {
    getIssues () {
      const url = `https://api.github.com/issues?access_token=${this.accessToken}`

      axios({
        method: 'GET',
        url,
        headers: {
          Accept: 'application/json'
        }
      })
        .then((response) => {
          console.log(response)
        })
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html, body,.app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: row;
}

.app-sidebar {
  flex: 0;
  min-width: 300px;
  border-right: 1px solid black;
  overflow-y: auto;
}

.app-main {
  flex: 1;
  overflow-y: auto;
}
</style>
