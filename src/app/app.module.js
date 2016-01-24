angular.module("marchambul", [
  'ui.router',
  "ui.bootstrap.tpls",
  "ui.bootstrap.transition",
  "ui.bootstrap.collapse",
  'ui.bootstrap.position',
  'ui.bootstrap.bindHtml',
  'ui.bootstrap.typeahead',
  'ui.bootstrap.modal',
  'ui.bootstrap.tooltip',
  'ui.bootstrap.position',
  'ui.bootstrap.bindHtml',
  'ui.bootstrap.popover',
  'ui.bootstrap.tabs',
  'ngStorage'
])

.run(function($rootScope, $localStorage, $state, $timeout){

    $timeout(function(){$('.slogan').addClass('loaded');}, 1000);

    $rootScope.scrollTo = function(selector){
        $('body').animate({
            scrollTop: $(selector).offset().top
        } , 600);
    };
});
