var $help = $('.help-dialog');

$('.help__close').on('click', function () {
  $help.fadeOut(200);
});

$('.help__open').on('click', function () {
  $help.fadeIn(200);
});

$help.on('click', function () {
  $help.fadeOut(200);
});

$('.help').on('click', function (e) {
  e.stopPropagation();
});
