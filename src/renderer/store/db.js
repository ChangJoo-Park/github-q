import Dexie from 'dexie'

const db = new Dexie('github-issues')

db.version(1).stores({
  issues: '++id, userId, name, query'
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

function createNewIssue (userId, name, query) {
  return getDB().issues.add({ userId, name, query })
}

export default {
  getDB,
  createNewIssue,
  getIssues
}
