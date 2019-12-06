'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var cheerio = _interopDefault(require('cheerio'));
var axios = _interopDefault(require('axios'));

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function githubTrends(_ref) {
  var _ref$section = _ref.section,
      section = _ref$section === void 0 ? '' : _ref$section,
      _ref$lang = _ref.lang,
      lang = _ref$lang === void 0 ? '' : _ref$lang,
      _ref$since = _ref.since,
      since = _ref$since === void 0 ? '' : _ref$since;
  var BASE_URL = 'https://github.com/';
  var trendUrl = "".concat(BASE_URL, "trending/");
  var url = section ? "".concat(trendUrl, "developers/").concat(lang, "?since=").concat(since) : "".concat(trendUrl).concat(lang, "?since=").concat(since);
  return new Promise(function (resolve, reject) {
    axios.get(url, {
      method: 'get',
      responseType: 'text'
    }).then(function (r) {
      var $ = cheerio.load(r.data);
      var box = $('.Box article.Box-row');
      var result = box.get().map(function (el) {
        var item = $(el);
        var description = item.find('p.col-9').text().trim();
        var _item$find$text$split = item.find('.h3').text().split('/').map(function (v) {
          return v.trim();
        }),
            _item$find$text$split2 = _slicedToArray(_item$find$text$split, 2),
            author = _item$find$text$split2[0],
            reponame = _item$find$text$split2[1];
        var repolink = BASE_URL + item.find('.h3.lh-condensed a').attr('href');
        var language = item.find('[itemprop=programmingLanguage]').text();
        var color = item.find('.repo-language-color').attr('style');
        var languageColor = color ? color.replace('background-color: ', '') : '';
        var _item$find$parent$tex = item.find("svg[aria-label='star']").parent().text().trim().split(/\s+|\n/g),
            _item$find$parent$tex2 = _slicedToArray(_item$find$parent$tex, 2),
            stars = _item$find$parent$tex2[0],
            laststars = _item$find$parent$tex2[1];
        var forks = item.find("svg[aria-label='repo-forked']").parent().text().trim();
        return {
          author: author,
          avatar: "".concat(BASE_URL).concat(author, ".png"),
          reponame: reponame,
          repolink: repolink,
          description: description,
          forks: forks,
          language: language,
          languageColor: languageColor,
          stars: stars,
          laststars: laststars
        };
      });
      resolve(result);
    })["catch"](function (e) {
      reject(e);
    });
  });
}

module.exports = githubTrends;
