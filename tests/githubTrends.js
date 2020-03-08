const githubTrends = require('../build/index.cjs')

githubTrends({ language:'javascript' ,since:'daily' })
  .then(r => {
    console.log(r[0]);

  })
  .catch(e => {
    console.log(e);

  })