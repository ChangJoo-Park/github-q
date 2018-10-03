import Service from '@/services'
import Store from '@/store/db'

const state = {
  user: null,
  savedIssueQueries: null,
  notifications: null,
  events: null,
  assignedIssues: null,
  mentionedIssues: null
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
  },
  SET_EVENTS (state, events) {
    state.events = events
  },
  SET_ASSIGNED_ISSUES (state, assignedIssues) {
    state.assignedIssues = assignedIssues
  },
  SET_MENTIONED_ISSUES (state, mentionedIssues) {
    state.mentionedIssues = mentionedIssues
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
  },

  fetchRecievedEvents ({ commit }, username) {
    return Service.getPublicEvents(username)
      .then((response) => {
        commit('SET_EVENTS', response.data)
        return response
      })
  },

  fetchAssignedIssues ({ commit }) {
    return Service.getAssignedIssues()
      .then((response) => {
        commit('SET_ASSIGNED_ISSUES', response.data)
        return response
      })
  },

  fetchMentionedIssues ({ commit }) {
    return Service.getMentionedIssues()
      .then((response) => {
        commit('SET_MENTIONED_ISSUES', response.data)
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
  },
  events: (state) => {
    return state.events
  },
  assignedIssues: (state) => {
    return state.assignedIssues
  },
  mentionedIssues: (state) => {
    return state.mentionedIssues
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
