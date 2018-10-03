import Dexie from 'dexie'

const db = new Dexie('github-issues')

db.version(1).stores({
  issues: '++id, userId, name, query',
  bookmarked: '++id, userId, url, description'
})

function getDB () {
  return db
}

function getIssues (userId) {
  console.log('userId => ', userId)
  return getDB().issues
    .where('userId')
    .equals(userId)
    .toArray()
}

function getIssue (userId, id) {
  return getDB().issues
    .where({
      userId, id
    })
    .first()
}

function createNewIssue (userId, name, query) {
  return getDB().issues.add({ userId, name, query })
}

function getBookmarked (userId) {
  return getDB().bookmarked
    .where({
      userId
    })
    .toArray()
}

function createNewBookmark (userId, url, description = '') {
  return getDB().bookmarked
    .add({ userId, url })
}

function removeBookmark (userId, url) {
  return getDB().bookmarked
    .where({
      userId, url
    })
    .delete()
}

export default {
  getDB,
  createNewIssue,
  getIssues,
  getIssue,
  getBookmarked,
  createNewBookmark,
  removeBookmark
}
