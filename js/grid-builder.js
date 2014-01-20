var
  $output = $('#output'),
  base = $('#grid-base').html(),
  gridUnit = $('#grid-unit').html(),
  gridUnitHidden = $('#grid-unit-hidden').html(),
  gridUnit1 = $('#grid-unit-1').html(),

  gridUnitWidth = function gridUnitWidth (size, cols) {
    return (size / cols) * 100;
  },

  gridUnitSingle = function gridUnitSingle (prefix, size, cols, previousWidths, unitNames, addOffsets) {
    var newUnit = true,
      newWidth = gridUnitWidth(size, cols),
      newClass = ['.unit', prefix, size, cols].join('-'),
      newClassOffset = ['.unit-offset', prefix, size, cols].join('-'),
      output = [];

    previousWidths.forEach(function (item, index, array) {
      if (newWidth == item) newUnit = false;
    });

    if (newUnit) {
      previousWidths.push(newWidth);
      unitNames.push(newClass);

      output.push([newClass, ' { width: ', newWidth.toFixed(4), '%; }\n'].join(''))

      if (addOffsets) {
        output.push([newClassOffset, ' { margin-left: ', newWidth.toFixed(4), '%; }\n'].join(''))
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

    output.push(gridUnitHidden.replace('{{prefix}}', prefix));
    output.push(gridUnit1.replace('{{prefix}}', prefix));

    for (i = 2; i <= cols; i++) {
      for (j = 1; j <= i; j++) {
        output = output.concat(gridUnitSingle(prefix, j, i, previousWidths, unitNames, addOffsets));
      }
    }

    output.push([unitNames.join(','), ' {\n  ', gridUnit, '\n}'].join(''));

    return output;
  };

$('#form').on('change submit', function (e) {
  var template = [base.replace('{{grid-unit}}', gridUnit)];

  template = template.concat(gridUnits('xs', 4, true));

  e.preventDefault();

  $output.html(template.join(''));
});
