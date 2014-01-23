var $help = $('.help-dialog');

$('.help__close').on('click', function () {
  if ($help.attr('data-state') == 'open') {
    $help.attr('data-state', 'closed');
  } else {
    $help.attr('data-state', 'open');
  }
});

$('.help-backdrop').on('click', function () {
  $help.attr('data-state', 'closed');
});
