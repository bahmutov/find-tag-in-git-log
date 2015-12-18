const ggit = require('ggit')
const findTag = require('./src/find-tag')
const la = require('lazy-ass')
const is = require('check-more-types')

const commitSchema = {
  message: is.unemptyString,
  body: is.maybe.string
}
const isCommit = is.schema.bind(null, commitSchema)

function printCommits (l) {
  console.log('printing %d commit(s)', l.length)
  console.log(l)
}

function findTagInCommits (l) {
  var tag
  l.some(commit => {
    la(isCommit(commit), 'invalid commit', commit)

    const fullMessage = commit.message + '\n' + commit.body
    const foundTag = findTag(fullMessage)
    if (foundTag) {
      tag = foundTag
      return true
    }
  })
  return tag
}

function findTag (isTest) {
  // how many commits to consider?
  const N = 5
  return ggit.commits.all(process.cwd())
    .then(commits => commits.slice(0, N))
}

module.exports = findTag
