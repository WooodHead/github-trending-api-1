# Github trends api

## Usage
```js
const githubTrends = require('github-trends-api')
// or
import githubTrends from 'github-trends-api'
```

## Methods
```js
githubTrends(Object): Promise
```

## Examples
```js
const options = {
  section :'', // default: 'repositories' - or 'developers'
  lang:'' // default: all languages - or 'javascript', 'java' etc..
  since:'' // default: 'daily' - or 'weekly', 'monthly'
}

githubTrends(options)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
```

### Response 
```json
[{
  "author": "muhammederdem",
  "avatar": "https://github.com/muhammederdem.png",
  "reponame": "vue-interactive-paycard",
  "repolink": "https://github.com//muhammederdem/vue-interactive-paycard",
  "description": "Credit card form with smooth and sweet micro-interactions",
  "forks": "371",
  "language": "JavaScript",
  "languageColor": "#f1e05a",
  "stars": "3,797",
  "laststars": "121"
}]
```