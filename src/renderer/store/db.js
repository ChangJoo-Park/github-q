import Dexie from 'dexie'

const db = new Dexie('github-issues')

db.version(1).stores({
  issues: '++id, userId, name, query',
  bookmarked: '++id, userId, issueId, description'
})

function getDB () {
  return db
}

function getIssues (userId) {
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
    .where('userId')
    .equals(userId)
    .toArray()
}

function createNewBookmark (userId, issueId, description) {
  return getDB().bookmarked
    .add({ userId, issueId, description })
}

function removeBookmark (issueId) {
  return getDB().bookmarked
    .where('issueId')
    .equals(issueId)
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
