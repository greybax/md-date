# md-date

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> get date from markdown article

## Install

    npm install --save md-date

## Usage

```js
import getDate from 'md-date';

const input = `
# title

21 asd qwe

22 *Dec* 2016

23 December 2016

24 Décembre 2016`;

getDate('DD MMM YYYY',  'en', input).text;   // 21 Dec 2016
getDate('DD MMM YYYY',  'en', input).html;   // 22 <em>Dec</em> 2016
getDate('DD MMM YYYY',  'en', input).unix;   // 1482364800
getDate('DD MMMM YYYY', 'en', input).text;   // 23 December 2016
getDate('DD MMMM YYYY', 'fr', input).text;   // 24 Décembre 2016
getDate('DD MMMM YYYY', 'en', input).moment; // moment instance
getDate('DD MMMM YYYY', 'en', input).node;   // MDAST node, see remark API
getDate('DD MMMM YYYY', 'en', '');           // undefined
```

## API

### getDate(format, locale, input)

#### format

*Required*  
Type: `String`

Momentjs [format][format] for date, e.g. `DD MMMM YYYY`.

[format]: http://momentjs.com/docs/#/displaying/format/

#### locale

*Required*  
Type: `String`

One of 83 available in momentjs [locales][i18n], e.g. `en` or `fr`.

[i18n]: http://momentjs.com/docs/#/i18n/

#### input

*Required*  
Type: `String`

Markdown string.

## Related

* [md-article][md-article] - extract data from your markdown article
    * [md-content][md-content] - get content from markdown article
    * [md-desc][md-desc] - get description from markdown article
    * [md-title][md-title] - get title from markdown article

## License

MIT © [Aleksandr Filatov](https://alfilatov.com)

[npm-url]: https://npmjs.org/package/md-date
[npm-image]: https://img.shields.io/npm/v/md-date.svg?style=flat-square

[travis-url]: https://travis-ci.org/greybax/md-date
[travis-image]: https://img.shields.io/travis/greybax/md-date.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/greybax/md-date
[coveralls-image]: https://img.shields.io/coveralls/greybax/md-date.svg?style=flat-square

[depstat-url]: https://david-dm.org/greybax/md-date
[depstat-image]: https://david-dm.org/greybax/md-date.svg?style=flat-square

[md-article]: https://github.com/greybax/md-article
[md-content]: https://github.com/greybax/md-content
[md-desc]: https://github.com/greybax/md-desc
[md-title]: https://github.com/greybax/md-title