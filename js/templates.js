var prepareTemplate = (function (doc) {

  var templateCache = {};

  return function prepareTemplate (template, searchAndReplaces) {
    var temp, val, tagOpen, tagClose, tagCombined;

    if (templateCache[template]) {
      output = templateCache[template];
    } else {
      temp = doc.querySelector('[data-template="' + template + '"]')

      if (!temp) throw 'Template doesn’t exist: ' + template;

      output = templateCache[template] = temp.innerHTML;
    }

    if (searchAndReplaces) {
      for (key in searchAndReplaces) {
        if (searchAndReplaces.hasOwnProperty(key)) {
          val = searchAndReplaces[key];
          tagOpen = '{{' + key + '}}\n?';
          tagClose = '{{/' + key + '}}\n?';
          tagCombined = tagOpen + '[^{]+' + tagClose + '\n?';

          if (val === true || val === false) {
            if (val === true) {
              output = output.replace(new RegExp(tagOpen, 'g'), '').replace(new RegExp(tagClose, 'g'), '');
            } else {
              output = output.replace(new RegExp(tagCombined, 'g'), '');
            }
          } else {
            output = output.replace(new RegExp(tagOpen, 'g'), val);
          }
        }
      }
    }

    return output;
  };

}(document));
