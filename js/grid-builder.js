var
	defaultPrefixes = ['xs', 's', 'm', 'l', 'xl'],
	defaultMinWidths = [0, 25, 38, 60, 90],
	breakpointCount = 0,
	breakpointTemplate = $('#breakpoint').html(),
	$form = $('#form'),
	$breakpoints = $('#breakpoints'),
	$btnAdd = $('#btn-add-breakpoint'),
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

		output.push([unitNames.join(','), ' {\n\t', gridUnit, '\n}\n'].join(''));

		return output;
	};

$form.on('keyup change submit', function (e) {
	var template = [base.replace('{{grid-unit}}', gridUnit)];

	e.preventDefault();

	$breakpoints.children().each(function () {
		var prefix = $(this).find('.prefix').val(),
			columns = $(this).find('.columns').val(),
			addOffsets = $(this).find('.add-offsets').is(':checked'),
			$minWidth = $(this).find('.min-width'),
			hasMinWidth = $minWidth.length,
			minWidth = 0;

		if (hasMinWidth) {
			template.push(['@media only screen and (min-width: ', $minWidth.val(), 'em) {\n'].join(''));
		}

		template = template.concat(gridUnits(prefix, columns, addOffsets));

		if (hasMinWidth) {
			template.push('}\n');
		}
	});

	$output.html(template.join(''));
});

$btnAdd.on('click', function (e) {
	var l = defaultMinWidths.length - 1,
		minWidthIncrement = 20,
		extra = (new Array(100)).join("x");

	$breakpoints.append(
		breakpointTemplate
			.replace(/\{\{id\}\}/g, breakpointCount)
			.replace('{{columns}}', $breakpoints.children('.breakpoint:last-child').find('.columns').val())
			.replace('{{prefix}}', defaultPrefixes[breakpointCount] || extra.substr(0, breakpointCount - l) + defaultPrefixes[l])
			.replace('{{min-width}}', defaultMinWidths[breakpointCount] || defaultMinWidths[l] + ((breakpointCount - l) * minWidthIncrement))
	);

	breakpointCount++;

	$form.trigger('submit');
});

$form.on('click', '.btn-remove-breakpoint', function (e) {
	e.preventDefault();
	$(this).parent().parent().remove();
	breakpointCount--;
	$form.trigger('submit');
});

$btnAdd.trigger('click');
$breakpoints.children().find('.btn-remove-breakpoint, .min-width').remove();
$form.trigger('submit');
