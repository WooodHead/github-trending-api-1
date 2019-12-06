import cheerio from 'cheerio';
import axios from 'axios';

function githubTrends ({ section = '', lang = '', since = '' }) { // https://github.com/trending/javascript?since=daily  

  const BASE_URL = 'https://github.com/';
  const trendUrl = `${BASE_URL}trending/`;
  const url = section
    ? `${trendUrl}developers/${lang}?since=${since}`
    : `${trendUrl}${lang}?since=${since}`

  return new Promise((resolve, reject) => {
    axios.get(url, { method: 'get', responseType: 'text' })
      .then(r => {

        const $ = cheerio.load(r.data)
        const box = $('.Box article.Box-row')

        const result = box.get().map(el => {
          const item = $(el)
          const description = item.find('p.col-9').text().trim();
          const [author, reponame] = item.find('.h3').text().split('/').map(v => v.trim());

          const repolink = BASE_URL + item.find('.h3.lh-condensed a').attr('href');

          const language = item.find('[itemprop=programmingLanguage]').text();
          const color = item.find('.repo-language-color').attr('style');
          const languageColor = color ? color.replace('background-color: ', '') : '';

          const [stars, laststars] = item.find("svg[aria-label='star']").parent().text().trim().split(/\s+|\n/g);
          const forks = item.find("svg[aria-label='repo-forked']").parent().text().trim();

          return {
            author,
            avatar: `${BASE_URL}${author}.png`,
            reponame, repolink,
            description,
            forks,
            language,
            languageColor,
            stars, laststars
          }
        })

        resolve(result)
      })
      .catch(e => {
        reject(e);
      })
  })
}

export default githubTrends;
