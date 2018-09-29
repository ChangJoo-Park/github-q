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
export default {
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
  margin-right: 1rem;
}

.app-main {
  flex: 1;
  overflow-y: auto;
}
</style>
