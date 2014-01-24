var
  defaultPrefixes = ['xs', 's', 'm', 'l', 'xl'],
  defaultMinWidths = [0, 25, 38, 60, 90],
  breakpointCount = 0,

  $controls = $('#controls'),
  $breakpoints = $('#breakpoints'),
  $btnAdd = $('#btn-add-breakpoint'),
  $output = $('#output'),
  $legacy = $('#legacy'),

  view = function view (name, vals) {
    if (!vals) vals = {};

    vals.legacy = $legacy.is(':checked');

    return prepareTemplate(name, vals);
  },

  gridUnitWidth = function gridUnitWidth (size, cols) {
    return (size / cols) * 100;
  },

  gridUnitSingle = function gridUnitSingle (prefix, size, cols, previousWidths, unitNames, addOffsets) {
    var newUnit = true,
      newWidth = gridUnitWidth(size, cols),
      newClass = ['.unit', prefix, size, cols].join('-'),
      newClassOffset = ['.unit-offset', prefix, size, cols].join('-'),
      output = [];

    previousWidths.forEach(function (item) {
      if (newWidth == item) newUnit = false;
    });

    if (newUnit) {
      previousWidths.push(newWidth);
      unitNames.push(newClass);

      output.push([newClass, ' {\n  width: ', newWidth.toFixed(4), '%;\n}\n\n'].join(''))

      if (addOffsets) {
        output.push([newClassOffset, ' {\n  margin-left: ', newWidth.toFixed(4), '%;\n}\n\n'].join(''))
      }
    }

    return output;
  },

  gridUnits = function gridUnits (prefix, cols, addOffsets) {
    var previousWidths = [100],
      unitNames = [],
      output = [],
      i = 2,
      j = 1;

    if (cols < 3) cols = 3;

    output.push(view('grid-unit-hidden', {'prefix': prefix}));
    output.push(view('grid-unit-1', {'prefix': prefix}));

    for (i = 2; i <= cols; i++) {
      for (j = 1; j <= i; j++) {
        output = output.concat(gridUnitSingle(prefix, j, i, previousWidths, unitNames, addOffsets));
      }
    }

    output.push([unitNames.join(','), ' {\n  ', view('grid-unit'), '}\n'].join(''));

    return output;
  };

$controls.on('keyup change submit', function (e) {
  var template = [view('grid-base', {'grid-unit': view('grid-unit')})];

  e.preventDefault();

  $breakpoints.children().each(function () {
    var prefix = $(this).find('.prefix').val(),
      columns = $(this).find('.columns').val(),
      addOffsets = $(this).find('.add-offsets').is(':checked'),
      $minWidth = $(this).find('.min-width'),
      hasMinWidth = $minWidth.length;

    if (hasMinWidth) {
      template.push(
        view('media-query', {
            'min-width': $minWidth.val(),
            'css': gridUnits(prefix, columns, addOffsets).join('')
          })
      );
    } else {
      template = template.concat(gridUnits(prefix, columns, addOffsets));
    }
  });

  $output.html(template.join(''));
});

$btnAdd.on('click', function () {
  var l = defaultMinWidths.length - 1,
    minWidthIncrement = 20,
    extra = (new Array(100)).join("x");

  $breakpoints.append(view('breakpoint', {
      'id': breakpointCount,
      'columns': $breakpoints.children('.breakpoint:last-child').find('.columns').val() || 4,
      'prefix': defaultPrefixes[breakpointCount] || extra.substr(0, breakpointCount - l) + defaultPrefixes[l],
      'min-width': defaultMinWidths[breakpointCount] || defaultMinWidths[l] + ((breakpointCount - l) * minWidthIncrement)
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

$btnAdd.trigger('click');
$breakpoints.children().find('.btn-remove-breakpoint, .min-width').remove();
$controls.trigger('submit');
