<template>
  <div class="app">
    <aside class="app-sidebar parentx-static">
      <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer v-model="active">

        <div class="header-sidebar" slot="header">
          <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>

          <h4>
            My Name
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
        <vs-sidebar-item index= "8" to="/app/issue/1">이슈목록1</vs-sidebar-item>
        <div class="footer-sidebar" slot="footer">
          <vs-button vs-icon="reply" vs-color="danger" vs-type="flat">log out</vs-button>
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
export default {
  data () {
    return {
      active: false
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
  border-right: 1px solid black;
  overflow-y: auto;
  margin-right: 1rem;
}

.app-main {
  flex: 1;
  overflow-y: auto;
}
</style>
