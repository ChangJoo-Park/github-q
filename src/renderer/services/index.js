import axios from 'axios'

const BASE_URL = 'https://api.github.com'

function getAccessToken () {
  return window.localStorage.getItem('accessToken')
}

function getAccessTokenURL () {
  return `?access_token=${getAccessToken()}`
}

function getDateFromNow (offset) {
  const NOW = new Date()
  return new Date(NOW.setMonth(NOW.getMonth() + offset)).toISOString().split('T')[0]
}

function requestGet (url) {
  return axios({
    method: 'GET',
    url,
    headers: {
      Accept: 'application/vnd.github.symmetra-preview+json'
    }
  }).catch(errorHandler)
}

function errorHandler (error) {
  console.log(error)
}

/* Github APIs */

function getNotifications () {
  const url = `${BASE_URL}/notifications${getAccessTokenURL()}`
  return axios
    .get(url)
    .catch(errorHandler)
}

function getAssignedIssues () {
  // https://api.github.com/issues?access_token=4ccf8e0a9d45f31c92763fa2923810aa9d853d18&since=2018-09-28
  const url = `${BASE_URL}/issues${getAccessTokenURL()}&since=${getDateFromNow(-1)}`
  return requestGet(url)
}

function getMentionedIssues () {
  const url = `${BASE_URL}/issues${getAccessTokenURL()}&filter=mentioned&since=${getDateFromNow(-1)}`
  return requestGet(url)
}

export default {
  getNotifications,
  getAssignedIssues,
  getMentionedIssues
}
