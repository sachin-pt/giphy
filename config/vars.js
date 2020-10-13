const env = process.env.NODE_ENV || 'development'
let branch = process.env.GITHUB_PR_SOURCE_BRANCH || 'master'
branch = /^origin\//.test(branch) ? branch : `origin/${branch}`
module.exports = { env, branch }
