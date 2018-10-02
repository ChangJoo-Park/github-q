import Service from '@/services'
import Store from '@/store/db'

const state = {
  user: null,
  savedIssueQueries: null,
  notifications: null
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  DELETE_USER () {
    state.user = null
  },
  SET_SAVED_ISSUE_QUERIES (state, savedIssueQueries) {
    state.savedIssueQueries = savedIssueQueries
  },
  SET_NOTIFICATIONS (state, notifications) {
    state.notifications = notifications
  }
}

const actions = {
  fetchGithubUser ({ commit }) {
    return Service.getUser()
      .then((response) => {
        console.log('response => ', response)
        const user = response
        commit('SET_USER', user)
        return user
      })
  },

  fetchSavedIssueQueries ({ commit }, userId) {
    console.log('#fetchSavedIssueQueries => userId', userId)
    return Store.getIssues(userId)
      .then((response) => {
        commit('SET_SAVED_ISSUE_QUERIES', response)
        return response
      })
  },

  fetchNotifications ({ commit }) {
    return Service.getNotifications()
      .then((response) => {
        commit('SET_NOTIFICATIONS', response.data)
        return response
      })
  }
}

const getters = {
  githubUser: (state) => {
    return state.user
  },
  savedIssueQueries: (state) => {
    return state.savedIssueQueries
  },
  notifications: (state) => {
    return state.notifications
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
