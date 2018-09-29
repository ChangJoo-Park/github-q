<template>
  <div class="app">
    <aside class="app-sidebar parentx-static">
      <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer v-model="active">
        <div class="header-sidebar" slot="header" v-if="user">
          <vs-avatar  size="50px" :src="user.avatar_url"/>
          <h4>
            {{ user.login }}
            <vs-button vs-color="primary" vs-icon="more_horiz" vs-type="flat"></vs-button>
          </h4>

        </div>
        <vs-divider icon="person" position="left">
          User
        </vs-divider>
        <vs-sidebar-item index= "1" to="/app">Notifications</vs-sidebar-item>
        <vs-sidebar-item index= "2" to="/app/bookmarked">Bookmarked</vs-sidebar-item>
        <vs-sidebar-item index= "3" to="/app/assigned">Assigned</vs-sidebar-item>
        <vs-sidebar-item index= "4" to="/app/mentioned">Mentioned</vs-sidebar-item>
        <!-- <vs-divider icon="person" position="left">
          User
        </vs-divider>
        <vs-sidebar-item index= "5" to="{ name: 'app-page-organizations' }">All Organizations</vs-sidebar-item>
        <vs-sidebar-item index= "6" to="{ name: 'app-page-repos' }">All Repos</vs-sidebar-item> -->
        <vs-divider icon="person" position="left">
          User
        </vs-divider>
        <vs-sidebar-item index= "7" to="/app/newissue">New Issue</vs-sidebar-item>
        <vs-sidebar-item v-for="issue in savedIssues" :key="issue.id" :index= "Number(issue.id) + 100" :to="getIssueUrl(issue.id)">
          {{ issue.name }}
        </vs-sidebar-item>
        <div class="footer-sidebar" slot="footer">
          <vs-button vs-icon="reply" vs-color="danger" vs-type="flat">Sign Out</vs-button>
          <vs-button vs-icon="settings" vs-color="primary" vs-type="border"></vs-button>
        </div>
      </vs-sidebar>
    </aside>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script>
import Service from '@/services'
import Store from '@/store/db'

export default {
  data () {
    return {
      active: false,
      user: null,
      savedIssues: null
    }
  },
  created () {
    this.fetchIssueListing()

    this.$bus.$on('update-issue-listing', _ => {
      this.fetchIssueListing()
    })
  },
  methods: {
    getIssueUrl (id) {
      return `/app/issue/${id}`
    },
    fetchIssueListing () {
      Service.getUser().then((user) => {
        this.user = user
        Store.getIssues(this.user.id).then((response) => {
          this.savedIssues = response
        })
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
  min-width: 260px;
  border-right: 1px solid rgba(0,0,0,0.1);
  overflow-y: auto;
  margin-right: 1rem;
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    button {
      margin-left: 10px;
    }
  }

}

.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  button {
      border: 0px solid rgba(0,0,0,0) !important;
      border-left: 1px solid rgba(0,0,0,.07) !important;
      border-radius: 0px !important;
  }
}

.sidebarx {
  height: 100%;
}

.app-main {
  flex: 1;
  overflow-y: auto;
}
</style>
