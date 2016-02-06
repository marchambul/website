angular.module("marchambul", ['ui.router', 'ngSanitize'])

.run(function($rootScope, $timeout){

    $timeout(function(){$('.slogan').addClass('loaded');}, 1000);

    $rootScope.scrollTo = function(selector){
        $('body').animate({
            scrollTop: $(selector).offset().top
        } , 600);
    };
});
