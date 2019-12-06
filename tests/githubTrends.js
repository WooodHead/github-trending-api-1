const githubTrends = require('../build/index.cjs')

githubTrends({ lang: "javascript", since: "weekly" })
  .then(r => {
    console.log(r);

  })
  .catch(e => {
    console.log(e);

  })