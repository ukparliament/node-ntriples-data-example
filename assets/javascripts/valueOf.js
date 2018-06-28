'use strict';

function valueOf(statement, line) {

  let value = undefined;

  switch(statement) {

    case 's':
      value = line
        .match(/^(<|_:).+?>?\s</, '')[0]
        .match(/(?!.+\/)[^/].+(?=(>|\s).+)/)[0]
        .replace('>', '');
      break;

    case 'p':
      value = line
        .match(/^.+?>?\s?<.+?>/g)[0]
        .replace(/^.+\//, '')
        .replace('>', '');
      break;

    case 'o':
      value = line
        .replace(/^(<|_:).+?>?\s/, '')
        .replace(/^<.+?>\s/, '')
        .match(/^.+(?=\s\.)/)[0];

      if (value.match(/^<https?:\/\/.+>/)) {
        value = value
          .replace(/^<.+\//, '')
          .replace('>', '');
      }

      if (value.match(/^\".+\"/)) {
        value = value
          .replace(/^\"/, '')
          .match(/.+(?=\")/)[0];
      }
      break;

  }

  return value;

}

module.exports = valueOf;
