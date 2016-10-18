'use strict';

var hash = window.location.hash.replace(/#/, '');
var hashBits;
var defaults = [
  ['xs', 4, 0, 0, 0],
  ['s', 4, 25, 0, 0],
  ['m', 4, 38, 1, 1],
  ['l', 4, 60, 1, 1]
];
var breakpointCount = 0;

var $controls = $('#controls');
var $breakpoints = $('#breakpoints');
var $btnAdd = $('#btn-add-breakpoint');
var $output = $('#output');
var $legacy = $('#legacy');

var removeTrailingLeadingZeros = function (num) {
  return num.replace(/^0*\./, '.').replace(/\.?0*$/, '');
};

var formatNumber = function (num) {
  return removeTrailingLeadingZeros(num.toFixed(4));
};

var view = function view (name, vals) {
  if (!vals) vals = {};

  vals.legacy = $legacy.is(':checked');

  return prepareTemplate(name, vals);
};

var gridUnitWidth = function gridUnitWidth (size, cols) {
  return (size / cols) * 100;
};

var gridUnitSingle = function gridUnitSingle (prefix, size, cols, previousWidths, unitNames, addOffsets, addPushPull) {
  var newUnit = true;
  var newWidth = gridUnitWidth(size, cols);
  var newClass = [['.unit', prefix, size, cols].join('-'), [prefix, size, cols].join('-')].join(',\n.');
  var newClassOffset = ['.unit-offset', prefix, size, cols].join('-');
  var newClassPush = ['.unit-push', prefix, size, cols].join('-');
  var newClassPull = ['.unit-pull', prefix, size, cols].join('-');
  var output = [];

  previousWidths.forEach(function (item) {
    if (newWidth == item) newUnit = false;
  });

  if (newUnit) {
    previousWidths.push(newWidth);
    unitNames.push(newClass);

    output.push([newClass, ' {\n  width: ', formatNumber(newWidth), '%;\n}\n\n'].join(''))

    if (addOffsets) {
      output.push([newClassOffset, ' {\n  margin-left: ', formatNumber(newWidth), '%;\n}\n\n'].join(''))
    }

    if (addPushPull) {
      output.push([newClassPush, ' {\n  left: ', formatNumber(newWidth), '%;\n}\n\n'].join(''))
      output.push([newClassPull, ' {\n  left: -', formatNumber(newWidth), '%;\n}\n\n'].join(''))
    }
  }

  return output;
};

var gridUnits = function gridUnits (prefix, cols, addOffsets, addPushPull) {
  var previousWidths = [100];
  var unitNames = [];
  var output = [];
  var i = 2;
  var j = 1;

  if (cols < 3) cols = 3;

  output.push(view('grid-unit-all-sizes', {'prefix': prefix}));
  output.push(view('grid-unit-1', {'prefix': prefix}));

  if(addOffsets) {
    output.push(view('grid-unit-offset-0', {'prefix': prefix}));
  }

  if(addPushPull) {
    output.push(view('grid-unit-push-pull-0', {'prefix': prefix}));
  }

  for (i = 2; i <= cols; i++) {
    for (j = 1; j <= i; j++) {
      output = output.concat(gridUnitSingle(prefix, j, i, previousWidths, unitNames, addOffsets, addPushPull));
    }
  }

  output.push([unitNames.join(',\n').replace(/ /g, ''), ' {\n  ', view('grid-unit'), '}\n'].join(''));

  return output;
};

var indent = function (code) {
  var codeLines = code.split('\n');

  codeLines.forEach(function (line, i) {
    if (!line) return;

    codeLines[i] = '  ' + line;
  });

  return codeLines.join('\n');
};

$controls.on('keyup change submit', function (e) {
  var gridPieces = [];
  var output = '';
  var buildHash = [];

  e.preventDefault();

  $breakpoints.children().each(function () {
    var prefix = $.trim($(this).find('.prefix').val());
    var columns = $.trim($(this).find('.columns').val());
    var addOffsets = $(this).find('.add-offsets').is(':checked');
    var addPushPull = $(this).find('.add-push-pull').is(':checked');
    var minWidthVal = $.trim($(this).find('.min-width').val());
    var hasMinWidth = (parseInt(minWidthVal, 10) > 0);

    if (hasMinWidth) {
      buildHash.push([prefix, columns, minWidthVal, addOffsets ? 1 : 0, addPushPull ? 1 : 0]);

      gridPieces.push(
        view('media-query', {
            'min-width': minWidthVal,
            'css': indent(gridUnits(prefix, columns, addOffsets, addPushPull).join(''))
          })
      );
    } else {
      buildHash.push([prefix, columns, 0, addOffsets ? 1 : 0, addPushPull ? 1 : 0]);
      gridPieces = gridPieces.concat(gridUnits(prefix, columns, addOffsets, addPushPull));
    }
  });

  output = [view('grid-base', {
    'build': window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + buildHash.join(';'),
    'grid-unit': view('grid-unit'),
    'main': gridPieces.join('')
  })];

  $output.html(output);
  window.location.hash = buildHash.join(';');
});

$btnAdd.on('click', function () {
  var minWidthIncrement = 20;
  var extra = (new Array(100)).join("x");
  var data = [];

  if (defaults[breakpointCount]) {
    data = defaults[breakpointCount];
  } else {
    data = [
      extra.substr(0, breakpointCount - (defaults.length - 1)) + defaults[defaults.length - 1][0],
      defaults[defaults.length - 1][1],
      defaults[defaults.length - 1][2] + (breakpointCount - (defaults.length - 1)) * minWidthIncrement,
      defaults[defaults.length - 1][3],
      defaults[defaults.length - 1][4]
    ];
  }

  $breakpoints.append(view('breakpoint', {
      'id': breakpointCount,
      'prefix': data[0],
      'columns': data[1],
      'min-width': data[2],
      'offsets': data[3] ? 'checked' : '',
      'push-pull': data[4] ? 'checked' : ''
    })
  );

  breakpointCount++;

  $controls.trigger('submit');
});

$controls.on('click', '.btn-remove-breakpoint', function (e) {
  e.preventDefault();
  $(this).parent().parent().remove();
  breakpointCount--;
  $controls.trigger('submit');
});

if (hash) {
  hashBits = hash.split(';');
  defaults = [];

  hashBits.forEach(function (item) {
    var data = item.split(',');

    data[3] = data[3] == 1 ? true : false;
    data[4] = data[4] == 1 ? true : false;
    defaults.push(data);
  });
}

defaults.forEach(function() {
  $btnAdd.trigger('click');
});

$breakpoints.find('.breakpoint:first-child .breakpoint-em').html('<span class="infinite">∞</span>');
$breakpoints.find('.breakpoint:first-child .btn-remove-breakpoint').remove();
