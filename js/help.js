var $help = $('.help-dialog');

$help.hide();

$('.help__close').on('click', function () {
  $help.fadeOut(200);
});

$('.help__open').on('click', function () {
  $help.fadeIn(200);
});

$('.help-backdrop').on('click', function () {
  $help.fadeOut(200);
});

$('.help').on('click', function (e) {
  e.stopPropagation();
});
