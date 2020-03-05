const githubTrends = require('../build/index.cjs')

githubTrends({ since:'weekly' })
  .then(r => {
    console.log(r[0]);

  })
  .catch(e => {
    console.log(e);

  })