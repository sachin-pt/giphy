const map = {
  // m: ['> 4% in my stats, not android <= 80'],
  // m: ['Firefox >= 70, Edge >= 76, Chrome >= 73, Safari >= 13.1, > 4% in my stats, not android <= 80'],
  m: ['Firefox >= 71, Chrome >= 73, Safari >= 13.1, > 4% in my stats, not android <= 80'],
  a: [
    'Firefox >= 63, Edge >= 17, Chrome >= 51, Safari >= 11.1, iOS >= 10, > 1% in my stats, not android <= 80'
  ],
  l: ['>0.01% in my stats']
}
module.exports = (type = 'l') => map[type]
